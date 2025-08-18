import { readonly, ref } from 'vue';
import apiClient from '@/services/apiClient';

export function recetasComposable()
{
  let datos = ref([]);
  let categorias = ref([]);
  let error = ref(null);

  let getDatos= async () =>
    {
      try {
        console.log('🔍 Obteniendo recetas...');
        const res = await apiClient.get('/recetas/');
        console.log('🔍 Recetas recibidas:', res.data);
        datos.value = res.data;
      } catch (err) {
        console.error('🔍 Error obteniendo recetas:', err);
        error.value = err;
      }
    };

  let getCategorias = async () =>
    {
      try {
        console.log('🔍 Obteniendo categorías en composable...');
        const res = await apiClient.get('/categorias/');
        console.log('🔍 Categorías recibidas en composable:', res.data);
        categorias.value = res.data;
      } catch (err) {
        console.error('🔍 Error obteniendo categorías en composable:', err);
        error.value = err;
      }
    };

  getDatos();
  getCategorias();

return {
  datos:readonly(datos),
  categorias:readonly(categorias),
  error:readonly(error),
}
}
