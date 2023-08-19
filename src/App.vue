<script setup>
import HomeView from './views/HomeView.vue'
</script>

<template>
  <header>
    <h1>PASO Primaries - ARGENTINA</h1>
  </header>
  <HomeView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
