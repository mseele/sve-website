<template>
  <Layout :transparent="true" :light="true">
    <hero-section
      id="home"
      v-slot="{ imageClass }"
      title="SV Eutingen"
      subtitle="#mehralseinverein"
      :primary-button="{ text: 'Aktuelles', to: '#aktuelles' }"
      :secondary-button="{ text: 'Mach mit', to: '#mach-mit' }"
    >
      <g-image src="@/assets/home/main.jpg" :class="imageClass" />
    </hero-section>
    <section id="aktuelles">
      <news></news>
    </section>
    <section id="mach-mit">
      <join></join>
    </section>
  </Layout>
</template>

<script>
import heroSection from '@/components/base/HeroSection'
import news from '@/components/sections/News'
import join from '@/components/sections/Join'

export default {
  components: {
    heroSection,
    news,
    join,
  },
}
</script>
