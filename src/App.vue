<template>
  <div>
    <!-- Mostrar la pantalla de carga solo si isLoading es verdadero -->
    <div v-if="isLoading" class="Box_Loading">
      <div class="centrar">
        <img src="./assets/Azul.png" alt="Cargando..." />
        <div class="spinner"></div>
      </div>
    </div>

    <!-- Mostrar el contenido de la aplicación una vez que se ha cargado -->
    <div v-else>
      <component :is="currentComponent" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const isLoading = ref(true)
const router = useRouter()
const route = useRoute()
const currentComponent = ref(null)

onMounted(() => {
  // Simular una carga inicial (puedes cambiar esto según tus necesidades)
  setTimeout(() => {
    isLoading.value = false // Cambiar el estado para indicar que la carga ha finalizado
    setCurrentComponent() // Establecer el componente actual al componente de la ruta actual
  }, 2000) // Simulación de una carga de 2 segundos

  // Observar cambios en la ruta y actualizar el componente actual en consecuencia
  router.afterEach(() => {
    setCurrentComponent()
  })
})

// Función para establecer el componente actual basado en la ruta actual
const setCurrentComponent = () => {
  const matchedRoute = route.matched[0]
  if (matchedRoute) {
    currentComponent.value = matchedRoute.components.default
  }
}
</script>

<style scoped>
/* Estilos para el spinner de carga */
.spinner {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 4px solid #ccc;
  border-top-color: #3559fa;
  margin-left: auto;
  margin-right: auto;
  animation: spin 0.8s linear infinite;
}

.Box_Loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8); /* Transparencia de fondo */
  z-index: 9999; /* Asegura que esté por encima de otros elementos */
}
</style>
