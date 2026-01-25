import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { apiResponse, apiError } from '@/lib/api';

export async function GET() {
    try {
        const fixtures = await prisma.fixture.findMany({
            orderBy: { date: 'asc' }
        });
        return apiResponse(fixtures, 'Fixtures retrieved successfully');
    } catch (error: any) {
        return apiError(error.message, 500);
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { opponent, date, time, venue, homeTeam } = body;

        if (!opponent || !date || !time) {
            return apiError('Missing required fields', 400);
        }

        const fixture = await prisma.fixture.create({
            data: {
                opponent,
                date: new Date(date),
                time,
                venue: venue || 'Home Stadium',
                homeTeam: homeTeam || 'United FC'
            }
        });

        return apiResponse(fixture, 'Fixture created successfully', 201);
    } catch (error: any) {
        return apiError(error.message, 500);
    }
}
