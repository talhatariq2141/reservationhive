export type SearchParams = {
  tenant: string; checkIn: string; checkOut: string;
  adults: number; children: number; promo?: string | null;
};

export type Room = {
  id: string; name: string; description: string;
  maxGuests: number; images: string[]; amenities: string[];
  ratePlans: Array<{ id: string; name: string; refundable: boolean; priceTotal: number; nightlyFrom: number; currency: string }>;
};
