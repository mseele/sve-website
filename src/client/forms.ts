/**
 * Attaches an event listener to clear the custom validity message
 * when the user inputs a value in the input field.
 *
 * @param input - The input field to attach the event listener to
 */
export function clearCustomValidityOnInput(
  input: HTMLInputElement | HTMLTextAreaElement | null | undefined,
): void {
  input?.addEventListener('input', () => {
    if (input.value.trim().length > 0) {
      // Clear any custom validation messages
      input.setCustomValidity('')
    }
  })
}

/**
 * Attaches an event listener to clear the custom validity message
 * when the user selects a value in the select field.
 *
 * @param select - The select field to attach the event listener to
 */
export function clearCustomValidityOnSelect(select: HTMLSelectElement | null | undefined): void {
  select?.addEventListener('change', () => {
    if (select.value.trim().length > 0) {
      // Clear any custom validation messages
      select.setCustomValidity('')
    }
  })
}

/**
 * Validates that the input field is not empty. If the input is empty, sets a custom
 * validity message and triggers the display of the validation error.
 *
 * @param {HTMLInputElement} input - The input field to validate.
 * @param {string} errorMessage - The error message to display if the input is empty.
 * @returns {boolean} - Returns `true` if the input is valid (not empty), otherwise `false`.
 */
export function checkRequiredInput(
  input: HTMLInputElement | HTMLTextAreaElement | null | undefined,
  errorMessage: string,
): boolean {
  if (input?.value.trim() === '') {
    input.setCustomValidity(errorMessage)
    return input.reportValidity()
  }
  return true
}

/**
 * Validates that the select field is not empty. If the select is empty, sets a custom
 * validity message and triggers the display of the validation error.
 *
 * @param {HTMLInputElement} select - The select field to validate.
 * @param {string} errorMessage - The error message to display if the input is empty.
 * @returns {boolean} - Returns `true` if the input is valid (not empty), otherwise `false`.
 */
export function checkRequiredSelect(
  select: HTMLSelectElement | null | undefined,
  errorMessage: string,
): boolean {
  if (select?.value.trim() === '') {
    select.setCustomValidity(errorMessage)
    return select.reportValidity()
  }
  return true
}
