<script setup>
import { onMounted, ref, watch } from 'vue'
import { getPrimariesData } from '../services/services.js'
import Chart from 'chart.js/auto'

const partiesData = ref([])
const currentParty = ref({})
const updateDate = ref('')
const totalLists = ref(0)

const selectedParty = (party) => {
  currentParty.value = party
}

function setPartiesData() {
  getPrimariesData()
    .then((response) => {
      const partiesDataCopy = response.data.partidos
      const colorsDataCopy = JSON.parse(JSON.stringify(props.colorsData))
      partiesDataCopy.forEach((party) => {
        for (const [key, value] of Object.entries(colorsDataCopy)) {
          if (party.codLogo === key) {
            party.color = value
          }
        }
      })
      partiesData.value = partiesDataCopy
      updateDate.value = response.data.date
      totalLists.value = response.data.partidos.reduce((acc, party) => {
        return acc + party.listas.length
      }, 0)
    })
    .catch((error) => {
      console.log(error)
    })
}
onMounted(() => {
  setPartiesData()
})

const props = defineProps({
  colorsData: Object
})

const data = {
  labels: [],
  datasets: [
    {
      label: 'Valid votes',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: []
    }
  ]
}

const config = {
  type: 'bar',
  data: data,
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
}

let activeChart = null

watch(currentParty, () => {
  if (activeChart) {
    activeChart.destroy()
  }
  const chartLabels = []
  const chartData = []
  const chartColors = [currentParty.value.color]
  currentParty.value.listas.forEach((element) => {
    chartLabels.push(element.candidatos[0])
    chartData.push(element.votos)
  })
  data.labels = chartLabels
  data.datasets[0].data = chartData
  data.datasets[0].backgroundColor = chartColors
  const chartId = 'chart-' + currentParty.value.id
  const canvas = document.getElementById(chartId)
  if (canvas) {
    activeChart = new Chart(canvas, config)
  }
})
</script>

<template>
  <main>
    <div class="card left">
      <span class="number">{{ partiesData.length }}</span>
      Total political parties
    </div>
    <div class="card right">
      <div>
        <span class="number"> {{ totalLists }} </span>
        Total lists
      </div>
      <div>
        <span class="number"> {{ totalLists }} </span>
        Total presidential candidates
      </div>
    </div>
    <div class="card parties">
      <p class="title">Political parties</p>
      <hr />
      <div class="scroll">
        <p
          class="party"
          v-for="primary in partiesData"
          :key="primary.code"
          :style="{ border: `solid 5px ${primary.color}` }"
          @click="selectedParty(primary)"
        >
          <img v-bind:src="'/logos/' + primary.codLogo + '.png'" alt="logo" />
          {{ primary.name }}
        </p>
      </div>
    </div>
    <div class="card info">
      <article v-if="!currentParty.name" class="title empty">
        <h2>Choose a Party</h2>
        <p>Select a party to see presidential candidates</p>
      </article>
      <p class="title-current">{{ currentParty.name }}</p>
      <div v-if="currentParty">
        <canvas :id="'chart-' + currentParty.id"></canvas>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-auto-rows: max-content;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
  color: #f8f8f8;
  height: 70vh;
  @media screen {
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr 1fr 1fr;
      gap: 2rem;
    }
  }
}
hr {
  border: 1px solid #f8f8f8;
  margin: 1rem 0;
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
  @media screen {
    @media (max-width: 768px) {
      width: 100%;
    }
  }
}

.card .title {
  text-align: center;
  text-transform: capitalize;
}
.title-current {
  text-align: center;
  font-size: 1.5rem;
  font-weight: 800;
  margin: 1rem 0;
  color: black;
}
.card .scroll {
  height: 50vh;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  &::-webkit-scrollbar-track {
    background: none;
  }
  &::-webkit-scrollbar-thumb {
    background: #8c8c8c;
    border-radius: 20px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #3a3a3a;
  }
}
.empty {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.empty h2 {
  font-size: 1.5rem;
  font-weight: 800;
  color: #000;
}
.empty p {
  font-size: 1rem;
  font-weight: 500;
  color: #000;
}
.parties {
  height: fit-content;
}
.party {
  display: flex;
  gap: 1rem;
  flex-direction: row;
  align-items: center;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  margin: 1rem 0;
  background-color: #ffffff;
  color: #000;
  font-weight: 600;
  cursor: pointer;
}
.info {
  height: 100%;
}
.info ul {
  display: flex;
  flex-direction: row;
}
.info ul li {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.info span {
  font-weight: 800;
  font-size: 20px;
  text-align: center;
}
.number {
  font-size: 3rem;
  font-weight: 800;
  @media screen {
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
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
  justify-content: space-evenly;
  align-items: center;
  @media screen {
    @media (max-width: 768px) {
      flex-direction: column;
    }
  }
}
</style>
