<template>
  <header class="cabeza">
    <div class="IMGHEADER">

<img src="../assets/Header.png" alt="Usuario" />
</div>
  </header>
    <main class="container">
      <div class="user-panel">
  <UsuarioView/>
      </div>
  
      <div class="activities-panel">
        <div  class="Agregar">
          <a :href="token ? '/Agregar' : '/login'">
            <div  class="contenedoragregar">
              <p >{{ token ? 'Agrega Una Actividad' : 'Inicia sesión para agregar una actividad' }}</p>
            </div>
          </a>
        </div>
  
        <div class="Actividades">
  
          <h2>Mis Actividades</h2>
          <ul>
            <li v-for="actividad in users" :key="actividad.IDA" >
              <div class="ActividadUser">
                <div class="TituloAct">
                  <p>{{ actividad.Titulo }}</p>
                </div>
                <div class="Editar">
                  <button  @click="redirect(actividad.IDA, actividad.UsuarioID) ">Detalles</button>
                </div>
                <div class="Eliminar">
                  <button  @click="eliminarActividad(actividad.IDA)">Eliminar</button>
                </div>
              </div>
  
              
            </li>
          </ul>
        </div>
      </div>
    </main>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import UserService from '@/services/AuthServices'
  import type IActividad from '@/Interface/IActividad'
  import { useRouter } from 'vue-router'
  import UsuarioView from './Usuario.vue'
  import Swal from 'sweetalert2'; 
  
  
  
  
  const router = useRouter()
  
  const token = ref<string>('')
  const IDU = ref<number>(0)
  const users = ref<IActividad[]>([])
  
  onMounted(async () => {
      const tokenFromStorage = localStorage.getItem('token')
      const IDFromStorage = localStorage.getItem('IDU')
  
      if (tokenFromStorage && IDFromStorage) {
          token.value = tokenFromStorage
          IDU.value = parseInt(IDFromStorage)
          console.log("IDU:", IDU.value);
  console.log("Token:", token.value);
  
          try {
              const actividades = await UserService.GetAct(IDU.value)
              if (actividades && Array.isArray(actividades)) {
                  users.value = actividades
                  console.log("Obtencion de las actividades exitosa:", actividades)
              } else {
                  console.error('No se encontraron actividades para el ID especificado.')
              }
          } catch (error) {
              console.error('Error al obtener las actividades:', error)
          }
      } else {
          console.warn('No hay token en el almacenamiento local. No se obtendrán actividades.')
      }
  })
  
  const eliminarActividad = async (actividadID: number) => {
    try {
      // Preguntar al usuario si está seguro de eliminar la actividad
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: '¡No podrás deshacer esta acción!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      });
  
      if (result.isConfirmed) {
        await UserService.eliminarActividad(actividadID);
        await cargarActividades();
        console.log('Actividad eliminada exitosamente');
  
        // Mostrar alerta de eliminación exitosa
        Swal.fire('¡Eliminación exitosa!', 'La actividad ha sido eliminada correctamente', 'success');
      }
    } catch (error) {
      console.error('Error al eliminar la actividad:', error);
      // Mostrar una alerta o mensaje de error si lo deseas
    }
  };
  
  const cargarActividades = async () => {
    try {
      const actividades = await UserService.GetAct(IDU.value);
      if (actividades && Array.isArray(actividades)) {
        users.value = actividades;
        console.log("Obtencion de las actividades exitosa:", actividades);
      } else {
        console.error('No se encontraron actividades para el ID especificado.');
      }
    } catch (error) {
      console.error('Error al obtener las actividades:', error);
    }
  };
  
  
  const redirect = (IDA: number, UsuarioID: number) => {
    const IDFromStorage = parseInt(localStorage.getItem('IDU') || '0'); // Parsea a número y maneja el caso de null
    console.log("IDU:", IDFromStorage);
  
    if (UsuarioID === IDFromStorage) {
      router.push(`/Act/${IDA}`);
      console.log('JALO')
    } else {
      console.log('El UsuarioID y el IDU no coinciden.');
    }
  };
  
  </script>
  
  <style scoped>
  .cabeza{
    background-color: #B799FF;
    width: 100%;
    height: 50px;
  }
  .container {
    display: flex;
    margin-top: 50px;
    margin: 0;
    margin-top: 5%;
  }
  .Agregar{
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    text-decoration: none;
  
  }
  .ActividadUser{
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
  }
  
  .TituloAct{
    width: 60%;
    height: 50%;
    background-color: #AEE2FF;
    text-align: center;
    justify-content: center;
    align-items: center;
    display: flex;
    border-radius: 3rem;
  }
  .Editar{
    margin-left: 3%;
    width: 15%;
    height: 50%;
    background-color: blanchedalmond;
    text-align: center;
    justify-content: center;
    align-items: center;
    display: flex;
    border-radius: 3rem;
    .style-editar{
background-color: blue;
    }
  }
  .Agregar a:hover{
    background-color: #6e85b78a;
    color: white;
    transition: .5s;
  }
  .Eliminar{
    margin-left: 3%;
  
    width: 15%;
    height: 50%;
    background-color: #6E85B7;
    text-align: center;
    justify-content: center;
    align-items: center;
    display: flex;
    border-radius: 3rem;
  }
  .Eliminar button{
   width: 100%;
   height: 100%;
   color: white;
   background-color: red;
   font-weight: bold;
  
   border-radius: 2rem;
   border: none;
   cursor: pointer;
  }
  .Editar button{
   width: 100%;
   background-color: blue;
   color: white;
   font-weight: bold;
   height: 100%;
   border-radius: 2rem;
   border: none;
   cursor: pointer;
  }
  .Eliminar  :hover{
    background-color: orange;
    color: black;
    transition: .5s;

  
  }
  .Editar  :hover{
    background-color: #a7b9e0;
    color: black;
    transition: .5s;

  
  }
  
  .Agregar a{
  text-decoration: none;
  color: black ;
  text-decoration: none;
  overflow: hidden;
  background-color: #AEE2FF;
  width: 90%;
  padding: .5rem 8rem ;
  text-align: center;
  border-radius: 10rem;
  text-decoration: none;
  
  }
  
  .Actividades{
    margin-top: 10%;
    width: 100%;
    height: auto;
  }
  
   .activities-panel {
    width: 50%;
    padding: 20px;
    margin-left: 10%;
  
  }
  .user-panel {
    width: 20%;
    margin: 0;
    
  }
  
  .user-panel h2, .activities-panel h2 {
    margin-bottom: 10px;
  }
  
  .activities-panel ul {
    list-style: none;
    padding: 0;
  }
  
  .activities-panel li {
    margin-bottom: 5px;
  }

  </style>
  