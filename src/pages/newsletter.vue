<page>
title: Newsletter
</page>

<template>
  <Layout>
    <PageSection title="Newsletter">
      <div class="flex flex-col lg:flex-row lg:items-center">
        <div class="w-full place-self-start pb-6 lg:w-1/2 lg:pb-0 lg:pr-2">
          <div class="font-medium lg:block lg:text-xl">
            Bleib auf dem Laufenden.
          </div>
          <div class="pt-2">
            Halte Dich mit unseren Newslettern zu Teamsport, Events und/oder
            Fitness immer auf dem neuesten Stand.<br />
            Keine Sorge: Du wirst keine wöchentlichen Spams von uns erhalten,
            sondern interessante, gesammelte Informationen über unser
            SVE-Angebot.
          </div>
        </div>
        <div class="w-full lg:w-1/2 lg:pl-2">
          <NewsletterSubscription client:idle />
        </div>
      </div>
    </PageSection>
  </Layout>
</template>
