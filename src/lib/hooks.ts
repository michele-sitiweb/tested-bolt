import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Product, Category } from '@/types';
import { registerCategoryMapping } from '@/lib/productImages';

let categoriesCache: Category[] | null = null;

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>(categoriesCache || []);
  const [loading, setLoading] = useState(!categoriesCache);

  useEffect(() => {
    if (categoriesCache) return;
    let cancelled = false;

    (async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('sort_order');

      if (cancelled || error || !data) return;

      data.forEach((c: Category) => registerCategoryMapping(c.id, c.slug));
      categoriesCache = data as Category[];
      setCategories(data as Category[]);
      setLoading(false);
    })();

    return () => { cancelled = true; };
  }, []);

  return { categories, loading };
}

export function useProducts(filters?: {
  category?: string;
  brand?: string;
  condition?: string;
  search?: string;
  limit?: number;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    (async () => {
      let query = supabase.from('products').select('*');

      if (filters?.category && filters.category !== 'all') {
        const { data: catData } = await supabase
          .from('categories')
          .select('id')
          .eq('slug', filters.category)
          .maybeSingle();
        if (catData) {
          query = query.eq('category_id', catData.id);
        }
      }

      if (filters?.brand && filters.brand !== 'all') {
        query = query.eq('brand', filters.brand);
      }

      if (filters?.condition && filters.condition !== 'all') {
        query = query.eq('condition', filters.condition);
      }

      if (filters?.search) {
        query = query.ilike('name', `%${filters.search}%`);
      }

      if (filters?.limit) {
        query = query.limit(filters.limit);
      }

      query = query.order('created_at', { ascending: false });

      const { data, error } = await query;

      if (cancelled || error || !data) {
        setLoading(false);
        return;
      }

      // Register category mappings if not already done
      if (!categoriesCache) {
        const { data: catData } = await supabase.from('categories').select('*').order('sort_order');
        if (catData) {
          catData.forEach((c: Category) => registerCategoryMapping(c.id, c.slug));
          categoriesCache = catData as Category[];
        }
      }

      setProducts(data as Product[]);
      setLoading(false);
    })();

    return () => { cancelled = true; };
  }, [filters?.category, filters?.brand, filters?.condition, filters?.search, filters?.limit]);

  return { products, loading };
}

export function useProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    (async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (cancelled || error || !data) {
        setLoading(false);
        return;
      }

      if (!categoriesCache) {
        const { data: catData } = await supabase.from('categories').select('*');
        if (catData) {
          catData.forEach((c: Category) => registerCategoryMapping(c.id, c.slug));
          categoriesCache = catData as Category[];
        }
      }

      setProduct(data as Product);
      setLoading(false);
    })();

    return () => { cancelled = true; };
  }, [id]);

  return { product, loading };
}
