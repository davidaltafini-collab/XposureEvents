// Generate random ticket code
export function generateTicketCode(length: number = 16): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Format price from "XX LEI" to number
export function parsePriceToNumber(price: string): number {
  const match = price.match(/(\d+)/);
  return match ? parseInt(match[1]) : 0;
}

// Format date for Romanian locale
export function formatDateRO(date: Date): string {
  return new Date(date).toLocaleDateString('ro-RO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

// Format time for Romanian locale
export function formatTimeRO(date: Date): string {
  return new Date(date).toLocaleTimeString('ro-RO', {
    hour: '2-digit',
    minute: '2-digit',
  });
}
