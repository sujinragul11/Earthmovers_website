import { prisma } from './config/prisma.js';

async function checkUsers() {
  try {
    const users = await prisma.user.findMany();
    console.log('Users in database:', users);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUsers();