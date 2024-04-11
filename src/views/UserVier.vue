<template>
    <button v-if="token" @click="logout">Cerrar sesión</button>
    <div>
      <div class="user-info">
        <div class="info-box">
          <h2>Respuesta:</h2>
          <div v-if="ID">{{ ID }}</div>
        </div>

      </div>
      <h1>Los Usuarios:</h1>
      <table class="user-table">
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Creador</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
  <tr v-for="actividad in users" :key="actividad.ID">
    <td>{{ actividad.Descripcion }}</td>
    <td>{{ actividad.UsuarioID }}</td>
    <td>{{ actividad.FechaTermino }}</td>
  </tr>
</tbody>


      </table>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import UserService from '@/services/AuthServices'
  import type IActividad from '@/interface/IActividad'
  
  const token = ref<string>('')
  const ID = ref<number>(0)
  const users = ref<IActividad[]>([])
  
  onMounted(async () => {
      const tokenFromStorage = localStorage.getItem('token')
      const IDFromStorage = localStorage.getItem('ID')
  
      if (tokenFromStorage && IDFromStorage) {
          token.value = tokenFromStorage
          ID.value = parseInt(IDFromStorage)
  
          try {
              const actividades = await UserService.GetAct(ID.value)
              if (actividades && Array.isArray(actividades)) {
                  users.value = actividades
                  console.log("Obtencion de las actividades exitosa:", actividades)
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
      localStorage.removeItem('ID')
      token.value = ''
      ID.value = 0
      window.location.href = '/login'
  }
  </script>
  
  <style scoped>
  .user-table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
  
  .user-table th, .user-table td {
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
  