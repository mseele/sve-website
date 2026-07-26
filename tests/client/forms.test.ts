import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  checkRequiredInput,
  checkRequiredSelect,
  clearCustomValidityOnInput,
  clearCustomValidityOnSelect,
  validateIbanInput,
} from '@/client/forms'

const VALID_IBAN = 'DE89 3704 0044 0532 0130 00'
const MALFORMED_IBAN = 'DE00 0000 0000 0000 0000 00'
const IBAN_ERROR = 'Bitte gib eine gültige IBAN ein.'

type Kind = 'Input' | 'Select' | 'Textarea'
// deno-style "constructor whose prototype we index for a string-keyed property"
type AnyPrototypeCtor = { prototype: any }

const PROTO: Record<Kind, AnyPrototypeCtor> = {
  Input: HTMLInputElement,
  Select: HTMLSelectElement,
  Textarea: HTMLTextAreaElement,
}

type ValidityMock = ReturnType<typeof vi.fn>

interface Stubs {
  set: Record<Kind, ValidityMock>
  report: Record<Kind, ValidityMock>
  restore: () => void
}

function stubValidity(): Stubs {
  const set: Record<Kind, ValidityMock> = {
    Input: vi.fn(),
    Select: vi.fn(),
    Textarea: vi.fn(),
  }
  const report: Record<Kind, ValidityMock> = {
    Input: vi.fn(() => false),
    Select: vi.fn(() => false),
    Textarea: vi.fn(() => false),
  }
  const originals = (Object.keys(PROTO) as Kind[]).map((kind) => ({
    kind,
    setDesc: Object.getOwnPropertyDescriptor(PROTO[kind].prototype, 'setCustomValidity'),
    reportDesc: Object.getOwnPropertyDescriptor(PROTO[kind].prototype, 'reportValidity'),
  }))
  for (const kind of Object.keys(PROTO) as Kind[]) {
    Object.defineProperty(PROTO[kind].prototype, 'setCustomValidity', {
      configurable: true,
      value: set[kind],
    })
    Object.defineProperty(PROTO[kind].prototype, 'reportValidity', {
      configurable: true,
      value: report[kind],
    })
  }
  return {
    set,
    report,
    restore: () => {
      for (const { kind, setDesc, reportDesc } of originals) {
        const proto = PROTO[kind].prototype as any
        if (setDesc) Object.defineProperty(proto, 'setCustomValidity', setDesc)
        else delete proto.setCustomValidity
        if (reportDesc) Object.defineProperty(proto, 'reportValidity', reportDesc)
        else delete proto.reportValidity
      }
    },
  }
}

let stubs: Stubs

beforeEach(() => {
  stubs = stubValidity()
})

afterEach(() => {
  stubs.restore()
  vi.clearAllMocks()
})

describe('checkRequiredInput', () => {
  it('returns true without touching validity when the input has a non-empty value', () => {
    const input = document.createElement('input')
    input.value = 'Max Mustermann'

    expect(checkRequiredInput(input, 'Pflichtfeld')).toBe(true)
    expect(stubs.set.Input).not.toHaveBeenCalled()
    expect(stubs.report.Input).not.toHaveBeenCalled()
  })

  it('treats a whitespace-only value as empty', () => {
    const input = document.createElement('input')
    input.value = '   '

    expect(checkRequiredInput(input, 'Pflichtfeld')).toBe(false)
    expect(stubs.set.Input).toHaveBeenCalledWith('Pflichtfeld')
    expect(stubs.report.Input).toHaveBeenCalledTimes(1)
  })

  it('sets the custom validity message and calls reportValidity when the input is empty', () => {
    const input = document.createElement('input')

    expect(checkRequiredInput(input, 'Bitte Namen angeben')).toBe(false)
    expect(stubs.set.Input).toHaveBeenCalledWith('Bitte Namen angeben')
    expect(stubs.report.Input).toHaveBeenCalledTimes(1)
  })

  it('propagates reportValidity return: returns true when reportValidity returns true', () => {
    stubs.report.Input.mockReturnValue(true)
    const input = document.createElement('input')
    expect(checkRequiredInput(input, 'Pflichtfeld')).toBe(true)
    expect(stubs.report.Input).toHaveBeenCalledTimes(1)
  })

  it('works for HTMLTextAreaElement and propagates the error message', () => {
    const textarea = document.createElement('textarea')

    expect(checkRequiredInput(textarea, 'Bitte Nachricht angeben')).toBe(false)
    expect(stubs.set.Textarea).toHaveBeenCalledWith('Bitte Nachricht angeben')
    expect(stubs.report.Textarea).toHaveBeenCalledTimes(1)
  })

  it('returns true for null input without touching the prototype', () => {
    expect(checkRequiredInput(null, 'Pflichtfeld')).toBe(true)
    expect(stubs.set.Input).not.toHaveBeenCalled()
    expect(stubs.report.Input).not.toHaveBeenCalled()
  })

  it('returns true for undefined input without touching the prototype', () => {
    expect(checkRequiredInput(undefined, 'Pflichtfeld')).toBe(true)
    expect(stubs.set.Input).not.toHaveBeenCalled()
    expect(stubs.report.Input).not.toHaveBeenCalled()
  })
})

