<template>
  <header class="nav">
    <div class="IMGHEADER">
      <img src="../assets/Header.png" alt="Usuario" />
    </div>
  </header>
  <div class="Contenedor">
    <div class="user-panel">
      <User />
    </div>
    <div class="add">
      <h3>Tu Actividad</h3>
      <form
        @submit.prevent="handleSubmit(actividad)"
        v-for="actividad in users"
        :key="actividad.IDA"
      >
        <div class="inputbox">
          <label for="">Titulo:</label>
          <input
            type="text"
            id="titulo"
            v-model="actividad.Titulo"
            :disabled="!actividad.editing"
            required
          />
        </div>
        <div class="inputbox">
          <label for="">Descripcion:</label>
          <input
            type="text"
            id="descripcion"
            v-model="actividad.Descripcion"
            :disabled="!actividad.editing"
            required
          />
        </div>
        <div class="Labell">
          <label for=""> Importancia:</label>
        </div>
        <div class="input_container">
          <div class="input_box">
            <label>
              <input
                type="radio"
                name="importancia"
                value="1"
                v-model="actividad.Importancia"
                :disabled="!actividad.editing"
              />
              Muy importante
            </label>
          </div>
          <div class="input_box">
            <label>
              <input
                type="radio"
                name="importancia"
                value="2"
                v-model="actividad.Importancia"
                :disabled="!actividad.editing"
              />
              Poco importante
            </label>
          </div>
          <div class="input_box">
            <label>
              <input
                type="radio"
                name="importancia"
                value="3"
                v-model="actividad.Importancia"
                :disabled="!actividad.editing"
              />
              Nada importante
            </label>
          </div>
        </div>

        <div class="FechaTerminoContainer">
          <label for="fechaTermino">Fecha de término:</label>
          <div class="FechaAct">
            <a href="">{{ actividad.FechaTermino }}</a>
            <input
              type="date"
              id="fechaTermino"
              required
              class="styled-date-input"
              v-model="actividad.FechaTermino"
              v-if="actividad.editing"
            />
            <i class="bx bx-calendar"></i>
          </div>
          <label for="fechaTermino">Fecha de Creacion:</label>
          <div class="FechaAct">
            <a href="">{{ actividad.FechaCreacion }}</a>
          </div>
        </div>

        <button
          style="background-color: blue"
          v-if="!actividad.editing"
          @click="actividad.editing = true"
        >
          Editar
        </button>

        <button
          style="background-color: red"
          type="button"
          @click="cancelEdit(actividad)"
          v-if="actividad.editing"
        >
          Cancelar
        </button>

        <button style="background-color: purple" type="submit">Guardar</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import UserService from '@/services/AuthServices'
import type IActividad from '@/Interface/IActividad'
import { useRoute, useRouter } from 'vue-router'
import User from './Usuario.vue'

const token = ref<string>('')
const ID = ref<number>(0)
const IDU = ref<number>(0)
const users = ref<IActividad[]>([])

const route = useRoute()
const router = useRouter()

onMounted(async () => {
  const tokenFromStorage = localStorage.getItem('token')
  const IDFromStorage = localStorage.getItem('IDU')
  IDU.value = parseInt(IDFromStorage)

  if (tokenFromStorage) {
    token.value = tokenFromStorage

    const idFromRoute = parseInt(route.params.id)

    if (!isNaN(idFromRoute)) {
      ID.value = idFromRoute

      try {
        const actividades = await UserService.Act(ID.value)
        if (actividades && Array.isArray(actividades)) {
          users.value = actividades
          console.log('Obtencion de las actividades exitosa:', actividades)

          if (!actividades || actividades.length === 0) {
            console.error('No se encontraron actividades para el ID especificado.')
            // Redirigir a la página de error
            router.push('/error')
            return // Salir de la función
          }

          // Almacenar actividades y verificar cada actividad
          users.value = actividades
          console.log('Obtención de las actividades exitosa:', actividades)

          if (actividades.some((actividad) => actividad.UsuarioID !== IDU.value)) {
            console.error('El UsuarioID no coincide con el IDU.')
            // Redireccionar a otra página
            router.push('/error')
          }
        } else {
          console.error('No se encontraron actividades para el ID especificado.')
        }
      } catch (error) {
        console.error('Error al obtener las actividades:', error)
      }
    } else {
      console.error('ID inválido en la URL.')
    }
  } else {
    console.warn('No hay token en el almacenamiento local. No se obtendrán actividades.')
  }
})
const cancelEdit = (actividad: IActividad) => {
  actividad.editing = false
}
const handleSubmit = async (actividad: IActividad) => {
  try {
    await UserService.updateAct(actividad)
  } catch (error) {
    console.error('Error al actualizar la actividad:', error)
  }
}
</script>
<style scoped>
.User {
  width: 20%;
  background-color: rgb(129, 141, 141);
  height: 400px;
}
.nav {
  width: 100%;
  height: 50px;
  background-color: #b799ff;
}
.Contenedor {
  width: 100%;
  height: auto;
  display: flex;
  margin-top: 5%;
}
.add {
  width: 50%;
  margin-left: 10%;
  height: auto;
  background-color: aliceblue;
}
.add h3 {
  font-size: 25px;
  margin-left: 5%;
  margin-top: 5%;
}
.inputbox {
  width: 100%;
  height: auto;
}
.inputbox {
  width: 100%;
  height: auto;
  display: grid;
  margin-top: 2%;
  height: auto;
  margin-left: 5%;
}
.inputbox input {
  width: 80%;
  height: 40px;
  border-radius: 1rem;
  border: none;
  background-color: #aee2ff;
}
.inputbox label {
  font-size: 20px;
}
.Contenedor label {
  font-size: 20px;
}
.Labell {
  margin-left: 5%;
  margin-top: 2%;
}
.input_box {
  width: 100%;
  display: flex;
  height: 50%;
  margin-top: 2%;
  justify-content: center;
  text-align: center;
  align-items: center;
  font-size: 15px;
}
.input_container {
  display: flex;
  height: 60px;
}

.input_box {
  margin-right: 10px;
}
.styled-date-input {
  appearance: none;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 8px 12px;
  font-size: 16px;
  outline: none;

  margin-left: 5%;
}

.bx-calendar {
  position: relative;
  left: -30px;
  top: 6px;
  color: #555;
}

.FechaAct {
  position: relative;
  margin-left: 10%;
  text-decoration: none;
}

.FechaAct i {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}
.FechaTerminoContainer {
  margin-bottom: 20px;
}

.FechaTerminoContainer label {
  display: block;
  margin-bottom: 5px;
  margin-left: 5%;
}
.Contenedor button {
  width: 20%;
  height: 30px;
  margin-top: 5%;
  margin-left: 1%;
  margin-bottom: 10%;
  border-radius: 2rem;
  background-color: #6e85b7;
  border: none;
  color: white;
  cursor: pointer;
}
.Contenedor button:hover {
  background-color: #9aaacc;
  color: black;

  transition: 0.5s;
}
.editar-style button {
  background-color: blue;
  font-weight: bold;
}

.eliminar-style {
  background-color: red;
  font-weight: bold;
}
</style>
