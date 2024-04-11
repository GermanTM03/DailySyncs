<template>
  <header class="main-header">
    <div class="left-section">
      <!-- Icono de configuración -->
      <span class="icon config-icon">⚙️</span>
      <!-- Icono de usuario -->
      <span class="icon user-icon">👤</span>
    </div>
    <!-- Título del header -->
    <div class="title">Mi Aplicación</div>
    <!-- Botón de cierre de sesión -->
    <button v-if="isLoggedIn" @click="logout">Cerrar sesión</button>
  </header>
  <div class="ContenedorRender">
    <!-- Contenido del componente -->
    <RouterView />
    <a href="/index">Ver</a>
    <a href="/Registro">Reg</a>
    <a href="/LP">Reg</a>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

// Función para obtener el estado de la sesión del localStorage
const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'

// Función para cerrar sesión
const router = useRouter()
function logout() {
  localStorage.removeItem('isLoggedIn')
  router.push('/Login') // Redirigir al usuario a la página de inicio de sesión
}
</script>

<style scoped>
/* Estilos del header */
.main-header {
  background-color: #6028FF;
  color: white;
  display: flex;
  align-items: center;
  padding: 1rem;
}

/* Estilos de los iconos */
.icon {
  font-size: 1.5rem;
  margin-right: 1rem;
}

/* Estilos del título */
.title {
  font-size: 1.5rem;
  margin-left: auto; /* Mueve el título hacia la derecha */
}

/* Estilos del contenedor principal */
.ContenedorRender {
  width: 100%;
  margin: 0;
}
</style>
