import { membershipApplication } from '@/api/forms'
import {
  checkRequiredInput,
  checkRequiredSelect,
  clearCustomValidityOnInput,
  clearCustomValidityOnSelect,
} from '@/client/forms'
import { notify } from '@/client/notifications'
import { isValidIBAN } from 'ibantools'
import '@hcaptcha/vanilla-hcaptcha'
import type { VanillaHCaptchaWebComponent } from '@hcaptcha/vanilla-hcaptcha'

export function init() {
  const title = document.querySelector<HTMLHeadingElement>('#title')
  const form = document.querySelector<HTMLDivElement>('#form')
  const captcha = document.querySelector<VanillaHCaptchaWebComponent>('#captcha')
  if (title && form) {
    // ------------------------
    // 1. Step: Membership Type
    // ------------------------
    const membership_type_container = form.querySelector<HTMLDivElement>('#type')
    {
      const current = membership_type_container

      const memershipCheckboxes = Array.from(
        current?.querySelectorAll<HTMLInputElement>('input[type="checkbox"]') ?? [],
      )
      for (const checkbox of memershipCheckboxes) {
        checkbox.addEventListener('change', () => {
          const checked = checkbox.checked
          if (checked) {
            for (const cb of memershipCheckboxes) {
              if (cb !== checkbox) {
                cb.checked = false
              }
            }
          }
        })
      }

      current
        ?.querySelector<HTMLButtonElement>('button#next')
        ?.addEventListener('click', async () => {
          const membership_checkbox = memershipCheckboxes.find((cb) => cb.checked)
          if (membership_checkbox === undefined) {
            const firstCheckbox = memershipCheckboxes[0]
            firstCheckbox.setCustomValidity('Bitte wähle eine Art der Mitgliedschaft aus.')
            return firstCheckbox.reportValidity()
          }

          const next = form.querySelector<HTMLDivElement>('#personal')
          if (current && next) {
            const familiy_members_panel = next.querySelector<HTMLDivElement>('#familiy_members')
            if (familiy_members_panel) {
              if (membership_checkbox.name === 'Family') {
                familiy_members_panel.classList.remove('hidden')
                familiy_members_panel.classList.add('grid')
              } else {
                familiy_members_panel.classList.remove('grid')
                familiy_members_panel.classList.add('hidden')
              }
            }
            displayNextStep(title, current, next, 'Persönliche Daten')
          }
        })
    }

    // ------------------------
    // 2. Step: Personal Data
    // ------------------------
    const personal_data_container = form.querySelector<HTMLDivElement>('#personal')
    {
      const current = personal_data_container

      const familiy_members_panel = current?.querySelector<HTMLDivElement>('#familiy_members')
      familiy_members_panel
        ?.querySelector<HTMLButtonElement>('#add_familiy_member')
        ?.addEventListener('click', () => {
          const familiy_members = current?.querySelectorAll<HTMLDivElement>('#familiy_member')
          if (familiy_members) {
            for (const familiy_member of familiy_members) {
              if (familiy_member.classList.contains('hidden')) {
                familiy_member.classList.remove('hidden')
                familiy_member.classList.add('grid')
                break
              }
            }
          }
        })

      current?.querySelector<HTMLButtonElement>('button#next')?.addEventListener('click', () => {
        const salutation = current?.querySelector<HTMLSelectElement>('#salutation')
        clearCustomValidityOnSelect(salutation)

        const firstname = current?.querySelector<HTMLInputElement>('#firstname')
        clearCustomValidityOnInput(firstname)

        const lastname = current?.querySelector<HTMLInputElement>('#lastname')
        clearCustomValidityOnInput(lastname)

        const street = current?.querySelector<HTMLInputElement>('#street')
        clearCustomValidityOnInput(street)

        const zipcode = current?.querySelector<HTMLInputElement>('#zipcode')
        clearCustomValidityOnInput(zipcode)

        const city = current?.querySelector<HTMLInputElement>('#city')
        clearCustomValidityOnInput(city)

        const email = current?.querySelector<HTMLInputElement>('#email')
        clearCustomValidityOnInput(email)

        const phone = current?.querySelector<HTMLInputElement>('#phone')
        clearCustomValidityOnInput(phone)

        const birthday = current?.querySelector<HTMLInputElement>('#birthday')
        clearCustomValidityOnInput(birthday)

        if (!checkRequiredSelect(salutation, 'Bitte wähle eine Anrede aus.')) {
          return
        }

        if (!checkRequiredInput(firstname, 'Bitte gib deinen Vornamen ein.')) {
          return
        }

        if (!checkRequiredInput(lastname, 'Bitte gib deinen Nachnamen ein.')) {
          return
        }

        if (!checkRequiredInput(street, 'Bitte gib eine gültige Straße & Hausnummer ein.')) {
          return false
        }

        if (!checkRequiredInput(zipcode, 'Bitte gib eine gültige PLZ ein.')) {
          return false
        }

        if (!checkRequiredInput(city, 'Bitte gib einen gültigen Wohnort ein.')) {
          return false
        }

        if (!checkRequiredInput(email, 'Bitte gib eine gültige E-Mail-Adresse ein.')) {
          return false
        }

        if (!checkRequiredInput(phone, 'Bitte gib eine gültige Telefonnummer ein.')) {
          return false
        }

        if (!checkRequiredInput(birthday, 'Bitte gib ein gültiges Geburtsdatum ein.')) {
          return false
        }

        const next = form.querySelector<HTMLDivElement>('#payment')
        if (current && next) {
          displayNextStep(title, current, next, 'Zahlungsinformationen')
        }
      })
      current
        ?.querySelector<HTMLButtonElement>('button#previous')
        ?.addEventListener('click', () => {
          const previous = form.querySelector<HTMLDivElement>('#type')
          if (current && previous) {
            displayNextStep(title, current, previous, 'Online Mitgliedsantrag')
          }
        })
    }

    // ------------------------
    // 3. Step: Payment Data
    // ------------------------
    const payment_data_container = form.querySelector<HTMLDivElement>('#payment')
    {
      const current = payment_data_container

      current?.querySelector<HTMLButtonElement>('button#next')?.addEventListener('click', () => {
        const iban = current?.querySelector<HTMLInputElement>('#iban')
        clearCustomValidityOnInput(iban)

        const account_owner = current?.querySelector<HTMLInputElement>('#account_owner')
        clearCustomValidityOnInput(account_owner)

        const approve_payment = current?.querySelector<HTMLInputElement>('#approve_payment')

        if (!checkRequiredInput(iban, 'Bitte gib eine IBAN ein.')) {
          return
        }
        if (iban && !isValidIBAN(iban.value.trim().replace(/\s/g, ''))) {
          iban.setCustomValidity('Bitte gib eine gültige IBAN ein.')
          return iban.reportValidity()
        }

        if (!checkRequiredInput(account_owner, 'Bitte gib einen Kontoinhaber ein.')) {
          return
        }

        if (approve_payment && approve_payment.checked !== true) {
          approve_payment.setCustomValidity('Bitte akzeptiere das SEPA-Lastschriftmandat.')
          return approve_payment.reportValidity()
        }

        const next = form.querySelector<HTMLDivElement>('#summary')
        if (current && next) {
          const data = collectData(
            membership_type_container!,
            personal_data_container!,
            payment_data_container!,
            true,
          )
          setTextContent(next, 'membership_type', data.membership_type)
          setTextContent(next, 'salutation', data.salutation)
          setTextContent(next, 'firstname', data.first_name)
          setTextContent(next, 'lastname', data.last_name)
          setTextContent(next, 'street', data.street)
          setTextContent(next, 'zipcode', data.zipcode)
          setTextContent(next, 'city', data.city)
          setTextContent(next, 'email', data.email)
          setTextContent(next, 'phone', data.phone)
          setTextContent(next, 'birthday', data.birthday)
          setTextContent(next, 'iban', data.iban)
          setTextContent(next, 'account_owner', data.account_owner)

          const familiy_members = next.querySelectorAll<HTMLDivElement>('#familiy_member')
          if (familiy_members) {
            familiy_members.forEach((familiy_member, index) => {
              const item = data.family_members?.at(index)
              if (item) {
                familiy_member.classList.replace('hidden', 'grid')
                setTextContent(
                  familiy_member,
                  'family_member_name',
                  `${item.first_name} ${item.last_name}`,
                )
                setTextContent(familiy_member, 'family_member_birthday', item.birthday)
              } else {
                familiy_member.classList.replace('grid', 'hidden')
              }
            })
          }

          displayNextStep(title, current, next, 'Zusammenfassung')
        }
      })
      current
        ?.querySelector<HTMLButtonElement>('button#previous')
        ?.addEventListener('click', () => {
          const previous = form.querySelector<HTMLDivElement>('#personal')
          if (current && previous) {
            displayNextStep(title, current, previous, 'Persönliche Daten')
          }
        })
    }

    // ------------------------
    // 4. Step: Summary
    // ------------------------
    {
      const current = form.querySelector<HTMLDivElement>('#summary')

      const button = current?.querySelector<HTMLButtonElement>('button#next')
      button?.addEventListener('click', async () => {
        const approve_membership = current?.querySelector<HTMLInputElement>('#approve_membership')

        if (approve_membership && approve_membership.checked !== true) {
          approve_membership.setCustomValidity('Bitte akzeptiere die Mitgliedschaft.')
          return approve_membership.reportValidity()
        }

        const payload = {
          newsletter: current?.querySelector<HTMLInputElement>('#newsletter')?.checked === true,
          ...collectData(
            membership_type_container!,
            personal_data_container!,
            payment_data_container!,
          ),
        }

        try {
          button.disabled = true
          const token = (await captcha?.executeAsync())?.response
          const response = await membershipApplication(payload, token)
          if (response) {
            const next = form.querySelector<HTMLDivElement>('#success')
            if (current && next) {
              displayNextStep(title, current, next, 'Mitgliedschaft erfolgreich beantragt')
            }
          } else {
            notify(
              'Mitgliedschaft',
              'Es ist ein Fehler aufgetreten. Bitte versuche es später noch einmal.',
              true,
            )
          }
        } catch (err) {
          console.error(err)
          notify(
            'Mitgliedschaft',
            'Es ist ein Fehler aufgetreten. Bitte versuche es später noch einmal.',
            true,
          )
        } finally {
          button.disabled = false
          captcha?.reset()
        }
      })
      current
        ?.querySelector<HTMLButtonElement>('button#previous')
        ?.addEventListener('click', () => {
          const previous = form.querySelector<HTMLDivElement>('#payment')
          if (current && previous) {
            displayNextStep(title, current, previous, 'Zahlungsinformationen')
          }
        })
    }
  }
}

