<template>
   <body>
    <div class="Cuerpo">
      <div class="InicioSesion">
        <img src="../assets/img/Logo.png" alt="" />
        <div class="Formulario">
          <div v-if="user">
        <p><strong>Name:</strong> {{ user.Usuario }}</p>
        <p><strong>Email:</strong> {{ user.Correo }}</p>
      </div>
      <form @submit.prevent="registerUser">
            <div class="input_box">
              <input type="text" id="name"  v-model="name" placeholder="Usuario:" required />
              <i class="bx bx-user"></i>
            </div>
            <div class="input_box">
              <input type="email" placeholder="Correo:" id="email" v-model="email" required />
              <i class="bx bx-user"></i>
            </div>
            <div class="input_box">
              <input type="password" placeholder="Contraseña:" id="password" v-model="password" required />
              <i class="bx bxs-lock-alt"></i>
            </div>
            <div class="input_box">
              <input type="password" placeholder="Repite Contraseña:" id="confirmPassword" v-model="confirmPassword"  required />
              <i class="bx bxs-lock-alt"></i>
            </div>
  
            <button type="submit">Ingresar</button>
          </form>
        </div>
        <div class="Pregunta">
          <p>Ya Tienes Una cuenta? <a href="/Login ">Ingresa</a></p>
        </div>
      </div>
    </div>
 </body>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import UserService from '@/services/AuthServices'
  import type IUser from '@/interface/IUser'
  import { useRouter } from 'vue-router'
  
  let name = ref('')
  let email = ref('')
  let password = ref('')
  let confirmPassword = ref('')
  let user = ref<IUser | null>(null)
  
  const router = useRouter()
  
  async function registerUser() {
    try {
      if (password.value !== confirmPassword.value) {
        throw new Error('La contraseña y la confirmación de contraseña no coinciden');
      }
      
      if (!name.value || !email.value || !password.value || !confirmPassword.value) {
        throw new Error('Todos los campos son obligatorios');
      }
  
      const newUser: IUser = {
        ID: 0, // Se podría dejar como 0 o como undefined, dependiendo de si se asigna en el backend o no
        Usuario: name.value,
        Contraseña: password.value,
        Correo: email.value,
        FechaCreacion: new Date() // Se podría enviar la fecha desde el backend
      };
      user.value = await UserService.registerUsuario(newUser);
      
      // Redirigir al usuario a la página de inicio de sesión después de un registro exitoso
      router.push('/Login');
  
      // Limpiar los campos después del registro exitoso
      name.value = ''
      email.value = ''
      password.value = ''
      confirmPassword.value = ''
    } catch (error) {
      console.error('No se pudo registrar el usuario:', error)
    }
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
    width: 10%;
    height: 10%;
  }
  
  .Formulario {
    width: 100%;
    text-align: center;
  }
  .Formulario button {
    background-color: rebeccapurple;
    width: 35%;
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
  input {
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
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
  