<page>
title: Fitness
description: Herzlich Willkommen beim Fitnessangebot des SV Eutingen. Wir bieten wohnortnahe, qualitativ hochwertige und preiswerte Fitnesskurse sowie Angebote des Gesundheitssports an.
</page>

<template>
  <Layout>
    <EventsContent
      title="FITNESS"
      event-title="AKTUELLE KURSE"
      :events="events"
      to-prefix="/fitness"
      :faqs="faqs"
      subscribe-success="Du erhälst automatisch eine E-Mail sobald neue Kursangebote online sind. Vielen Dank."
      news-type="Fitness"
    >
      <template #header>
        <div class="pb-4 font-medium leading-relaxed">
          Du hast Freude an der Gemeinschaft und möchtest Deinem Körper etwas
          Gutes tun? Herzlich Willkommen beim Fitnessangebot des SV Eutingen
          1947 e.V.
        </div>
        <div class="leading-relaxed text-stone-800">
          Wir bieten wohnortnahe, qualitativ hochwertige und preiswerte
          Fitnesskurse sowie Angebote des Gesundheitssports an. Unsere
          Kursleiterinnen und Kursleiter verfügen über entsprechende
          Qualifizierungen und machen die Kurse zu einem Ort der Begegnung.
          Schließlich bereitet Sport innerhalb einer Gruppe und Gemeinschaft
          noch mehr Freude. Unsere Kurse stehen selbstverständlich auch
          Nichtmitgliedern des SV Eutingen zur Verfügung.<br />
          Wir freuen uns auf Dich!
        </div>
      </template>
      <template #infoEmpty>
        Wir befinden uns aktuell in der Kurspause und planen die nächste Runde.
      </template>
      <template #subscribeInfo>
        Erhalte automatisch eine E-Mail sobald neue Kursangebote online sind.
      </template>
    </EventsContent>
  </Layout>
</template>

<script setup lang="ts">
import { getEvents } from '@/logic/events'
import { EventType, Faq } from '@/models'

const events = await getEvents(EventType.Fitness)

const faqs: Faq[] = [
  {
    question: 'Was muss ich zum Kurs mitbringen?',
    answer:
      'Alle benötigten Utensilien werden Dir per Mail bei der Anmeldung mitgeteilt. Wichtig vor allem in den Sommermonaten ist etwas zu trinken.',
  },
  {
    question: 'Können Schichtmitarbeiter am Kursprogramm teilnehmen?',
    answer:
      'Bist du Schichtmitarbeiter und möchtest trotzdem am Kurs teilnehmen, dann suche dir einen Partner aus deiner Gegenschicht, sodass ihr euch die Kursteilnahme teilen könnt. Gib einfach bei der Anmeldung im Kommentarfeld an, mit wem du den Kurs teilst.',
  },
  {
    question:
      'Kann ich für den Kurs über meine Krankenkasse Zuschüsse erhalten?',
    answer:
      'Je nach Krankenkasse und Kurs variiert dies. Informiere dich am besten über deine Krankenkasse, welche Zuschüsse es für dich geben kann. Wir stellen Dir nach Beendigung des Kurses eine Teilnahmebestätigung aus.',
  },
]
</script>
