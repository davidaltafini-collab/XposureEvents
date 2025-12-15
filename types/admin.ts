export type AdminEventDTO = {
  id: string;
  title: string;
  slug: string;
  date: string;
  imagePath: string;
  capacity: number;
  soldCount: number;
  price: string;
  locationName: string;
  stripePaymentLink: string | null;
  description: string | null;
  locationLink: string | null;
  published: boolean;
};