function displayNextStep(
  title: HTMLHeadingElement,
  current: HTMLDivElement,
  next: HTMLDivElement,
  text: string,
) {
  title.textContent = text
  current.classList.add('hidden')
  next.classList.remove('hidden')
  next.classList.add('grid')
  title.parentElement?.scrollIntoView({ behavior: 'smooth' })
}

function collectData(
  membership_type_container: HTMLDivElement,
  personal_data_container: HTMLDivElement,
  payment_data_container: HTMLDivElement,
  labels = false,
) {
  const memershipCheckboxes = Array.from(
    membership_type_container?.querySelectorAll<HTMLInputElement>('input[type="checkbox"]') ?? [],
  )
  const membership_checkbox = memershipCheckboxes.find((cb) => cb.checked === true)
  const salutation =
    personal_data_container.querySelector<HTMLSelectElement>('#salutation')?.value
  const birthday = personal_data_container.querySelector<HTMLInputElement>('#birthday')?.value
  const iban = payment_data_container.querySelector<HTMLInputElement>('#iban')?.value

  let familiy_members_data:
    | { first_name: string; last_name: string; birthday: string }[]
    | undefined = undefined
  if (membership_checkbox?.name === 'Family') {
    const familiy_members =
      personal_data_container.querySelectorAll<HTMLDivElement>('#familiy_member')
    if (familiy_members) {
      familiy_members_data = []
      for (const familiy_member of familiy_members) {
        if (!familiy_member.classList.contains('hidden')) {
          const first_name = familiy_member
            .querySelector<HTMLInputElement>('#family_member_firstname')
            ?.value?.trim()
          const last_name = familiy_member
            .querySelector<HTMLInputElement>('#family_member_lastname')
            ?.value?.trim()
          const birthday = familiy_member
            .querySelector<HTMLInputElement>('#family_member_birthday')
            ?.value?.trim()
          if (
            first_name &&
            first_name.length > 0 &&
            last_name &&
            last_name.length > 0 &&
            birthday &&
            birthday.length > 0
          ) {
            familiy_members_data.push({
              first_name,
              last_name,
              birthday: labels ? birthday?.split('-').reverse().join('.') : birthday,
            })
          }
        }
      }
    }
  }

  return {
    membership_type: labels
      ? membership_checkbox?.parentElement?.parentElement?.innerText
      : membership_checkbox?.name,
    salutation,
    gender: salutation === 'Herr' ? 'männlich' : 'weiblich',
    first_name: personal_data_container.querySelector<HTMLInputElement>('#firstname')?.value,
    last_name: personal_data_container.querySelector<HTMLInputElement>('#lastname')?.value,
    street: personal_data_container.querySelector<HTMLInputElement>('#street')?.value,
    zipcode: personal_data_container.querySelector<HTMLInputElement>('#zipcode')?.value,
    city: personal_data_container.querySelector<HTMLInputElement>('#city')?.value,
    email: personal_data_container.querySelector<HTMLInputElement>('#email')?.value,
    phone: personal_data_container.querySelector<HTMLInputElement>('#phone')?.value,
    birthday: labels ? birthday?.split('-').reverse().join('.') : birthday,
    iban: labels ? iban : iban?.trim().replace(/\s/g, ''),
    account_owner:
      payment_data_container.querySelector<HTMLInputElement>('#account_owner')?.value,
    family_members: familiy_members_data,
  }
}

function setTextContent(container: HTMLDivElement, id: string, text?: string) {
  if (text === undefined) {
    return
  }
  const element = container.querySelector<HTMLDivElement>(`#${id}`)
  if (element) {
    element.textContent = text
  }
}
