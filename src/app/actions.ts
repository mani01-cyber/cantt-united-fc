"use server";

import { PrismaClient } from "@prisma/client";

// Global Prisma instance to prevent hitting connection limits
const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// 1. Fetch upcoming fixture
export async function getUpcomingFixture() {
    try {
        const fixture = await prisma.fixture.findFirst({
            where: { isActive: true }
        });
        return { success: true, data: fixture };
    } catch (error) {
        console.error("Failed to fetch fixture:", error);
        return { success: false, error: "Failed to fetch fixture" };
    }
}

// 2. Update fixture details (Admin)
export async function updateUpcomingFixture(data: {
    opponent: string;
    type: string;
    date: string;
    time: string;
    venue: string;
}) {
    try {
        let active = await prisma.fixture.findFirst({ where: { isActive: true } });
        if (active) {
            await prisma.fixture.update({
                where: { id: active.id },
                data,
            });
        } else {
            await prisma.fixture.create({
                data: { ...data, isActive: true },
            });
        }
        return { success: true };
    } catch (error) {
        console.error("Update fixture failed:", error);
        return { success: false, error: "Failed to update fixture" };
    }
}

// 3. Simple Admin Login authentication
export async function authenticateLogin(email: string, pass: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });
        // Check against standard admin credentials seeded
        if (user && user.password === pass) {
            return { success: true, name: user.name, id: user.id };
        }
        return { success: false, error: "Invalid credentials" };
    } catch (error) {
        console.error("Login failed:", error);
        return { success: false, error: "Login failed" };
    }
}
