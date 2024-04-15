<template>
  <header class="Moradito">
    
  </header>
  <div class="Cuerpo"></div>
    <div class="user-panel">
<UsuarioView/>
    </div>









  <div class="Cuerpo">
    <div class="InicioSesion">
      <img src="../assets/icons/Icon_principal.png" alt="" />
      <div class="Formulario">
        <form @submit.prevent="registerAct">
          <div class="input_box">
            <input type="text" id="titulo" v-model="titulo" placeholder="Título" required />
            <i class="bx bx-user"></i>
          </div>
          <div class="input_box">
            <textarea
              id="descripcion"
              v-model="descripcion"
              placeholder="Descripción"
              required
            ></textarea>
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
          <button type="submit">Crear Actividad</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import UserService from '@/services/AuthServices'
import type IActividad from '@/Interface/IActividad'
import { useRouter } from 'vue-router'
import UsuarioView from './Usuario.vue'

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
      console.error('Error al obtener las actividades:', error)
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
.InicioSesion {
  max-width: 400px;
  margin: 0 auto; 
  padding: 20px;
  background-color: #f4f4f4; 
  border-radius: 8px;
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

button[type='submit'] {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff; /* Color de fondo del botón */
  color: #fff; /* Color del texto del botón */
  cursor: pointer;
}

button[type='submit']:hover {
  background-color: #0056b3; /* Cambiar el color de fondo al pasar el cursor sobre el botón */
}
.user-panel {
  width: 20%;
  margin: 0;
  background-color: rgb(74, 23, 192);
  
}

.user-panel h2, .activities-panel h2 {
  margin-bottom: 10px;
}
</style>
