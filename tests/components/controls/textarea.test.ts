// @vitest-environment node
import { describe, expect, it } from 'vitest'
import Textarea from '@/components/controls/Textarea.astro'
import { render } from '../lib/container'

describe('Textarea.astro', () => {
  it('renders a labelled <textarea> with id and name', async () => {
    const { $ } = await render(Textarea, {
      props: { id: 'comment', name: 'comment', label: 'Kommentar (optional)' },
    })
    expect($('div > label[for="comment"]').text()).toBe('Kommentar (optional)')
    expect($('textarea[id="comment"][name="comment"]')).toHaveLength(1)
  })

  it('omits label when not given', async () => {
    const { $ } = await render(Textarea, { props: { id: 'notes', name: 'notes' } })
    expect($('label')).toHaveLength(0)
    expect($('textarea[id="notes"]')).toHaveLength(1)
  })

  it('always emits a <textarea>, never an <input>', async () => {
    const { $ } = await render(Textarea, { props: { id: 'x', name: 'x' } })
    expect($('textarea')).toHaveLength(1)
    expect($('input')).toHaveLength(0)
  })
})
