<template v-if="actividad.UsuarioID === IDFromStorage">
  <button v-if="token" @click="logout">Cerrar sesión</button>
  <div>
    <div class="user-info">
    </div>
    <h2 class="actividades-title">Actividades</h2>
    <div class="actividad-container">
      <div class="actividad">
        <div class="info-box">{{ actividad.Titulo }}</div>
        <div class="buttons">
          <router-link to="/DetailsActivities" class="editar-button">Editar</router-link>
          <button class="eliminar-button">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const actividad = ref({
  Titulo: 'Terminar proyecto matematicas'
  
})
import { ref, onMounted } from 'vue'
import UserService from '@/services/AuthServices'
import type IActividad from '@/interface/IActividad'
import { useRoute } from 'vue-router'

const token = ref<string>('')
const ID = ref<number>(0)
const users = ref<IActividad[]>([])

const route = useRoute()

onMounted(async () => {
  const tokenFromStorage = localStorage.getItem('token')
  const IDFromStorage = localStorage.getItem('ID')
  console.log('Token:', token);
  console.log('ID:', ID);
  if (tokenFromStorage) {
    token.value = tokenFromStorage

    // Obtener el ID de la URL utilizando Vue Router
    const idFromRoute = parseInt(route.params.id)

    if (!isNaN(idFromRoute)) {
      ID.value = idFromRoute

      try {
        const actividades = await UserService.Act(ID.value)
        if (actividades && Array.isArray(actividades)) {
          users.value = actividades
          console.log('Obtencion de las actividades exitosa:', actividades)
        } else {
          console.error('No se encontraron actividades para el ID especificado.')
        }
      } catch (error) {
        console.error('Error al obtener las actividades:', error)
      }
    } else {
      console.error('ID inválido en la URL.')
    }
  } else {
    console.warn('No hay token en el almacenamiento local. No se obtendrán actividades.')
  }
})

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('ID')
  token.value = ''
  ID.value = 0
  window.location.href = '/login'
}
</script>

<style scoped>
h2{
  position: relative;
  left: 250px
}
.user-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid rgba(0, 0, 0, 0.2);
}

.user-table th,
.user-table td {
  padding: 12px;
  border: 1px solid rgba(0, 0, 0, 0.2);
}

.user-table th {
  background-color: aliceblue;
  color: #000;
  text-align: left;
}

.user-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.user-table tbody tr:hover {
  background-color: #f2f2f2;
}

.user-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.info-box h2 {
  margin-bottom: 5px;
}

/* Estilos para las actividades */
.actividades-title {
  font-size: 30px;
  font-weight: bold;
}

.actividad-container {
  margin-top: 20px;
  
}

.info-box {
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  background-color: #AEE2FF;
  width: 45%;
  position: relative;
  left: 240px
}

.titulo {
  border-radius: 10px;
  background-color: #FFFFFF;
  padding: 10px;
}

.buttons {
  display: flex;
}
.eliminar-button{
  position: relative;
  left: 900px;
  bottom: 46px;
  padding: 10px 15px;
  border-radius: 10px;
  background-color: #6E85B7;
  color: white;
  border: none;
  cursor: pointer;
  margin-left: 10px;
}
.editar-button {
  position: relative;
  left: 890px;
  bottom:46px;
  padding: 10px 15px;
  border-radius: 10px;
  background-color: #6E85B7;
  color: white;
  border: none;
  cursor: pointer;
  margin-left: 10px;
  text-decoration: none

}

.editar-button:hover, .eliminar-button:hover {
  background-color: #405490;
}
</style>