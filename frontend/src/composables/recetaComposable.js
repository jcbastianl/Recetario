import { readonly, ref } from "vue";
import apiClient from '@/services/apiClient';


export function recetaComposable(slug)
{
    let dato = ref({});
    let error =ref(null);


    let getDatos= async(slug)=>
    {
        try {
            const res = await apiClient.get(`/recetas-helper/slug/${slug}/`);
            dato.value = res.data;
        } catch (err) {
            if(err.response?.status === 404) {
                window.location="/error";
            }
            error.value=err;
        }
    };
    getDatos(slug);

    return{
        dato:readonly(dato),
        error:readonly(error),
    }
}
