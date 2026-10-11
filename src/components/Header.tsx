import { useState } from 'react';
import { Search, Menu, X, Recycle, Globe, Check } from 'lucide-react';
import { Link, useRouter } from '@/lib/router';
import { useI18n, languages, type Lang } from '@/lib/i18n';

export function Header() {
  const { path } = useRouter();
  const { t, lang, setLang } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const navItems = [
    { label: t('nav.buy'), to: '/kaufen' },
    { label: t('nav.sell'), to: '/verkaufen' },
    { label: t('nav.about'), to: '/about' },
    { label: t('nav.help'), to: '/hilfe' },
  ];

  const isActive = (to: string) => path === to || (to !== '/' && path.startsWith(to));

  const currentLang = languages.find((l) => l.code === lang);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      <div className="container-page">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary-600 text-white group-hover:bg-primary-700 transition-colors">
                <Recycle className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold tracking-tight text-neutral-900">
                tested<span className="text-primary-600">before</span>
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.to)
                      ? 'text-primary-700 bg-primary-50'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="hidden md:flex items-center gap-2">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-neutral-600 hover:bg-neutral-100 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="text-base">{currentLang?.flag}</span>
                <span className="font-medium">{currentLang?.code.toUpperCase()}</span>
              </button>
              {langOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setLangOpen(false)} />
                  <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-neutral-200 py-1 z-20 animate-slide-down">
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => { setLang(l.code as Lang); setLangOpen(false); }}
                        className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors ${
                          lang === l.code ? 'bg-primary-50 text-primary-700 font-medium' : 'text-neutral-700 hover:bg-neutral-100'
                        }`}
                      >
                        <span className="text-base">{l.flag}</span>
                        <span>{l.label}</span>
                        {lang === l.code && <Check className="w-4 h-4 ml-auto" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            <button className="p-2.5 rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors" aria-label={t('buy.searchPlaceholder')}>
              <Search className="w-5 h-5" />
            </button>
            <Link to="/verkaufen" className="btn-primary ml-2">
              {t('nav.sellBtn')}
            </Link>
          </div>

          <div className="flex md:hidden items-center gap-1">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="p-2 rounded-lg text-neutral-600 hover:bg-neutral-100"
            >
              <span className="text-base">{currentLang?.flag}</span>
            </button>
            <button
              className="p-2 rounded-lg text-neutral-600 hover:bg-neutral-100"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile language dropdown */}
        {langOpen && (
          <div className="md:hidden pb-3 animate-slide-down">
            <div className="grid grid-cols-5 gap-1">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => { setLang(l.code as Lang); setLangOpen(false); }}
                  className={`flex flex-col items-center gap-1 py-2 rounded-lg text-xs transition-colors ${
                    lang === l.code ? 'bg-primary-50 text-primary-700 font-medium' : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <span className="text-lg">{l.flag}</span>
                  {l.code.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        )}

        {mobileOpen && (
          <div className="md:hidden pb-4 animate-slide-down">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.to)
                      ? 'text-primary-700 bg-primary-50'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link to="/verkaufen" onClick={() => setMobileOpen(false)} className="btn-primary mt-2">
                {t('nav.sellBtn')}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
