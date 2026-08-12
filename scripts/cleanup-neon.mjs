// Clean Neon DB: delete all data except SystemConfig, create gestor t_pinilla@outlook.com
// Usage: bun run scripts/cleanup-neon.mjs [--dry-run]
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const DRY = process.argv.includes('--dry-run');
const GESTOR_EMAIL = 't_pinilla@outlook.com';
const GESTOR_PASSWORD = 'gestor123';
const GESTOR_NAME = 'T. Pinilla (Gestor)';

async function main() {
  console.log(`=== NEON CLEANUP ${DRY ? '(DRY RUN)' : ''} ===`);
  console.log(`Target: keep only SystemConfig + gestor ${GESTOR_EMAIL}\n`);

  // 1. Show current state
  const before = {
    users: await prisma.user.count(),
    companies: await prisma.company.count(),
    projects: await prisma.project.count(),
    actionItems: await prisma.actionItem.count(),
    zones: await prisma.zone.count(),
    notifications: await prisma.notification.count(),
    auditResults: await prisma.auditResult.count(),
  };
  console.log('Before cleanup:', before);

  // 2. Check if gestor already exists
  const existingGestor = await prisma.user.findUnique({ where: { email: GESTOR_EMAIL } });
  if (existingGestor) {
    console.log(`\n✓ Gestor ${GESTOR_EMAIL} already exists (id: ${existingGestor.id})`);
  } else {
    console.log(`\n⚠ Gestor ${GESTOR_EMAIL} does NOT exist — will create.`);
  }

  if (DRY) {
    console.log('\n[DRY RUN] No changes made. Remove --dry-run to apply.');
    return;
  }

  // 3. Delete in dependency order (children first)
  console.log('\n--- Deleting data ---');

  // Exam answers
  const examAnswers = await prisma.examAnswer.deleteMany({});
  console.log(`ExamAnswer: ${examAnswers.count} deleted`);

  // Checklist responses
  const checklist = await prisma.checklistResponse.deleteMany({});
  console.log(`ChecklistResponse: ${checklist.count} deleted`);

  // Employee progress
  const empProg = await prisma.employeeProgress.deleteMany({});
  console.log(`EmployeeProgress: ${empProg.count} deleted`);

  // Progress
  const progress = await prisma.progress.deleteMany({});
  console.log(`Progress: ${progress.count} deleted`);

  // PDCA items
  const pdca = await prisma.pDCAItem.deleteMany({});
  console.log(`PDCAItem: ${pdca.count} deleted`);

  // Photo library
  const photos = await prisma.photoLibrary.deleteMany({});
  console.log(`PhotoLibrary: ${photos.count} deleted`);

  // Inventory items
  const inventory = await prisma.inventoryItem.deleteMany({});
  console.log(`InventoryItem: ${inventory.count} deleted`);

  // Standards
  const standards = await prisma.standard.deleteMany({});
  console.log(`Standard: ${standards.count} deleted`);

  // Audit results
  const auditResults = await prisma.auditResult.deleteMany({});
  console.log(`AuditResult: ${auditResults.count} deleted`);

  // Audit targets
  const auditTargets = await prisma.auditTarget.deleteMany({});
  console.log(`AuditTarget: ${auditTargets.count} deleted`);

  // Action items
  const actions = await prisma.actionItem.deleteMany({});
  console.log(`ActionItem: ${actions.count} deleted`);

  // Evaluation schedules
  const evalSched = await prisma.evaluationSchedule.deleteMany({});
  console.log(`EvaluationSchedule: ${evalSched.count} deleted`);

  // Member zones
  const memberZones = await prisma.memberZone.deleteMany({});
  console.log(`MemberZone: ${memberZones.count} deleted`);

  // Zones
  const zones = await prisma.zone.deleteMany({});
  console.log(`Zone: ${zones.count} deleted`);

  // Board slot relations
  const slotTemplates = await prisma.boardSlotTemplate.deleteMany({});
  console.log(`BoardSlotTemplate: ${slotTemplates.count} deleted`);

  const slotStandards = await prisma.boardSlotStandard.deleteMany({});
  console.log(`BoardSlotStandard: ${slotStandards.count} deleted`);

  // Board slots
  const slots = await prisma.boardSlot.deleteMany({});
  console.log(`BoardSlot: ${slots.count} deleted`);

  // Board configurations
  const boards = await prisma.boardConfiguration.deleteMany({});
  console.log(`BoardConfiguration: ${boards.count} deleted`);

  // Project members
  const projectMembers = await prisma.projectMember.deleteMany({});
  console.log(`ProjectMember: ${projectMembers.count} deleted`);

  // Company members
  const companyMembers = await prisma.companyMember.deleteMany({});
  console.log(`CompanyMember: ${companyMembers.count} deleted`);

  // Sessions
  const sessions = await prisma.session.deleteMany({});
  console.log(`Session: ${sessions.count} deleted`);

  // Notifications
  const notifs = await prisma.notification.deleteMany({});
  console.log(`Notification: ${notifs.count} deleted`);

  // Subscriptions
  const subs = await prisma.subscription.deleteMany({});
  console.log(`Subscription: ${subs.count} deleted`);

  // Role permission configs (system-defined, but we'll keep them)
  // Skipping: these are usually seed data
  // const rolePerms = await prisma.rolePermissionConfig.deleteMany({});
  // console.log(`RolePermissionConfig: ${rolePerms.count} deleted`);

  // Templates
  const templates = await prisma.template.deleteMany({});
  console.log(`Template: ${templates.count} deleted`);

  // Projects
  const projects = await prisma.project.deleteMany({});
  console.log(`Project: ${projects.count} deleted`);

  // Companies
  const companies = await prisma.company.deleteMany({});
  console.log(`Company: ${companies.count} deleted`);

  // Users — delete all except existing/new gestor
  if (existingGestor) {
    const otherUsers = await prisma.user.deleteMany({
      where: { email: { not: GESTOR_EMAIL } },
    });
    console.log(`User (others): ${otherUsers.count} deleted`);
  } else {
    const allUsers = await prisma.user.deleteMany({});
    console.log(`User (all): ${allUsers.count} deleted`);
  }

  // 4. Create the gestor if it doesn't exist
  if (!existingGestor) {
    console.log(`\n--- Creating gestor ${GESTOR_EMAIL} ---`);
    const hashedPassword = await bcrypt.hash(GESTOR_PASSWORD, 10);
    const gestor = await prisma.user.create({
      data: {
        email: GESTOR_EMAIL,
        name: GESTOR_NAME,
        password: hashedPassword,
        plainPassword: GESTOR_PASSWORD,
        role: 'gestor',
        active: true,
      },
    });
    console.log(`✓ Gestor created (id: ${gestor.id})`);
  } else {
    // Ensure existing gestor has correct password and role
    const hashedPassword = await bcrypt.hash(GESTOR_PASSWORD, 10);
    await prisma.user.update({
      where: { id: existingGestor.id },
      data: {
        password: hashedPassword,
        plainPassword: GESTOR_PASSWORD,
        role: 'gestor',
        active: true,
      },
    });
    console.log(`✓ Gestor password/role updated`);
  }

  // 5. Verify
  console.log('\n=== VERIFICATION ===');
  const after = {
    users: await prisma.user.count(),
    companies: await prisma.company.count(),
    projects: await prisma.project.count(),
    actionItems: await prisma.actionItem.count(),
    zones: await prisma.zone.count(),
    notifications: await prisma.notification.count(),
    auditResults: await prisma.auditResult.count(),
    systemConfig: await prisma.systemConfig.count(),
    rolePermissionConfigs: await prisma.rolePermissionConfig.count(),
  };
  console.log('After cleanup:', after);

  const finalGestor = await prisma.user.findUnique({
    where: { email: GESTOR_EMAIL },
    select: { id: true, email: true, name: true, role: true, active: true },
  });
  console.log('\nFinal gestor:', finalGestor);

  // Test password
  const gestor = await prisma.user.findUnique({ where: { email: GESTOR_EMAIL } });
  const pwdOk = await bcrypt.compare(GESTOR_PASSWORD, gestor.password);
  console.log(`Password "${GESTOR_PASSWORD}" valid:`, pwdOk);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
