/**
 * Script para asignar usuario existente (Luis) a un proyecto
 * 
 * PROBLEMA: El usuario fue creado pero no tiene registro en ProjectMember
 * SOLUCIÓN: Crear el registro ProjectMember + MemberZone para las zonas
 * 
 * USO: npx tsx scripts/fix-luis-project.ts
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function fixUserProjectAssignment() {
  try {
    console.log('🔧 Buscando usuarios sin proyecto asignado...\n')

    // 1. Buscar todos los usuarios activos
    const users = await prisma.user.findMany({
      where: { active: true },
      select: { id: true, email: true, name: true, role: true }
    })

    console.log(`📊 Usuarios activos encontrados: ${users.length}\n`)

    // 2. Buscar todos los proyectos
    const projects = await prisma.project.findMany({
      where: { active: true },
      include: {
        _count: { select: { members: true } },
        zones: { select: { id: true, name: true } }
      }
    })

    if (projects.length === 0) {
      console.error('❌ No hay proyectos activos en la base de datos')
      return
    }

    console.log(`📁 Proyectos activos encontrados: ${projects.length}`)
    projects.forEach(p => {
      console.log(`   - ${p.name} (${p._count.members} miembros, ${p.zones.length} zonas)`)
    })
    console.log('')

    // 3. Para cada usuario, verificar si tiene ProjectMember
    let fixedCount = 0

    for (const user of users) {
      // Buscar si ya tiene algún proyecto asignado
      const existingMembership = await prisma.projectMember.findFirst({
        where: { userId: user.id }
      })

      if (existingMembership) {
        console.log(`✅ ${user.name} (${user.email}) - YA tiene proyecto asignado`)
        continue
      }

      // Usuario SIN proyecto - buscar su empresa para asignar al proyecto correcto
      const companyMember = await prisma.companyMember.findFirst({
        where: { userId: user.id },
        include: { company: { include: { projects: { where: { active: true } } } } }
      })

      // Determinar qué proyecto usar
      let targetProject = null
      
      if (companyMember?.company.projects.length > 0) {
        // Usar primer proyecto de su empresa
        targetProject = companyMember.company.projects[0]
        console.log(`🔧 ${user.name} (${user.email}) - Sin proyecto, empresa: ${companyMember.company.name}`)
      } else if (projects.length > 0) {
        // Si no tiene empresa o empresa sin proyectos, usar cualquier proyecto
        targetProject = projects[0]
        console.log(`🔧 ${user.name} (${user.email}) - Sin proyecto ni empresa, usando: ${targetProject.name}`)
      }

      if (!targetProject) {
        console.log(`⚠️  ${user.name} - No se encontró proyecto para asignar`)
        continue
      }

      // 4. Crear ProjectMember
      const zones = await prisma.zone.findMany({
        where: { projectId: targetProject.id },
        select: { id: true }
      })

      const member = await prisma.projectMember.create({
        data: {
          userId: user.id,
          projectId: targetProject.id,
          role: user.role || 'empleado',
          zones: {
            create: zones.map(zone => ({ zoneId: zone.id }))
          }
        },
        include: {
          project: { select: { name: true } },
          zones: { include: { zone: { select: { name: true } } } }
        }
      })

      console.log(`   ✅ ASIGNADO al proyecto "${member.project.name}"`)
      console.log(`   📍 Zonas asignadas: ${member.zones.length} (${member.zones.map(z => z.zone.name).join(', ')})`)
      fixedCount++
    }

    console.log('\n' + '='.repeat(50))
    console.log(`✅ RESUMEN: ${fixedCount} usuario(s) asignado(s) a proyecto(s)`)
    console.log('='.repeat(50))

  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Ejecutar
fixUserProjectAssignment()
