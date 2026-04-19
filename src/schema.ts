import { SITE } from '@/config.mjs'
import type { ImageMetadata } from 'astro'
import { getImage } from 'astro:assets'
import type { Organization, PostalAddress, Thing, WebSite } from 'schema-dts'

export const mainTelephone = '+49 7459 1204'
export const mainEmail = 'info@sv-eutingen.de'

export function organizationId(site: URL | string): string {
  return `${String(site).replace(/\/$/, '')}/#organization`
}

export function buildOrganization(site: URL | string): Extract<Organization, object> {
  return {
    '@id': organizationId(site),
    '@type': 'Organization',
    name: SITE.name,
    url: String(site),
    telephone: mainTelephone,
    email: mainEmail,
    address: postalAddress,
    logo: new URL(SITE.logo.src, site).toString(),
    foundingDate: '1947',
    sameAs: [
      'https://facebook.com/sveutingen',
      'https://www.youtube.com/channel/UC6QXvcCp9CpHl4az3idhkYQ',
    ],
  }
}

export function organizationRef(site: URL | string): { '@id': string; '@type': 'Organization' } {
  return {
    '@id': organizationId(site),
    '@type': 'Organization',
  }
}

export const postalAddress: PostalAddress = {
  '@type': 'PostalAddress',
  streetAddress: 'Marktstraße 84',
  postalCode: '72184',
  addressLocality: 'Eutingen im Gäu',
  addressCountry: 'DE',
}

export function schemaJsonLd<T extends Thing & object>(schema: T): string {
  return JSON.stringify({ '@context': 'https://schema.org', ...schema })
}

export function schemaGraphJsonLd(schemas: (Thing & object)[]): string {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': schemas })
}

export function buildWebSite(site: URL | string): Extract<WebSite, object> {
  return {
    '@type': 'WebSite',
    name: SITE.name,
    url: String(site).replace(/\/$/, '') + '/',
  }
}

export function pageUrl(pathname: string, site: URL | string): string {
  return new URL(pathname, site).toString()
}

export async function schemaImage(image: ImageMetadata, site: URL | string): Promise<string> {
  const processed = await getImage({ src: image, width: 1200, height: 628 })
  return new URL(processed.src, site).toString()
}
