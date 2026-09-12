const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.user.count();
  if (existing > 0) {
    console.log('Seed already exists.');
    return;
  }

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@cityrides.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';

  const admin = await prisma.user.create({
    data: {
      name: 'City Rides Admin',
      email: adminEmail,
      passwordHash: await bcrypt.hash(adminPassword, 10),
      role: 'ADMIN',
      phone: '+1 555 010 1234',
      address: '45 Downtown Ave, New York',
      isActive: true,
    },
  });

  const customer1 = await prisma.user.create({
    data: {
      name: 'Ava Johnson',
      email: 'ava@example.com',
      passwordHash: await bcrypt.hash('Password123', 10),
      phone: '+1 555 010 9999',
      address: '12 Skyline Lane, Austin',
      drivingLicense: 'TX-402901',
      role: 'CUSTOMER',
      isActive: true,
    },
  });

  const customer2 = await prisma.user.create({
    data: {
      name: 'Leo Martinez',
      email: 'leo@example.com',
      passwordHash: await bcrypt.hash('Password123', 10),
      phone: '+1 555 011 4567',
      address: '36 Harbor St, Miami',
      drivingLicense: 'FL-560194',
      role: 'CUSTOMER',
      isActive: true,
    },
  });

  const locations = await prisma.location.createMany({
    data: [
      { name: 'Downtown Hub', city: 'New York', address: '5 Broadway St', type: 'pickup' },
      { name: 'Airport Terminal', city: 'New York', address: 'JFK Terminal 4', type: 'pickup' },
      { name: 'Beachfront Spot', city: 'Miami', address: '250 Ocean Dr', type: 'pickup' },
      { name: 'City Center', city: 'Austin', address: '404 Congress Ave', type: 'return' },
      { name: 'Airport Return', city: 'Austin', address: 'AUS Terminal A', type: 'return' },
    ],
  });

  const locs = await prisma.location.findMany();

  const carsData = [
    {
      brand: 'BMW', model: '3 Series', variant: '330i', year: 2024, plateNumber: 'BMW-201', description: 'Sporty executive sedan with premium comfort.', dailyPrice: 95, weeklyPrice: 600, monthlyPrice: 2100, securityDeposit: 350, fuelType: 'Petrol', transmission: 'Automatic', seats: 5, mileage: 12000, features: 'Leather seats, sunroof, lane assist, ambient lighting', status: 'AVAILABLE', availability: true, locationId: locs[0]?.id, images: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80','https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80']
    },
    {
      brand: 'Mercedes', model: 'C-Class', variant: 'C 250', year: 2023, plateNumber: 'MRC-312', description: 'Elegant luxury sedan for business and leisure trips.', dailyPrice: 105, weeklyPrice: 650, monthlyPrice: 2200, securityDeposit: 380, fuelType: 'Diesel', transmission: 'Automatic', seats: 5, mileage: 18000, features: 'Adaptive cruise, digital cockpit, keyless entry', status: 'AVAILABLE', availability: true, locationId: locs[1]?.id, images: ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80','https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1200&q=80']
    },
    {
      brand: 'Audi', model: 'Q5', variant: 'Premium Plus', year: 2024, plateNumber: 'AUD-451', description: 'Sophisticated SUV with ample cabin space.', dailyPrice: 120, weeklyPrice: 720, monthlyPrice: 2500, securityDeposit: 420, fuelType: 'Petrol', transmission: 'Automatic', seats: 5, mileage: 9000, features: 'Panoramic roof, all-wheel drive, parking sensors', status: 'AVAILABLE', availability: true, locationId: locs[2]?.id, images: ['https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80','https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=80']
    },
    {
      brand: 'Tesla', model: 'Model 3', variant: 'Long Range', year: 2024, plateNumber: 'TSL-722', description: 'Electric performance with zero-emission driving.', dailyPrice: 110, weeklyPrice: 700, monthlyPrice: 2400, securityDeposit: 400, fuelType: 'Electric', transmission: 'Automatic', seats: 5, mileage: 15000, features: 'Autopilot, fast charging, dual motor, panoramic glass roof', status: 'AVAILABLE', availability: true, locationId: locs[0]?.id, images: ['https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80','https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80']
    },
    {
      brand: 'Porsche', model: 'Cayenne', variant: 'S', year: 2023, plateNumber: 'POR-902', description: 'Luxury SUV built for comfort and speed.', dailyPrice: 170, weeklyPrice: 1000, monthlyPrice: 3300, securityDeposit: 600, fuelType: 'Petrol', transmission: 'Automatic', seats: 5, mileage: 14000, features: 'Adaptive suspension, premium audio, leather trim', status: 'AVAILABLE', availability: true, locationId: locs[1]?.id, images: ['https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80','https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=1200&q=80']
    },
    {
      brand: 'Range Rover', model: 'Velar', variant: 'R-Dynamic', year: 2024, plateNumber: 'RRV-316', description: 'Urban luxury with exceptional ride comfort.', dailyPrice: 160, weeklyPrice: 980, monthlyPrice: 3050, securityDeposit: 550, fuelType: 'Diesel', transmission: 'Automatic', seats: 5, mileage: 12000, features: '360 camera, heated seats, premium leather', status: 'AVAILABLE', availability: true, locationId: locs[2]?.id, images: ['https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1200&q=80','https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=80']
    },
    {
      brand: 'Honda', model: 'CR-V', variant: 'EX-L', year: 2022, plateNumber: 'HND-501', description: 'Reliable SUV with family-focused comfort.', dailyPrice: 88, weeklyPrice: 560, monthlyPrice: 1900, securityDeposit: 300, fuelType: 'Petrol', transmission: 'Automatic', seats: 5, mileage: 22000, features: 'Rear camera, adaptive cruise, spacious cargo', status: 'AVAILABLE', availability: true, locationId: locs[3]?.id, images: ['https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80','https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80']
    },
    {
      brand: 'Volkswagen', model: 'Golf GTI', variant: 'Performance', year: 2024, plateNumber: 'VWG-806', description: 'Hot hatch with agile handling and sporty design.', dailyPrice: 92, weeklyPrice: 590, monthlyPrice: 2000, securityDeposit: 320, fuelType: 'Petrol', transmission: 'Manual', seats: 5, mileage: 10000, features: 'Sport seats, digital cluster, dynamic drive mode', status: 'AVAILABLE', availability: true, locationId: locs[4]?.id, images: ['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80','https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1200&q=80']
    },
    {
      brand: 'Ford', model: 'Mustang', variant: 'EcoBoost', year: 2024, plateNumber: 'FRD-678', description: 'Classic American coupe with thrilling performance.', dailyPrice: 130, weeklyPrice: 790, monthlyPrice: 2700, securityDeposit: 450, fuelType: 'Petrol', transmission: 'Automatic', seats: 4, mileage: 8500, features: 'Sport steering wheel, active safety, performance exhaust', status: 'AVAILABLE', availability: true, locationId: locs[0]?.id, images: ['https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80','https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80']
    },
    {
      brand: 'Jeep', model: 'Wrangler', variant: 'Sport', year: 2023, plateNumber: 'JEP-214', description: 'Off-road capable SUV for adventurous drives.', dailyPrice: 118, weeklyPrice: 740, monthlyPrice: 2550, securityDeposit: 430, fuelType: 'Petrol', transmission: 'Automatic', seats: 5, mileage: 26000, features: 'Trail rails, removable roof, rugged tires', status: 'AVAILABLE', availability: true, locationId: locs[2]?.id, images: ['https://images.unsplash.com/photo-1523983388277-336a8f7f2f8e?auto=format&fit=crop&w=1200&q=80','https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1200&q=80']
    },
  ];

  for (const car of carsData) {
    const created = await prisma.car.create({
      data: {
        ...car,
        features: car.features,
        images: {
          create: car.images.map((url) => ({ url })),
        },
      },
    });

    await prisma.booking.create({
      data: {
        userId: customer1.id,
        carId: created.id,
        pickupLocationId: locs[0]?.id,
        returnLocationId: locs[3]?.id,
        pickupDateTime: new Date(Date.now() + 86400000),
        returnDateTime: new Date(Date.now() + 3 * 86400000),
        rentalDays: 3,
        subtotal: created.dailyPrice * 3,
        taxes: created.dailyPrice * 3 * 0.1,
        additionalCharges: 25,
        deposit: created.securityDeposit,
        discount: 0,
        total: created.dailyPrice * 3 + created.dailyPrice * 3 * 0.1 + 25 + created.securityDeposit,
        status: 'CONFIRMED',
        paymentStatus: 'SUCCESSFUL',
      },
    });
  }

  const settings = await prisma.businessSettings.create({
    data: {
      businessName: 'City Rides',
      email: 'hello@cityrides.com',
      phone: '+1 555 010 9999',
      address: '135 Market Street, New York, NY',
      taxPercentage: 10,
      currency: 'USD',
      cancellationPolicy: 'Free cancellation up to 48 hours before pickup.',
      bookingRules: 'Driver must be 21+ and hold a valid license. ID check required.',
      pickupLocations: 'Downtown Hub, Airport Terminal, Beachfront Spot',
      returnLocations: 'City Center, Airport Return',
    },
  });

  await prisma.coupon.create({
    data: { code: 'SUMMER10', discount: 10, active: true },
  });

  console.log({ admin: admin.email, customer1: customer1.email, customer2: customer2.email, settings });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
