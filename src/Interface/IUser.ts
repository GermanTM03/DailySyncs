export default interface IUser {
    ID: number;
    Usuario: string;
    Contraseña: string;
    Correo: string;
    FechaCreacion: Date;
    NuevaContraseña?: string; // Campo opcional para la nueva contraseña

  }
  