import type IActividad from '@/interface/IActividad';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

export default {
  async login(usuario: string, contraseña: string): Promise<{ token: string; ID: number }> {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        Usuario: usuario,
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
  async GetAct(id: number): Promise<IActividad[]> {
    try {
      const response = await axios.get(`${API_URL}/actividades/${id}`);
      return response.data.recordsets[0]; // Acceder al primer arreglo de recordsets
    } catch (error) {
      console.error('Error al obtener la actividad:', error);
      return [];
    }
  }
  
  



};
