import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { apiResponse, apiError } from '@/lib/api';

export async function GET(request: NextRequest) {
  try {
    const nextFixture = await prisma.fixture.findFirst({
      where: {
        date: {
          gte: new Date(),
        },
      },
      orderBy: {
        date: 'asc',
      },
    });

    if (!nextFixture) {
      return apiError('No upcoming fixtures found', 404);
    }

    return apiResponse(nextFixture, 'Next fixture retrieved successfully');
  } catch (error: any) {
    return apiError(error.message, 500);
  }
}
