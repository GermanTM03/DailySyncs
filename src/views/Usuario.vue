<template>
  <main class="container">
    <!-- Panel de datos del usuario -->
    <div class="user-panel">
      <div class="contenedorimg">
        <img src="../assets/usuario.png" alt="Usuario" />
      </div>
      <div v-if="users.length === 0">
        <p>Nombre de Usuario</p>
        <p>correo@correo.com</p>
      </div>
      <div v-else>
        <!-- Mostrar los usuarios obtenidos -->
        <div v-for="user in users" :key="user.ID">
          <p>{{ user.Usuario }}</p>
          <p>{{ user.Correo }}</p>
        </div>
      </div>
      <div class="dropdown">
        <button style="background-color: blue;" class="dropbtn">Opciones</button>
        <div class="dropdown-content">
          <a v-if="token" href="/ActUser">VerPerfil</a>
          <a v-if="token" @click="logout">Cerrar Sesión</a>
          <router-link v-else to="/Login">Iniciar Sesión</router-link>
        </div>
      </div>
      <div class="Acciones" v-if="token">
    <div class="contexto">
      <a href="/">
        <font-awesome-icon icon="tasks" /> Actividades
      </a>
    </div>
    <div class="contexto">
      <a href="/TuCalendario">
        <font-awesome-icon icon="calendar-alt" /> Calendario
      </a>
    </div>
  </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import UserService from '@/services/AuthServices'
import type IUser from '@/Interface/IUser'

const token = ref<string>('')
const IDU = ref<number>(0)
const users = ref<IUser[]>([])

onMounted(async () => {
  const tokenFromStorage = localStorage.getItem('token')
  const IDFromStorage = localStorage.getItem('IDU')

  if (tokenFromStorage && IDFromStorage) {
    token.value = tokenFromStorage
    IDU.value = parseInt(IDFromStorage)
    console.log('IDU:', IDU.value)
    console.log('Token:', token.value)
    try {
      const usuario = await UserService.User(IDU.value)
      if (usuario && Array.isArray(usuario)) {
        users.value = usuario
        console.log('Obtencion de las actividades exitosa:', usuario)
      } else {
        console.error('No se encontraron actividades para el ID especificado.')
      }
    } catch (error) {
      console.error('Error al obtener las actividades:', error)
    }
  } else {
    console.warn('No hay token en el almacenamiento local. No se obtendrán actividades.')
  }
})

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('IDU')
  token.value = ''
  IDU.value = 0
  window.location.href = '/login'
}
</script>

<style scoped>
.container {
  display: flex;
  margin-top: 50px;
  background-color: rgb(159, 192, 192);
  margin: 0;
}

.user-panel {
  width: 15%;
  text-align: center;
  height: 100%;
  background-color: #acbcff;
  position: fixed; 
  top: 0%;
  left: 0; 
  z-index: 1000; 
}

.contenedorimg img {
  margin-top: 30px;
  width: 10%;
  height: 10%;
  margin: 0;
  text-align: center;
}

.contenedorimg img {
  margin-top: 40%;
  width: 30%;
  border-radius: 100%;
  height: 10%;
  text-align: center;
  background-color: aquamarine;
}

.user-panel h2,
.activities-panel h2 {
  margin-bottom: 10px;
}

.activities-panel ul {
  list-style: none;
  padding: 0;
}

.activities-panel li {
  margin-bottom: 5px;
}

/* Dropdown styling */
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropbtn {
  background-color: #0988ff;
  color: rgb(255, 255, 255);
  padding: 10px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  border-radius: 1rem;
}
.Acciones{
  width: 100%;
  
  margin-top: 10%;
}
.contexto{
  font-size: 25px;
  margin-top: 20%;
  text-decoration: none;
}
.contexto a{
  text-decoration: none;
  color: #000000;
}
.contexto a:hover{
  transition: .2s;
  color: #ffffff;
}
</style>
