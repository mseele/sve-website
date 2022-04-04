<template>
  <Head>
    <meta property="author" :content="$site.author" />
    <meta property="keywords" :content="$site.tags.join(', ')" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="de_DE" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="shortcut icon" href="/favicon.ico" />
  </Head>
  <!-- We use an empty layout until https://github.com/ElMassimo/iles/issues/109 is fixed -->
  <div class="font-sans"><slot /></div>
</template>

<style>
@import '@/assets/index.css';
@import 'inter-ui/inter.css';
@import '@glidejs/glide/dist/css/glide.core.min.css';
@import '@glidejs/glide/dist/css/glide.theme.min.css';
</style>
