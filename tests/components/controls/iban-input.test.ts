// @vitest-environment node
import { describe, expect, it } from 'vitest'
import IbanInput from '@/components/controls/IbanInput.astro'
import { render } from '../lib/container'

describe('IbanInput.astro', () => {
  it('renders a text input with the IBAN-specific markers (autocomplete, data attribute)', async () => {
    const { $ } = await render(IbanInput, { props: { id: 'iban' } })
    expect($('input[type="text"]')).toHaveLength(1)
    expect($('input[autocomplete="iban"]')).toHaveLength(1)
    expect($('input[data-iban-validation]')).toHaveLength(1)
    expect($('input[id="iban"][name="iban"]')).toHaveLength(1)
  })

  it('defaults the label to "IBAN" when no label prop is given', async () => {
    const { $ } = await render(IbanInput, { props: { id: 'iban' } })
    expect($('label[for="iban"]').text()).toBe('IBAN')
  })

  it('uses the supplied label verbatim when provided', async () => {
    const { $ } = await render(IbanInput, { props: { id: 'iban', label: 'Kontonummer' } })
    expect($('label[for="iban"]').text()).toBe('Kontonummer')
  })

  it('uses the fixed German sample IBAN as the placeholder default', async () => {
    const { $ } = await render(IbanInput, { props: { id: 'iban' } })
    expect($('input').attr('placeholder')).toBe('DE89 3704 0044 0532 0130 00')
  })

  it('forwards required and disabled onto the input element', async () => {
    const { $ } = await render(IbanInput, { props: { id: 'iban', required: true, disabled: true } })
    expect($('input[required]')).toHaveLength(1)
    expect($('input[disabled]')).toHaveLength(1)
  })
})
