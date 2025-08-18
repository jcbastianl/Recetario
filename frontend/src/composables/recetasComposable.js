import { readonly, ref } from 'vue';
import apiClient from '@/services/apiClient';

export function recetasComposable()
{
  let datos = ref([]);
  let categorias = ref({data: []});
  let error = ref(null);

  let getDatos= async () =>
    {
      try {
        const res = await apiClient.get('/recetas');
        datos.value = res.data;
      } catch (err) {
        error.value = err;
      }
    };

  let getCategorias = async () =>
    {
      try {
        const res = await apiClient.get('/categorias');
        categorias.value = res.data;
      } catch (err) {
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
