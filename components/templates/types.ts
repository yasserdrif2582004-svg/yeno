export interface Restaurant {
  uid: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
  phone: string;
  address: string;
  template: string;
  primaryColor: string;
  accentColor: string;
  userId: string;
}

export interface Category {
  id: string;
  name: string;
  nameEn: string;
  nameEs: string;
  description: string;
  order: number;
  restaurantId: string;
}

export interface MenuItem {
  id: string;
  name: string;
  nameEn: string;
  nameEs: string;
  description: string;
  descEn: string;
  descEs: string;
  price: number;
  image: string;
  available: boolean;
  categoryId: string;
}

export type Lang = 'fr' | 'en' | 'es';

export interface TemplateProps {
  restaurant: Restaurant;
  categories: Category[];
  items: MenuItem[];
  lang: Lang;
}
