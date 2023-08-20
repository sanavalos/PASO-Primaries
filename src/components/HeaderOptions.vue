<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div>
    <header>
      <h1>PASO Primaries - ARGENTINA</h1>
    </header>
    <nav>
      <ul>
        <RouterLink to="/votes"><li>Votation results</li></RouterLink>
        <RouterLink to="/parties"><li>Political parties</li></RouterLink>
      </ul>
      <p>August 14th, 2023</p>
    </nav>
  </div>
</template>

<style scoped>
nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  @media screen {
    @media (max-width: 768px) {
     flex-direction: column;
     margin-bottom: 1rem;
    }
  }
}
nav ul {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  gap: 1rem;
  padding: 0;
  margin: 2rem 0;
}
nav ul li {
  cursor: pointer;
  text-transform: uppercase;
}
nav ul li:hover {
  color: #ff9900;
  font-weight: 800;
  text-decoration: underline;
}
nav p {
  border: 1px solid black;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  letter-spacing: 2px;
  background-color: #8c8c8c;
  color: #000;
}
a {
  text-decoration: none;
  color: #f8f8f8;
}
.active {
  color: #ff9900;
  font-weight: 800;
}
</style>
