import { NextRequest } from 'next/server';
import { apiResponse, apiError } from '@/lib/api';
import { contactSchema } from '@/lib/validations';
import { sendEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate input
        const validatedData = contactSchema.parse(body);

        // Send Email
        const emailResult = await sendEmail({
            to: process.env.NOTIFICATION_EMAIL || 'malik.suleman.co@gmail.com',
            subject: `New Contact Form Submission: ${validatedData.subject}`,
            text: `Name: ${validatedData.name}\nEmail: ${validatedData.email}\nSubject: ${validatedData.subject}\n\nMessage:\n${validatedData.message}`,
            html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Subject:</strong> ${validatedData.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${validatedData.message.replace(/\n/g, '<br>')}</p>
      `,
        });

        if (!emailResult.success) {
            console.error('Failed to send contact email:', emailResult.error);
            // We still return success to the user but log the error
        }

        return apiResponse(null, 'Your message has been sent successfully', 200);
    } catch (error: any) {
        if (error.name === 'ZodError') {
            return apiError('Invalid input data', 400);
        }
        return apiError(error.message || 'Internal Server Error', 500);
    }
}
