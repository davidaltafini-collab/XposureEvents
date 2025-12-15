import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { generateTicketCode, parsePriceToNumber } from '@/lib/utils';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(request: NextRequest) {
  try {
    const { eventId, quantity, name, email, phone } = await request.json();

    // Validate input
    if (!eventId || !quantity || !name || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get event
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    // Check availability
    const availableTickets = event.capacity - event.soldCount;
    if (quantity > availableTickets) {
      return NextResponse.json(
        { error: 'Not enough tickets available' },
        { status: 400 }
      );
    }

    // Generate unique ticket code
    const ticketCode = generateTicketCode(16);

    // Calculate price
    const priceAmount = parsePriceToNumber(event.price);
    const totalAmount = priceAmount * quantity;

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'ron',
            product_data: {
              name: event.title,
              description: `${quantity} x Bilet ${event.title}`,
              images: event.imagePath ? [event.imagePath] : [],
            },
            unit_amount: priceAmount * 100, // Stripe uses cents
          },
          quantity,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/event/${event.slug}`,
      customer_email: email,
      metadata: {
        eventId,
        ticketCode,
        name,
        phone,
        quantity: quantity.toString(),
      },
    });

    // Create ticket in database (pending payment)
    await prisma.ticket.create({
      data: {
        code: ticketCode,
        eventId,
        name,
        email,
        phone,
        quantity,
        totalAmount: `${totalAmount} LEI`,
        stripePaymentId: session.id,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
