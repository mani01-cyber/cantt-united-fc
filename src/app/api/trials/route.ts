import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { apiResponse, apiError } from '@/lib/api';
import { trialSchema } from '@/lib/validations';
import { sendEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = trialSchema.parse(body);

    const trial = await prisma.trial.create({
      data: validatedData,
    });

    // Send Notification Email
    await sendEmail({
      to: process.env.NOTIFICATION_EMAIL || 'malik.suleman.co@gmail.com',
      subject: `New Trial Registration: ${validatedData.fullName}`,
      text: `A new player has registered for trials!\n\nName: ${validatedData.fullName}\nAge: ${validatedData.age}\nPosition: ${validatedData.position}\nPhone: ${validatedData.phone}\nEmail: ${validatedData.email}`,
      html: `
        <h3>New Trial Registration</h3>
        <p>A new player has registered for trials!</p>
        <p><strong>Name:</strong> ${validatedData.fullName}</p>
        <p><strong>Age:</strong> ${validatedData.age}</p>
        <p><strong>Position:</strong> ${validatedData.position}</p>
        <p><strong>Phone:</strong> ${validatedData.phone}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
      `,
    }).catch((err: any) => console.error('Failed to send trial registration email:', err));

    return apiResponse(trial, 'Trial registration successful', 201);
  } catch (error: any) {
    console.error('Trial Registration API Error:', error);
    return apiError(error.message || 'Registration failed', 400);
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
