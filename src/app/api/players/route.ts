import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { apiResponse, apiError } from '@/lib/api';
import bcrypt from 'bcryptjs';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const position = searchParams.get('position');

    const where: any = position ? { position: position as any } : {};

    const players = await prisma.player.findMany({
      where,
      include: {
        stats: true,
        user: true,
      },
      orderBy: {
        jerseyNumber: 'asc',
      },
    });

    return apiResponse(players, 'Players retrieved successfully');
  } catch (error: any) {
    return apiError(error.message, 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, jerseyNumber, position, nationality, age, photo } = body;

    // Validations
    if (!name || !email || !jerseyNumber || !position) {
      return apiError('Missing required fields', 400);
    }

    // Default password for players created by admin
    const hashedPassword = await bcrypt.hash('player123', 10);

    // Calculate rough DOB from age (optional simplification)
    const dateOfBirth = new Date();
    dateOfBirth.setFullYear(dateOfBirth.getFullYear() - (age || 20));

    // Transaction: Create User -> Create Player -> Create Stats
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          role: 'PLAYER'
        }
      });

      const player = await tx.player.create({
        data: {
          userId: user.id,
          name,
          jerseyNumber: parseInt(jerseyNumber),
          position: position as any,
          nationality: nationality || 'Pakistan',
          dateOfBirth: dateOfBirth,
          photo: photo || '/player1.jpg', // Use provided photo or default
        }
      });

      await tx.stats.create({
        data: { playerId: player.id }
      });

      return player;
    });

    return apiResponse(result, 'Player created successfully', 201);
  } catch (error: any) {
    if (error.code === 'P2002') return apiError('Email or Jersey Number already exists', 409);
    return apiError(error.message, 500);
  }
}
