// @vitest-environment node
import { describe, expect, it } from 'vitest'
import PreBooking from '@/components/blocks/PreBooking.astro'
import { render } from '../lib/container'

describe('PreBooking.astro', () => {
  it('emits the loading <dialog id="prebooking"> with the spinner svg and the "in progress" text', async () => {
    const { $ } = await render(PreBooking)
    expect($('dialog#prebooking')).toHaveLength(1)
    expect($('dialog#prebooking svg')).toHaveLength(1)
    expect($('dialog#prebooking p').text()).toContain('Die Buchung wird durchgeführt')
  })

  it('emits the IBAN pre-booking form wrapper containing a single form', async () => {
    const { $ } = await render(PreBooking)
    const wrapper = $('#prebooking-iban-form')
    expect(wrapper).toHaveLength(1)
    // Visibility is a Tailwind `hidden` utility concern toggled client-side
    // — a CSS-class check on it would rot for styling reasons, not
    // correctness (spec: "DOM structure assertions only"). Assert structure.
    expect(wrapper.find('form')).toHaveLength(1)
  })

  it('renders the IBAN prompt heading and explanation paragraph', async () => {
    const { $ } = await render(PreBooking)
    expect($('#prebooking-iban-form h3').text()).toBe('IBAN erforderlich')
    expect($('#prebooking-iban-form p').first().text()).toContain('SEPA-Lastschrift')
  })

  it('embeds the IBAN input and SEPA mandate checkbox inside the pre-booking form', async () => {
    const { $ } = await render(PreBooking)
    expect(
      $('#prebooking-iban-form input[data-iban-validation][id="prebooking-iban"]'),
    ).toHaveLength(1)
    expect(
      $('#prebooking-iban-form input[type="checkbox"][id="prebooking-sepa-mandate"]'),
    ).toHaveLength(1)
  })

  it('renders the "Buchung abschließen" submit button inside the IBAN form', async () => {
    const { $ } = await render(PreBooking)
    expect($('#prebooking-iban-form button[type="submit"]#prebooking-iban-submit')).toHaveLength(1)
    expect($('#prebooking-iban-submit').text()).toContain('Buchung abschließen')
  })

  it('exposes exactly one <dialog> element (the loading dialog), no stray dialogs', async () => {
    const { $ } = await render(PreBooking)
    expect($('dialog')).toHaveLength(1)
  })
})
