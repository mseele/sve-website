// @vitest-environment node
import { describe, expect, it } from 'vitest'
import Select from '@/components/controls/Select.astro'
import { render } from '../lib/container'

describe('Select.astro', () => {
  const values = [
    { value: 'a', label: 'Alpha' },
    { value: 'b', label: 'Bravo', selected: true },
    { value: 'c', label: 'Charlie', disabled: true },
  ]

  it('renders a labelled <select> with id/name and the given options', async () => {
    const { $ } = await render(Select, { props: { id: 'payment', name: 'payment', values } })
    expect($('div > label[for="payment"]')).toHaveLength(1)
    expect($('select[id="payment"][name="payment"]')).toHaveLength(1)
    expect($('select > option')).toHaveLength(3)
  })

  it('renders option labels as text content and keeps values on the option attrs', async () => {
    const { $ } = await render(Select, { props: { id: 'p', name: 'p', values } })
    const opts = $('select > option').toArray()
    expect($(opts[0]).attr('value')).toBe('a')
    expect($(opts[0]).text()).toBe('Alpha')
    expect($(opts[1]).attr('value')).toBe('b')
    expect($(opts[1]).text()).toBe('Bravo')
    expect($(opts[2]).attr('value')).toBe('c')
  })

  it('honours selected and disabled per-option flags', async () => {
    const { $ } = await render(Select, { props: { id: 'p', name: 'p', values } })
    expect($('option[selected]')).toHaveLength(1)
    expect($('option[selected]').attr('value')).toBe('b')
    expect($('option[disabled]')).toHaveLength(1)
    expect($('option[disabled]').attr('value')).toBe('c')
  })

  it('wraps the select with a data-field attribute set to the id', async () => {
    const { $ } = await render(Select, { props: { id: 'pay', name: 'pay', values } })
    expect($('div[data-field="pay"]')).toHaveLength(1)
  })

  it('hides the whole field when hidden prop is true', async () => {
    const { $ } = await render(Select, { props: { id: 'pay', name: 'pay', values, hidden: true } })
    // The wrapping <div> gains the Tailwind `hidden` class via `class:list`.
    expect($('div[data-field="pay"].hidden')).toHaveLength(1)
    // The <select> element gets the HTML boolean `hidden` attribute.
    expect($('select[hidden]')).toHaveLength(1)
  })
})
