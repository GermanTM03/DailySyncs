<template>
    <div class="Cuerpo">
      <div class="Agregar-act">
        <img src="../assets/img/Logo.png" alt="" />
        <div class="Formulario">
          <form @submit.prevent="registerAct">
            <div class="input_box">
              <input type="text" id="titulo" v-model="titulo" placeholder="Título" required />
              <i class="bx bx-user"></i>
            </div>
            <div class="input_box">
              <textarea id="descripcion" v-model="descripcion" placeholder="Descripción" required></textarea>
              <i class="bx bx-user"></i>
            </div>
            <div class="input_box">
  <label>
    <input type="radio" name="importancia" value="1" v-model="importancia" />
    Muy importante
  </label>
  </div>
  <div class="input_box">
  <label>
    <input type="radio" name="importancia" value="2" v-model="importancia" />
    Poco importante
  </label>
  </div>
  <div class="input_box">
  <label>
    <input type="radio" name="importancia" value="3" v-model="importancia" />
    Nada importante
  </label>
  </div>
  
            <div class="input_box">
              <input type="date" id="fechaTermino" v-model="fechaTermino" required />
              <i class="bx bx-calendar"></i>
            </div>
            <button type="submit">Agregar Actividad</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
 
  </script>
  
  <style scoped>
  /* Estilos para el formulario */
  .Agregar-act {
    position: relative;
    top: 60px;
    max-width: 400px; /* Ancho máximo del formulario */
    margin: 0 auto; /* Centrar el formulario horizontalmente */
    padding: 20px;
    background-color: #f4f4f4; /* Color de fondo del formulario */
    border-radius: 8px; /* Bordes redondeados */
  }
  img {
    left: 175px;
    position: relative;
    width: 15%;
    height: 15%;
  }
  .Formulario {
    margin-top: 20px;
  }
  
  .input_box {
    position: relative;
    margin-bottom: 20px;
  }
  
  .input_box input,
  .input_box textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc; /* Borde del campo de entrada */
    border-radius: 5px; /* Bordes redondeados del campo de entrada */
  }
  
  .input_box textarea {
    resize: none; /* Evitar que el usuario pueda redimensionar el área de texto */
  }
  
  .input_box i {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    color: #888; /* Color del ícono */
  }
  
  button[type="submit"] {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #007bff; /* Color de fondo del botón */
    color: #fff; /* Color del texto del botón */
    cursor: pointer;
  }
  
  button[type="submit"]:hover {
    background-color: #0056b3; /* Cambiar el color de fondo al pasar el cursor sobre el botón */
  }
  
  </style>
  
  