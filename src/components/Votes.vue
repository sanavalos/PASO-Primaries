<script setup>
import { onMounted, ref, watch } from 'vue'
import { getPrimariesData } from '../services/services.js'
import LeftArrow from '../components/LeftArrow.vue'
import RightArrow from '../components/RightArrow.vue'
import Chart from 'chart.js/auto'

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
      types.value.forEach((type) => {
        voteTypes.value.push({
          name: type.name,
          translation: type.translation,
          quantity: response.data[type.name]?.toLocaleString('en-US')
        })
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

const data = {
  labels: [],
  datasets: [
    {
      label: 'Valid votes',
      data: [],
      backgroundColor: [],
      hoverOffset: 4
    }
  ]
}

const isMobile = window.innerWidth < 768

const config = {
  type: 'pie',
  data: data,
  options: {
    maintainAspectRatio: isMobile ? true : false,
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
    },
    plugins: {
      legend: {
        position: isMobile ? 'bottom' : 'right',
        labels: {
          font: {
            size: 10
          }
        }
      }
    }
  }
}

onMounted(() => {
  setVotesData()
})

const props = defineProps({
  colorsData: Object
})

watch(partiesData, () => {
  const chartLabels = []
  const chartData = []
  const chartColors = []
  partiesData.value.forEach((element, index) => {
    chartLabels.push(element.name)
    chartData.push(element.votos)
    chartColors.push(element.color)
  })
  data.labels = chartLabels
  data.datasets[0].backgroundColor = chartColors
  data.datasets[0].data = chartData
  const chartId = 'my-chart'
  const canvas = document.getElementById(chartId)
  if (canvas) {
    const myChart = new Chart(canvas, config)
  }
})
</script>

<template>
  <main>
    <div class="card left">
      <span class="number">{{ votesData.totalVotos?.toLocaleString('en-US') }}</span>
      Total votes
    </div>
    <div class="card right">
      <div>
        <span class="number"> {{ votesData.participation }}%</span>
        Participation
      </div>
      <div>
        <span class="number"> {{ votesData.valid?.toLocaleString('en-US') }} </span>
        Valid votes
      </div>
    </div>
    <div class="card">
      <p class="title">Votes</p>
      <hr />
      <div class="vote-section">
        <LeftArrow @click="voteTypes.unshift(voteTypes.pop())" />
        <div class="carrusel" v-if="voteTypes.length > 0">
          <p class="quantity">{{ voteTypes[0].quantity }}</p>
          <p>{{ voteTypes[0].translation }}</p>
        </div>
        <RightArrow @click="voteTypes.push(voteTypes.shift())" />
      </div>
    </div>
    <div class="card info">
      <canvas id="my-chart"></canvas>
    </div>
  </main>
</template>

<style scoped>
main {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 0.5fr 2fr;
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
  height: 80%;
}
.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  list-style: none;
}
.number {
  font-size: 3rem;
  font-weight: 800;
  @media screen {
    @media (max-width: 768px) {
      font-size: 1.5rem;
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen {
    @media (max-width: 768px) {
      padding: 0;
    }
  }
}

#my-chart {
  @media screen {
    @media (max-width: 768px) {
      height: fit-content;
    }
  }
}
</style>
