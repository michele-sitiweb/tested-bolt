export type Condition = 'new' | 'like-new' | 'very-good' | 'good' | 'fair';

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  sort_order: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category_id: string;
  condition: Condition;
  price: number;
  original_price: number | null;
  image_url: string | null;
  description: string | null;
  storage: string | null;
  color: string | null;
  warranty_months: number;
  in_stock: boolean;
  amazon_url: string | null;
  ebay_url: string | null;
  created_at: string;
}

export const conditionColors: Record<Condition, string> = {
  'new': 'bg-success-100 text-success-700',
  'like-new': 'bg-success-100 text-success-700',
  'very-good': 'bg-primary-100 text-primary-700',
  'good': 'bg-secondary-100 text-secondary-700',
  'fair': 'bg-neutral-200 text-neutral-700',
};
