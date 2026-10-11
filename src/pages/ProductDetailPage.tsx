import { useState } from 'react';
import {
  Shield, RotateCcw, Truck, Check, ChevronLeft,
  Heart, Share2, Star, Package, ExternalLink,
} from 'lucide-react';
import { useProduct, useProducts, useCategories } from '@/lib/hooks';
import { ProductCard, ProductGridSkeleton } from '@/components/ProductCard';
import { Link } from '@/lib/router';
import { formatPrice } from '@/lib/format';
import { conditionColors } from '@/types';
import { getProductImage } from '@/lib/productImages';
import { useI18n } from '@/lib/i18n';

export function ProductDetailPage({ id }: { id: string }) {
  const { t } = useI18n();
  const { product, loading } = useProduct(id);
  const { categories } = useCategories();
  const { products: related, loading: relatedLoading } = useProducts({ limit: 4 });

  if (loading) {
    return (
      <div className="container-page py-20">
        <div className="animate-pulse space-y-8">
          <div className="h-6 bg-neutral-200 rounded w-40" />
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="aspect-square bg-neutral-200 rounded-2xl" />
            <div className="space-y-4">
              <div className="h-8 bg-neutral-200 rounded w-3/4" />
              <div className="h-6 bg-neutral-200 rounded w-1/2" />
              <div className="h-32 bg-neutral-200 rounded" />
              <div className="h-12 bg-neutral-200 rounded w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-page py-20 text-center">
        <p className="text-neutral-500 mb-4">{t('detail.notFound')}</p>
        <Link to="/kaufen" className="btn-primary">{t('detail.backToShop')}</Link>
      </div>
    );
  }

  const category = categories.find((c) => c.id === product.category_id);
  const discount = product.original_price
    ? Math.round((1 - product.price / product.original_price) * 100)
    : 0;

  const relatedProducts = related.filter((p) => p.id !== product.id && p.category_id === product.category_id).slice(0, 4);
  const fallbackRelated = relatedProducts.length > 0 ? relatedProducts : related.filter((p) => p.id !== product.id).slice(0, 4);

  const features = [
    { icon: Shield, title: `${product.warranty_months} ${t('detail.warrantyTitle')}`, desc: t('detail.warrantyDesc') },
    { icon: RotateCcw, title: t('detail.returnsTitle'), desc: t('detail.returnsDesc') },
    { icon: Truck, title: t('detail.shippingTitle'), desc: t('detail.shippingDesc') },
    { icon: Package, title: t('detail.testedTitle'), desc: t('detail.testedDesc') },
  ];

  return (
    <div className="animate-fade-in">
      <div className="container-page py-6">
        <nav className="flex items-center gap-1.5 text-xs text-neutral-500 mb-6 flex-wrap">
          <Link to="/" className="hover:text-primary-600">{t('buy.breadcrumbHome')}</Link>
          <span>/</span>
          <Link to="/kaufen" className="hover:text-primary-600">{t('nav.buy')}</Link>
          {category && (<><span>/</span><Link to={`/kaufen?category=${category.slug}`} className="hover:text-primary-600">{category.name}</Link></>)}
          <span>/</span>
          <span className="text-neutral-700">{product.name}</span>
        </nav>

        <Link to="/kaufen" className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-primary-600 mb-6">
          <ChevronLeft className="w-4 h-4" />
          {t('detail.backToOverview')}
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-neutral-50 to-neutral-100">
              <img src={getProductImage(product)} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <span className={`badge ${conditionColors[product.condition]} px-3 py-1 text-sm`}>
                {t(`cond.${product.condition}`)}
              </span>
              {discount > 0 && <span className="badge bg-error-500 text-white px-3 py-1 text-sm">-{discount}%</span>}
            </div>
            <div className="flex gap-2 mt-4">
              <button className="flex-1 btn-secondary text-sm py-2.5"><Heart className="w-4 h-4" />{t('detail.save')}</button>
              <button className="flex-1 btn-secondary text-sm py-2.5"><Share2 className="w-4 h-4" />{t('detail.share')}</button>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-2 text-sm text-neutral-500 mb-2">
                <span className="font-medium text-neutral-700">{product.brand}</span>
                {product.color && <span>· {product.color}</span>}
                {product.storage && <span>· {product.storage}</span>}
              </div>
              <h1 className="text-3xl font-bold text-neutral-900">{product.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 text-secondary-400 fill-secondary-400" />))}
                </div>
                <span className="text-sm text-neutral-500">{t('detail.reviews')}</span>
              </div>
            </div>

            <div className="flex items-end gap-3 py-4 border-y border-neutral-200">
              <span className="text-3xl font-bold text-neutral-900">{formatPrice(product.price)}</span>
              {product.original_price && (
                <>
                  <span className="text-lg text-neutral-400 line-through mb-1">{formatPrice(product.original_price)}</span>
                  <span className="badge bg-success-100 text-success-700 mb-1.5">
                    {t('detail.youSave')} {formatPrice(product.original_price - product.price)}
                  </span>
                </>
              )}
            </div>

            {product.description && <p className="text-neutral-600 leading-relaxed">{product.description}</p>}

            <div className="flex items-center gap-4">
              {product.in_stock ? (
                <span className="flex items-center gap-1.5 text-sm text-success-600 font-medium">
                  <span className="w-2 h-2 rounded-full bg-success-500" />{t('detail.inStock')}
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-sm text-error-600 font-medium">
                  <span className="w-2 h-2 rounded-full bg-error-500" />{t('detail.outOfStock')}
                </span>
              )}
            </div>

            {/* Marketplace links - replaces cart */}
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-neutral-900 mb-1">{t('detail.viewOnMarketplace')}</h3>
                <p className="text-xs text-neutral-500">{t('detail.marketplaceDesc')}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                {product.amazon_url && (
                  <a
                    href={product.amazon_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#FF9900] text-white px-6 py-3.5 text-sm font-semibold hover:bg-[#E88B00] transition-colors shadow-sm"
                  >
                    <span className="font-bold text-base">a</span>
                    {t('detail.buyAmazon')}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {product.ebay_url && (
                  <a
                    href={product.ebay_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#E53238] text-white px-6 py-3.5 text-sm font-semibold hover:bg-[#D02D33] transition-colors shadow-sm"
                  >
                    <span className="font-bold text-base">e</span>
                    {t('detail.buyEbay')}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4">
              {features.map((f, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                  <f.icon className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-neutral-900">{f.title}</p>
                    <p className="text-xs text-neutral-500">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <section className="mt-16 lg:mt-20">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">{t('detail.related')}</h2>
          {relatedLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              <ProductGridSkeleton count={4} />
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {fallbackRelated.map((p) => (<ProductCard key={p.id} product={p} />))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
