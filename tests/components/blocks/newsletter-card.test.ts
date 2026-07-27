// @vitest-environment node
import { describe, expect, it } from 'vitest'
import NewsletterCard from '@/components/blocks/NewsletterCard.astro'
import { render } from '../lib/container'

describe('NewsletterCard.astro — general subscription form (no `topic`)', () => {
  it('renders the heading and description, the email input, and three category switches by default', async () => {
    const { $ } = await render(NewsletterCard, { props: { description: 'Bleib dran' } })
    expect($('h3').text()).toBe('Bleib auf dem Laufenden')
    expect($('p').first().text()).toBe('Bleib dran')
    expect($('form#newsletter-form')).toHaveLength(1)
    expect($('input[type="email"][id="email"][name="email"]')).toHaveLength(1)
    expect($('input[id="email"]').attr('autocomplete')).toBe('email')
    expect($('input[id="email"]').attr('placeholder')).toBe('Deine E-Mail-Adresse')
    // Three category switches: Allgemein / Fitness / Events.
    expect($('input[type="checkbox"][id="general"]')).toHaveLength(1)
    expect($('input[type="checkbox"][id="fitness"]')).toHaveLength(1)
    expect($('input[type="checkbox"][id="events"]')).toHaveLength(1)
  })

  it('renders the Abo/Abmelden ButtonSwitch with a hidden abo checkbox (default checked)', async () => {
    const { $ } = await render(NewsletterCard, {})
    expect($('#abo')).toHaveLength(1)
    expect($('#abo').attr('checked')).toBeDefined()
    // ButtonSwitch emits two label-less buttons labelled Abonnieren / Abmelden.
    expect($('button#left').text()).toBe('Abonnieren')
    expect($('button#right').text()).toBe('Abmelden')
  })

  it('submits via a single <button type="submit"> labelled "Absenden" when no topic is set', async () => {
    const { $ } = await render(NewsletterCard, {})
    expect($('button[type="submit"]')).toHaveLength(1)
    expect($('button[type="submit"]').text()).toContain('Absenden')
  })

  it('emits a privacy blurb linking to /datenschutz', async () => {
    const { $ } = await render(NewsletterCard, {})
    const link = $('a[href="/datenschutz"]')
    expect(link).toHaveLength(1)
    expect(link.text()).toBe('Datenschutzerklärung')
  })
})

describe('NewsletterCard.astro — topic-scoped variant', () => {
  it('omits the Abo/Abmelden ButtonSwitch and the three switches when a topic is set', async () => {
    const { $ } = await render(NewsletterCard, { props: { topic: 'fitness' } })
    expect($('#abo')).toHaveLength(1) // present as a hidden input below
    expect($('#abo[checked]')).toHaveLength(1)
    expect($('button#left')).toHaveLength(0)
    expect($('button#right')).toHaveLength(0)
    expect($('#general')).toHaveLength(0)
    expect($('#fitness')).toHaveLength(1)
    expect($('#events')).toHaveLength(0)
  })

  it('emits a hidden checked topic input matching the supplied topic', async () => {
    const { $ } = await render(NewsletterCard, { props: { topic: 'events' } })
    expect($('input[type="hidden"][id="events"][name="events"][checked]')).toHaveLength(1)
  })

  it('labels the submit button "Anmelden" when a topic is set', async () => {
    const { $ } = await render(NewsletterCard, { props: { topic: 'general' } })
    expect($('button[type="submit"]').text()).toContain('Anmelden')
  })
})
