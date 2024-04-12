<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <header class="main-header">

    <nav class="nav-links">
      <RouterLink to="/" class="nav-link">Home</RouterLink>
      <RouterLink to="/about" class="nav-link">About</RouterLink>
      <RouterLink to="/User" class="nav-link">Usuario</RouterLink>
      <RouterLink to="/Vista" class="nav-link">Registro</RouterLink>
      <RouterLink to="/Login" class="nav-link">Login:D</RouterLink>
      
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
/* Estilos generales */
.main-header {
  background-color: #98ffe59f;
  color: rgb(0, 0, 0);
  display: flex;
  align-items: center;
  padding: 1rem;
}

.logo img {
  width: 50px; /* Ajusta el tamaño del logo según sea necesario */
  margin-right: 1rem; /* Espacio entre el logo y los enlaces */
}

.nav-links {
  display: flex;
  align-items: center;
}

.nav-link {
  margin-left: 5rem;
  color: rgb(0, 0, 0);
  text-decoration: none;
  margin-right: 14rem; /* Espacio entre los enlaces */
  font-size: 1.2rem; /* Tamaño de fuente de los enlaces */
}

.nav-link:hover {
  text-decoration: underline; /* Subraya los enlaces al pasar el mouse */
}

/* Estilos del contenedor principal */
.ContenedorRender {
  width: 100%;
  margin: 0;
}
</style>