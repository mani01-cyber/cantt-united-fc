import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { apiResponse, apiError } from '@/lib/api';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, role } = await request.json();

    // Validate input
    if (!email || !password || !name) {
      return apiError('Missing required fields', 400);
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return apiError('Email already in use', 400);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: role || 'FAN',
      },
    });

    return apiResponse(
      { id: user.id, email: user.email, role: user.role },
      'User registered successfully',
      201
    );
  } catch (error: any) {
    console.error('Registration error:', error);
    return apiError(error.message || 'Registration failed', 500);
  }
}
