<template>

    <h2>Iniciar sesión</h2>
    <form @submit.prevent="login">
      <label>Usuario:</label>
      <input type="text" v-model="usuario">
      <label>Contraseña:</label>
      <input type="password" v-model="contraseña">
      <button type="submit">Iniciar sesión</button>
    </form>
    <button v-if="token" @click="logout">Cerrar sesión</button>
    <p v-if="token">Usuario logueado</p>
    <p v-if="token">¡Bienvenido, {{ ID }}! Tu ID de usuario es {{ ID }}.</p>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import authServices from '@/services/AuthServices';

const usuario = ref('');
const contraseña = ref('');
const token = ref<string | null>(null);
const ID = ref<number | null>(null);

const login = async () => {
  try {
    const { token: authToken, ID: userId } = await authServices.login(usuario.value, contraseña.value);

    token.value = authToken;
    ID.value = userId;
    localStorage.setItem('token', authToken);
    localStorage.setItem('ID', String(userId));
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    alert('Error en el inicio de sesión. Por favor, intenta de nuevo.');
  }
};

const logout = () => {
  token.value = null;
  ID.value = null;
  localStorage.removeItem('token');
  localStorage.removeItem('ID');
};
const tokenFromStorage = localStorage.getItem('token');
const IDFromStorage = localStorage.getItem('ID');

if (tokenFromStorage && IDFromStorage) {
  token.value = tokenFromStorage;
  ID.value = parseInt(IDFromStorage);
}
</script>

<style>
/* Estilos CSS aquí */
</style>
