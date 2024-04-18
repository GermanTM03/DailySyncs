<template>
  <header class="nav">
    <div class="IMGHEADER">
      <img src="../assets/Header.png" alt="Usuario" />
    </div>
  </header>
  <div class="user-panel">
    <User />
  </div>
  <div>
    <div class="ContenedorAct">
      <h2>Detalles User</h2>


      <h2>Editar Usuario</h2>
      <form @submit.prevent="editarUsuario" v-for="user in users" :key="user.ID">
        <div>
          <label for="idUsuario">ID del usuario:</label>
          <input type="text" id="idUsuario" v-model="idUsuario" required >
        </div>
        <div class="Box_User">
          <label for="nombre">Nombre de usuario:</label>
          <input type="text" id="nombre" v-model="user.Usuario" required>
          <button>Editar</button>
          
        </div>
        <div class="Box_User">
          <label for="correo">Correo electrónico:</label>
<input type="email" id="correo" v-model="user.Correo" required>
        </div>
        <div v-if="cambiarContraseña" class="Contra">
          <input type="password" id="nuevaContraseña" v-model="nuevaContraseña" placeholder="nuevaContraseña" required>
          <input type="password" id="confirmarContraseña" v-model="confirmarContraseña" placeholder="confirmarContraseña" required>
          <span v-if="nuevaContraseña !== confirmarContraseña">Las contraseñas no coinciden</span>
        </div>
        <div>
          <button type="button" @click="toggleContraseña">Cambiar Contraseña</button>
          <button type="submit">Guardar</button>
        </div>
      </form>
    </div>
  </div>
  </template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios';
import type IUser from '@/Interface/IUser';
import User from './Usuario.vue';
import UserService from '@/services/AuthServices';

const token = ref<string>('');
const IDU = ref<number>(0);
const users = ref<IUser[]>([]);

onMounted(async () => {
  const tokenFromStorage = localStorage.getItem('token');
  const IDFromStorage = localStorage.getItem('IDU');

  if (tokenFromStorage && IDFromStorage) {
    token.value = tokenFromStorage;
    IDU.value = parseInt(IDFromStorage);
    console.log('IDU:', IDU.value);
    console.log('Token:', token.value);
    try {
      const usuario = await UserService.User(IDU.value);
      if (usuario && Array.isArray(usuario)) {
        users.value = usuario;
        console.log('Obtencion de las actividades exitosa:', usuario);
      } else {
        console.error('No se encontraron actividades para el ID especificado.');
      }
    } catch (error) {
      console.error('Error al obtener las actividades:', error);
    }
  } else {
    console.warn('No hay token en el almacenamiento local. No se obtendrán actividades.');
  }
});

interface Usuario {
  Usuario: string;
  Correo: string;
}

const apiUrl = 'https://apiexpress-8mwr.onrender.com'; // URL de tu API

const idUsuario = ref<string>(localStorage.getItem('IDU') || ''); // ID del usuario
const usuario = reactive<Usuario>({
  Usuario: '',
  Correo: ''
});

const cambiarContraseña = ref(false);
const nuevaContraseña = ref('');
const confirmarContraseña = ref('');

const editarUsuario = async () => {
  try {
    const { Usuario, Correo } = usuario;
    let datosUsuario = { Usuario, Correo };

    if (cambiarContraseña.value && nuevaContraseña.value === confirmarContraseña.value) {
      datosUsuario.Contraseña = nuevaContraseña.value;
    }

    await axios.put(`${apiUrl}/usuarios/${idUsuario.value}`, datosUsuario);
    alert('Usuario actualizado exitosamente');
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    alert('Error al actualizar usuario');
  }
};

const toggleContraseña = () => {
  cambiarContraseña.value = !cambiarContraseña.value;
  if (!cambiarContraseña.value) {
    nuevaContraseña.value = '';
    confirmarContraseña.value = '';
  }
};

</script>

<style scoped>
.Box_User{
  width: 100%;
  background-color: aqua;
  margin-top: 2%;
}
.ContenedorAct{
  width: 45%;
  margin-top: 5%;
  margin-left: 20%;
}
.Contra{
  width: 100%;
  display: grid;
  background-color: blue;
}
</style>