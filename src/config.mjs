import defaultImage from './assets/meta/default.png'

const CONFIG = {
  name: 'SV Eutingen 1947 e.V.',

  basePathname: '/',
  trailingSlash: false,

  title: 'SV Eutingen 1947 e.V. - #mehralseinverein',
  description:
    'Willkommen beim SV Eutingen - Dein Verein für Sport und Gemeinschaft in Eutingen im Gäu. Entdecke unser umfangreiches Sportangebot für Jung und Alt. Von Fußball über Volleyball bis hin zu Fitnesskursen bieten wir viele Möglichkeiten aktiv zu sein und Freundschaften zu knüpfen. Erfahre mehr über unseren Verein und werde Teil unserer sportlichen Gemeinschaft.',
  defaultImage: defaultImage,

  language: 'de',
  textDirection: 'ltr',

  imageWidths: [240, 540, 720, 1200],
  imageFormats: ['avif', 'webp']
}

export const SITE = { ...CONFIG }
export const DATE_FORMATTER = CONFIG.dateFormatter
