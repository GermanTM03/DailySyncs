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
          <div class="contenedoraccion">

            <label for="nombre">Nombre de usuario:</label>
            <input type="text" id="nombre" v-model="usuario.Usuario" placeholder="Nuevo Nombre" :disabled="!editandoNombre" required>
          </div>
            <button v-if="!editandoNombre" @click="iniciarEdicion">Editar</button>
            <button v-if="editandoNombre" @click="cancelarEdicion">Cancelar</button>
</div>
        <div class="Correos">
          <label for="correo">Correo electrónico:</label>
          <input type="email" id="correo" v-model="usuario.Correo" disabled required>
        </div>
        <div class="CambiarPWD">
          <h2>Cambia Tu Contraseña</h2>
        </div>
        <div v-if="cambiarContraseña" class="Contra">
          <label for="">Nueva Contraseña</label>
          <input type="password" id="nuevaContraseña" v-model="nuevaContraseña" placeholder="Nueva Contraseña" required>
          <label for="">Repite Contraseña</label>
          <input type="password" id="confirmarContraseña" v-model="confirmarContraseña" placeholder="Confirmar Contraseña" required>
          <span v-if="nuevaContraseña !== confirmarContraseña">Las contraseñas no coinciden</span>
        </div>
        <button type="button" @click="toggleContraseña">Cambiar Contraseña</button>
        <div>
          <div class="FuncionAbajo">
            <button type="submit">Guardar</button>
          </div>
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
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: 'Éxito',
      text: 'Usuario actualizado exitosamente',
      icon: 'success',
      confirmButtonText: 'OK'
    }); 
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    Swal.fire({
      title: 'Error',
      text: 'Error al actualizar usuario',
      icon: 'error',
      confirmButtonText: 'OK'
    });
    
  }
};

const toggleContraseña = () => {
  cambiarContraseña.value = !cambiarContraseña.value;
  if (!cambiarContraseña.value) {
    nuevaContraseña.value = '';
    confirmarContraseña.value = '';
  }
};
const editandoNombre = ref(false);

const iniciarEdicion = () => {
  // Cambia el estado a 'true' para habilitar el campo de entrada de nombre de usuario
  editandoNombre.value = true;
};

const cancelarEdicion = () => {
  editandoNombre.value = false;

};
</script>

<style scoped>
.contenedoraccion{
  display: grid;
  width: 40%;  
}
.contenedoraccion input{
  border: none;
  font-size: 20px;
  width: 10%;
  margin-top: 2%;
}
.Box_User{
  font-size: 20px;
  width: 100%;
  display: flex;
  margin-top: 2%;
}
.Box_User input{
  width: 100%;
}

.Correos{
  font-size: 20px;
  width: 100%;
  display: grid;
  margin-top: 2%;
}
.Correos input{
  border: none;
  font-size: 20px;
}

.ContenedorAct{
  width: 45%;
  margin-top: 5%;
  margin-left: 20%;
}
.ContenedorAct button{
  background-color: #6E85B7;
  border: none;
  width: auto;
  color: white;
  height: 10%;
  border-radius: 1rem;
  height: 2rem;
  margin-top: 1%;
}

.Contra{
  width: 100%;
  display: grid;
  margin: 1%;
}
.Contra input{
  background-color: #c3c8d3;
  width: 50%;
  height: 30px;
  color: white;
  border-radius: 1rem;
  border: none;
}
</style>
