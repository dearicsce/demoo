export type Category = 
  | 'Punjabi Suits'
  | 'Salwar Kameez'
  | 'Kurtis'
  | 'Party Wear'
  | 'Festive Collection'
  | 'Dupattas';

export type Availability = 'In Stock' | 'Made to Order' | 'Few Pieces Left';

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  originalPrice?: number;
  fabric: string;
  lining?: string;
  embroidery: string;
  description: string;
  sizes: string[];
  availability: Availability;
  image: string;
  secondaryImages?: string[];
  isNewArrival?: boolean;
  isFeatured?: boolean;
  sku: string;
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
  customNote?: string;
}

export interface BoutiqueSettings {
  boutiqueName: string;
  tagline: string;
  whatsappNumber: string;
  isNumberConfigured: boolean;
  addressPlaceholder: string;
  cityPlaceholder: string;
  consultationHours: string;
  instagramPlaceholder: string;
  currencySymbol: string;
}

export interface AppointmentForm {
  fullName: string;
  phone: string;
  email?: string;
  date: string;
  timeSlot: string;
  serviceType: 'Bespoke Punjabi Suit' | 'Bridal Consultation' | 'Party Wear Fitting' | 'Fabric & Sizing Advice';
  notes?: string;
}