describe('checkRequiredSelect', () => {
  it('returns true without touching validity when a value is selected', () => {
    const select = document.createElement('select')
    const option = document.createElement('option')
    option.value = 'general'
    select.append(option)
    select.value = 'general'

    expect(checkRequiredSelect(select, 'Bitte auswählen')).toBe(true)
    expect(stubs.set.Select).not.toHaveBeenCalled()
    expect(stubs.report.Select).not.toHaveBeenCalled()
  })

  it('sets the custom validity message and reports validity for an empty value', () => {
    const select = document.createElement('select')

    expect(checkRequiredSelect(select, 'Bitte Auswahl treffen')).toBe(false)
    expect(stubs.set.Select).toHaveBeenCalledWith('Bitte Auswahl treffen')
    expect(stubs.report.Select).toHaveBeenCalledTimes(1)
  })

  it('treats a whitespace-only option value as empty', () => {
    const select = document.createElement('select')
    const option = document.createElement('option')
    option.value = '   '
    select.append(option)
    select.value = '   '

    expect(checkRequiredSelect(select, 'Pflichtfeld')).toBe(false)
    expect(stubs.set.Select).toHaveBeenCalledWith('Pflichtfeld')
    expect(stubs.report.Select).toHaveBeenCalled()
  })

  it('propagates reportValidity return: returns true when reportValidity returns true', () => {
    stubs.report.Select.mockReturnValue(true)
    const select = document.createElement('select')
    expect(checkRequiredSelect(select, 'Pflichtfeld')).toBe(true)
    expect(stubs.report.Select).toHaveBeenCalledTimes(1)
  })

  it('returns true for null select without touching the prototype', () => {
    expect(checkRequiredSelect(null, 'Pflichtfeld')).toBe(true)
    expect(stubs.set.Select).not.toHaveBeenCalled()
  })

  it('returns true for undefined select without touching the prototype', () => {
    expect(checkRequiredSelect(undefined, 'Pflichtfeld')).toBe(true)
    expect(stubs.set.Select).not.toHaveBeenCalled()
  })
})

describe('validateIbanInput', () => {
  it('accepts a syntactically valid IBAN and returns true without touching validity', () => {
    const input = document.createElement('input')
    input.value = VALID_IBAN

    expect(validateIbanInput(input)).toBe(true)
    expect(stubs.set.Input).not.toHaveBeenCalled()
    expect(stubs.report.Input).not.toHaveBeenCalled()
  })

  it('accepts a valid IBAN written without spaces', () => {
    const input = document.createElement('input')
    input.value = VALID_IBAN.replace(/\s/g, '')

    expect(validateIbanInput(input)).toBe(true)
  })

  it('accepts a valid IBAN regardless of letter case', () => {
    const input = document.createElement('input')
    input.value = 'de89 3704 0044 0532 0130 00'

    expect(validateIbanInput(input)).toBe(true)
  })

  it('sets the custom validity message and reports for an invalid IBAN', () => {
    const input = document.createElement('input')
    input.value = MALFORMED_IBAN

    expect(validateIbanInput(input)).toBe(false)
    expect(stubs.set.Input).toHaveBeenCalledWith(IBAN_ERROR)
    expect(stubs.report.Input).toHaveBeenCalledTimes(1)
  })

  it('rejects a non-IBAN string of random characters', () => {
    const input = document.createElement('input')
    input.value = 'not-an-iban'

    expect(validateIbanInput(input)).toBe(false)
    expect(stubs.set.Input).toHaveBeenCalledWith(IBAN_ERROR)
    expect(stubs.report.Input).toHaveBeenCalled()
  })

  it('propagates reportValidity return on invalid IBAN', () => {
    stubs.report.Input.mockReturnValue(true)
    const input = document.createElement('input')
    input.value = MALFORMED_IBAN

    expect(validateIbanInput(input)).toBe(true)
    expect(stubs.set.Input).toHaveBeenCalledWith(IBAN_ERROR)
    expect(stubs.report.Input).toHaveBeenCalledTimes(1)
  })

  it('treats an empty input as invalid: sets the message, reports, returns false', () => {
    const input = document.createElement('input')

    expect(validateIbanInput(input)).toBe(false)
    expect(stubs.set.Input).toHaveBeenCalledWith(IBAN_ERROR)
    expect(stubs.report.Input).toHaveBeenCalledTimes(1)
  })

  it('returns false and does not touch validity for null input', () => {
    expect(validateIbanInput(null)).toBe(false)
    expect(stubs.set.Input).not.toHaveBeenCalled()
    expect(stubs.report.Input).not.toHaveBeenCalled()
  })

  it('returns false and does not touch validity for undefined input', () => {
    expect(validateIbanInput(undefined)).toBe(false)
    expect(stubs.set.Input).not.toHaveBeenCalled()
    expect(stubs.report.Input).not.toHaveBeenCalled()
  })
})

