import { PrismaClient } from '@prisma/client'

// Set DATABASE_URL for local scripts
process.env.DATABASE_URL = 'postgresql://neondb_owner:npg_VeJs3ZAjUwp4@ep-round-glitter-as6ryhe3.c-4.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'

const db = new PrismaClient()

async function debugZoneMembers() {
  console.log('=== DEBUG: Zone Members ===\n')
  
  // 1. Get all projects
  const projects = await db.project.findMany({
    select: { id: true, name: true, companyId: true }
  })
  console.log(`Found ${projects.length} projects:`)
  projects.forEach(p => console.log(`  - ${p.name} (id: ${p.id})`))
  
  if (projects.length === 0) {
    console.log('\nNo projects found!')
    return
  }
  
  // Use first project for detailed analysis
  const projectId = projects[0].id
  console.log(`\n--- Analyzing project: ${projects[0].name} (id: ${projectId}) ---\n`)
  
  // 2. Get zones for this project
  const zones = await db.zone.findMany({
    where: { projectId },
    select: { id: true, name: true, color: true }
  })
  console.log(`Zones in project (${zones.length}):`)
  zones.forEach(z => console.log(`  - ${z.name} (id: ${z.id})`))
  
  // 3. Get project members with their zone assignments
  const members = await db.projectMember.findMany({
    where: { projectId },
    include: {
      user: {
        select: { id: true, name: true, email: true }
      },
      MemberZone: {
        include: {
          Zone: {
            select: { id: true, name: true }
          }
        }
      }
    }
  })
  
  console.log(`\nProject members (${members.length}):`)
  members.forEach(m => {
    const zoneNames = m.MemberZone?.map(mz => mz.Zone.name) || []
    console.log(`  - ${m.user.name} (${m.user.email}) [role: ${m.role}]`)
    console.log(`    Assigned to zones: ${zoneNames.length > 0 ? zoneNames.join(', ') : 'NONE!'}`)
    if (m.MemberZone && m.MemberZone.length > 0) {
      m.MemberZone.forEach(mz => {
        console.log(`      → MemberZone id: ${mz.id}, Zone id: ${mz.zoneId}`)
      })
    }
  })
  
  // 4. Check MemberZone table directly for this project's zones
  const zoneIds = zones.map(z => z.id)
  if (zoneIds.length > 0) {
    const memberZones = await db.memberZone.findMany({
      where: { zoneId: { in: zoneIds } },
      include: {
        ProjectMember: {
          include: {
            user: { select: { name: true, email: true } }
          }
        },
        Zone: { select: { name: true } }
      }
    })
    
    console.log(`\nMemberZone records for this project's zones (${memberZones.length}):`)
    memberZones.forEach(mz => {
      console.log(`  - ${mz.ProjectMember.user.name} → ${mz.Zone.name} (MemberZone id: ${mz.id})`)
    })
  }
  
  // 5. Test the exact query from the API
  console.log('\n--- Testing API query format ---')
  const apiMembers = await db.projectMember.findMany({
    where: { projectId },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          active: true,
        },
      },
      MemberZone: {
        include: {
          Zone: {
            select: {
              id: true,
              name: true,
              color: true,
            },
          },
        },
        orderBy: { assignedAt: 'asc' },
      },
    },
    orderBy: { joinedAt: 'asc' },
  })
  
  const transformedMembers = apiMembers.map(m => ({
    userName: m.user.name,
    userEmail: m.user.email,
    zones: m.MemberZone?.map(mz => ({
      id: mz.Zone.id,
      name: mz.Zone.name,
      color: mz.Zone.color,
    })) || [],
  }))
  
  console.log('\nTransformed members (as API would return):')
  transformedMembers.forEach(m => {
    console.log(`  - ${m.userName}: ${m.zones.length} zones`)
    if (m.zones.length > 0) {
      m.zones.forEach(z => console.log(`      → ${z.name}`))
    }
  })
}

debugZoneMembers()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Error:', err)
    process.exit(1)
  })
