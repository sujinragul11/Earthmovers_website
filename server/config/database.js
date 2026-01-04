import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('✅ PostgreSQL connected via Prisma');
    
    // Create default admin user if not exists
    await createDefaultAdmin();
    
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
};

const createDefaultAdmin = async () => {
  try {
    const adminExists = await prisma.user.findUnique({
      where: { email: process.env.ADMIN_EMAIL }
    });

    if (!adminExists) {
      const bcrypt = await import('bcryptjs');
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      
      await prisma.user.create({
        data: {
          name: process.env.ADMIN_NAME,
          email: process.env.ADMIN_EMAIL,
          phone: process.env.ADMIN_PHONE,
          password: hashedPassword,
          role: 'SUPERADMIN',
          isActive: true
        }
      });
      console.log('✅ Default admin user created');
    }
  } catch (error) {
    console.error('❌ Error creating default admin:', error);
  }
};

export default prisma;