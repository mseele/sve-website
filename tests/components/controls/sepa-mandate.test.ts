// @vitest-environment node
import { describe, expect, it } from 'vitest'
import SepaMandate from '@/components/controls/SepaMandate.astro'
import { render } from '../lib/container'

describe('SepaMandate.astro', () => {
  it('delegates to Checkbox with the SEPA mandate consent string for the default creditor', async () => {
    const { $ } = await render(SepaMandate, { props: { id: 'sepa', name: 'sepa' } })
    expect($('input[type="checkbox"][id="sepa"][name="sepa"]')).toHaveLength(1)
    expect($('label[for="sepa"]').last().text()).toContain('SV Eutingen 1947 e.V.')
    expect($('label[for="sepa"]').last().text()).toContain('SEPA-Lastschrift')
  })

  it('uses the supplied creditor name when present (external operator)', async () => {
    const { $ } = await render(SepaMandate, {
      props: { id: 'sepa', name: 'sepa', creditor: 'Förderverein SV Eutingen 1947 e.V.' },
    })
    // Default creditor is bare "SV Eutingen 1947 e.V."; the suplied creditor
    // carries the "Förderverein" prefix — the title text must read that prefix.
    expect($('label[for="sepa"]').last().text()).toContain('den Förderverein SV Eutingen 1947 e.V.')
  })

  it('renders exactly one checkbox (no nested inputs leak)', async () => {
    const { $ } = await render(SepaMandate, { props: { id: 's', name: 's' } })
    expect($('input')).toHaveLength(1)
  })
})
