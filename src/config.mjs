import defaultImage from './assets/images/default.png'

const CONFIG = {
  name: 'SV Eutingen 1947 e.V.',

  basePathname: '/',
  trailingSlash: false,

  title: 'SV Eutingen 1947 e.V. - #mehralseinverein',
  description:
    'Willkommen beim SV Eutingen – Ihrem Verein für Sport und Gemeinschaft in Eutingen im Gäu. Entdecken Sie unser breites Angebot an Sportarten für Jung und Alt. Von Fußball über Volleyball bis hin zu Fitnesskursen bieten wir vielfältige Möglichkeiten, aktiv zu sein und Freundschaften zu knüpfen. Erfahren Sie mehr über unseren Verein und treten Sie unserer sportlichen Gemeinschaft bei.',
  defaultImage: defaultImage,

  language: 'de',
  textDirection: 'ltr',

  dateFormatter: new Intl.DateTimeFormat('de', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'GMT'
  })
}

export const SITE = { ...CONFIG }
export const DATE_FORMATTER = CONFIG.dateFormatter
