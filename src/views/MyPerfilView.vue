<template>
  <div class="profile">
    <div class="info-box">
      <span class="profile-label">Nombre:</span>
      <span class="profile-value">{{ info.nombre }}</span>
    </div>
    <div class="info-box">
      <span class="profile-label">Correo:</span>
      <span class="profile-value">{{ info.correo }}</span>
    </div>
    <div class="info-box">
      <span class="profile-label">Contraseña:</span>
      <span class="profile-value">*********</span>
    </div>
    <div class="info-box">
      <span class="profile-label">Cambiar img:</span>
      <button class="change-img-button">Cambiar</button>
    </div>
    <div class="profile-buttons">
      <button class="edit-profile-button">Editar</button>
      <button class="delete-profile-button">Eliminar</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const info = {
  nombre: "Usuario Ejemplo",
  correo: "usuario@example.com"
};
</script>

<style scoped>
.profile {
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  
}


.info-box {
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #AEE2FF;
  width: 45%;
  position: relative;
  left: 240px;
  
}


.profile-label {
  font-weight: bold;
}

.profile-buttons {
  margin-top: 20px;
  position: relative;
  left: 570px;
}

.change-img-button {
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: #6E85B7;
  color: white;
  cursor: pointer;
}

.edit-profile-button, .delete-profile-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #6E85B7;
  color: white;
  cursor: pointer;
  margin-right: 10px;
  
}


</style>
