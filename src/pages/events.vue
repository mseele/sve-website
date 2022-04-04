<page>
title: Events
description: Herzlich Willkommen beim Eventangebot des SV Eutingen. Ob Fussballturnier, Kochkurs, Theateraufführung oder Partyhighlight. Auf dieser Seite findest Du das gesamte Eventangebot des SV Eutingen und kannst Dich über Programm, Ort und Zeit auf dem Laufenden halten.
</page>

<template>
  <Layout>
    <EventsContent
      title="EVENTS"
      event-title="AKTUELLE EVENTS"
      :events="events"
      to-prefix="/events"
      subscribe-success="Du erhälst automatisch eine E-Mail sobald neue Eventangebote online sind. Vielen Dank."
      news-type="Events"
    >
      <template #header>
        <div class="pb-4 font-medium leading-relaxed">
          Herzlich Willkommen beim Eventangebot des SV Eutingen 1947 e.V.
        </div>
        <div class="pb-4 leading-relaxed">
          Ob Fussballturnier, Kochkurs, Theateraufführung oder Partyhighlight.
          Auf dieser Seite findest Du das gesamte Eventangebot des SV Eutingen
          und kannst Dich über Programm, Ort und Zeit auf dem Laufenden halten.
          Bei Angeboten, die eine Anmeldung erforderlich machen, kannst Du Dich
          direkt online anmelden.
        </div>
        <div class="leading-relaxed">
          Deshalb: Schaue regelmäßig auf unserer Seite vorbei und nimm' an
          unseren Events teil.<br />
          Wir freuen uns auf Dich!
        </div>
      </template>
      <template #infoEmpty>
        Wir planen aktuell die nächsten Events und informieren Dich gerne,
        sobald es Neuigkeiten gibt.
      </template>
      <template #subscribeInfo>
        Erhalte automatisch eine E-Mail sobald neue Events online sind.
      </template>
    </EventsContent>
  </Layout>
</template>

<script setup lang="ts">
import { getEvents } from '@/logic/events'
import { EventType } from '@/models'

let events = await getEvents(EventType.Events)
</script>
