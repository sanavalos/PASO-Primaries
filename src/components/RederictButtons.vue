<script setup></script>

<template>
  <ul>
    <RouterLink to="/votes"><li>Votation results</li></RouterLink>
    <RouterLink to="/parties"><li>Political parties</li></RouterLink>
  </ul>
</template>

<style scoped>
ul {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  list-style: none;
  gap: 1rem;
  padding: 0;
  margin: 2rem 0;
}
ul li {
  cursor: pointer;
  text-transform: uppercase;
  font-weight: 800;
}
a {
  background-color: #ff9900;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: #f8f8f8;
}
</style>
