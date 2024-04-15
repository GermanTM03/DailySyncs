<!---- Estilo terminado ----->
<template  >
 <body> 
  <div>
    <div class="Cuerpo">
    <div class="InicioSesion">
      <img src="../assets/Azul.png" alt="" />
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
        <p>No tienes cuenta? <router-link to="/Registro">Regístrate</router-link></p>
      </div>
    </div>
  </div>
  </div>
</body>
  

</template>

<script setup lang="ts">
import { ref } from 'vue';
import authServices from '@/services/AuthServices';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router'; // Asegúrate de importar el enrutador desde vue-router

const router = useRouter();
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
    localStorage.setItem('IDU', String(userId));
    showLoginSuccess();
    router.push('/Home');
  } catch (error) {
    showErrorAlert();

    console.error('Error en el inicio de sesión:', error);
  }
};

const logout = () => {
  token.value = null;
  ID.value = null;
  localStorage.removeItem('token');
  localStorage.removeItem('IDU');
};
const tokenFromStorage = localStorage.getItem('token');
const IDFromStorage = localStorage.getItem('IDU   ');

if (tokenFromStorage && IDFromStorage) {
  token.value = tokenFromStorage;
  ID.value = parseInt(IDFromStorage);
}

// Función para mostrar alerta de inicio de sesión exitoso
const showLoginSuccess = () => {
  Swal.fire('¡Inicio de sesión exitoso!', '¡Bienvenido de nuevo!', 'success');
};

// Función para mostrar alerta de error en el inicio de sesión
const showErrorAlert = () => {
  Swal.fire('Error en el inicio de sesión', 'Por favor, intenta de nuevo.', 'error');
};
</script>

<style scoped>
/*--Estilo del fondo Login--*/
body{
   background-image: url(../assets/Fondo_Login.png);
   background-repeat: no-repeat;
   background: cover;
   background-size: cover
}
/*--Estilo del conteneador del Login--*/
.Cuerpo {
  margin: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
/*--Estilo del fondo de la tarjeta del login--*/
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
/*--Estilo de la img usado en la tarjeta del login--*/
.InicioSesion img {
  width: 15%;
  height: 15%;
}
/*--Estilos del formulario Login--*/
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
