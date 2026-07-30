import { test, expect, TEST_EMAIL, assertNotification } from './setup'

test('newsletter subscribe and unsubscribe', async ({ page, backend }) => {
  await page.goto('/newsletter')

  const form = page.locator('#newsletter-form')
  const emailInput = form.locator('#email')

  // Subscribe.
  await emailInput.fill(TEST_EMAIL)
  // The default categories are already checked.
  await form.locator('button[type="submit"]').click()

  await assertNotification(
    page,
    'Newsletter',
    'Du hast dich erfolgreich für unseren Newsletter angemeldet.',
  )

  expect(backend.news).toHaveLength(1)
  expect(backend.news[0]?.subscribe).toBe(true)
  expect(backend.news[0]?.body.email).toBe(TEST_EMAIL)
  expect(backend.news[0]?.body.types).toEqual(['General', 'Fitness', 'Events'])

  // Unsubscribe.
  await emailInput.fill(TEST_EMAIL)
  await page.getByRole('button', { name: 'Abmelden' }).click()
  await form.locator('button[type="submit"]').click()

  await assertNotification(
    page,
    'Newsletter',
    'Du hast dich erfolgreich für unseren Newsletter angemeldet.',
  )

  expect(backend.news).toHaveLength(2)
  expect(backend.news[1]?.subscribe).toBe(false)
  expect(backend.news[1]?.body.email).toBe(TEST_EMAIL)
})
