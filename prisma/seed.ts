import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database (Admin & Fixture Only)...");

  // 1. Create Admin
  const admin = await prisma.user.upsert({
    where: { email: "admin@united.com" },
    update: {},
    create: {
      email: "admin@united.com",
      password: "admin", // Simple password for demo
      name: "Admin User",
    },
  });
  console.log("Admin created:", admin.email);

  // 2. Create Initial Fixture
  // First clear old fixtures if any to start fresh
  await prisma.fixture.deleteMany({});

  const initialFixture = await prisma.fixture.create({
    data: {
      opponent: "City Strikers FC",
      date: "2026-10-15",
      time: "14:00",
      venue: "Main Stadium, Jinnah Park",
      type: "League Match",
      isActive: true,
    }
  });
  console.log("Initial fixture created:", initialFixture.opponent);

  console.log("\n✅ Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
