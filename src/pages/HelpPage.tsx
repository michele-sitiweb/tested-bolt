import { useState } from 'react';
import {
  Mail, Phone, MessageSquare, Search, ChevronDown,
  Shield, Truck, RotateCcw, Banknote,
} from 'lucide-react';
import { useI18n } from '@/lib/i18n';

export function HelpPage() {
  const { t, lang } = useI18n();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [searchFaq, setSearchFaq] = useState('');

  const faqsByLang: Record<string, {q: string; a: string}[]> = {
    it: [
      { q: 'Come vendo il mio dispositivo?', a: 'Scegli la categoria del tuo dispositivo sulla pagina di vendita, inserisci marca, modello e stato. Riceverai subito un\'offerta a prezzo fisso. Accettando, riceverai un\'etichetta di spedizione gratuita (da 30€ di valore d\'acquisto).' },
      { q: 'Quanto tempo richiede il pagamento?', a: 'Non appena il tuo dispositivo sarà arrivato e verificato, il pagamento avverrà entro 3–5 giorni lavorativi sul conto indicato. Presso i nostri partner in loco ricevi subito contanti.' },
      { q: 'Cosa succede ai miei dati sul dispositivo?', a: 'Per ogni dispositivo che ci arriva, controlliamo se ci sono ancora dati privati ed eseguiamo una cancellazione certificata dei dati. Puoi vendere il tuo dispositivo senza preoccupazioni.' },
      { q: 'C\'è una garanzia per l\'acquisto?', a: 'Sì, su dispositivi selezionati ricevi fino a 36 mesi di garanzia dalla data di acquisto. In caso di garanzia, ripariamo o sostituiamo il dispositivo o rimborsiamo l\'importo di acquisto.' },
      { q: 'Posso restituire un dispositivo acquistato?', a: 'Certamente. Puoi restituire ogni dispositivo entro 30 giorni – senza se e senza ma. L\'importo di acquisto ti viene rimborsato integralmente.' },
      { q: 'La spedizione è gratuita?', a: 'Per la vendita ricevi un\'etichetta di spedizione gratuita da 30€ di valore d\'acquisto. Per l\'acquisto la spedizione è gratuita da 30€ di valore del carrello.' },
      { q: 'Da quale valore d\'acquisto viene ritirato il mio dispositivo?', a: 'Da un valore d\'acquisto di 100€ ritiriamo su richiesta il tuo vecchio dispositivo a casa tua. Più semplice di così!' },
      { q: 'Dove si trovano i vostri punti vendita?', a: 'Abbiamo oltre 455 punti vendita in tutta la nazione, tra cui store propri e partner in franchising. Puoi vendere e comprare dispositivi sia online che in loco.' },
    ],
    de: [
      { q: 'Wie verkaufe ich mein Gerät?', a: 'Wähle auf der Verkaufsseite die Kategorie deines Geräts, gib Marke, Modell und Zustand an. Du erhältst sofort ein Festpreisangebot. Beim Annehmen erhältst du einen kostenlosen Versandschein (ab 30 € Ankaufswert).' },
      { q: 'Wie lange dauert die Auszahlung?', a: 'Sobald dein Gerät bei uns eingetroffen ist und geprüft wurde, erfolgt die Auszahlung innerhalb von 3–5 Werktagen auf dein angegebenes Konto. Bei unseren Partnern vor Ort erhältst du sofort Bargeld.' },
      { q: 'Was passiert mit meinen Daten auf dem Gerät?', a: 'Bei jedem Gerät, das bei uns eingeht, prüfen wir, ob noch private Daten vorhanden sind, und führen eine zertifizierte Datenlöschung durch. Du kannst dein Gerät sorgenfrei verkaufen.' },
      { q: 'Gibt es eine Garantie beim Kauf?', a: 'Ja, auf ausgewählte Geräte erhältst du bis zu 36 Monate Garantie ab Kaufdatum. Tritt ein Garantiefall ein, reparieren oder ersetzen wir das Gerät oder erstatten den Kaufbetrag.' },
      { q: 'Kann ich ein gekauftes Gerät zurückgeben?', a: 'Selbstverständlich. Du kannst jedes Gerät innerhalb von 30 Tagen an uns zurückgeben – ohne wenn und aber. Der Kaufbetrag wird dir voll erstattet.' },
      { q: 'Ist der Versand kostenlos?', a: 'Beim Verkauf erhältst du ab 30 € Ankaufswert einen kostenlosen Versandschein. Beim Kauf ist der Versand ab 30 € Warenkorbwert ebenfalls kostenlos.' },
      { q: 'Ab welchem Ankaufswert wird mein Gerät abgeholt?', a: 'Ab einem Ankaufswert von 100 € holen wir dein altes Gerät auf Wunsch bei dir zu Hause ab. Einfacher geht der Verkauf kaum!' },
      { q: 'Wo befinden sich eure Standorte?', a: 'Wir haben über 455 Standorte deutschlandweit, darunter eigene Stores und Franchise-Partner. Du kannst Geräte sowohl online als auch vor Ort verkaufen und kaufen.' },
    ],
    en: [
      { q: 'How do I sell my device?', a: 'Select your device category on the sell page, enter brand, model and condition. You\'ll immediately receive a fixed-price offer. Upon acceptance, you\'ll receive a free shipping label (from €30 purchase value).' },
      { q: 'How long does payment take?', a: 'Once your device has arrived and been tested, payment is made within 3–5 business days to your specified account. At our local partners you receive cash immediately.' },
      { q: 'What happens to my data on the device?', a: 'For every device that arrives, we check whether private data is still present and perform a certified data deletion. You can sell your device worry-free.' },
      { q: 'Is there a warranty for purchases?', a: 'Yes, on selected devices you receive up to 36 months warranty from the date of purchase. In a warranty case, we repair or replace the device or refund the purchase amount.' },
      { q: 'Can I return a purchased device?', a: 'Of course. You can return any device within 30 days – no questions asked. The purchase amount will be fully refunded.' },
      { q: 'Is shipping free?', a: 'For sales you receive a free shipping label from €30 purchase value. For purchases, shipping is free from €30 cart value.' },
      { q: 'From what purchase value is my device picked up?', a: 'From a purchase value of €100, we pick up your old device at home on request. Selling couldn\'t be easier!' },
      { q: 'Where are your locations?', a: 'We have over 455 locations nationwide, including our own stores and franchise partners. You can sell and buy devices both online and on-site.' },
    ],
    fr: [
      { q: 'Comment vendre mon appareil ?', a: 'Sélectionnez la catégorie de votre appareil sur la page de vente, saisissez la marque, le modèle et l\'état. Vous recevrez immédiatement une offre à prix fixe. En l\'acceptant, vous recevrez une étiquette d\'envoi gratuite (dès 30 € de valeur d\'achat).' },
      { q: 'Combien de temps prend le paiement ?', a: 'Dès que votre appareil sera arrivé et vérifié, le paiement sera effectué sous 3 à 5 jours ouvrés sur votre compte. Chez nos partenaires locaux, vous recevez de l\'argent comptant immédiatement.' },
      { q: 'Que se passe-t-il avec mes données sur l\'appareil ?', a: 'Pour chaque appareil qui nous parvient, nous vérifions s\'il reste des données privées et effectuons une suppression certifiée des données. Vous pouvez vendre votre appareil sans souci.' },
      { q: 'Y a-t-il une garantie pour l\'achat ?', a: 'Oui, sur certains appareils, vous bénéficiez jusqu\'à 36 mois de garantie à partir de la date d\'achat. En cas de garantie, nous réparons ou remplaçons l\'appareil ou remboursons le montant d\'achat.' },
      { q: 'Puis-je retourner un appareil acheté ?', a: 'Bien sûr. Vous pouvez retourner tout appareil dans les 30 jours – sans condition. Le montant d\'achat vous sera intégralement remboursé.' },
      { q: 'La livraison est-elle gratuite ?', a: 'Pour la vente, vous recevez une étiquette d\'envoi gratuite dès 30 € de valeur d\'achat. Pour l\'achat, la livraison est gratuite dès 30 € de panier.' },
      { q: 'À partir de quelle valeur d\'achat mon appareil est-il récupéré ?', a: 'À partir d\'une valeur d\'achat de 100 €, nous récupérons votre ancien appareil à domicile sur demande. Plus simple, impossible !' },
      { q: 'Où se trouvent vos points de vente ?', a: 'Nous avons plus de 455 points de vente nationaux, dont nos propres boutiques et des partenaires franchisés. Vous pouvez vendre et acheter des appareils en ligne et sur place.' },
    ],
    es: [
      { q: '¿Cómo vendo mi dispositivo?', a: 'Selecciona la categoría de tu dispositivo en la página de venta, introduce marca, modelo y estado. Recibirás inmediatamente una oferta a precio fijo. Al aceptar, recibirás una etiqueta de envío gratuita (desde 30 € de valor de compra).' },
      { q: '¿Cuánto tarda el pago?', a: 'Una vez que tu dispositivo haya llegado y sido verificado, el pago se realiza en 3-5 días laborables a tu cuenta. En nuestros socios locales recibes efectivo inmediatamente.' },
      { q: '¿Qué pasa con mis datos en el dispositivo?', a: 'Para cada dispositivo que nos llega, verificamos si aún hay datos privados y realizamos un borrado certificado de datos. Puedes vender tu dispositivo sin preocupaciones.' },
      { q: '¿Hay garantía para la compra?', a: 'Sí, en dispositivos seleccionados recibes hasta 36 meses de garantía desde la fecha de compra. En caso de garantía, reparamos o sustituimos el dispositivo o reembolsamos el importe de compra.' },
      { q: '¿Puedo devolver un dispositivo comprado?', a: 'Por supuesto. Puedes devolver cualquier dispositivo dentro de 30 días – sin preguntas. El importe de compra se te reembolsará íntegramente.' },
      { q: '¿El envío es gratis?', a: 'Para la venta recibes una etiqueta de envío gratuita desde 30 € de valor de compra. Para la compra, el envío es gratis desde 30 € de carrito.' },
      { q: '¿Desde qué valor de compra se recoge mi dispositivo?', a: 'Desde un valor de compra de 100 €, recogemos tu viejo dispositivo en casa bajo petición. ¡Más fácil imposible!' },
      { q: '¿Dónde están sus puntos de venta?', a: 'Tenemos más de 455 puntos de venta nationwide, incluidas nuestras propias tiendas y socios de franquicia. Puedes vender y comprar dispositivos tanto online como en el lugar.' },
    ],
  };

  const faqs = faqsByLang[lang] || faqsByLang.it;

  const filteredFaqs = faqs.filter(
    (f) => f.q.toLowerCase().includes(searchFaq.toLowerCase()) || f.a.toLowerCase().includes(searchFaq.toLowerCase())
  );

  const supportCards = [
    { icon: Mail, title: t('help.emailTitle'), value: 'support@testedbefore.de', desc: t('help.emailDesc'), href: 'mailto:support@testedbefore.de' },
    { icon: Phone, title: t('help.phoneTitle'), value: '+49 (0) 421 98 96 87 0', desc: t('help.phoneDesc'), href: 'tel:+494219896870' },
  ];

  const serviceLinks = [
    { icon: Shield, title: t('help.garantieTitle'), desc: t('help.garantieDesc') },
    { icon: RotateCcw, title: t('help.returnsTitle'), desc: t('help.returnsDesc') },
    { icon: Truck, title: t('help.shippingTitle'), desc: t('help.shippingDesc') },
    { icon: Banknote, title: t('help.paymentTitle'), desc: t('help.paymentDesc') },
  ];

  return (
    <div className="animate-fade-in">
      <div className="bg-gradient-to-br from-primary-50 via-white to-white border-b border-neutral-200">
        <div className="container-page py-12 lg:py-16 text-center">
          <div className="inline-flex items-center gap-2 badge bg-primary-100 text-primary-700 px-3 py-1.5 mb-4">
            <MessageSquare className="w-4 h-4" />{t('help.badge')}
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-3">{t('help.title')}</h1>
          <p className="text-neutral-500 max-w-xl mx-auto">{t('help.desc')}</p>
        </div>
      </div>

      <div className="container-page py-10">
        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {supportCards.map((c, i) => (
            <a key={i} href={c.href} className="card p-6 flex items-start gap-4 hover:shadow-md hover:border-primary-200 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center shrink-0 group-hover:bg-primary-100 transition-colors">
                <c.icon className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-900">{c.title}</p>
                <p className="text-sm text-primary-600 font-medium mt-0.5">{c.value}</p>
                <p className="text-xs text-neutral-500 mt-1">{c.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      <section className="container-page pb-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {serviceLinks.map((s, i) => (
            <div key={i} className="card p-5">
              <div className="w-10 h-10 rounded-xl bg-neutral-50 flex items-center justify-center mb-3">
                <s.icon className="w-5 h-5 text-primary-600" />
              </div>
              <p className="text-sm font-semibold text-neutral-900">{s.title}</p>
              <p className="text-xs text-neutral-500 mt-0.5">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-12 lg:py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900">{t('help.faqTitle')}</h2>
            <p className="text-neutral-500 mt-2">{t('help.faqSubtitle')}</p>
          </div>

          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input type="text" placeholder={t('help.faqSearch')} value={searchFaq} onChange={(e) => setSearchFaq(e.target.value)} className="input pl-12" />
          </div>

          <div className="space-y-3">
            {filteredFaqs.map((faq, i) => (
              <div key={i} className="card overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                  <span className="text-sm font-semibold text-neutral-900 pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-neutral-400 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && <div className="px-5 pb-5 text-sm text-neutral-600 leading-relaxed animate-slide-down">{faq.a}</div>}
              </div>
            ))}
            {filteredFaqs.length === 0 && (
              <div className="text-center py-8 text-neutral-500"><p>{t('help.faqNoResults')}</p></div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-neutral-100/60 py-16">
        <div className="container-page max-w-2xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900">{t('help.formTitle')}</h2>
            <p className="text-neutral-500 mt-2">{t('help.formDesc')}</p>
          </div>
          <form className="card p-6 lg:p-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">{t('help.formName')}</label>
                <input type="text" placeholder={t('help.formNamePlaceholder')} className="input" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">{t('help.formEmail')}</label>
                <input type="email" placeholder={t('help.formEmailPlaceholder')} className="input" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">{t('help.formSubject')}</label>
              <input type="text" placeholder={t('help.formSubjectPlaceholder')} className="input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">{t('help.formMessage')}</label>
              <textarea rows={5} placeholder={t('help.formMessagePlaceholder')} className="input resize-none" />
            </div>
            <button type="submit" className="btn-primary w-full"><Mail className="w-4 h-4" />{t('help.formSend')}</button>
          </form>
        </div>
      </section>
    </div>
  );
}
