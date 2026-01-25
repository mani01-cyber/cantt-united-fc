import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@unitedfc.pk" },
    update: {},
    create: {
      email: "admin@unitedfc.pk",
      password: adminPassword,
      role: "ADMIN",
      admin: {
        create: {
          name: "Admin User",
          role: "MANAGER",
        },
      },
    },
  });

  console.log("✓ Admin user created:", admin.email);

  // Create player users
  const playerPassword = await bcrypt.hash("player123", 10);
  const player1 = await prisma.user.upsert({
    where: { email: "player1@unitedfc.pk" },
    update: {},
    create: {
      email: "player1@unitedfc.pk",
      password: playerPassword,
      role: "PLAYER",
      player: {
        create: {
          name: "Ali Khan",
          jerseyNumber: 10,
          position: "STRIKER",
          dateOfBirth: new Date("2000-01-15"),
          nationality: "Pakistan",
          bio: "Dynamic striker with excellent finishing skills",
        },
      },
    },
  });

  console.log("✓ Player 1 created:", player1.email);

  // Create fixtures
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 7);

  const fixture1 = await prisma.fixture.create({
    data: {
      opponent: "Lahore City FC",
      date: futureDate,
      time: "15:00",
      venue: "United Stadium, Lahore",
    },
  });

  console.log("✓ Fixture created:", fixture1.opponent);

  // Create training session
  const trainingDate = new Date();
  trainingDate.setDate(trainingDate.getDate() + 1);

  const training = await prisma.training.create({
    data: {
      date: trainingDate,
      startTime: "14:00",
      endTime: "16:00",
      location: "United Stadium Training Ground",
      notes: "Technical session focused on set pieces",
    },
  });

  console.log("✓ Training created");

  // Create news
  const news = await prisma.news.create({
    data: {
      title: "United FC Announced Squad for Upcoming Season",
      slug: "united-fc-squad-announcement",
      content: "We are excited to announce our squad for the upcoming season...",
      published: true,
    },
  });

  console.log("✓ News created:", news.title);

  // Create announcement
  const announcement = await prisma.announcement.create({
    data: {
      title: "Practice Update",
      content: "All training sessions will be held at the main stadium this week.",
    },
  });

  console.log("✓ Announcement created");

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
