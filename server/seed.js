import prisma from './prisma.js';
import bcrypt from 'bcryptjs';

async function seed() {
  try {
    console.log('Seeding database...');

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);

    const admin = await prisma.user.upsert({
      where: { email: 'admin@earthmovers.com' },
      update: {},
      create: {
        name: 'Super Admin',
        email: 'admin@earthmovers.com',
        password: hashedPassword,
        role: 'SUPERADMIN',
        isActive: true
      }
    });

    console.log('Admin user created:', admin.email);

    // Create some sample contacts
    const contacts = [
      {
        name: 'Rajesh Kumar',
        email: 'rajesh@construction.com',
        phone: '+91 98765 43210',
        company: 'RK Constructions',
        subject: 'Excavator Rental Inquiry',
        message: 'Need 2 JCB excavators for 30 days for road construction project.',
        source: 'WEBSITE',
        status: 'NEW'
      },
      {
        name: 'Priya Sharma',
        email: 'priya@sharmabuilders.com',
        phone: '+91 87654 32109',
        company: 'Sharma Builders',
        subject: 'Loader and Tipper Rental',
        message: 'Looking for 3 loaders and 5 tippers for 6 months for township project.',
        source: 'WEBSITE',
        status: 'CONTACTED'
      }
    ];

    for (const contact of contacts) {
      await prisma.contact.create({
        data: contact
      });
    }

    console.log('Sample contacts created');

    // Create some sample equipment
    const equipments = [
      {
        name: 'JCB 3CX Excavator',
        slug: 'jcb-3cx-excavator',
        category: 'EXCAVATOR',
        units: 3,
        available: 3,
        hourlyRate: 250.00,
        dailyRate: 2500.00,
        weeklyRate: 15000.00,
        monthlyRate: 50000.00,
        operatorBata: 500.00,
        minHours: 4,
        fuelPerHour: 50.00,
        specs: {
          bucketCapacity: '0.3 m³',
          maxDigDepth: '4.5m',
          enginePower: '55 HP',
          weight: '8.5 tons'
        },
        features: ['Backhoe Loader', '4WD', 'AC Cabin', 'Quick Coupler'],
        description: 'Versatile backhoe loader perfect for excavation, loading, and material handling.',
        isFeatured: true,
        isActive: true
      },
      {
        name: 'Caterpillar 950H Loader',
        slug: 'caterpillar-950h-loader',
        category: 'LOADER',
        units: 2,
        available: 2,
        hourlyRate: 350.00,
        dailyRate: 3500.00,
        weeklyRate: 21000.00,
        monthlyRate: 70000.00,
        operatorBata: 600.00,
        minHours: 4,
        fuelPerHour: 75.00,
        specs: {
          bucketCapacity: '2.5 m³',
          enginePower: '180 HP',
          weight: '18 tons',
          dumpHeight: '3.2m'
        },
        features: ['High Lift', 'Ride Control', 'Auto Shift', 'Payload Meter'],
        description: 'Heavy-duty wheel loader for bulk material handling and loading operations.',
        isFeatured: true,
        isActive: true
      },
      {
        name: 'Tata 10 Ton Tipper',
        slug: 'tata-10-ton-tipper',
        category: 'TRUCK',
        units: 5,
        available: 4,
        hourlyRate: 150.00,
        dailyRate: 1500.00,
        weeklyRate: 9000.00,
        monthlyRate: 30000.00,
        operatorBata: 400.00,
        minHours: 4,
        fuelPerHour: 40.00,
        specs: {
          capacity: '10 tons',
          enginePower: '140 HP',
          boxDimensions: '5.5m x 2.3m x 1.2m'
        },
        features: ['Power Steering', 'Hydraulic Tipping', 'Alloy Wheels'],
        description: 'Reliable tipper truck for transportation of construction materials.',
        isFeatured: false,
        isActive: true
      }
    ];

    for (const equipment of equipments) {
      await prisma.equipment.create({
        data: equipment
      });
    }

    console.log('Sample equipment created');

    console.log('Seeding completed!');
  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();