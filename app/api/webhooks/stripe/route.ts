import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { sendTicketEmail } from '@/lib/email';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    try {
      // Get ticket from database
      const ticket = await prisma.ticket.findFirst({
        where: { stripePaymentId: session.id },
        include: { event: true },
      });

      if (!ticket) {
        console.error('Ticket not found for session:', session.id);
        return NextResponse.json({ received: true });
      }
      await prisma.ticket.update({
        where: { id: ticket.id },
        data: {
          paymentStatus: 'PAID'
        },
      });

      // Update event sold count
      await prisma.event.update({
        where: { id: ticket.eventId },
        data: {
          soldCount: { increment: ticket.quantity },
        },
      });

      // Send ticket email
      await sendTicketEmail(ticket.email, {
        name: ticket.name,
        eventTitle: ticket.event.title,
        eventDate: ticket.event.date,
        eventLocation: ticket.event.locationName,
        quantity: ticket.quantity,
        code: ticket.code,
        totalAmount: ticket.totalAmount,
      });

      console.log('Ticket email sent successfully:', ticket.code);
    } catch (error) {
      console.error('Error processing payment:', error);
      // Don't return error to Stripe - we don't want retries
    }
  }

  return NextResponse.json({ received: true });
}
