/**
 * Seed Script pentru Admin
 * 
 * Rulează acest script pentru a crea/actualiza admin-ul:
 * npx tsx prisma/seed-admin.ts
 * 
 * Setează variabilele în .env:
 * ADMIN_USERNAME=admin
 * ADMIN_PASSWORD=Admin123!
 */

import { createAdmin } from '../lib/auth';

async function main() {
  console.log('🌱 Seeding admin user...');
  
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  
  try {
    const admin = await createAdmin(username, password);
    
    console.log('✅ Admin user created/updated successfully!');
    console.log('📝 Username:', admin.username);
    console.log('🔐 Password:', password);
    console.log('⚠️  IMPORTANT: Change the password in production!');
  } catch (error) {
    console.error('❌ Error seeding admin:', error);
    process.exit(1);
  }
}

main()
  .then(() => {
    console.log('✨ Seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
