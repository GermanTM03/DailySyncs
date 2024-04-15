<template>
    <div id="app">
      <h1>Bienvenido a mi aplicación</h1>
      <button @click="deleteItem">Borrar</button>
      <button @click="saveItem">Guardar</button>
      <button @click="showLoginSuccess">Login Exitoso</button>
      <button @click="showRegisterSuccess(false)">Registro Exitoso</button>
      <button @click="showRegisterSuccess(true)">Registro Fallido</button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import Swal from 'sweetalert2';
  
  export default defineComponent({
    name: 'App',
    setup() {
      const deleteItem = () => {
        Swal.fire({
          title: '¿Estás seguro?',
          text: '¡No podrás deshacer esta acción!',
          icon: 'warning',
          showCancelButton: true, 
          confirmButtonText: 'Sí, bórralo',
          cancelButtonText: 'Cancelar',
        }).then((result: any) => {
          if (result.isConfirmed) {
            Swal.fire('¡Borrado!', 'El elemento ha sido borrado.', 'success');
          }
        });
      };
  
      const saveItem = () => {
        Swal.fire('Guardado', 'El elemento ha sido guardado correctamente', 'success');
      };
  
      const showLoginSuccess = () => {
        Swal.fire('¡Inicio de sesión exitoso!', '¡Bienvenido de nuevo!', 'success');
      };
  
      const showRegisterSuccess = (success: boolean) => {
        if (success) {
          Swal.fire('¡Error en el registro!', 'El correo electrónico ya está registrado.', 'error');
        } else {
          Swal.fire('¡Registro exitoso!', '¡Bienvenido a nuestra plataforma!', 'success');
        }
      };
  
      return { deleteItem, saveItem, showLoginSuccess, showRegisterSuccess };
    },
  });
  </script>
  
  <style>
  /* Aquí puedes agregar estilos personalizados si los necesitas */
  </style>
  