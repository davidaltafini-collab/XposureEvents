import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/auth';

export async function POST(request: NextRequest) {
  // Check if user is admin
  const adminStatus = await isAdmin();
  if (!adminStatus) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json(
        { error: 'Ticket code is required' },
        { status: 400 }
      );
    }

    // Find ticket
    const ticket = await prisma.ticket.findUnique({
      where: { code: code.toUpperCase().trim() },
      include: { event: true },
    });

    if (!ticket) {
      return NextResponse.json(
        { error: 'Bilet invalid. Codul nu există în sistem.' },
        { status: 404 }
      );
    }

    // Check if already scanned
    if (ticket.scanned) {
      return NextResponse.json(
        { 
          error: `Bilet deja scanat la ${ticket.scannedAt?.toLocaleString('ro-RO')}.`,
        },
        { status: 400 }
      );
    }

    // Check if event date has passed (optional - you might want to allow early scanning)
    const now = new Date();
    if (ticket.event.date > now) {
      const hoursUntilEvent = Math.floor((ticket.event.date.getTime() - now.getTime()) / (1000 * 60 * 60));
      if (hoursUntilEvent > 24) {
        return NextResponse.json(
          { 
            error: `Evenimentul este programat pentru ${ticket.event.date.toLocaleDateString('ro-RO')}. Check-in permis cu 24h înainte.`,
          },
          { status: 400 }
        );
      }
    }

    // Mark as scanned
    await prisma.ticket.update({
      where: { id: ticket.id },
      data: {
        scanned: true,
        scannedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      ticket: {
        eventTitle: ticket.event.title,
        eventDate: ticket.event.date,
        name: ticket.name,
        email: ticket.email,
        phone: ticket.phone,
        quantity: ticket.quantity,
        totalAmount: ticket.totalAmount,
      },
    });
  } catch (error) {
    console.error('Ticket validation error:', error);
    return NextResponse.json(
      { error: 'Failed to validate ticket' },
      { status: 500 }
    );
  }
}
