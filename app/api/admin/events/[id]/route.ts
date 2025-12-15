import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

// Helper pentru generarea slug-ului
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// GET - Obține un singur eveniment
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const cookieStore = await cookies();
  const hasSession = cookieStore.has('admin_session');

  if (!hasSession) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = params;
    
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        _count: {
          select: { tickets: true }
        }
      }
    });

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json({ event });
  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json(
      { error: 'Failed to fetch event' },
      { status: 500 }
    );
  }
}

// PUT - Actualizează eveniment
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const cookieStore = await cookies();
  const hasSession = cookieStore.has('admin_session');

  if (!hasSession) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = params;
    const data = await request.json();
    
    const {
      title, description, date, price, capacity, locationName, 
      locationAddress, locationMapsUrl, imagePath, stripePaymentLink, published
    } = data;

    if (!title || !date || !price || !capacity || !locationName || !locationAddress || !imagePath || !stripePaymentLink) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const currentEvent = await prisma.event.findUnique({ where: { id } });
    if (!currentEvent) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    let slug = currentEvent.slug;
    if (title !== currentEvent.title) {
      slug = generateSlug(title);
      const existingEvent = await prisma.event.findUnique({ where: { slug } });

      if (existingEvent && existingEvent.id !== id) {
        return NextResponse.json({ error: 'An event with this title already exists' }, { status: 409 });
      }
    }

    const event = await prisma.event.update({
      where: { id },
      data: {
        title, 
        slug, 
        description: description || '',
        date: new Date(date),
        price: price.toString(),
        capacity: parseInt(capacity.toString()),
        locationName, 
        locationAddress,
        locationMapsUrl: locationMapsUrl || null,
        imagePath, 
        stripePaymentLink,
        published: published === true
      }
    });

    return NextResponse.json({ event });
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
  }
}

// DELETE - Șterge eveniment
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const cookieStore = await cookies();
  const hasSession = cookieStore.has('admin_session');

  if (!hasSession) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = params;
    
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        _count: { select: { tickets: true } }
      }
    });

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    if (event._count.tickets > 0) {
      return NextResponse.json(
        { error: 'Cannot delete event with sold tickets' },
        { status: 400 }
      );
    }

    await prisma.event.delete({ where: { id } });

    return NextResponse.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
  }
}