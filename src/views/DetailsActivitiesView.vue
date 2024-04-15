<template>
  <div class="actividad-details">
    <div class="section">
      <h2>Nombre de la actividad o tarea</h2>
      <div class="info-box">{{ actividad.titulo }}</div>
    </div>
    <div class="section">
      <h2>Descripción</h2>
      <div class="info-box">{{ actividad.descripcion }}</div>
    </div>
    <div class="section">
      <h2>Marcar como</h2>
      <div class="checkboxes">
        <label><input type="checkbox"> Terminada</label>
        <label><input type="checkbox"> Pendiente</label>
      </div>
    </div>
    <div class="section">
      <h2>Fecha de término</h2>
      <div class="info-box">{{ actividad.fechaTermino }}</div>
    </div>
    <div class="button-section">
      <button class="update-button">Editar tarea</button>
      <button class="delete-button">Eliminar</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import UserService from '@/services/AuthServices'
import type IActividad from '@/interface/IActividad'
import { useRouter } from 'vue-router'
const actividad = ref({
  titulo: 'Terminar proyecto matematicas',
  descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do...',
  fechaTermino: '2024-04-15T00:00:00	'
})
const router = useRouter()

const token = ref<string>('')
const ID = ref<number>(0)
const users = ref<IActividad[]>([])

onMounted(async () => {
    const tokenFromStorage = localStorage.getItem('token')
    const IDFromStorage = localStorage.getItem('ID')

    if (tokenFromStorage && IDFromStorage) {
        token.value = tokenFromStorage
        ID.value = parseInt(IDFromStorage)

        try {
            const actividades = await UserService.GetAct(ID.value)
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

const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('ID')
    token.value = ''
    ID.value = 0
    router.push('/login')
}

const redirect = (IDA: number) => {
    router.push(`/Act/${IDA}`)
}

</script>

<style scoped>
.actividad-details {
  margin: 0 auto;
  max-width: 600px;
}

.section {
  margin-bottom: 20px;
}

.section h2 {
  margin-bottom: 5px;
}

.info-box {
  padding: 10px;
  border-radius: 10px;
  background-color: #AEE2FF;
}

.checkboxes {
  margin-top: 10px;
}

.checkboxes label {
  margin-right: 10px;
}

.button-section {
  margin-top: 20px;
}

.update-button, .delete-button {
  padding: 10px 20px;
  border-radius: 10px;
  background-color: #6E85B7;
  color: white;
  border: none;
  cursor: pointer;
  margin-right: 10px;
}

.update-button:hover, .delete-button:hover {
  background-color: #405490;
}
</style>
 
  