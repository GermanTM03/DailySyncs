import type IActividad from '@/interface/IActividad';
import type IUser from '@/interface/IUser';
import axios from 'axios';

const API_URL = 'https://apiexpress-1-rjh3.onrender.com';

export default {
  async login(correo: string, contraseña: string): Promise<{ token: string; ID: number }> {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            Correo: correo, // Cambio de 'Usuario' a 'Correo'
            Contraseña: contraseña
        });

        const data = response.data;
        return { token: data.token, ID: data.ID };
    } catch (error) {
        throw new Error(error.response.data.message || 'Error en el inicio de sesión.');
    }
},

  async GetUsers(): Promise<IActividad[]> {
    try {
      const response = await axios.get(`${API_URL}/actividades`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener los datos de los usuarios:', error);
      return [];
    }
  },
  async GetAct(IDA: number): Promise<IActividad[]> {
    try {
      const response = await axios.get(`${API_URL}/actividades/${IDA}`);
      const actividades = response.data.recordsets[0]; // Acceder al primer arreglo de recordsets
      // Convertir 'Id' a 'ID' en mayúsculas para que coincida con la interfaz
      return actividades.map((actividad: any) => ({
        IDA: actividad.ID, // Corregido a 'ID'
        UsuarioID: actividad.UsuarioID,
        Descripcion: actividad.Descripcion,
        Importancia: actividad.Importancia,
        FechaTermino: new Date(actividad.FechaTermino),
        FechaCreacion: new Date(actividad.FechaCreacion),
        Titulo: actividad.Titulo
      }));
    } catch (error) {
      console.error('Error al obtener la actividad:', error);
      return [];
    }
  },
  
  
  async Act(IDA: number): Promise<IActividad[]> {
    try {
      const response = await axios.get(`${API_URL}/actividad/${IDA}`);
      const actividades = response.data.recordsets[0]; // Acceder al primer arreglo de recordsets
      // Convertir 'Id' a 'ID' en mayúsculas para que coincida con la interfaz
      return actividades.map((actividad: any) => ({
        IDA: actividad.ID, // Corregido a 'ID'
        UsuarioID: actividad.UsuarioID,
        Descripcion: actividad.Descripcion,
        Importancia: actividad.Importancia,
        FechaTermino: new Date(actividad.FechaTermino),
        FechaCreacion: new Date(actividad.FechaCreacion),
        Titulo: actividad.Titulo
      }));
    } catch (error) {
      console.error('Error al obtener la actividad:', error);
      return [];
    }
  },
  async User(id: number): Promise<IUser[]> {
    try {
      const response = await axios.get(`${API_URL}/Usuario/${id}`);
      return response.data.recordsets[0]; // Acceder al primer arreglo de recordsets
    } catch (error) {
      console.error('Error al obtener la actividad:', error);
      return [];
    }
  }
  
  



};
