import { test, expect, VALID_IBAN, TEST_EMAIL } from './setup'

test('membership form happy path', async ({ page, backend }) => {
  await page.goto('/mitgliedschaft')

  // Step 1: membership type.
  await page.locator('#AdultActive').check()
  await page.locator('#type button#next').click()

  // Step 2: personal data.
  const personal = page.locator('#personal')
  await personal.locator('#salutation').selectOption('Herr')
  await personal.locator('#firstname').fill('Max')
  await personal.locator('#lastname').fill('Mustermann')
  await personal.locator('#street').fill('Musterstraße 1')
  await personal.locator('#zipcode').fill('12345')
  await personal.locator('#city').fill('Musterstadt')
  await personal.locator('#email').fill(TEST_EMAIL)
  await personal.locator('#phone').fill('0123456789')
  await personal.locator('#birthday').fill('1990-01-01')
  await personal.locator('button#next').click()

  // Step 3: payment data.
  const payment = page.locator('#payment')
  await payment.locator('#iban').fill(VALID_IBAN)
  await payment.locator('#account_owner').fill('Max Mustermann')
  await payment.locator('#approve_payment').check()
  await payment.locator('button#next').click()

  // Step 4: summary.
  await expect(page.locator('#summary #membership_type')).toContainText('Erwachsener Aktive')
  await expect(page.locator('#summary #firstname')).toHaveText('Max')
  await expect(page.locator('#summary #iban')).toHaveText(VALID_IBAN)

  await page.locator('#approve_membership').check()
  await page.locator('#summary button#next').click()

  // Success page is displayed.
  const success = page.locator('#form #success')
  await expect(success).toBeVisible()
  await expect(success).toContainText('Vielen Dank für Deine Mitgliedschaft')

  expect(backend.membership).toHaveLength(1)
  const payload = backend.membership[0]?.body
  expect(payload?.membership_type).toBe('AdultActive')
  expect(payload?.salutation).toBe('Herr')
  expect(payload?.first_name).toBe('Max')
  expect(payload?.email).toBe(TEST_EMAIL)
  expect(payload?.iban).toBe(VALID_IBAN.replace(/\s/g, ''))
  expect(payload?.token).toBe('test-token')
})
