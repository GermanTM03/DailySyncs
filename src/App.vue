<script setup lang="ts">
import { RouterLink,  RouterView } from 'vue-router'
import { ref, onMounted } from 'vue';
import Sidebar from '@/components/Sidebar.vue'; // Asegúrate de tener la ruta correcta


const isLoading = ref(true);

onMounted(() => {
  // Simular una carga inicial (puedes cambiar esto según tus necesidades)
  setTimeout(() => {
    isLoading.value = false; // Cambiar el estado para indicar que la carga ha finalizado
  }, 2000); // Simulación de una carga de 2 segundos
});
</script>

<template>
  <!-- Pantalla de carga -->
  <div v-if="isLoading" class="loading-screen">
    <div >
      <img src="./assets/img/Logo_DailySync_carga.png" alt="Cargando...">
      <div class="spinner"></div>
    </div>
  </div>

  <!-- Contenido de la aplicación -->
  <div v-else>
    <header class="main-header">
      <!-- Logo -->
      <div class="logo">
        <img src="./assets/img/Logo.png" alt="Logo">
        <div class="logo-text">DayliSync</div>
      </div>
      <!-- Navegación --> 
      <nav class="nav-links">
        <RouterLink to="/Login" class="nav-link">Login:D</RouterLink>
        <RouterLink to="/Home" class="nav-link">home</RouterLink>
        <RouterLink to="/MyPerfil" class="nav-link">Perfil</RouterLink>

      </nav>
      
      <!-- Navegación -->
      <!--
      <nav class="nav-links">
        <RouterLink to="/" class="nav-link">Home</RouterLink>
        <RouterLink to="/about" class="nav-link">About</RouterLink>
        <RouterLink to="/User" class="nav-link">Usuario</RouterLink>
        <RouterLink to="/Vista" class="nav-link">Registro</RouterLink>
        <RouterLink to="/Login" class="nav-link">Login:D</RouterLink>
      </nav>
      -->
    </header>

    <RouterView />
    <Sidebar />
  </div>

  
</template>

<style scoped>
/* Estilos generales */

.main-header {
  background-color: #B799FF; /* Cambia el color de fondo */
  color: #fff; /* Cambia el color del texto */
  display: flex;
  align-items: center;
  padding: 1rem;
  
 
}

.logo img {
  width: 50px;
  margin-right: 1rem;
}
.logo-text{
  font-size: 15px;
  font-weight: bold;
  color: black;
}
.nav-links {
  display: flex;
  align-items: center;
}

.nav-link {
  margin-left: 1rem;
  color: #fff;
  text-decoration: none;
  font-size: 1.2rem;
}

.nav-link:hover {
  text-decoration: underline;
}

/* Estilos para la pantalla de carga */
.loading-screen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8); /* Fondo semitransparente */
  display: flex;
  justify-content: center;
  align-items: center;
}

.spinner {
  position: relative;
  width: 40px;
  height: 40px;
  left: 75px;
  border-radius: 50%;
  border: 4px solid #ccc;
  border-top-color: #3559fa;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

</style>