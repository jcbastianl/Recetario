import { useAuthStore } from '@/stores/authStore';
import apiClient from '@/services/apiClient';


export function registroComposable(body) {

  let sendData = async (body) => {
    try {
      const response = await apiClient.post('/seguridad/registro/', body);
      alert("Te haz registrado exitosamente!!\nTe hemos enviado un mail al correo que nos indicaste para activar tu cuenta.");
      window.location = location.href;
    } catch (err) {
      console.error('Error en registro:', err);
      // Mejor manejo de errores del backend
      if (err.response && err.response.data && err.response.data.mensaje) {
        alert("Error: " + err.response.data.mensaje);
      } else {
        alert("Ocurrió un error inesperado: " + err.message);
      }
      window.location = location.href;
    }
  };
  
  return {
    sendData,
  };

}

export function loginComposable(body) {

  let sendData = async (body) => {
    try {
      const response = await apiClient.post('/seguridad/login/', body);
      let store = useAuthStore();
      store.iniciarSesion(response.data);
      window.location="/panel";
    } catch (err) {
      console.error('Error en login:', err);
      if (err.response && err.response.data) {
        // Mostrar el mensaje específico del backend
        const mensaje = err.response.data.mensaje || err.response.data.error || 'Error desconocido';
        alert("Error: " + mensaje);
      } else {
        alert("Ocurrió un error inesperado: " + err.message);
      }
      window.location = location.href;
    }
  };
  
  return {
    sendData,
  };
}
