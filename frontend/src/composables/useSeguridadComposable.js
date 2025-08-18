import { useAuthStore } from '@/stores/authStore';
import apiClient from '@/services/apiClient';


export function registroComposable(body) {

  let sendData = async (body) => {
    apiClient.post('/seguridad/registro/', body)
      .then((response) => {
        alert("Te haz registrado exitosamente!!\nTe hemos enviado un mail al correo que nos indicaste para activar tu cuenta.");
        window.location = location.href;
      })
      .catch((err) => {
        // Mejor manejo de errores del backend
        if (err.response && err.response.data && err.response.data.mensaje) {
          alert("Error: " + err.response.data.mensaje);
        } else {
          alert("Ocurrió un error inesperado: " + err.message);
        }
        window.location = location.href;
      });
  };
  return {
    sendData,
  };

}

export function loginComposable(body) {

  let sendData = async (body) => {
    try {
      apiClient.post('/seguridad/login/', body)
      .then((response) => {
         let store = useAuthStore();
         store.iniciarSesion(response.data);
         window.location="/panel";
      })
      .catch((err) => {
        alert("Ocurrió un error inesperado "+err);
        window.location = location.href;
      });
    } catch (error) {
      alert("Ocurrió un error inesperado");
      window.location=location.href;
    }

  };
  return {
    sendData,
  };
}
