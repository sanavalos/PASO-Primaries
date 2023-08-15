<script setup>
import { onMounted, ref } from 'vue'
import { getPrimariesData } from '../services/services.js'

const primariesData = ref([])

function setPrimariesData() {
  getPrimariesData()
    .then((response) => {
      console.log('response', response.data)
      primariesData.value = response.data.partidos
    })
    .catch((error) => {
      console.log(error)
    })
}
onMounted(() => {
  setPrimariesData()
})
</script>

<template>
  <main>
    <ul>
      <li v-for="primary in primariesData" :key="primary.code">
        {{ primary.name }} - {{ primary.votos }}
      </li>
    </ul>
  </main>
</template>
