import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { apiResponse, apiError } from '@/lib/api';

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> } // Params is a Promise in Next.js 15+
) {
    try {
        const { id } = await params;

        // Delete the Player (Cascade should handle User/Stats if configured, but let's be safe)
        // Actually schema says: User -> Player (Player has userId). 
        // If we delete Player, User remains? Ideally we delete User which cascades to Player.
        // Let's find the player first to get userId.

        const player = await prisma.player.findUnique({
            where: { id },
            select: { userId: true }
        });

        if (!player) return apiError('Player not found', 404);

        // Delete the USER, which cascades to delete the PLAYER
        await prisma.user.delete({
            where: { id: player.userId }
        });

        return apiResponse(null, 'Player deleted successfully');
    } catch (error: any) {
        return apiError(error.message, 500);
    }
}
