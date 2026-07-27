// @vitest-environment node
import { describe, expect, it } from 'vitest'
import Button from '@/components/controls/Button.astro'
import { render } from '../lib/container'

describe('Button.astro', () => {
  it('renders an anchor when El is unset (default), with href and slotted label', async () => {
    const { $ } = await render(Button, {
      props: { href: '/foo', emphasis: 'primary' },
      slots: { default: 'Mehr' },
    })
    expect($('a')).toHaveLength(1)
    expect($('a').attr('href')).toBe('/foo')
    expect($('a').text()).toContain('Mehr')
  })

  it('renders a <button type="submit"> when El="button" and type="submit"', async () => {
    const { $ } = await render(Button, {
      props: { El: 'button', type: 'submit', emphasis: 'primary' },
      slots: { default: 'Senden' },
    })
    expect($('button[type="submit"]')).toHaveLength(1)
    expect($('button').text()).toContain('Senden')
    expect($('a')).toHaveLength(0)
  })

  it('reflects the disabled attribute onto the button element', async () => {
    const { $ } = await render(Button, {
      props: { El: 'button', type: 'submit', disabled: true },
      slots: { default: 'x' },
    })
    expect($('button[disabled]')).toHaveLength(1)
  })

  it('forwards the optional id prop', async () => {
    const { $ } = await render(Button, {
      props: { id: 'cta' },
      slots: { default: 'go' },
    })
    expect($('#cta')).toHaveLength(1)
  })

  it('renders a single child span (no fragment-level elements leak)', async () => {
    const { $ } = await render(Button, { slots: { default: 'x' } })
    expect($('a > span')).toHaveLength(1)
    expect($('a > div')).toHaveLength(0)
  })
})
