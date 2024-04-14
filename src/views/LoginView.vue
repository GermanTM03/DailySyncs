<template  >
 <body> 
  <div class="Cuerpo">
    <div class="InicioSesion">
      <img src="../assets/img/Logo.png" alt="" />
      <div class="Formulario">
        <form @submit.prevent="login">
          <div class="input_box">
            <input type="text" placeholder="Correo electrónico:" v-model="correo" required />
            <i class="bx bx-user"></i>
          </div>
          <div class="input_box">
            <input type="password" placeholder="Contraseña:" v-model="contraseña" required />
            <i class="bx bxs-lock-alt"></i>
          </div>
          <button type="submit">Iniciar sesión</button>
        </form>

        <button v-if="token" @click="logout">Cerrar sesión</button>
          <p v-if="token">Usuario logueado</p>
           <p v-if="token">¡Bienvenido, {{ ID }}! Tu ID de usuario es {{ ID }}.</p>

      </div>
      <div class="Pregunta">
        <p>No tienes cuenta? <router-link to="/Register">Regístrate</router-link></p>
      </div>
    </div>
  </div>
</body>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import authServices from '@/services/AuthServices';

const correo = ref('');
const contraseña = ref('');
const token = ref<string | null>(null);
const ID = ref<number | null>(null);

const login = async () => {
  try {
    const { token: authToken, ID: userId } = await authServices.login(correo.value, contraseña.value);

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

<style scoped>
body{
   background-image: url(../assets/img/Fondo_Login.png);
   background-repeat: no-repeat;
   background: cover;
   background-size: cover
}
.Cuerpo {
  margin: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.InicioSesion {
  margin-top: -10%;
  border-radius: 1rem;
  background-color: aliceblue;
  width: 50%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.InicioSesion img {
  width: 15%;
  height: 15%;
}

.Formulario {
  width: 100%;
  text-align: center;
}
.Formulario button {
  background-color: rgb(78, 21, 134);
  width: 20%;
  height: 40px;
  border-radius: 10px;
  color: white;
}
.Formulario .input_box {
  width: 90%;
  height: 50px;
  margin: 30px 0;
  position: relative;
}
input {
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
}
.input_box input {
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  font-size: 16px;
  color: #000000;
  padding: 0px 45px 0px 20px;
}
.input_box input::placeholder {
  color: rgb(0, 0, 0);
}
.input_box i {
  position: absolute;
  right: -60px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 30px;
}

.Pregunta {
  margin-top: 20px;
  text-align: center;
}

.Pregunta a {
  text-decoration: none;
}
</style>
