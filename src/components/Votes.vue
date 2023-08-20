<script setup>
import { onMounted, ref } from 'vue'
import { getPrimariesData } from '../services/services.js'
import LeftArrow from '../components/LeftArrow.vue'
import RightArrow from '../components/RightArrow.vue'

const votesData = ref([])
const partiesData = ref([])
const voteTypes = ref([])
const types = ref([
  { name: 'nulos', translation: 'spoiled ballots' },
  { name: 'blancos', translation: 'blank ballots' },
  { name: 'impugnados', translation: 'challenged ballots' },
  { name: 'abstencion', translation: 'abstention ' }
])

function setVotesData() {
  getPrimariesData()
    .then((response) => {
      votesData.value = response.data
      partiesData.value = response.data.partidos
      types.value.forEach((type) => {
        voteTypes.value.push({
          name: type.name,
          translation: type.translation,
          quantity: response.data[type.name]
        })
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

onMounted(() => {
  setVotesData()
})
</script>

<template>
  <main>
    <div class="card left">
      <span class="number">{{ votesData.totalVotos }}</span>
      Total votes
    </div>
    <div class="card right">
      <div>
        <span class="number"> {{ votesData.participation }}%</span>
        Participation
      </div>
      <div>
        <span class="number"> {{ votesData.valid }} </span>
        Valid votes
      </div>
    </div>
    <div class="card">
      <p class="title">Votes</p>
      <hr />
      <div class="vote-section">
        <LeftArrow />
        <div class="carrusel" v-if="voteTypes.length > 0">
          <p class="quantity">{{ voteTypes[0].quantity }}</p>
          <p>{{ voteTypes[0].translation }}</p>
        </div>
        <RightArrow />
      </div>
    </div>
    <div class="card info">
      <ul>
        <li v-for="primary in partiesData" :key="primary.code">
          {{ primary.name }}
        </li>
      </ul>
    </div>
  </main>
</template>

<style scoped>
main {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr 2fr;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
  color: #f8f8f8;
  height: 70vh;
}

ul {
  padding: 0;
}
.card {
  background-color: #ff9900;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  height: 100%;
}
.card .title {
  text-align: center;
}

.card .carrusel {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
}

.card .quantity {
  font-size: 3rem;
  font-weight: 800;
  color: #000;
}

.empty {
  text-align: center;
  font-size: 1.5rem;
  font-weight: 800;
  color: #000;
}

.card .vote-section {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-radius: 8px;
  color: #000;
  height: 90%;
  display: flex;
}
.info ul li {
  align-items: center;
  width: 100%;
  list-style: none;
}
.info span {
  font-weight: 800;
  font-size: 20px;
  text-align: center;
}
.number {
  font-size: 3rem;
  font-weight: 800;
}

.left {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.right {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
</style>
