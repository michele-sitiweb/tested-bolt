import {
  Shield, Truck, RotateCcw, Star, ArrowRight, Recycle,
  Smartphone, Tablet, Laptop, Watch, Headphones, Gamepad2, Camera,
  CheckCircle2, TrendingUp, Users, MapPin, Quote, BadgeCheck,
} from 'lucide-react';
import { Link } from '@/lib/router';
import { useCategories, useProducts } from '@/lib/hooks';
import { ProductCard, ProductGridSkeleton } from '@/components/ProductCard';
import { useI18n } from '@/lib/i18n';

const iconMap: Record<string, typeof Smartphone> = {
  Smartphone, Tablet, Laptop, Watch, Headphones, Gamepad2, Camera,
};

export function HomePage() {
  const { t } = useI18n();
  const { categories } = useCategories();
  const { products, loading } = useProducts({ limit: 8 });

  const stats = [
    { icon: Users, value: '1Mio+', label: t('stats.customers') },
    { icon: MapPin, value: '455', label: t('stats.locations') },
    { icon: Star, value: '97%', label: t('stats.satisfaction') },
  ];

  const reviews = [
    { name: 'Lisa M.', rating: 5, text: t('reviews.text1'), location: 'Bremen' },
    { name: 'Tom K.', rating: 5, text: t('reviews.text2'), location: 'Hamburg' },
    { name: 'Sarah W.', rating: 4, text: t('reviews.text3'), location: 'München' },
  ];

  return (
    <div className="animate-fade-in">
      {/* Promo Banner */}
      <div className="bg-primary-600 text-white text-center text-sm py-2.5 px-4">
        <span className="font-medium">{t('promo.text')}</span>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 -left-20 w-72 h-72 bg-primary-200 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-200 rounded-full blur-3xl" />
        </div>
        <div className="container-page relative py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 badge bg-primary-100 text-primary-700 px-3 py-1.5">
                <BadgeCheck className="w-4 h-4" />
                {t('hero.badge')}
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-neutral-900 text-balance leading-tight">
                {t('hero.title').split('{')[0]}
                <span className="text-primary-600">{t('hero.titleHighlight')}</span>
                {t('hero.title').split('}')[1] || ''}
              </h1>
              <p className="text-lg text-neutral-600 max-w-xl leading-relaxed">
                {t('hero.desc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/verkaufen" className="btn-primary text-base px-8 py-4">
                  {t('hero.sellBtn')}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/kaufen" className="btn-secondary text-base px-8 py-4">
                  {t('hero.buyBtn')}
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 text-sm text-neutral-600">
                <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-primary-600" /> {t('hero.warranty')}</span>
                <span className="flex items-center gap-1.5"><RotateCcw className="w-4 h-4 text-primary-600" /> {t('hero.returns')}</span>
                <span className="flex items-center gap-1.5"><Truck className="w-4 h-4 text-primary-600" /> {t('hero.shipping')}</span>
              </div>
            </div>

            <div className="relative animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                <img
                  src="https://images.pexels.com/photos/18311089/pexels-photo-18311089.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                  alt="tested before"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 border border-neutral-100 hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-success-100 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-success-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-neutral-900">98%</p>
                    <p className="text-xs text-neutral-500">{t('hero.fairPrice')}</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4 border border-neutral-100 hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                    <Truck className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-neutral-900">93%</p>
                    <p className="text-xs text-neutral-500">{t('hero.fastShipping')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-y border-neutral-200">
        <div className="container-page py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center justify-center gap-4 text-center sm:border-r sm:last:border-r-0 border-neutral-200">
                <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center shrink-0">
                  <stat.icon className="w-7 h-7 text-primary-600" />
                </div>
                <div className="text-left">
                  <p className="text-3xl font-bold text-neutral-900">{stat.value}</p>
                  <p className="text-sm text-neutral-500">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buy / Sell CTA cards */}
      <section className="container-page py-16">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card p-8 lg:p-10 group hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center mb-6">
              <Recycle className="w-7 h-7 text-primary-600" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-3">{t('cta.sellTitle')}</h2>
            <p className="text-neutral-600 mb-6">{t('cta.sellDesc')}</p>
            <Link to="/verkaufen" className="btn-primary">
              {t('cta.sellBtn')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="card p-8 lg:p-10 group hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 rounded-2xl bg-secondary-100 flex items-center justify-center mb-6">
              <Smartphone className="w-7 h-7 text-secondary-600" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-3">{t('cta.buyTitle')}</h2>
            <p className="text-neutral-600 mb-6">{t('cta.buyDesc')}</p>
            <Link to="/kaufen" className="btn-accent">
              {t('cta.buyBtn')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container-page pb-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900">{t('cat.title')}</h2>
            <p className="text-neutral-500 mt-1">{t('cat.subtitle')}</p>
          </div>
          <Link to="/kaufen" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700">
            {t('cat.viewAll')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] || Smartphone;
            return (
              <Link
                key={cat.id}
                to={`/kaufen?category=${cat.slug}`}
                className="card p-5 flex flex-col items-center text-center gap-3 hover:shadow-md hover:border-primary-200 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                  <Icon className="w-6 h-6 text-primary-600" />
                </div>
                <span className="text-sm font-medium text-neutral-700 group-hover:text-primary-700 transition-colors">
                  {cat.name}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-neutral-100/60 py-16">
        <div className="container-page">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900">{t('featured.title')}</h2>
              <p className="text-neutral-500 mt-1">{t('featured.subtitle')}</p>
            </div>
            <Link to="/kaufen" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700">
              {t('featured.viewAll')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {loading ? (
              <ProductGridSkeleton count={8} />
            ) : (
              products.map((p) => <ProductCard key={p.id} product={p} />)
            )}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container-page py-16 lg:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900">{t('how.title')}</h2>
          <p className="text-neutral-500 mt-2">{t('how.subtitle')}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {[
            { icon: Smartphone, title: t('how.step1.title'), desc: t('how.step1.desc') },
            { icon: CheckCircle2, title: t('how.step2.title'), desc: t('how.step2.desc') },
            { icon: Truck, title: t('how.step3.title'), desc: t('how.step3.desc') },
          ].map((step, i) => (
            <div key={i} className="relative card p-8 text-center">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary-600 text-white text-sm font-bold flex items-center justify-center">
                {i + 1}
              </div>
              <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-6 mt-2">
                <step.icon className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">{step.title}</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About / Mission */}
      <section className="bg-neutral-900 text-white py-16 lg:py-24">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold">{t('mission.title')}</h2>
              <p className="text-neutral-300 leading-relaxed text-lg">{t('mission.p1')}</p>
              <p className="text-neutral-400 leading-relaxed">{t('mission.p2')}</p>
              <Link to="/about" className="btn-secondary">
                {t('mission.more')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/38411738/pexels-photo-38411738.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="container-page py-16 lg:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-secondary-400 fill-secondary-400" />
            ))}
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900">{t('reviews.title')}</h2>
          <p className="text-neutral-500 mt-2">{t('reviews.subtitle')}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <div key={i} className="card p-6 space-y-4">
              <Quote className="w-8 h-8 text-primary-200" />
              <p className="text-sm text-neutral-700 leading-relaxed">{review.text}</p>
              <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold text-sm">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">{review.name}</p>
                    <p className="text-xs text-neutral-400">{review.location}</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 text-secondary-400 fill-secondary-400" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="container-page pb-16">
        <div className="rounded-3xl bg-gradient-to-br from-primary-600 to-primary-700 p-8 lg:p-12 text-center text-white">
          <h2 className="text-2xl lg:text-3xl font-bold mb-3">{t('newsletter.title')}</h2>
          <p className="text-primary-100 max-w-xl mx-auto mb-6">{t('newsletter.desc')}</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder={t('newsletter.placeholder')} className="input bg-white text-neutral-900" />
            <button type="submit" className="btn-secondary whitespace-nowrap">{t('newsletter.btn')}</button>
          </form>
        </div>
      </section>
    </div>
  );
}
