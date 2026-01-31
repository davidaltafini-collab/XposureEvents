import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { eventId, action } = await req.json();

    if (!action) {
      return NextResponse.json({ error: 'Action is required' }, { status: 400 });
    }

    // Construim filtrul dinamic
    // Dacă avem eventId și nu e "all", filtrăm după el. Altfel, luăm tot ce e PAID.
    const whereClause: any = {
      paymentStatus: 'PAID',
    };

    if (eventId && eventId !== 'all') {
      whereClause.eventId = eventId;
    }

    // Luăm biletele
    const paidTickets = await prisma.ticket.findMany({
      where: whereClause,
      include: {
        event: true, // Includem și info despre eveniment ca să știm de unde au cumpărat
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    if (paidTickets.length === 0) {
      return NextResponse.json({ message: 'Nu există participanți validați.' }, { status: 404 });
    }

    let result = null;

    switch (action) {
      case 'list':
        result = paidTickets.map(t => ({
          name: t.name,
          email: t.email,
          phone: t.phone,
          quantity: t.quantity,
          ticketCode: t.code,
          eventName: t.event.title, // Arătăm și de la ce eveniment e
          purchasedAt: t.createdAt
        }));
        break;

      case 'random':
        const randomIndex = Math.floor(Math.random() * paidTickets.length);
        const winner = paidTickets[randomIndex];
        result = {
            ...winner,
            eventName: winner.event.title
        };
        break;

      case 'top_buyer':
        const buyersMap = new Map();
        
        paidTickets.forEach(ticket => {
          const currentData = buyersMap.get(ticket.email);
          const currentQty = currentData?.quantity || 0;
          
          buyersMap.set(ticket.email, {
            ...ticket,
            eventName: currentData ? 'Multiple Events' : ticket.event.title, // Dacă apare de mai multe ori
            quantity: currentQty + ticket.quantity
          });
        });

        const sortedBuyers = Array.from(buyersMap.values()).sort((a, b) => b.quantity - a.quantity);
        result = sortedBuyers[0];
        break;

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    return NextResponse.json({ data: result });

  } catch (error) {
    console.error('Raffle error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}