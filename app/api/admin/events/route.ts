import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

// Helper pentru generarea URL-ului (slug)
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const hasSession = cookieStore.has('admin_session');

  if (!hasSession) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const events = await prisma.event.findMany({
      orderBy: { date: 'desc' },
    });

    return NextResponse.json({ events });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const hasSession = cookieStore.has('admin_session');

  if (!hasSession) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    
    const {
      title,
      description,
      date,
      price,
      capacity,
      locationName,
      locationAddress,
      locationMapsUrl,
      imagePath,
      stripePaymentLink,
      published,
      // --- ADAUGAT AICI (Ca sa citim noile campuri) ---
      isExternal,
      externalUrl
      // -----------------------------------------------
    } = data;

    // --- MODIFICARE AICI: Am scos 'stripePaymentLink' din verificarea asta generala
    // Motiv: Daca e Google Form, nu avem link de Stripe, deci nu trebuie sa dea eroare.
    if (!title || !date || !price || !capacity || !locationName || !locationAddress || !imagePath) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // --- LOGICA NOUA (Strict pentru butonul extern) ---
    // Daca NU e extern si NU ai pus link Stripe => Eroare
    if (!isExternal && !stripePaymentLink) {
       return NextResponse.json({ error: 'Stripe Link is required' }, { status: 400 });
    }
    // Daca E extern si NU ai pus link Google => Eroare
    if (isExternal && !externalUrl) {
       return NextResponse.json({ error: 'External Link is required' }, { status: 400 });
    }
    // --------------------------------------------------

    const slug = generateSlug(title);

    const existingEvent = await prisma.event.findUnique({
      where: { slug }
    });

    if (existingEvent) {
      return NextResponse.json(
        { error: 'An event with this title already exists' },
        { status: 409 }
      );
    }

    const event = await prisma.event.create({
      data: {
        title,
        slug,
        description: description || '',
        date: new Date(date),
        
        // Prisma vrea String, deci nu mai folosim parseFloat
        price: price.toString(), 
        
        capacity: parseInt(capacity.toString()), // Capacitatea rămâne probabil Int
        locationName,
        locationAddress,
        locationMapsUrl: locationMapsUrl || null,
        imagePath,
        stripePaymentLink: stripePaymentLink || null, // Acum poate fi gol daca e extern
        published: published === true,
        // --- ADAUGAT AICI (Salvam in baza de date) ---
        isExternal: isExternal || false,
        externalUrl: externalUrl || null
        // ---------------------------------------------
      }
    });

    return NextResponse.json({ event }, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: 'Failed to create event. Check server logs.' },
      { status: 500 }
    );
  }
}