describe('clearCustomValidityOnInput', () => {
  it('clears the custom validity when the user types a non-empty value', () => {
    const input = document.createElement('input')
    clearCustomValidityOnInput(input)

    input.value = 'Max'
    input.dispatchEvent(new Event('input'))

    expect(stubs.set.Input).toHaveBeenCalledWith('')
  })

  it('does not clear the validity when the value trims to empty', () => {
    const input = document.createElement('input')
    clearCustomValidityOnInput(input)

    input.value = '   '
    input.dispatchEvent(new Event('input'))

    expect(stubs.set.Input).not.toHaveBeenCalled()
  })

  it('works for HTMLTextAreaElement: clears once a value is typed', () => {
    const textarea = document.createElement('textarea')
    clearCustomValidityOnInput(textarea)

    textarea.value = 'Hello'
    textarea.dispatchEvent(new Event('input'))

    expect(stubs.set.Textarea).toHaveBeenCalledWith('')
  })

  it('no-ops before any input event is dispatched', () => {
    const input = document.createElement('input')
    clearCustomValidityOnInput(input)

    expect(stubs.set.Input).not.toHaveBeenCalled()
  })

  it('silently swallows null input (no listener is attached)', () => {
    expect(() => clearCustomValidityOnInput(null)).not.toThrow()
    expect(stubs.set.Input).not.toHaveBeenCalled()
  })

  it('silently swallows undefined input (no listener is attached)', () => {
    expect(() => clearCustomValidityOnInput(undefined)).not.toThrow()
    expect(stubs.set.Input).not.toHaveBeenCalled()
  })
})

describe('clearCustomValidityOnSelect', () => {
  it('clears the custom validity when the user selects a non-empty value', () => {
    const select = document.createElement('select')
    const option = document.createElement('option')
    option.value = 'general'
    select.append(option)

    clearCustomValidityOnSelect(select)

    select.value = 'general'
    select.dispatchEvent(new Event('change'))

    expect(stubs.set.Select).toHaveBeenCalledWith('')
  })

  it('does not clear the validity when the selected value trims to empty', () => {
    const select = document.createElement('select')
    const option = document.createElement('option')
    option.value = '   '
    select.append(option)

    clearCustomValidityOnSelect(select)

    select.value = '   '
    select.dispatchEvent(new Event('change'))

    expect(stubs.set.Select).not.toHaveBeenCalled()
  })

  it('no-ops before any change event is dispatched', () => {
    const select = document.createElement('select')
    clearCustomValidityOnSelect(select)

    expect(stubs.set.Select).not.toHaveBeenCalled()
  })

  it('silently swallows null select (no listener is attached)', () => {
    expect(() => clearCustomValidityOnSelect(null)).not.toThrow()
    expect(stubs.set.Select).not.toHaveBeenCalled()
  })

  it('silently swallows undefined select (no listener is attached)', () => {
    expect(() => clearCustomValidityOnSelect(undefined)).not.toThrow()
    expect(stubs.set.Select).not.toHaveBeenCalled()
  })
})
