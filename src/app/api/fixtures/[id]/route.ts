import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { apiResponse, apiError } from '@/lib/api';

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.fixture.delete({
            where: { id }
        });
        return apiResponse(null, 'Fixture deleted successfully');
    } catch (error: any) {
        return apiError(error.message, 500);
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { homeScore, awayScore } = body;

        const fixture = await prisma.fixture.update({
            where: { id },
            data: {
                homeScore: homeScore !== undefined ? parseInt(homeScore) : undefined,
                awayScore: awayScore !== undefined ? parseInt(awayScore) : undefined
            }
        });

        return apiResponse(fixture, 'Fixture updated successfully');
    } catch (error: any) {
        return apiError(error.message, 500);
    }
}
