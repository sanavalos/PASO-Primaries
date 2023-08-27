<script setup>
import { getColorsData } from './services/services.js'
import { onMounted, ref } from 'vue'

const colorsData = ref([])

function setColorsData() {
  getColorsData()
    .then((response) => {
      colorsData.value = response.data.elecciones[0].partidos
    })
    .catch((error) => {
      console.log(error)
    })
}

onMounted(() => {
  setColorsData()
})
</script>

<template>
  <RouterView :colorsData="colorsData" />
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
