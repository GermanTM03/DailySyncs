<template>
  <div class="Formulario" v-for="user in users" :key="user.ID">
    <form @submit.prevent="handleSubmit(user)">
      <div class="Box_1">
        <template v-if="!user.editing">{{ user.Usuario }}</template>
        <input v-else v-model="user.Usuario" type="text" required />
      </div>
      <div class="Box_1">
        <template v-if="!user.editing">{{ user.Correo }}</template>
        <input v-else v-model="user.Correo" type="email" required />
      </div>

      <button v-if="!user.editing" @click="editUser(user)" :disabled="userIsEditing">Editar</button>
      <template v-else>
        <button @click="saveUser(user)">Guardar</button>
        <button @click="cancelEdit(user)">Cancelar</button>
      </template>
    </form>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
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
        users.value = usuario.map((user) => ({ ...user, editing: false }))
        console.log('Obtencion de las actividades exitosa:', usuario)
      } else {
        console.error('No se encontraron actividades para el IDU especificado.')
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

const editUser = (user: IUser) => {
  // Deshabilita la edición de otros usuarios mientras uno está en modo de edición
  users.value.forEach((u) => {
    if (u !== user) {
      u.editing = false
    }
  })
  user.editing = true
}

const cancelEdit = (user: IUser) => {
  // Restaurar valores originales
  // Recargar datos del servidor si es necesario
  user.editing = false
}

const saveUser = async (user: IUser) => {
  try {
    const { ID, Usuario, Correo } = user;
    await UserService.updateUser(ID, { Usuario, Correo }); // Solo enviar Usuario y Correo
    user.editing = false;
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
  }
};


const handleSubmit = async (user: IUser) => {
  try {
    const IDUFromStorage = localStorage.getItem('IDU')
    if (!IDUFromStorage) {
      throw new Error('No se encontró el IDU en el almacenamiento local')
    }
    const userID = parseInt(IDUFromStorage)

    await UserService.updateUser(userID, user) // Pasar el ID del usuario al servicio
    user.editing = false
  } catch (error) {
    console.error('Error al actualizar la actividad:', error)
  }
}

// Comprueba si algún usuario está en modo de edición
const userIsEditing = computed(() => users.value.some((user) => user.editing))
</script>



