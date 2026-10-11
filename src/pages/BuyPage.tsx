import { useEffect, useState } from 'react';
import { SlidersHorizontal, Search, X } from 'lucide-react';
import { useProducts, useCategories } from '@/lib/hooks';
import { ProductCard, ProductGridSkeleton } from '@/components/ProductCard';
import { Link } from '@/lib/router';
import type { Condition } from '@/types';
import { useI18n } from '@/lib/i18n';

function parseSearchParams(search: string): { category?: string; search?: string } {
  const params = new URLSearchParams(search);
  return {
    category: params.get('category') || undefined,
    search: params.get('q') || undefined,
  };
}

export function BuyPage() {
  const { t } = useI18n();
  const { categories } = useCategories();
  const [searchInput, setSearchInput] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [urlSearch, setUrlSearch] = useState(window.location.search);
  useEffect(() => {
    const onPop = () => setUrlSearch(window.location.search);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const parsed = parseSearchParams(urlSearch);

  const [selectedCategory, setSelectedCategory] = useState(parsed.category || 'all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedCondition, setSelectedCondition] = useState<Condition | 'all'>('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    setSelectedCategory(parsed.category || 'all');
    setSearchInput(parsed.search || '');
  }, [urlSearch]);

  const { products, loading } = useProducts({
    category: selectedCategory,
    brand: selectedBrand,
    condition: selectedCondition,
    search: searchInput || undefined,
  });

  const brands = Array.from(new Set(products.map((p) => p.brand))).sort();

  const sorted = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc': return a.price - b.price;
      case 'price-desc': return b.price - a.price;
      case 'name': return a.name.localeCompare(b.name);
      default: return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
  });

  const activeCategory = categories.find((c) => c.slug === selectedCategory);
  const conditions: (Condition | 'all')[] = ['all', 'like-new', 'very-good', 'good', 'fair'];

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setSelectedCondition('all');
    setSearchInput('');
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedBrand !== 'all' || selectedCondition !== 'all' || searchInput;

  return (
    <div className="animate-fade-in">
      <div className="bg-gradient-to-br from-primary-50 via-white to-white border-b border-neutral-200">
        <div className="container-page py-10">
          <nav className="flex items-center gap-1.5 text-xs text-neutral-500 mb-4">
            <Link to="/" className="hover:text-primary-600">{t('buy.breadcrumbHome')}</Link>
            <span>/</span>
            <span className="text-neutral-700">{t('nav.buy')}</span>
            {activeCategory && (<><span>/</span><span className="text-neutral-700">{activeCategory.name}</span></>)}
          </nav>
          <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900">
            {activeCategory ? activeCategory.name : t('buy.allProducts')}
          </h1>
          <p className="text-neutral-500 mt-2">{t('buy.subtitle')}</p>
        </div>
      </div>

      <div className="container-page py-8">
        <div className="flex gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder={t('buy.searchPlaceholder')}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="input pl-11"
            />
          </div>
          <button className="btn-secondary lg:hidden" onClick={() => setFiltersOpen(!filtersOpen)}>
            <SlidersHorizontal className="w-4 h-4" />
            {t('buy.filter')}
          </button>
        </div>

        <div className="flex gap-8">
          <aside className={`w-64 shrink-0 space-y-6 ${filtersOpen ? 'block fixed inset-0 z-50 bg-white p-6 overflow-y-auto' : 'hidden lg:block'}`}>
            {filtersOpen && (
              <div className="flex items-center justify-between mb-4 lg:hidden">
                <h2 className="text-lg font-bold">{t('buy.filter')}</h2>
                <button onClick={() => setFiltersOpen(false)}><X className="w-5 h-5" /></button>
              </div>
            )}

            <div>
              <h3 className="text-sm font-semibold text-neutral-900 mb-3">{t('buy.category')}</h3>
              <div className="space-y-1.5">
                <button onClick={() => setSelectedCategory('all')} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === 'all' ? 'bg-primary-50 text-primary-700 font-medium' : 'text-neutral-600 hover:bg-neutral-100'}`}>
                  {t('buy.allCategories')}
                </button>
                {categories.map((cat) => (
                  <button key={cat.id} onClick={() => setSelectedCategory(cat.slug)} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === cat.slug ? 'bg-primary-50 text-primary-700 font-medium' : 'text-neutral-600 hover:bg-neutral-100'}`}>
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {brands.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-neutral-900 mb-3">{t('buy.brand')}</h3>
                <div className="space-y-1.5">
                  <button onClick={() => setSelectedBrand('all')} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedBrand === 'all' ? 'bg-primary-50 text-primary-700 font-medium' : 'text-neutral-600 hover:bg-neutral-100'}`}>
                    {t('buy.allBrands')}
                  </button>
                  {brands.map((brand) => (
                    <button key={brand} onClick={() => setSelectedBrand(brand)} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedBrand === brand ? 'bg-primary-50 text-primary-700 font-medium' : 'text-neutral-600 hover:bg-neutral-100'}`}>
                      {brand}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="text-sm font-semibold text-neutral-900 mb-3">{t('buy.condition')}</h3>
              <div className="space-y-1.5">
                {conditions.map((cond) => (
                  <button key={cond} onClick={() => setSelectedCondition(cond)} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedCondition === cond ? 'bg-primary-50 text-primary-700 font-medium' : 'text-neutral-600 hover:bg-neutral-100'}`}>
                    {cond === 'all' ? t('buy.allConditions') : t(`cond.${cond}`)}
                  </button>
                ))}
              </div>
            </div>

            {hasActiveFilters && (
              <button onClick={resetFilters} className="btn-ghost w-full text-sm">{t('buy.reset')}</button>
            )}
          </aside>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-neutral-500">
                {loading ? t('buy.loading') : `${sorted.length} ${sorted.length === 1 ? t('buy.result') : t('buy.results')}`}
              </p>
              <div className="relative">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="select w-48 text-sm py-2">
                  <option value="newest">{t('buy.sortNewest')}</option>
                  <option value="price-asc">{t('buy.sortPriceAsc')}</option>
                  <option value="price-desc">{t('buy.sortPriceDesc')}</option>
                  <option value="name">{t('buy.sortName')}</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                <ProductGridSkeleton count={8} />
              </div>
            ) : sorted.length === 0 ? (
              <div className="card p-12 text-center">
                <p className="text-neutral-500 mb-4">{t('buy.noResults')}</p>
                <button onClick={resetFilters} className="btn-primary">{t('buy.reset')}</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                {sorted.map((p) => (<ProductCard key={p.id} product={p} />))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
