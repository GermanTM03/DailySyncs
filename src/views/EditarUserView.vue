<template>
  <header class="nav">
    <div class="IMGHEADER">
      <img src="../assets/Header.png" alt="Usuario" />
    </div>
  </header>
  <div class="user-panel">
    <UserView />
  </div>
  <div>
    <div class="ContenedorAct">
      <h2>Editar Usuario</h2>
      <form @submit.prevent="editarUsuario">
        <div class="Box_User">
          <label for="nombre">Nombre de usuario:</label>
          <input type="text" id="nombre" v-model="usuario.Usuario" placeholder="Nuevo Nombre" required >
          <button>Editar</button>
        </div>
        <div class="Box_User">
          <label for="correo">Correo electrónico:</label>
          <input type="email" id="correo" v-model="usuario.Correo" required>
        </div>
        <div v-if="cambiarContraseña" class="Contra">
          <input type="password" id="nuevaContraseña" v-model="nuevaContraseña" placeholder="Nueva Contraseña" required>
          <input type="password" id="confirmarContraseña" v-model="confirmarContraseña" placeholder="Confirmar Contraseña" required>
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
import type IUser from '@/Interface/IUser'
import UserView from './Usuario.vue'
import UserService from '@/services/AuthServices'

const token = ref<string>('');
const IDU = ref<number>(0);
const usuario = reactive<IUser>({
  Usuario: '',
  Correo: ''
});
const cambiarContraseña = ref(false);
const nuevaContraseña = ref('');
const confirmarContraseña = ref('');
const apiUrl = 'https://apiexpress-8mwr.onrender.com'; // URL de tu API

onMounted(async () => {
  const tokenFromStorage = localStorage.getItem('token');
  const IDFromStorage = localStorage.getItem('IDU');

  if (tokenFromStorage && IDFromStorage) {
    token.value = tokenFromStorage;
    IDU.value = parseInt(IDFromStorage);
    console.log('IDU:', IDU.value);
    console.log('Token:', token.value);
    try {
      const usuarioResponse = await UserService.User(IDU.value);
      if (usuarioResponse && Array.isArray(usuarioResponse) && usuarioResponse.length > 0) {
        usuario.Usuario = usuarioResponse[0].Usuario;
        usuario.Correo = usuarioResponse[0].Correo;
        console.log('Obtencion del usuario exitosa:', usuarioResponse[0]);
      } else {
        console.error('No se encontró el usuario para el ID especificado.');
      }
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
    }
  } else {
    console.warn('No hay token en el almacenamiento local. No se obtendrá el usuario.');
  }
});

const editarUsuario = async () => {
  try {
    const { Usuario, Correo } = usuario;
    let datosUsuario = { Usuario, Correo };

    if (cambiarContraseña.value && nuevaContraseña.value === confirmarContraseña.value) {
      datosUsuario.Contraseña = nuevaContraseña.value;
    }

    await axios.put(`${apiUrl}/usuarios/${IDU.value}`, datosUsuario);
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
