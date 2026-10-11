import { RouterProvider, useRouter } from '@/lib/router';
import { I18nProvider } from '@/lib/i18n';
import { Layout } from '@/components/Layout';
import { HomePage } from '@/pages/HomePage';
import { BuyPage } from '@/pages/BuyPage';
import { ProductDetailPage } from '@/pages/ProductDetailPage';
import { SellPage } from '@/pages/SellPage';
import { AboutPage } from '@/pages/AboutPage';
import { HelpPage } from '@/pages/HelpPage';
import { useI18n } from '@/lib/i18n';

function NotFoundPage() {
  const { t } = useI18n();
  return (
    <div className="container-page py-20 text-center">
      <h1 className="text-4xl font-bold text-neutral-900 mb-4">{t('404.title')}</h1>
      <p className="text-neutral-500 mb-6">{t('404.desc')}</p>
      <a href="/" className="btn-primary">{t('404.btn')}</a>
    </div>
  );
}

function Routes() {
  const { path } = useRouter();
  const pathname = path.split('?')[0];

  let page;
  if (pathname === '/') {
    page = <HomePage />;
  } else if (pathname === '/kaufen') {
    page = <BuyPage />;
  } else if (pathname.startsWith('/produkt/')) {
    const id = pathname.replace('/produkt/', '');
    page = <ProductDetailPage id={id} />;
  } else if (pathname === '/verkaufen') {
    page = <SellPage />;
  } else if (pathname === '/about') {
    page = <AboutPage />;
  } else if (pathname === '/hilfe') {
    page = <HelpPage />;
  } else {
    page = <NotFoundPage />;
  }

  return <Layout>{page}</Layout>;
}

function App() {
  return (
    <I18nProvider>
      <RouterProvider>
        <Routes />
      </RouterProvider>
    </I18nProvider>
  );
}

export default App;
