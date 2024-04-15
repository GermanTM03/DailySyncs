<!-- Estilo terminado -->
<template>
  
   <form action="">
    <div >
      <input type="text" placeholder="Ingresa tu actividad" class="input-home">
    </div>
    <router-link to="/AddAct" class="button-home">
      Agregar
    </router-link>
  </form>
 
</template>

<script setup>
import { RouterLink} from 'vue-router'
</script>

<style scoped>
/*-------- Estilos del header -----------*/
.main-header {
  background-color: #6028FF;
  color: white;
  display: flex;
  align-items: center;
  padding: 1rem;
}
/*----- Estilos del input --------*/
.input-home{
  width: 800px; 
  height: 30px; 
  padding: 10px; 
  border-radius: 20px;
  border: none; 
  background-color: #AEE2FF; 
  color: white; 
  top: 50px;
  position: relative;
  left: 380px;
  
}
/*----- Estilos del boton --------*/
.button-home{
  background-color: #6E85B7;
  border: none;
  color: white;
  width: 100px;
  height: 35px; 
  border-radius: 20px; 
  top: 60px;
  position: relative;
  left: 1098px;
  display: inline-block; 
  text-decoration: none; 
  line-height: 35px; 
  text-align: center; 
}

</style>
