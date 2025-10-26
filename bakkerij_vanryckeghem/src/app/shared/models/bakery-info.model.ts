import { OpeningHours } from './opening-hours.model';

export interface Address {
  street: string;
  number: string;
  city: string;
  zip: string;
  country?: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: Address;
}

export interface SocialMedia {
  facebook?: string;
  instagram?: string;
  twitter?: string;
}

export interface BakeryInfo {
  name: string;
  description: string;
  contact: ContactInfo;
  openingHours: OpeningHours[];
  socialMedia?: SocialMedia;
}