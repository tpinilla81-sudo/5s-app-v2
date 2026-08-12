// Verify gestor and existing data in Neon (corrected for current schema)
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('=== USERS (count) ===');
  const userCount = await prisma.user.count();
  console.log('Total users:', userCount);

  console.log('\n=== USERS ===');
  const users = await prisma.user.findMany({
    select: { id: true, email: true, name: true, role: true, active: true },
    take: 100,
  });
  console.table(users);

  console.log('\n=== COMPANIES ===');
  const companies = await prisma.company.findMany();
  console.table(companies.map(c => ({ id: c.id, name: c.name })));

  console.log('\n=== PROJECTS ===');
  const projects = await prisma.project.findMany();
  console.table(projects.map(p => ({ id: p.id, name: p.name, company: p.company })));

  console.log('\n=== COUNTS ===');
  console.log('ActionItems:', await prisma.actionItem.count());
  console.log('Zones:', await prisma.zone.count());
  console.log('AuditResults:', await prisma.auditResult.count());
  console.log('ProjectMembers:', await prisma.projectMember.count());
  console.log('CompanyMembers:', await prisma.companyMember.count());

  console.log('\n=== GESTOR VERIFICATION ===');
  const gestor = await prisma.user.findFirst({
    where: { email: 't_pinilla@outlook.com' },
  });
  if (gestor) {
    console.log('✓ Gestor encontrado');
    console.log('  ID:', gestor.id);
    console.log('  Nombre:', gestor.name);
    console.log('  Rol:', gestor.role);
    console.log('  Active:', gestor.active);
    console.log('  PasswordHash prefix:', gestor.password?.substring(0, 30) + '...');
    console.log('  PasswordHash length:', gestor.password?.length);

    // Test password
    const bcrypt = await import('bcryptjs');
    const ok = await bcrypt.compare('gestor123', gestor.password);
    console.log('  Password "gestor123" valid:', ok);
  } else {
    console.log('✗ Gestor NO encontrado en Neon');
  }
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
