// @vitest-environment node
//
// `Event.astro` pulls in `Layout` → `MetaTags.astro`, which computes a
// canonical URL against `Astro.site`. `experimental_AstroContainer.create()`
// leaves `Astro.site` undefined (the container defaults elide `site`), so
// `new URL(path, undefined)` throws. We mock `@/components/common/MetaTags.astro`
// with an on-disk Astro stub that drops all SEO/head computation and renders
// nothing — keeping the test about the Event markup, not the Layout head.
import { describe, expect, it, vi } from 'vitest'
import type { CollectionEntry } from 'astro:content'
import Event from '@/components/blocks/Event.astro'
import imageMetadata from '@/assets/events/fit.jpg'
import { EventCustomFieldType, PaymentMethod } from '@/types'
import { render } from '../lib/container'

// vi.mock is hoisted above the static imports above by the vitest transform,
// so Event.astro resolves the mocked MetaTags module during SSR.
vi.mock('@/components/common/MetaTags.astro', async () => await import('../lib/MetaTagsStub.astro'))

// A minimal `CollectionEntry<'events'>`-shaped fixture. The `image` field
// needs to be an `ImageMetadata`; we reuse a real on-disk image and overwrite
// `src` with an absolute URL so `new URL(src, undefined)` (where `Astro.site`
// is undefined inside the container) still resolves cleanly. The fixture is
// typed as `unknown as CollectionEntry<'events'>` rather than `any` so the
// Z-typed `entry.data` shape surfaces type errors on field access.
const entryData = {
  id: 'evt-1',
  name: 'Rückenfit',
  image: { ...imageMetadata, src: 'https://example.com/img.jpg' },
  sortIndex: 1,
  shortDescription: 'Pilates für den Rücken',
  description: '<p>Ein sanfter Kurs.</p>',
  location: 'Clubhaus',
  dates: ['2024-04-08T18:00:00Z', '2024-04-15T18:00:00Z'],
  duration: '60 Min',
  priceMember: '40 €',
  priceNonMember: '60 €',
  externalOperator: false,
  customFields: [{ name: 'Rückenbeschwerden', type: EventCustomFieldType.Text }],
  paymentMethod: PaymentMethod.SepaDirectDebit,
} as CollectionEntry<'events'>['data']

function buildEntry(
  overrides: Partial<CollectionEntry<'events'>['data']> = {},
): CollectionEntry<'events'> {
  return {
    id: 'evt-1',
    collection: 'events',
    data: { ...entryData, ...overrides },
  } as unknown as CollectionEntry<'events'>
}

async function renderEvent(
  overrides: Partial<CollectionEntry<'events'>['data']> = {},
  props: Record<string, unknown> = {},
) {
  return render(Event, {
    props: {
      type: 'events' as const,
      entry: buildEntry(overrides),
      newsletterDescription: 'Erhalte automatisch eine E-Mail sobald neue Events online sind.',
      newsletterText: 'Ich möchte über zukünftige Events per E-Mail informiert werden',
      schemaType: 'Event' as const,
      ...props,
    },
  })
}

