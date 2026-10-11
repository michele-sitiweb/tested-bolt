import type { Product } from '@/types';

const categoryImages: Record<string, string[]> = {
  smartphones: [
    'https://images.pexels.com/photos/14979013/pexels-photo-14979013.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/18311092/pexels-photo-18311092.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/11120516/pexels-photo-11120516.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/9956763/pexels-photo-9956763.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/8833426/pexels-photo-8833426.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/9403817/pexels-photo-9403817.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/8833423/pexels-photo-8833423.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/8833425/pexels-photo-8833425.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ],
  tablets: [
    'https://images.pexels.com/photos/18205642/pexels-photo-18205642.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/33125886/pexels-photo-33125886.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/17803200/pexels-photo-17803200.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/29765798/pexels-photo-29765798.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ],
  notebooks: [
    'https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/12200696/pexels-photo-12200696.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/13012666/pexels-photo-13012666.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/29765806/pexels-photo-29765806.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/29765802/pexels-photo-29765802.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ],
  smartwatches: [
    'https://images.pexels.com/photos/31541678/pexels-photo-31541678.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/12564670/pexels-photo-12564670.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/11677077/pexels-photo-11677077.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/12880803/pexels-photo-12880803.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ],
  headphones: [
    'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/3756985/pexels-photo-3756985.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/4526407/pexels-photo-4526407.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/28970123/pexels-photo-28970123.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ],
  consoles: [
    'https://images.pexels.com/photos/16070479/pexels-photo-16070479.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/9704415/pexels-photo-9704415.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/11591941/pexels-photo-11591941.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/11591876/pexels-photo-11591876.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ],
  cameras: [
    'https://images.pexels.com/photos/28859522/pexels-photo-28859522.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/16013967/pexels-photo-16013967.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/29442189/pexels-photo-29442189.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/14877325/pexels-photo-14877325.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  ],
};

const categorySlugById: Record<string, string> = {};

export function registerCategoryMapping(id: string, slug: string) {
  categorySlugById[id] = slug;
}

export function getProductImage(product: Product): string {
  if (product.image_url) return product.image_url;

  const slug = categorySlugById[product.category_id] || 'smartphones';
  const images = categoryImages[slug] || categoryImages.smartphones;
  const idx = (product.name.charCodeAt(0) + product.name.charCodeAt(product.name.length - 1)) % images.length;
  return images[idx];
}

export function getCategoryImage(slug: string): string {
  const images = categoryImages[slug] || categoryImages.smartphones;
  return images[0];
}
