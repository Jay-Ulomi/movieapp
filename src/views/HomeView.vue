<script setup>
import Hero from '@/components/Hero.vue';
import LatestMovie from '@/components/LatestMovie.vue';
import Nav from '@/components/Nav.vue'; 
import Popular from '@/components/Popular.vue';
</script>

<template>
  <main>
 <Nav/>
 <!-- Your content here -->
  <Hero/>

  <LatestMovie/>

  <Popular/>
  </main>
</template>
