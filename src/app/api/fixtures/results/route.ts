import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { apiResponse, apiError } from '@/lib/api';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') || '10';

    const results = await prisma.fixture.findMany({
      where: {
        date: {
          lt: new Date(),
        },
        homeScore: {
          not: null,
        },
      },
      orderBy: {
        date: 'desc',
      },
      take: parseInt(limit),
    });

    return apiResponse(results, 'Results retrieved successfully');
  } catch (error: any) {
    return apiError(error.message, 500);
  }
}
