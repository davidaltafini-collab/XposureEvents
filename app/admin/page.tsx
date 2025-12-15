import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/auth';
import AdminDashboardClient from '@/components/AdminDashboardClient';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  console.log("--- 1. Începem încărcarea Dashboard ---");

  // 1. Verificăm Auth
  const adminStatus = await isAdmin();
  console.log("--- 2. Status Admin:", adminStatus);

  if (!adminStatus) {
    console.log("--- Redirecting to Login ---");
    redirect('/admin/login');
  }

  // 2. Încercăm să luăm datele
  console.log("--- 3. Încercăm conexiunea la Prisma (Database)... ---");
  
  try {
    const events = await prisma.event.findMany({
      orderBy: { date: 'desc' },
    });
    console.log(`--- 4. Prisma a răspuns! S-au găsit ${events.length} evenimente ---`);

    const totalTicketsSold = events.reduce((sum, event) => sum + event.soldCount, 0);
    const totalCapacity = events.reduce((sum, event) => sum + event.capacity, 0);
    const upcomingEvents = events.filter(event => new Date(event.date) >= new Date()).length;

    const stats = {
      totalEvents: events.length,
      upcomingEvents,
      totalTicketsSold,
      totalCapacity,
    };

    // Serializare date - FIXUL ESTE AICI
    console.log("--- 5. Serializăm datele... ---");
    
    // NU mai folosim ...event, ci scriem câmpurile manual ca să scăpăm de null
    const serializedEvents = events.map((event) => ({
      id: event.id,
      title: event.title,
      slug: event.slug,
      imagePath: event.imagePath,
      price: event.price.toString(), // Convertim Decimal la string
      capacity: event.capacity,
      soldCount: event.soldCount,
      locationName: event.locationName,
      locationAddress: event.locationAddress,
      published: event.published,
      
      // AICI REZOLVĂM EROAREA: Dacă e null, punem ""
      stripePaymentLink: event.stripePaymentLink || "", 
      description: event.description || "",
      locationMapsUrl: event.locationMapsUrl || "",
      locationLink: event.locationMapsUrl || "", // Dublură de siguranță

      // Datele trebuie să fie string-uri
      date: event.date.toISOString(),
      createdAt: event.createdAt.toISOString(),
      updatedAt: event.updatedAt.toISOString(),
    }));

    console.log("--- 6. Returnăm JSX (Pagina gata) ---");
    
  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
        <div className="container mx-auto px-4 py-6 md:py-8">
          {/* Header */}
          <div className="mb-6 md:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-400">Gestionează evenimente și bilete</p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <a
                href="/"
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 text-center"
              >
                ← Site
              </a>
              <form action="/api/auth/admin-logout" method="POST" className="flex-1 sm:flex-none">
                <button
                  type="submit"
                  className="w-full px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 transition-all duration-300"
                >
                  Logout
                </button>
              </form>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 mb-6 md:mb-8">
            <div className="bg-white/5 backdrop-blur-lg rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/10">
              <p className="text-2xl md:text-3xl font-bold text-white mb-1">{stats.totalEvents}</p>
              <p className="text-xs md:text-sm text-gray-400">Total Evenimente</p>
            </div>
             <div className="bg-white/5 backdrop-blur-lg rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/10">
              <p className="text-2xl md:text-3xl font-bold text-white mb-1">{stats.upcomingEvents}</p>
              <p className="text-xs md:text-sm text-gray-400">Viitoare</p>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/10">
              <p className="text-2xl md:text-3xl font-bold text-white mb-1">{stats.totalTicketsSold}</p>
              <p className="text-xs md:text-sm text-gray-400">Vândute</p>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/10">
              <p className="text-2xl md:text-3xl font-bold text-white mb-1">{stats.totalCapacity}</p>
              <p className="text-xs md:text-sm text-gray-400">Capacitate Totală</p>
            </div>
          </div>

          <AdminDashboardClient events={serializedEvents} />
        </div>
      </div>
    );

  } catch (error) {
    console.error("--- EROARE FATALĂ PRISMA ---", error);
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-bold text-xl">
        Eroare la conectarea cu baza de date. Verifică terminalul.
      </div>
    );
  }
}