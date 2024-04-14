<template>
    <div id="app">
      <h1>Bienvenido a mi aplicación</h1>
      <button @click="deleteItem">Borrar</button>
      <button @click="saveItem">Guardar</button>
      <button @click="showLoginSuccess">Login Exitoso</button>
      <button @click="showRegisterSuccess">Registro Exitoso</button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import Swal from 'sweetalert2'; // Importa todo el módulo
  
  export default defineComponent({
    name: 'App',
    setup() {
      const deleteItem = () => {
        Swal.fire({ // Usa Swal.fire en lugar de swal
          title: '¿Estás seguro?',
          text: '¡No podrás deshacer esta acción!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sí, bórralo',
          cancelButtonText: 'Cancelar',
        }).then((result: any) => {
          if (result.isConfirmed) {
            // Aquí podrías escribir la lógica para borrar el elemento
            Swal.fire('¡Borrado!', 'El elemento ha sido borrado.', 'success');
          }
        });
      };
  
      const saveItem = () => {
        // Aquí podrías escribir la lógica para guardar el elemento
        Swal.fire('Guardado', 'El elemento ha sido guardado correctamente', 'success');
      };
  
      const showLoginSuccess = () => {
        Swal.fire('¡Inicio de sesión exitoso!', '¡Bienvenido de nuevo!', 'success');
      };
  
      const showRegisterSuccess = () => {
        Swal.fire('¡Registro exitoso!', '¡Bienvenido a nuestra plataforma!', 'success');
      };
  
      return { deleteItem, saveItem, showLoginSuccess, showRegisterSuccess };
    },
  });
  
  </script>
  
  <style>
  /* Aquí puedes agregar estilos personalizados si los necesitas */
  </style>
  