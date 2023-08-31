<script setup>
import HeaderOptions from '../components/HeaderOptions.vue'
import Votes from '../components/Votes.vue'

const props = defineProps({
  colorsData: Object
})
</script>

<template>
  <main>
    <HeaderOptions />
    <Votes :colorsData="props.colorsData" />
  </main>
</template>

<style scoped>
main {
  max-width: 70vw;
}
</style>
