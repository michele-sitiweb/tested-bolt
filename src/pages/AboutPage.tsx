import {
  Recycle, Shield, Users, MapPin, Heart, Leaf,
  Award, ArrowRight,
} from 'lucide-react';
import { Link } from '@/lib/router';
import { useI18n } from '@/lib/i18n';

export function AboutPage() {
  const { t } = useI18n();

  const values = [
    { icon: Recycle, title: t('about.value1Title'), desc: t('about.value1Desc') },
    { icon: Shield, title: t('about.value2Title'), desc: t('about.value2Desc') },
    { icon: Heart, title: t('about.value3Title'), desc: t('about.value3Desc') },
    { icon: Leaf, title: t('about.value4Title'), desc: t('about.value4Desc') },
  ];

  const milestones = [
    { year: '2011', text: t('about.milestone1') },
    { year: '2015', text: t('about.milestone2') },
    { year: '2019', text: t('about.milestone3') },
    { year: '2024', text: t('about.milestone4') },
  ];

  const stats = [
    { icon: Users, value: '1Mio+', label: t('about.statCustomers') },
    { icon: MapPin, value: '455', label: t('about.statLocations') },
    { icon: Award, value: '97%', label: t('about.statRecommend') },
    { icon: Recycle, value: '930K+', label: t('about.statRecycled') },
  ];

  return (
    <div className="animate-fade-in">
      <div className="relative bg-gradient-to-br from-neutral-900 to-neutral-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.pexels.com/photos/38411735/pexels-photo-38411735.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container-page relative py-16 lg:py-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 badge bg-white/15 text-white px-3 py-1.5 mb-4">
              <Recycle className="w-4 h-4" />{t('about.badge')}
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-balance">{t('about.title')}</h1>
            <p className="text-neutral-300 text-lg leading-relaxed">{t('about.desc')}</p>
          </div>
        </div>
      </div>

      <section className="bg-white border-b border-neutral-200">
        <div className="container-page py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((s, i) => (
              <div key={i}>
                <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-3">
                  <s.icon className="w-7 h-7 text-primary-600" />
                </div>
                <p className="text-3xl font-bold text-neutral-900">{s.value}</p>
                <p className="text-sm text-neutral-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <h2 className="text-3xl font-bold text-neutral-900">{t('about.missionTitle')}</h2>
            <p className="text-neutral-600 leading-relaxed text-lg">{t('about.missionP1')}</p>
            <p className="text-neutral-600 leading-relaxed">{t('about.missionP2')}</p>
            <p className="text-neutral-600 leading-relaxed">{t('about.missionP3')}</p>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-xl aspect-[4/3]">
            <img src="https://images.pexels.com/photos/38411738/pexels-photo-38411738.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-neutral-100/60 py-16 lg:py-20">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-neutral-900">{t('about.valuesTitle')}</h2>
            <p className="text-neutral-500 mt-2">{t('about.valuesSubtitle')}</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <div key={i} className="card p-6 flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                  <v.icon className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-1">{v.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16 lg:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-neutral-900">{t('about.historyTitle')}</h2>
          <p className="text-neutral-500 mt-2">{t('about.historySubtitle')}</p>
        </div>
        <div className="max-w-3xl mx-auto space-y-0">
          {milestones.map((m, i) => (
            <div key={i} className="flex gap-6 pb-8 last:pb-0">
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-primary-600 text-white font-bold text-sm flex items-center justify-center shrink-0">{m.year}</div>
                {i < milestones.length - 1 && <div className="w-0.5 flex-1 bg-neutral-200 mt-2" />}
              </div>
              <div className="pt-3"><p className="text-neutral-700 leading-relaxed">{m.text}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page pb-16">
        <div className="rounded-3xl bg-gradient-to-br from-primary-600 to-primary-700 p-8 lg:p-12 text-center text-white">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">{t('about.ctaTitle')}</h2>
          <p className="text-primary-100 max-w-xl mx-auto mb-6">{t('about.ctaDesc')}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/verkaufen" className="btn-secondary">{t('cta.sellBtn')} <ArrowRight className="w-4 h-4" /></Link>
            <Link to="/kaufen" className="btn-secondary">{t('cta.buyBtn')} <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
