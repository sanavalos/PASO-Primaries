<script setup>
import { onMounted, ref, watch } from 'vue'
import { getPrimariesData } from '../services/services.js'

const partiesData = ref([])
const currentParty = ref({})
const currentCandidates = ref([])
const updateDate = ref('')

const selectedParty = (party) => {
  currentParty.value = party
}

watch(currentParty, (newValue, oldValue) => {
  currentCandidates.value = newValue.listas
})

function setPartiesData() {
  getPrimariesData()
    .then((response) => {
      partiesData.value = response.data.partidos
      updateDate.value = response.data.date
    })
    .catch((error) => {
      console.log(error)
    })
}
onMounted(() => {
  setPartiesData()
})
</script>

<template>
  <main>
    <div class="card left">
      <span class="number">{{ partiesData.length }}</span>
      Total parties
    </div>
    <div class="card right">
      <div>
        <span class="number"> 100 </span>
        Total lists
      </div>
      <div>
        <span class="number"> 200 </span>
        Total candidates
      </div>
    </div>
    <div class="card">
      <p class="title">Political parties</p>
      <hr />
      <div
        class="party"
        v-for="primary in partiesData"
        :key="primary.code"
        @click="selectedParty(primary)"
      >
        <p>{{ primary.name }}</p>
      </div>
    </div>
    <div class="card info">
      <p v-if="!currentParty.name" class="title empty">Select a party</p>
      <p class="title">{{ currentParty.name }}</p>
      <ul>
        <li v-for="group in currentCandidates">
          <span> {{ group.candidatos[0] }} </span> ({{ group.votos }})
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
  @media screen {
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr 1fr 1fr;
      gap: 2rem;
    }
  }
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

.empty {
  text-align: center;
  font-size: 1.5rem;
  font-weight: 800;
  color: #000;
}

.card .party {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  background-color: #f8f8f8;
  color: #000;
  cursor: pointer;
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
  justify-content: space-around;
  align-items: center;
  @media screen {
    @media (max-width: 768px) {
     flex-direction: column;
    }
  }
}
</style>