describe('Event.astro', () => {
  it('wraps the page in the event identifier stamped on the root <div>', async () => {
    const { $ } = await renderEvent()
    expect($('div[data-identifier="evt-1"]')).toHaveLength(1)
  })

  it('renders the "Beschreibung" section header and the description HTML verbatim', async () => {
    const { $ } = await renderEvent()
    expect($('#beschreibung h2').text()).toBe('Beschreibung')
    expect($('#beschreibung > div > div').html()).toContain('<p>Ein sanfter Kurs.</p>')
  })

  it('emits the Details list with the expected set of detail ids', async () => {
    const { $ } = await renderEvent()
    const titles = $('#details [data-title]')
      .toArray()
      .map((el) => $(el).attr('data-title'))
    expect(titles).toContain('availability')
    expect(titles).toContain('dates')
    expect(titles).toContain('duration')
    expect(titles).toContain('price')
    expect(titles).toContain('location')
  })

  it('renders the price as two member/non-member rows when prices differ', async () => {
    const { $ } = await renderEvent({ priceMember: '40 €', priceNonMember: '60 €' })
    expect($('#details [data-title="price"]')).toHaveLength(2)
    const priceLabels = $('#details [data-label="price"]')
      .toArray()
      .map((el) => $(el).text())
    expect(priceLabels).toEqual(['40 €', '60 €'])
  })

  it('collapses the price into a single "Kostenlos" row when both prices are "0 €"', async () => {
    const { $ } = await renderEvent({ priceMember: '0 €', priceNonMember: '0 €' })
    expect($('#details [data-title="price"]')).toHaveLength(1)
    expect($('#details [data-label="price"]').text()).toBe('Kostenlos')
  })

  it('shows the dates detail as "Termine" (plural) for two dates, "Termin" (singular) for one', async () => {
    const { $: $multi } = await renderEvent({
      dates: ['2024-04-08T18:00:00Z', '2024-04-15T18:00:00Z'],
    })
    expect($multi('#details [data-title="dates"]').text()).toBe('Termine')

    const { $ } = await renderEvent({ dates: ['2024-04-08T18:00:00Z'] })
    expect($('#details [data-title="dates"]').text()).toBe('Termin')
  })

  it('renders the "Termine" section with the same number of <li> entries as dates (multi-date case)', async () => {
    const { $ } = await renderEvent({ dates: ['2024-04-08T18:00:00Z', '2024-04-15T18:00:00Z'] })
    // Two date strings → two <li> rows total (split across two <ul> columns,
    // first column holds ceil(n/2), the second the remainder).
    expect($('main li')).toHaveLength(2)
  })

  it('stamps the Anmeldung form with the standard input roster plus the SEPA-specific fields', async () => {
    const { $ } = await renderEvent()
    // Mandatory personal fields. Use `form#form` to scope inside the booking
    // form; the hidden NewsletterCard teaser under #newsletter-card renders
    // its own form with another `#email`-id input from NewsletterCard.
    for (const id of ['firstname', 'lastname', 'street', 'plz', 'email', 'phone', 'comment']) {
      expect($(`#anmeldung form#form #${id}`)).toHaveLength(1)
    }
    // SEPA-mandate fields appear only because paymentMethod is SepaDirectDebit.
    expect($('#anmeldung form#form input[data-iban-validation]#iban')).toHaveLength(1)
    expect($('#anmeldung form#form #sepa_mandate')).toHaveLength(1)
  })

  it('omits the IBAN / SEPA mandate fields when paymentMethod is BankTransfer', async () => {
    const { $ } = await renderEvent({ paymentMethod: PaymentMethod.BankTransfer })
    expect($('#anmeldung form#form input[data-iban-validation]')).toHaveLength(0)
    expect($('#anmeldung form#form #sepa_mandate')).toHaveLength(0)
  })

  it('renders one custom-field input per eventCustomField entry', async () => {
    const { $ } = await renderEvent({
      customFields: [
        { name: 'Rückenbeschwerden', type: EventCustomFieldType.Text },
        { name: 'Teilnehmer', type: EventCustomFieldType.Number, minValue: 1, maxValue: 4 },
      ],
    })
    expect($('#anmeldung form#form input#customfield')).toHaveLength(2)
    // Number-typed custom field forwards `min` / `max` through the spread attrs.
    const numberField = $('#anmeldung form#form input#customfield').toArray()[1]
    expect($(numberField).attr('type')).toBe('number')
    expect($(numberField).attr('min')).toBe('1')
    expect($(numberField).attr('max')).toBe('4')
  })

  it('emits three consent checkboxes (member, newsletter, consent)', async () => {
    const { $ } = await renderEvent()
    expect($('#anmeldung form#form #member')).toHaveLength(1)
    expect($('#anmeldung form#form #newsletter')).toHaveLength(1)
    expect($('#anmeldung form#form #consent')).toHaveLength(1)
    // All three render as type="checkbox".
    expect($('#anmeldung form#form input#member[type="checkbox"]')).toHaveLength(1)
    expect($('#anmeldung form#form input#consent[type="checkbox"]')).toHaveLength(1)
  })

  it('embeds the NewsletterCard teaser with the supplied newsletter copy', async () => {
    const { $ } = await renderEvent()
    const teaser = $('#newsletter-card')
    expect(teaser).toHaveLength(1)
    expect(teaser.find('p').first().text()).toContain('Erhalte automatisch')
  })

  it('renders the Anmeldung section with its identifier (the booking flow reveals it client-side)', async () => {
    // Visible-vs-hidden is a styling concern — exercised through Tailwind's
    // `hidden` utility which is mutable CSS, not DOM structure. Asserting on
    // the class string would rot for styling reasons per the spec, so we
    // assert only that the section is stamped with its identifier.
    const { $ } = await renderEvent()
    expect($('#anmeldung')).toHaveLength(1)
  })
})
