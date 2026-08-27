const path = require('path');

// Load dotenv and ensure DATABASE_URL is set correctly
const result = require('dotenv').config({ path: path.resolve('.env') });
if (result.parsed?.DATABASE_URL) {
  process.env.DATABASE_URL = result.parsed.DATABASE_URL;
}

const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

async function main() {
  try {
    console.log('Connected to database successfully!\n');
    
    const users = await db.user.findMany({
      select: { id: true, name: true, email: true, role: true, active: true },
      orderBy: { name: 'asc' },
      take: 20
    });
    console.log('=== USERS (' + users.length + ') ===');
    console.log(JSON.stringify(users, null, 2));
    
    const companies = await db.company.findMany({
      select: { id: true, name: true, active: true },
      orderBy: { name: 'asc' }
    });
    console.log('\n=== COMPANIES (' + companies.length + ') ===');
    console.log(JSON.stringify(companies, null, 2));
    
    // Try to get company members without include first
    const companyMembersRaw = await db.companyMember.findMany({
      take: 5
    });
    console.log('\n=== COMPANY MEMBERS RAW (first 5) ===');
    console.log(JSON.stringify(companyMembersRaw, null, 2));
    
    // Now try with proper include syntax based on schema
    const companyMembers = await db.companyMember.findMany({
      include: {
        User: { 
          select: { id: true, name: true, email: true, role: true } 
        },
        Company: { 
          select: { id: true, name: true } 
        },
      },
      orderBy: { joinedAt: 'desc' },
      take: 30
    });
    console.log('\n=== COMPANY MEMBERS (' + companyMembers.length + ') ===');
    console.log(JSON.stringify(companyMembers, null, 2));
    
    // Check projects too
    const projects = await db.project.findMany({
      select: { id: true, name: true, companyId: true, active: true },
      orderBy: { name: 'asc' }
    });
    console.log('\n=== PROJECTS (' + projects.length + ') ===');
    console.log(JSON.stringify(projects, null, 2));
    
  } catch (e) {
    console.error('Error:', e.message);
  } finally {
    await db.$disconnect();
  }
}

main();
