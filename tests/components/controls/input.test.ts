// @vitest-environment node
import { describe, expect, it } from 'vitest'
import Input from '@/components/controls/Input.astro'
import { render } from '../lib/container'

describe('Input.astro', () => {
  it('renders a labelled input bound to id/name', async () => {
    const { $ } = await render(Input, {
      props: { id: 'firstname', name: 'firstname', label: 'Vorname' },
    })
    expect($('div > label[for="firstname"]')).toHaveLength(1)
    expect($('div > label[for="firstname"]').text()).toBe('Vorname')
    expect($('div > input[id="firstname"][name="firstname"]')).toHaveLength(1)
  })

  it('omits the label entirely when label prop is undefined', async () => {
    const { $ } = await render(Input, { props: { id: 'phone', name: 'phone' } })
    expect($('label')).toHaveLength(0)
    expect($('input[id="phone"][name="phone"]')).toHaveLength(1)
  })

  it('forwards type="email" and placeholder attribute', async () => {
    const { $ } = await render(Input, {
      props: { id: 'email', name: 'email', type: 'email', placeholder: 'du@beispiel.de' },
    })
    expect($('input[type="email"]')).toHaveLength(1)
    expect($('input').attr('placeholder')).toBe('du@beispiel.de')
  })

  it('passes through extra HTML attributes via the spread attrs', async () => {
    const { $ } = await render(Input, {
      props: { id: 'phone', name: 'phone', type: 'tel', autocomplete: 'tel' },
    })
    expect($('input[autocomplete="tel"]')).toHaveLength(1)
    expect($('input[type="tel"]')).toHaveLength(1)
  })
})
