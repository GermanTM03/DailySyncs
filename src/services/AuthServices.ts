import type IActividad from '@/Interface/IActividad'
import type IUser from '@/Interface/IUser'
import axios from 'axios'
import Swal from 'sweetalert2'

const API_URL = 'https://apiexpress-8mwr.onrender.com'

export default {
  async login(correo: string, contraseña: string): Promise<{ token: string; ID: number }> {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        Correo: correo, // Cambio de 'Usuario' a 'Correo'
        Contraseña: contraseña
      })

      const data = response.data
      return { token: data.token, ID: data.ID }
    } catch (error) {
      throw new Error(error.response.data.message || 'Error en el inicio de sesión.')
    }
  },
  async editarUsuario(idUsuario: string, usuarioData: IUser) {
    try {
      await axios.put(`${API_URL}/usuarios/${idUsuario}`, usuarioData)
      Swal.fire({
        icon: 'success',
        title: '¡Usuario actualizado!',
        text: 'El usuario se ha actualizado exitosamente.',
        confirmButtonText: 'Aceptar'
      })
    } catch (error) {
      console.error('Error al actualizar usuario:', error)
      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar usuario',
        text: 'Ha ocurrido un error al intentar actualizar el usuario.',
        confirmButtonText: 'Aceptar'
      })
      throw new Error('Error al actualizar usuario')
    }
  },
  async GetUsers(): Promise<IActividad[]> {
    try {
      const response = await axios.get(`${API_URL}/actividades`)
      return response.data
    } catch (error) {
      console.error('Error al obtener los datos de los usuarios:', error)
      return []
    }
  },
  async GetAct(IDA: number): Promise<IActividad[]> {
    try {
      const response = await axios.get(`${API_URL}/actividades/${IDA}`)
      const actividades = response.data.recordsets[0] 
      return actividades.map((actividad: any) => ({
        IDA: actividad.ID, 
        UsuarioID: actividad.UsuarioID,
        Descripcion: actividad.Descripcion,
        Importancia: actividad.Importancia,
        FechaTermino: new Date(actividad.FechaTermino),
        FechaCreacion: new Date(actividad.FechaCreacion),
        Titulo: actividad.Titulo
      }))
    } catch (error) {
      console.error('Error al obtener la actividad:', error)
      return []
    }
  },
  async eliminarActividad(actividadID: number): Promise<void> {
    try {
      const response = await axios.delete(`${API_URL}/DeleteActividad/${actividadID}`)
      if (response.status === 200) {
        console.log('Actividad eliminada exitosamente')
      } else {
        throw new Error('Error al eliminar la actividad')
      }
    } catch (error) {
      console.error('Error al eliminar la actividad:', error)
      throw new Error('Error al eliminar la actividad')
    }
  },

  async Act(IDA: number): Promise<IActividad[]> {
    try {
      const response = await axios.get(`${API_URL}/actividad/${IDA}`)
      const actividades = response.data.recordsets[0] // Acceder al primer arreglo de recordsets
      // Convertir 'Id' a 'ID' en mayúsculas para que coincida con la interfaz
      return actividades.map((actividad: any) => ({
        IDA: actividad.ID, // Corregido a 'ID'
        UsuarioID: actividad.UsuarioID,
        Descripcion: actividad.Descripcion,
        Importancia: actividad.Importancia,
        FechaTermino: new Date(actividad.FechaTermino),
        FechaCreacion: new Date(actividad.FechaCreacion),
        Titulo: actividad.Titulo
      }))
    } catch (error) {
      console.error('Error al obtener la actividad:', error)
      return []
    }
  },
  async registerUser(newUser: IUser): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/CreateUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      })

      if (!response.ok) {
        if (response.status === 400) {
          const errorMessage = await response.text()
          throw new Error(errorMessage)
        } else {
          throw new Error('No se pudo registrar el usuario')
        }
      } else {
        console.log('Usuario registrado exitosamente:', newUser)
        await Swal.fire({
          icon: 'success',
          title: '¡Registro exitoso!',
          text: 'El usuario se ha registrado correctamente.',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          // Redirigir al usuario a la página de inicio de sesión
          window.location.href = '/Login' // Cambia '/Login' por la URL real de tu página de inicio de sesión
        })
      }
    } catch (error) {
      console.error(error)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Correo ya existente',
        confirmButtonText: 'Aceptar'
      })
    }
  },
  async registerAct(newAct: IActividad): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/CreateAct`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAct)
      })

      if (response.ok) {
        // Mostrar alerta de registro exitoso
        Swal.fire({
          icon: 'success',
          title: '¡Registro exitoso!',
          text: 'La actividad se ha registrado correctamente.',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          // Redirigir al usuario a la página de inicio de sesión
          window.location.href = '/' // Cambia '/Home' por la URL real de tu página de inicio
        })
      } else {
        throw new Error('No se pudo registrar la actividad')
      }
    } catch (error) {
      console.error(error)
      // Mostrar alerta de error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ha ocurrido un error al intentar registrar la actividad.',
        confirmButtonText: 'Aceptar'
      })
    }
  },

  async User(id: number): Promise<IUser[]> {
    try {
      const response = await axios.get(`${API_URL}/Usuario/${id}`)
      return response.data.recordsets[0] // Acceder al primer arreglo de recordsets
    } catch (error) {
      console.error('Error al obtener la actividad:', error)
      return []
    }
  },

  async getUsers(): Promise<IUser[]> {
    try {
      const response = await fetch(`${API_URL}/Usuarios`)
      if (!response.ok) {
        throw new Error('No se pudieron recuperar los datos de los usuarios')
      }
      const data = await response.json()
      return data.result // Devuelve la propiedad 'result' que contiene los usuarios
    } catch (error) {
      console.error(error)
      return [] // Retorna un array vacío en caso de error
    }
  },

  async updateAct(actividad: IActividad): Promise<void> {
    try {
      const response = await axios.put(`${API_URL}/Act/${actividad.IDA}`, actividad, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.status === 200) {
        // Mostrar alerta de actualización exitosa
        Swal.fire({
          icon: 'success',
          title: '¡Actualización exitosa!',
          text: 'La actividad se ha actualizado correctamente.',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          // Redirigir al usuario a la página deseada
          window.location.href = '/' // Cambia '/Home' por la URL real de tu página deseada
        })
      } else {
        throw new Error('No se pudo actualizar la actividad')
      }
    } catch (error) {
      console.error(error)
      // Mostrar alerta de error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ha ocurrido un error al intentar actualizar la actividad.',
        confirmButtonText: 'Aceptar'
      })
    }
  },
  async updateUser(actividad: IActividad): Promise<void> {
    try {
      const response = await axios.put(`${API_URL}/Act/${actividad.IDA}`, actividad, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.status === 200) {
        // Mostrar alerta de actualización exitosa
        Swal.fire({
          icon: 'success',
          title: '¡Actualización exitosa!',
          text: 'La actividad se ha actualizado correctamente.',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          // Redirigir al usuario a la página deseada
          window.location.href = '/' // Cambia '/Home' por la URL real de tu página deseada
        })
      } else {
        throw new Error('No se pudo actualizar la actividad')
      }
    } catch (error) {
      console.error(error)
      // Mostrar alerta de error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ha ocurrido un error al intentar actualizar la actividad.',
        confirmButtonText: 'Aceptar'
      })
    }
  }
}
