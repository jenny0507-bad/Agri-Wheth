export type UserRole = 'Farmer' | 'Buyer' | 'Worker' | 'Shipping';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Crop {
  id: number;
  name: string;
  quantity: string;
  price: number;
  location: string;
  grade: string;
  image: string;
  seller_id: string;
  category?: 'Crop' | 'Seed' | 'Plant' | 'Spice';
}

export interface Machinery {
  id: number;
  name: string;
  price: number;
  location: string;
  image: string;
  seller_id: string;
  type: 'Tractor' | 'Harvester' | 'Irrigation' | 'Small Tool' | 'Heavy Machinery';
}

export interface AgriService {
  id: number;
  name: string;
  company: string;
  price: number;
  description: string;
  image: string;
}

export interface Worker {
  id: number;
  name: string;
  skill: string;
  wage: number;
  distance: number;
  availability: string;
  rating: number;
  image: string;
  experience: number;
  reviews?: string[];
}

export interface NewsItem {
  id: number;
  title: string;
  summary: string;
  date: string;
  category: string;
  trendData?: { date: string; value: number }[];
}

export interface CropIntelligence {
  id: number;
  name: string;
  description: string;
  soilSuitability: string;
  irrigationNeeds: string;
  fertilizerRec: string;
  pestRisks: string;
  diseaseRisks: string;
  image: string;
  growthTrend: { stage: string; value: number }[];
  yieldPrediction: { year: string; yield: number }[];
}

export interface SoilHealth {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  organicMatter: number;
  ph: number;
  moisture: number;
}

export interface AgriShop {
  id: number;
  name: string;
  location: { lat: number; lng: number };
  distance: number;
}

export type ThemeMode = 'light' | 'dark' | 'warm';
