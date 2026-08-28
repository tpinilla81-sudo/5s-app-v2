require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Buscar usuario javier
  const user = await prisma.user.findFirst({
    where: { email: 'javier@roncal.com' },
    select: { id: true, email: true, name: true, role: true }
  });
  
  console.log('=== USUARIO JAVIER ===');
  console.log(JSON.stringify(user, null, 2));
  
  if (user) {
    // Buscar sus memberships en empresas (usar nombres correctos del schema)
    const memberships = await prisma.companyMember.findMany({
      where: { userId: user.id },
      include: { 
        Company: { select: { id: true, name: true } },
        User: { select: { id: true, name: true } }
      }
    });
    
    console.log('\n=== MEMBERSHIPS DE JAVIER EN EMPRESAS ===');
    console.log(JSON.stringify(memberships, null, 2));
    
    // Ver todos los miembros de la empresa
    if (memberships.length > 0) {
      const allMembers = await prisma.companyMember.findMany({
        where: { companyId: memberships[0].companyId },
        include: { 
          User: { select: { id: true, name: true, email: true } },
          Company: { select: { name: true } }
        }
      });
      
      console.log('\n=== TODOS LOS MIEMBROS DE LA EMPRESA ===');
      allMembers.forEach((m, i) => {
        console.log(`${i+1}. ${m.User.name} (${m.User.email}) - Rol: ${m.role}`);
      });
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
