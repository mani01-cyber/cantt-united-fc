import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { apiResponse, apiError } from '@/lib/api';
import { trialSchema } from '@/lib/validations';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = trialSchema.parse(body);

    const trial = await prisma.trial.create({
      data: validatedData,
    });

    return apiResponse(trial, 'Trial registration successful', 201);
  } catch (error: any) {
    return apiError(error.message, 400);
  }
}

export async function GET(request: NextRequest) {
  try {
    const trials = await prisma.trial.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return apiResponse(trials, 'Trials retrieved successfully');
  } catch (error: any) {
    return apiError(error.message, 500);
  }
}
