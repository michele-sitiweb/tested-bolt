import { useState } from 'react';
import {
  Smartphone, Tablet, Laptop, Watch, Headphones, Gamepad2, Camera,
  ArrowRight, ArrowLeft, Check, Shield, Truck, Banknote, Clock,
  Sparkles, PackageSearch,
} from 'lucide-react';
import { Link } from '@/lib/router';
import { formatPrice } from '@/lib/format';
import { useI18n } from '@/lib/i18n';

const deviceTypeSlugs = ['smartphones', 'tablets', 'notebooks', 'smartwatches', 'headphones', 'consoles', 'cameras'];
const deviceIcons: Record<string, typeof Smartphone> = {
  smartphones: Smartphone, tablets: Tablet, notebooks: Laptop,
  smartwatches: Watch, headphones: Headphones, consoles: Gamepad2, cameras: Camera,
};

const conditions = [
  { value: 'like-new', mult: 1.0 },
  { value: 'very-good', mult: 0.85 },
  { value: 'good', mult: 0.7 },
  { value: 'fair', mult: 0.55 },
];

const brandMap: Record<string, string[]> = {
  smartphones: ['Apple', 'Samsung', 'Google', 'Xiaomi', 'OnePlus'],
  tablets: ['Apple', 'Samsung', 'Lenovo'],
  notebooks: ['Apple', 'Lenovo', 'Dell', 'HP', 'Asus'],
  smartwatches: ['Apple', 'Samsung', 'Garmin', 'Fitbit'],
  headphones: ['Apple', 'Sony', 'Bose', 'Sennheiser'],
  consoles: ['Sony', 'Microsoft', 'Nintendo'],
  cameras: ['Canon', 'Sony', 'Nikon', 'Panasonic'],
};

const basePrices: Record<string, number> = {
  smartphones: 350, tablets: 400, notebooks: 700, smartwatches: 200,
  headphones: 180, consoles: 350, cameras: 800,
};

