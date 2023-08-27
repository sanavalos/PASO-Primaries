<script setup>
import HeaderOptions from '../components/HeaderOptions.vue'
import Parties from '../components/Parties.vue'

const props = defineProps({
  colorsData: Object
})
</script>

<template>
  <main>
    <HeaderOptions />
    <Parties :colorsData="props.colorsData" />
  </main>
</template>

<style scoped>
main {
  max-width: 70vw;
}
</style>
