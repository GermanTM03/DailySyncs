<template>
  <button v-if="token" @click="logout">Cerrar sesión</button>
  <div>
    <div class="user-info">
      <div class="info-box">
        <h2>Respuesta:</h2>
        <div v-if="IDU">{{ IDU }}</div>
      </div>
    </div>
    <h1>Los Usuarios:</h1>
    <table class="user-table">
      <thead>
        <tr>
          <th>IDU</th>
          <th>Correo</th>
          <th>USuario</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.ID">
          <td>{{ user.FechaCreacion }}</td>
          <td>{{ user.Correo }}</td>
          <td>{{ user.Usuario }}</td>
          <td>{{ user.Contraseña }}</td>
        </tr>
      </tbody>
    </table>
  </div>
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
  const IDUFromStorage = localStorage.getItem('IDU')

  if (tokenFromStorage && IDUFromStorage) {
    token.value = tokenFromStorage
    IDU.value = parseInt(IDUFromStorage)

    try {
      const usuario = await UserService.User(IDU.value)
      if (usuario && Array.isArray(usuario)) {
        users.value = usuario
        console.log('Obtencion de las activIDUades exitosa:', usuario)
      } else {
        console.error('No se encontraron activIDUades para el IDU especificado.')
      }
    } catch (error) {
      console.error('Error al obtener las activIDUades:', error)
    }
  } else {
    console.warn('No hay token en el almacenamiento local. No se obtendrán activIDUades.')
  }
})
const tokenFromStorage = localStorage.getItem('token');
const IDFromStorage = localStorage.getItem('IDU');
console.log('Token from storage:', tokenFromStorage);
console.log('IDU from storage:', IDFromStorage); 

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('IDU')
  token.value = ''
  IDU.value = 0
  window.location.href = '/login'
}
</script>

<style scoped>
.user-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solIDU rgba(0, 0, 0, 0.2);
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

.info-box {
  width: 48%;
}

.info-box h2 {
  margin-bottom: 5px;
}
</style>
