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
