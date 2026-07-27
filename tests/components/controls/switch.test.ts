// @vitest-environment node
import { describe, expect, it } from 'vitest'
import Switch from '@/components/controls/Switch.astro'
import { render } from '../lib/container'

describe('Switch.astro', () => {
  it('renders a title label and a hidden checkbox underneath the toggle', async () => {
    const { $ } = await render(Switch, {
      props: { id: 'general', name: 'general', title: 'Allgemein' },
    })
    expect($('label[for="general"]')).toHaveLength(2)
    expect($('label[for="general"]').first().text()).toBe('Allgemein')
    expect($('input[type="checkbox"][id="general"][name="general"]')).toHaveLength(1)
  })

  it('omits the description span when undefined', async () => {
    const { $ } = await render(Switch, {
      props: { id: 'a', name: 'a', title: 't' },
    })
    expect($('span')).toHaveLength(1) // the toggle knob span only
  })

  it('renders the description in a span below the title row', async () => {
    const { $ } = await render(Switch, {
      props: { id: 'fitness', name: 'fitness', title: 'Fitness', description: 'Fit' },
    })
    // knob span + description span
    expect($('span')).toHaveLength(2)
    expect($('span').last().text()).toBe('Fit')
  })

  it('reflects the checked prop onto the checkbox', async () => {
    const { $ } = await render(Switch, {
      props: { id: 'events', name: 'events', title: 'e', checked: true },
    })
    expect($('input[checked]')).toHaveLength(1)

    const { $: $un } = await render(Switch, { props: { id: 'e', name: 'e', title: 'e' } })
    expect($un('input[checked]')).toHaveLength(0)
  })
})
