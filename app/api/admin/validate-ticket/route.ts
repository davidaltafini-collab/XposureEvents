import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/auth';

export async function POST(request: NextRequest) {
  // 1) Check admin
  const adminStatus = await isAdmin();
  if (!adminStatus) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => null);
    const rawCode = body?.code;

    if (!rawCode || typeof rawCode !== 'string') {
      return NextResponse.json({ error: 'Ticket code is required' }, { status: 400 });
    }

    const code = rawCode.toUpperCase().trim();

    // 2) Find ticket (include event)
    const ticket = await prisma.ticket.findUnique({
      where: { code },
      include: { event: true },
    });

    if (!ticket) {
      return NextResponse.json(
        { error: 'Bilet invalid. Codul nu există în sistem.' },
        { status: 404 }
      );
    }

    // 3) Event timing rule (optional)
    const now = new Date();
    if (ticket.event.date > now) {
      const hoursUntilEvent = Math.floor(
        (ticket.event.date.getTime() - now.getTime()) / (1000 * 60 * 60)
      );

      if (hoursUntilEvent > 24) {
        return NextResponse.json(
          {
            error: `Evenimentul este programat pentru ${ticket.event.date.toISOString().slice(0, 10)}. Check-in permis cu 24h înainte.`,
          },
          { status: 400 }
        );
      }
    }

    // 4) Atomic mark as scanned (prevenim double-scan)
    // Dacă ticket.scanned e deja true, updateMany va afecta 0 rânduri.
    const updateResult = await prisma.ticket.updateMany({
      where: {
        id: ticket.id,
        scanned: false,
      },
      data: {
        scanned: true,
        scannedAt: new Date(),
      },
    });

    if (updateResult.count === 0) {
      // Era deja scanat (sau a fost scanat între timp)
      const scannedAt = ticket.scannedAt
        ? ticket.scannedAt.toISOString()
        : null;

      return NextResponse.json(
        {
          error: scannedAt
            ? `Bilet deja scanat la ${scannedAt}.`
            : 'Bilet deja scanat.',
        },
        { status: 400 }
      );
    }

    // 5) Return payload safe (Date -> string)
    return NextResponse.json({
      success: true,
      ticket: {
        eventTitle: ticket.event.title,
        eventDate: ticket.event.date.toISOString(),
        name: ticket.name,
        email: ticket.email,
        phone: ticket.phone,
        quantity: ticket.quantity,
        totalAmount: ticket.totalAmount,
      },
    });
  } catch (error) {
    console.error('Ticket validation error:', error);
    return NextResponse.json({ error: 'Failed to validate ticket' }, { status: 500 });
  }
}
