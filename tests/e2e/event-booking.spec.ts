import { test, expect, assertNotification, TEST_EMAIL, VALID_IBAN } from './setup'

test('event booking submit', async ({ page, backend }) => {
  await page.goto('/events/evt-2')

  // Availability is fetched client-side and the registration section is revealed.
  const availabilityLabel = page.locator('[data-label="availability"]')
  await expect(availabilityLabel).toHaveText('Noch 7 freie Plätze')

  const form = page.locator('#anmeldung form#form')
  await expect(form).toBeVisible()

  // Fill the booking form.
  await form.locator('#firstname').fill('Max')
  await form.locator('#lastname').fill('Mustermann')
  await form.locator('#street').fill('Musterstraße 1')
  await form.locator('#plz').fill('12345 Musterstadt')
  await form.locator('#email').fill(TEST_EMAIL)
  await form.locator('#phone').fill('0123456789')
  await form.locator('#customfield').fill('Keine')
  await form.locator('#iban').fill(VALID_IBAN)
  await form.locator('#comment').fill('Kommentar')

  await form.locator('#consent').check()
  await form.locator('#sepa_mandate').check()

  await form.locator('button[type="submit"]').click()

  // Success notification is shown.
  await assertNotification(page, 'Buchung', 'Buchung bestätigt')

  // The availability counter was refreshed after booking.
  await expect(availabilityLabel).toHaveText('Noch 6 freie Plätze')

  // The backend received the booking payload with a captcha token.
  expect(backend.booking).toHaveLength(1)
  const payload = backend.booking[0]?.body
  expect(payload?.event_id).toBe('evt-2')
  expect(payload?.first_name).toBe('Max')
  expect(payload?.last_name).toBe('Mustermann')
  expect(payload?.email).toBe(TEST_EMAIL)
  expect(payload?.iban).toBe(VALID_IBAN)
  expect(payload?.token).toBe('test-token')
})
