// @vitest-environment node
import { describe, expect, it } from 'vitest'
import SubmitButton from '@/components/controls/SubmitButton.astro'
import { render } from '../lib/container'

describe('SubmitButton.astro', () => {
  it('wraps slotted content inside a single submit button (a Button with El="button")', async () => {
    const { $ } = await render(SubmitButton, {
      props: { id: 'btn' },
      slots: { default: 'Jetzt anmelden' },
    })
    expect($('button[type="submit"]#btn')).toHaveLength(1)
    expect($('button').text()).toContain('Jetzt anmelden')
    expect($('a')).toHaveLength(0)
  })

  it('embeds an inline SVG spinner sibling before the slotted content', async () => {
    const { $ } = await render(SubmitButton, { slots: { default: 'Senden' } })
    expect($('button svg')).toHaveLength(1)
    // SubmitButton nests a spinner span inside Button's wrapper span, so the
    // button contains exactly two nested <span> elements — Button's outer
    // Em wrapper plus SubmitButton's inner flex row holding the SVG and the
    // slot text.
    expect($('button span')).toHaveLength(2)
    // The innermost span is the SVG's parent. `is('span')` reads the parent
    // tag name structurally — short navigation, no property walking.
    expect($('button svg').parent().is('span')).toBe(true)
  })

  it('still renders the spinner SVG when given no slot content', async () => {
    const { $ } = await render(SubmitButton)
    expect($('button[type="submit"]')).toHaveLength(1)
    expect($('button svg')).toHaveLength(1)
  })
})
