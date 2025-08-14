import { useAuthStore } from '@/stores/authStore';
import axios from 'axios';


export function registroComposable(body) {

  let sendData = async (body) => {
    axios.post(`${import.meta.env.VITE_API_URL}seguridad/registro`, body, { headers: { 'content-type': "application/json" } })
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
      axios.post(`${import.meta.env.VITE_API_URL}seguridad/login`, body, { headers: { 'content-type': "application/json" } })
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
