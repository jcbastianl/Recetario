import { readonly, ref } from 'vue';

export function recetasComposable()
{
  let datos = ref([]);
  let categorias = ref({data: []});
  let error = ref(null);

  let getDatos= async () =>
    {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}recetas`, {headers: {'content-type': 'application/json'}});
        datos.value = await res.json();
      } catch (err) {
        error.value = err;
      }
    };

  let getCategorias = async () =>
    {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}categorias`, {headers: {'content-type': 'application/json'}});
        categorias.value = await res.json();
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
