import { Shield, ArrowRight, ShoppingBag } from 'lucide-react';
import type { Product } from '@/types';
import { conditionColors } from '@/types';
import { formatPrice } from '@/lib/format';
import { Link } from '@/lib/router';
import { getProductImage } from '@/lib/productImages';
import { useI18n } from '@/lib/i18n';

export function ProductCard({ product }: { product: Product }) {
  const { t } = useI18n();
  const discount = product.original_price
    ? Math.round((1 - product.price / product.original_price) * 100)
    : 0;

  return (
    <Link
      to={`/produkt/${product.id}`}
      className="group card overflow-hidden hover:shadow-lg hover:border-primary-200 transition-all duration-300"
    >
      <div className="relative aspect-square bg-gradient-to-br from-neutral-50 to-neutral-100 overflow-hidden">
        <img
          src={getProductImage(product)}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span className={`badge ${conditionColors[product.condition]}`}>
            {t(`cond.${product.condition}`)}
          </span>
          {discount > 0 && (
            <span className="badge bg-error-500 text-white">
              -{discount}%
            </span>
          )}
        </div>
        {!product.in_stock && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="text-sm font-semibold text-neutral-700 bg-white px-4 py-2 rounded-lg shadow-sm">
              {t('card.outOfStock')}
            </span>
          </div>
        )}
        {(product.amazon_url || product.ebay_url) && (
          <div className="absolute top-3 right-3 flex gap-1">
            {product.amazon_url && (
              <span className="badge bg-[#FF9900] text-white px-2 py-0.5 text-[10px] font-bold shadow-sm">
                a
              </span>
            )}
            {product.ebay_url && (
              <span className="badge bg-[#E53238] text-white px-2 py-0.5 text-[10px] font-bold shadow-sm">
                e
              </span>
            )}
          </div>
        )}
      </div>

      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between text-xs text-neutral-500">
          <span className="font-medium">{product.brand}</span>
          {product.storage && <span>{product.storage}</span>}
        </div>
        <h3 className="font-semibold text-neutral-900 text-sm leading-snug group-hover:text-primary-700 transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-1.5 text-xs text-neutral-500">
          <Shield className="w-3.5 h-3.5 text-primary-500" />
          <span>{product.warranty_months} {t('card.warranty')}</span>
        </div>
        <div className="flex items-end justify-between pt-1">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-neutral-900">{formatPrice(product.price)}</span>
            {product.original_price && (
              <span className="text-xs text-neutral-400 line-through">{formatPrice(product.original_price)}</span>
            )}
          </div>
          <span className="text-primary-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="card overflow-hidden animate-pulse">
      <div className="aspect-square bg-neutral-200" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-neutral-200 rounded w-1/3" />
        <div className="h-4 bg-neutral-200 rounded w-3/4" />
        <div className="h-3 bg-neutral-200 rounded w-1/2" />
        <div className="h-6 bg-neutral-200 rounded w-1/3" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </>
  );
}
