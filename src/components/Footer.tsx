import { Recycle, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import { Link } from '@/lib/router';
import { useI18n } from '@/lib/i18n';

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="bg-neutral-900 text-neutral-300 mt-auto">
      <div className="container-page py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary-600 text-white">
                <Recycle className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white">
                tested<span className="text-primary-400">before</span>
              </span>
            </Link>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-xs">
              {t('footer.desc')}
            </p>
            <div className="flex gap-3 pt-2">
              <a href="#" className="w-9 h-9 flex items-center justify-center rounded-lg bg-neutral-800 hover:bg-primary-600 transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 flex items-center justify-center rounded-lg bg-neutral-800 hover:bg-primary-600 transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 flex items-center justify-center rounded-lg bg-neutral-800 hover:bg-primary-600 transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">{t('footer.buy')}</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/kaufen?category=smartphones" className="hover:text-primary-400 transition-colors">Smartphones</Link></li>
              <li><Link to="/kaufen?category=tablets" className="hover:text-primary-400 transition-colors">Tablets</Link></li>
              <li><Link to="/kaufen?category=notebooks" className="hover:text-primary-400 transition-colors">Notebooks</Link></li>
              <li><Link to="/kaufen?category=smartwatches" className="hover:text-primary-400 transition-colors">Smartwatches</Link></li>
              <li><Link to="/kaufen?category=headphones" className="hover:text-primary-400 transition-colors">Headphones</Link></li>
              <li><Link to="/kaufen?category=consoles" className="hover:text-primary-400 transition-colors">Consoles</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">{t('footer.service')}</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/verkaufen" className="hover:text-primary-400 transition-colors">{t('footer.sell')}</Link></li>
              <li><Link to="/hilfe" className="hover:text-primary-400 transition-colors">{t('footer.help')}</Link></li>
              <li><Link to="/about" className="hover:text-primary-400 transition-colors">{t('footer.about')}</Link></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">{t('footer.privacy')}</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">{t('footer.imprint')}</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">{t('footer.terms')}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 text-primary-400 shrink-0" />
                <span>+49 (0) 421 98 96 87 0</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 text-primary-400 shrink-0" />
                <span>support@testedbefore.de</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-primary-400 shrink-0" />
                <span>{t('footer.hours')}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-500">
            © {new Date().getFullYear()} tested before. {t('footer.rights')}
          </p>
          <div className="flex items-center gap-4 text-xs text-neutral-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-success-400" />
              {t('footer.returns')}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-success-400" />
              {t('footer.warranty')}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
