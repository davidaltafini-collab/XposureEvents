import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing events
  await prisma.ticket.deleteMany({});
  await prisma.event.deleteMany({});

  // Create sample events
  const events = await Promise.all([
    prisma.event.create({
      data: {
        title: 'Concert Live - Vintage Vibes',
        slug: 'concert-live-vintage-vibes',
        description: `Un concert memorabil cu cele mai bune piese de jazz și blues. 
        
Atmosferă intimă într-un cadru elegant, perfect pentru iubitorii muzicii de calitate. 
        
Artiști invitați special din Europa, care vor aduce pe scenă clasice ale jazz-ului și interpretări moderne ale pieselor de blues.

Încă din primele acorduri, veți fi transportați într-o lume a muzicii autentice, unde fiecare notă contează și fiecare moment este unic.`,
        date: new Date('2024-12-31T20:00:00Z'),
        imagePath: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&q=80',
        price: '150 LEI',
        capacity: 300,
        soldCount: 87,
        locationName: 'Sala Palatului București',
        locationAddress: 'Str. Ion Campineanu nr. 28, București 010031',
        locationMapsUrl: 'https://goo.gl/maps/example1',
      },
    }),

    prisma.event.create({
      data: {
        title: 'Festival de Film Independent',
        slug: 'festival-film-independent',
        description: `Cea mai mare selecție de filme independente românești și internaționale.

3 zile de proiecții, discuții cu regizori și actori, workshopuri de film-making.

Program:
- Vineri: Seară de deschidere cu 5 scurtmetraje premiate
- Sâmbătă: Proiecții zilnice (12:00 - 22:00)
- Duminică: Premiere și sesiune Q&A cu regizori

Biletul include acces la toate proiecțiile și evenimente speciale.`,
        date: new Date('2025-01-15T18:00:00Z'),
        imagePath: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200&q=80',
        price: '80 LEI',
        capacity: 150,
        soldCount: 142,
        locationName: 'Cinema Elvire Popesco',
        locationAddress: 'Str. Mendeleev nr. 26, București',
        locationMapsUrl: 'https://goo.gl/maps/example2',
      },
    }),

    prisma.event.create({
      data: {
        title: 'Workshop: Introducere în Photography',
        slug: 'workshop-photography-basics',
        description: `Învață fundamentele fotografiei într-un workshop hands-on de o zi întreagă.

Ce vei învăța:
✓ Setări cameră (ISO, Aperture, Shutter Speed)
✓ Compoziție și framing
✓ Tehnici de iluminare
✓ Post-processing în Lightroom
✓ Shooting session ghidat în Parcul Herăstrău

Include:
- Material de curs complet
- Coffee break & lunch
- Acces la echipament foto profesional
- Certificat de participare

Nivel: Beginner & Intermediate
Durată: 10:00 - 18:00`,
        date: new Date('2025-02-10T10:00:00Z'),
        imagePath: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1200&q=80',
        price: '250 LEI',
        capacity: 20,
        soldCount: 18,
        locationName: 'Creative Hub București',
        locationAddress: 'Calea Victoriei nr. 155, București',
        locationMapsUrl: 'https://goo.gl/maps/example3',
      },
    }),

    prisma.event.create({
      data: {
        title: 'Stand-Up Comedy Night',
        slug: 'standup-comedy-night-february',
        description: `Cea mai tare seară de stand-up cu cei mai buni comedianți din România!

Line-up:
🎤 Comedian Headline Act
🎤 Special Guest din Europa
🎤 2 Comedianți rising stars

Show-ul include:
- 2 ore de comedie non-stop
- Meet & Greet după show
- Welcome drink inclus

Locuri limitate - asigură-ți biletul!

Vârstă minimă: 18 ani
Dress code: Smart casual`,
        date: new Date('2025-02-20T20:00:00Z'),
        imagePath: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=1200&q=80',
        price: '100 LEI',
        capacity: 200,
        soldCount: 5,
        locationName: 'Club Quantic',
        locationAddress: 'Str. Constantin Mille nr. 4, București',
        locationMapsUrl: 'https://goo.gl/maps/example4',
      },
    }),

    prisma.event.create({
      data: {
        title: 'Tech Meetup: AI & Machine Learning',
        slug: 'tech-meetup-ai-ml-march',
        description: `Eveniment dedicat profesioniștilor și pasionaților de AI & ML.

Agenda:
18:00 - Networking & Pizza
19:00 - Keynote: "The Future of AI in Romania"
19:45 - Lightning Talks (3x15 min)
20:30 - Panel Discussion
21:00 - Networking & Drinks

Topics:
• Large Language Models în producție
• Computer Vision applications
• ML Engineering best practices
• Career paths în AI

Perfect pentru:
→ Data Scientists
→ ML Engineers  
→ Software Developers interested in AI
→ Students & Beginners

FREE EVENT cu pre-înregistrare obligatorie!`,
        date: new Date('2025-03-05T18:00:00Z'),
        imagePath: 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=1200&q=80',
        price: 'GRATUIT',
        capacity: 100,
        soldCount: 67,
        locationName: 'TechHub București',
        locationAddress: 'Bd. Magheru nr. 28-30, București',
        locationMapsUrl: 'https://goo.gl/maps/example5',
      },
    }),
  ]);

  console.log(`✅ Created ${events.length} sample events`);
  
  events.forEach((event) => {
    console.log(`   📅 ${event.title} - ${event.soldCount}/${event.capacity} sold`);
  });
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