export function SellPage() {
  const { t } = useI18n();
  const [step, setStep] = useState(1);
  const [deviceType, setDeviceType] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [condition, setCondition] = useState('');
  const [offer, setOffer] = useState<number | null>(null);

  const calculateOffer = () => {
    const base = basePrices[deviceType] || 300;
    const cond = conditions.find((c) => c.value === condition);
    const multiplier = cond?.mult || 0.7;
    const brandBonus = brand === 'Apple' ? 1.3 : brand === 'Sony' ? 1.15 : 1.0;
    const modelBonus = model.length > 2 ? 1.05 : 1.0;
    setOffer(Math.round((base * multiplier * brandBonus * modelBonus) / 5) * 5);
  };

  const next = () => { if (step < 3) { if (step === 2) calculateOffer(); setStep(step + 1); } };
  const back = () => step > 1 && setStep(step - 1);
  const canProceed = (s: number) => {
    if (s === 1) return !!deviceType;
    if (s === 2) return !!brand && !!model && !!condition;
    return true;
  };

  const benefits = [
    { icon: Clock, title: t('sell.benefit1Title'), desc: t('sell.benefit1Desc') },
    { icon: Banknote, title: t('sell.benefit2Title'), desc: t('sell.benefit2Desc') },
    { icon: Truck, title: t('sell.benefit3Title'), desc: t('sell.benefit3Desc') },
    { icon: Shield, title: t('sell.benefit4Title'), desc: t('sell.benefit4Desc') },
  ];

  const conditionOptions = [
    { value: 'like-new', label: t('sell.condLikeNew'), desc: t('sell.condLikeNewDesc') },
    { value: 'very-good', label: t('sell.condVeryGood'), desc: t('sell.condVeryGoodDesc') },
    { value: 'good', label: t('sell.condGood'), desc: t('sell.condGoodDesc') },
    { value: 'fair', label: t('sell.condFair'), desc: t('sell.condFairDesc') },
  ];

  return (
    <div className="animate-fade-in">
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container-page py-12 lg:py-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 badge bg-white/20 text-white px-3 py-1.5 mb-4">
              <Sparkles className="w-4 h-4" />{t('sell.badge')}
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold mb-4">{t('sell.title')}</h1>
            <p className="text-primary-100 text-lg">{t('sell.desc')}</p>
          </div>
        </div>
      </div>

      <div className="container-page -mt-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((b, i) => (
            <div key={i} className="card p-5">
              <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center mb-3">
                <b.icon className="w-5 h-5 text-primary-600" />
              </div>
              <p className="text-sm font-semibold text-neutral-900">{b.title}</p>
              <p className="text-xs text-neutral-500 mt-0.5">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="container-page py-12 lg:py-16">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-10">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${step >= s ? 'bg-primary-600 text-white' : 'bg-neutral-200 text-neutral-400'}`}>
                  {step > s ? <Check className="w-4 h-4" /> : s}
                </div>
                {s < 3 && <div className={`w-12 h-0.5 ${step > s ? 'bg-primary-600' : 'bg-neutral-200'}`} />}
              </div>
            ))}
          </div>

          <div className="card p-6 lg:p-10">
            {step === 1 && (
              <div className="animate-fade-in-up">
                <h2 className="text-2xl font-bold text-neutral-900 mb-2">{t('sell.step1Title')}</h2>
                <p className="text-neutral-500 mb-6">{t('sell.step1Desc')}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {deviceTypeSlugs.map((slug) => {
                    const Icon = deviceIcons[slug];
                    return (
                      <button key={slug} onClick={() => { setDeviceType(slug); setBrand(''); setModel(''); setCondition(''); }}
                        className={`flex flex-col items-center gap-3 p-5 rounded-xl border-2 transition-all ${deviceType === slug ? 'border-primary-500 bg-primary-50' : 'border-neutral-200 hover:border-primary-300 hover:bg-neutral-50'}`}>
                        <Icon className={`w-7 h-7 ${deviceType === slug ? 'text-primary-600' : 'text-neutral-500'}`} />
                        <span className={`text-sm font-medium ${deviceType === slug ? 'text-primary-700' : 'text-neutral-700'}`}>
                          {slug === 'smartphones' ? 'Smartphone' : slug === 'tablets' ? 'Tablet' : slug === 'notebooks' ? 'Notebook' :
                           slug === 'smartwatches' ? 'Smartwatch' : slug === 'headphones' ? 'Headphones' : slug === 'consoles' ? 'Console' : 'Camera'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-fade-in-up">
                <h2 className="text-2xl font-bold text-neutral-900 mb-2">{t('sell.step2Title')}</h2>
                <p className="text-neutral-500 mb-6">{t('sell.step2Desc')}</p>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">{t('sell.step2Brand')}</label>
                    <div className="flex flex-wrap gap-2">
                      {(brandMap[deviceType] || []).map((b) => (
                        <button key={b} onClick={() => setBrand(b)}
                          className={`px-4 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${brand === b ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-neutral-200 hover:border-primary-300 text-neutral-700'}`}>
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">{t('sell.step2Model')}</label>
                    <input type="text" value={model} onChange={(e) => setModel(e.target.value)} placeholder={t('sell.step2ModelPlaceholder')} className="input" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">{t('sell.step2Condition')}</label>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {conditionOptions.map((c) => (
                        <button key={c.value} onClick={() => setCondition(c.value)}
                          className={`text-left p-4 rounded-xl border-2 transition-all ${condition === c.value ? 'border-primary-500 bg-primary-50' : 'border-neutral-200 hover:border-primary-300'}`}>
                          <p className={`text-sm font-semibold ${condition === c.value ? 'text-primary-700' : 'text-neutral-900'}`}>{c.label}</p>
                          <p className="text-xs text-neutral-500 mt-0.5">{c.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && offer !== null && (
              <div className="animate-fade-in-up text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success-100 mb-4">
                  <PackageSearch className="w-8 h-8 text-success-600" />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-2">{t('sell.step3Title')}</h2>
                <p className="text-neutral-500 mb-6">{t('sell.step3Desc')}</p>
                <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8 mb-6">
                  <p className="text-sm text-neutral-500 mb-1">{t('sell.wePay')}</p>
                  <p className="text-5xl font-bold text-primary-600 mb-2">{formatPrice(offer)}</p>
                  <p className="text-sm text-neutral-500">{brand} {model}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button className="btn-primary">{t('sell.accept')}<ArrowRight className="w-4 h-4" /></button>
                  <Link to="/kaufen" className="btn-secondary">{t('sell.ratherBuy')}</Link>
                </div>
                <div className="flex items-center justify-center gap-6 mt-8 text-xs text-neutral-500">
                  <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-primary-500" />{t('sell.certData')}</span>
                  <span className="flex items-center gap-1.5"><Truck className="w-4 h-4 text-primary-500" />{t('sell.benefit3Title')}</span>
                </div>
              </div>
            )}

            {step < 3 && (
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-neutral-100">
                <button onClick={back} disabled={step === 1} className="btn-ghost disabled:opacity-0">
                  <ArrowLeft className="w-4 h-4" />{t('sell.back')}
                </button>
                <button onClick={next} disabled={!canProceed(step)} className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
                  {t('sell.next')}<ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
