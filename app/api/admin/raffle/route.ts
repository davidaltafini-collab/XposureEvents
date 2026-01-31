import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { eventId, action } = await req.json();

    if (!eventId || !action) {
      return NextResponse.json({ error: 'Event ID and action are required' }, { status: 400 });
    }

    // Luăm DOAR biletele plătite (status PAID)
    // Dacă ai date vechi fără status, poți adăuga o condiție OR (stripePaymentId not null)
    const paidTickets = await prisma.ticket.findMany({
      where: {
        eventId: eventId,
        paymentStatus: 'PAID', 
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    if (paidTickets.length === 0) {
      return NextResponse.json({ message: 'Nu există participanți validați (plătiți) pentru acest eveniment.' }, { status: 404 });
    }

    let result = null;

    switch (action) {
      case 'list':
        // Returnează lista simplă curată
        result = paidTickets.map(t => ({
          name: t.name,
          email: t.email,
          phone: t.phone,
          quantity: t.quantity,
          ticketCode: t.code,
          purchasedAt: t.createdAt
        }));
        break;

      case 'random':
        // Extragere random ponderată? (daca ai 5 bilete, ai 5 sanse?) 
        // Aici fac o extragere simplă per tranzacție (un om = o șansă, indiferent de nr bilete)
        // Dacă vrei per bilet, logica se complică puțin.
        const randomIndex = Math.floor(Math.random() * paidTickets.length);
        result = paidTickets[randomIndex];
        break;

      case 'first':
        // Primul care a cumpărat (deja sunt ordonate asc după dată)
        result = paidTickets[0];
        break;

      case 'top_buyer':
        // Cine a cumpărat cele mai multe bilete (sumarizat pe email)
        const buyersMap = new Map();
        
        paidTickets.forEach(ticket => {
          const currentQty = buyersMap.get(ticket.email)?.quantity || 0;
          buyersMap.set(ticket.email, {
            ...ticket,
            quantity: currentQty + ticket.quantity
          });
        });

        // Convertim la array și sortăm
        const sortedBuyers = Array.from(buyersMap.values()).sort((a, b) => b.quantity - a.quantity);
        result = sortedBuyers[0]; // Cel cu cele mai multe bilete
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