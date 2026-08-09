// @vitest-environment node
import { describe, expect, it } from 'vitest'
import Checkbox from '@/components/controls/Checkbox.astro'
import { render } from '../lib/container'

describe('Checkbox.astro', () => {
  it('renders a checkbox input bound to id/name, with the title as the second label', async () => {
    const { $ } = await render(Checkbox, {
      props: { id: 'member', name: 'member', title: 'Ich bin Mitglied' },
    })
    expect($('input[type="checkbox"][id="member"][name="member"]')).toHaveLength(1)
    // Two labels point at the same id — the visual box label + the title label.
    expect($('label[for="member"]')).toHaveLength(2)
    expect($('label[for="member"]').last().text()).toBe('Ich bin Mitglied')
  })

  it('omits the description <span> when description prop is not supplied', async () => {
    const { $ } = await render(Checkbox, {
      props: { id: 'consent', name: 'consent', title: 'Einwilligung' },
    })
    expect($('span')).toHaveLength(0)
  })

  it('renders the description inside a span under the title row', async () => {
    const { $ } = await render(Checkbox, {
      props: { id: 'consent', name: 'consent', title: 'Einwilligung', description: 'zwei Zeilen' },
    })
    expect($('span').text()).toContain('zwei Zeilen')
  })

  it('renders checked only when the checked prop is true', async () => {
    const { $ } = await render(Checkbox, {
      props: { id: 'c', name: 'c', title: 't', checked: true },
    })
    expect($('input[checked]')).toHaveLength(1)

    const { $: $un } = await render(Checkbox, {
      props: { id: 'c', name: 'c', title: 't' },
    })
    expect($un('input[checked]')).toHaveLength(0)
  })

  it('contains an SVG check mark inline (the visual indicator)', async () => {
    const { $ } = await render(Checkbox, { props: { id: 'c', name: 'c', title: 't' } })
    expect($('svg path[d="M20 6 9 17l-5-5"]')).toHaveLength(1)
  })
})
