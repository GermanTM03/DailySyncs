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
      <h3>NUEVA ACTIVIDAD</h3>
      <form @submit.prevent="registerAct" >
        <div class="inputbox">
          <label for="">Titulo:</label>
          <input type="text" id="titulo" v-model="titulo" required />
        </div>
        <div class="inputbox">
          <label for="">Descripcion:</label>
          <input type="text" id="descripcion" v-model="descripcion" required />
        </div>
        <div class="Labell">
          <label for=""> Importancia:</label>
        </div>
        <div class="input_container">
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
        </div>

        <div class="FechaTerminoContainer">
          <label for="fechaTermino">Fecha de término:</label>
          <div class="FechaAct">
            <input
              type="date"
              id="fechaTermino"
              required
              class="styled-date-input"
              v-model="fechaTermino"
            />
            <i class="bx bx-calendar"></i>
          </div>
        </div>

        <button style="background-color: blue;" type="submit">Crear Actividad</button>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import User from './Usuario.vue'
import { ref, onMounted } from 'vue'
import UserService from '@/services/AuthServices'
import type IActividad from '@/Interface/IActividad'
import { useRouter } from 'vue-router'

const token = ref<string>('')
const IDU = ref<number>(0)
let titulo = ref('')
let descripcion = ref('')
let importancia = ref('1') // Inicializado con el valor predeterminado
let fechaTermino = ref('')
let usuarioID = ref(IDU) // Puedes obtener el ID del usuario desde la sesión o de donde corresponda
let act = ref<IActividad | null>(null)

const router = useRouter()
onMounted(async () => {
  const tokenFromStorage = localStorage.getItem('token')
  const IDFromStorage = localStorage.getItem('IDU')

  if (tokenFromStorage && IDFromStorage) {
    token.value = tokenFromStorage
    IDU.value = parseInt(IDFromStorage)
    console.log('IDU:', IDU.value)
    console.log('Token:', token.value)

    try {
      const actividades = await UserService.GetAct(IDU.value)
      if (actividades && Array.isArray(actividades)) {
        users.value = actividades
        console.log('Obtencion de las actividades exitosa:', actividades)
      } else {
        console.error('No se encontraron actividades para el ID especificado.')
      }
    } catch (error) {
      console.error('Error no se pudo obtener las actividades:', error)
    }
  } else {
    console.warn('No hay token en el almacenamiento local. No se obtendrán actividades.')
  }
})
async function registerAct() {
  try {
    if (!titulo.value || !descripcion.value || !importancia.value || !fechaTermino.value) {
      throw new Error('Todos los campos son obligatorios')
    }

    const newAct: IActividad = {
      ID: 0,
      UsuarioID: usuarioID.value,
      Descripcion: descripcion.value,
      Importancia: importancia.value,
      FechaTermino: new Date(fechaTermino.value),
      FechaCreacion: new Date(),
      Titulo: titulo.value
    }

    act.value = await UserService.registerAct(newAct)

    titulo.value = ''
    descripcion.value = ''
    importancia.value = 0
    fechaTermino.value = ''
  } catch (error) {
    console.error('No se pudo crear la actividad:', error)
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
  margin-top: 6%;
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
  transition: .5s;

}
</style>
