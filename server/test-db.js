import prisma from './prisma.js';

async function testConnection() {
  try {
    // Test connection
    await prisma.$connect();
    console.log('✅ Database connected successfully!');

    // Check if tables exist by trying to count
    const userCount = await prisma.user.count();
    console.log(`📊 Users table exists, current count: ${userCount}`);

    const contactCount = await prisma.contact.count();
    console.log(`📊 Contacts table exists, current count: ${contactCount}`);

    console.log('🎉 All tables created successfully!');
  } catch (error) {
    console.error('❌ Database connection or table check failed:', error.message);
    console.log('💡 Make sure PostgreSQL is running and the database exists');
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();