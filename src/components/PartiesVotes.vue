<script setup>
import { onMounted, ref } from 'vue'
import { getPrimariesData } from '../services/services.js'

const primariesData = ref([])

function setPrimariesData() {
  getPrimariesData()
    .then((response) => {
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
    <div class="card" v-for="primary in primariesData" :key="primary.code">
      <p>PARTY NAME: {{ primary.name }}</p>
      <p>TOTAL VOTES: {{ primary.votos }}</p>
      CANDIDATES:
      <ul>
        <li v-for="candidate in primary.listas">
          {{ candidate.candidatos[0] }}
        </li>
      </ul>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.card {
  background-color: red;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  max-width: 25vw;
}
</style>
