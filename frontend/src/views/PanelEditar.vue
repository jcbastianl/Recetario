<script setup>
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Form } from 'vee-validate';
import apiClient from '@/services/apiClient';


let route = useRoute();
let datos = ref({});
let boton = ref('block');
let preloader = ref('none');


onMounted(async () => {
    try {
        const response = await apiClient.get(`/recetas/${route.params.id}/`);
        datos.value = response.data;
    } catch (error) {
        if (error.response?.status === 404) {
            window.location = "/error";
        }
        console.error('Error al cargar receta:', error);
    }
});
let enviar=async ()=>
{
    boton.value="none";
    preloader.value="block";
    let file = document.querySelector("input[type=file]").files[0];
    let formData =new FormData();
    formData.append('foto', file);
    formData.append('id', route.params.id);
    try {
        const response = await apiClient.post('/recetas-helper/editar/foto/', formData);
        alert("Se modificó el registro exitosamente");
        window.location=`/panel/editar/${route.params.id}`;
    } catch (err) {
        alert("Ocurrió un error inesperado");
        window.location="/panel/editar/"+route.params.id;
    }
};
</script>

<template>

    <Header />
    <div className="breadcumb-area bg-img bg-overlay" style="background-image: url(img/bg-img/breadcumb6.jpg)">
        <div className="container h-100">
            <div className="row h-100 align-items-center">
                <div className="col-12">
                    <div className="breadcumb-text text-center">
                        <h2>Editar foto receta: {{ datos.data?.nombre }}</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div className="contact-area section-padding-0-80">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="section-heading">
                        <h3>Editar foto receta: {{ datos.data?.nombre }}</h3>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-8">
                    <div className="contact-form-area">
                        <Form @submit="enviar()">
                            <div class="row">
                                <div class="col-12 col-lg-12">
                                    <img :src="datos.data?.imagen" style="width: 200px;" />
                                    <hr/>
                                </div>
                                <div class="col-12 col-lg-12">
                                    <input type="file" class="form-control" id="foto" placeholder="Foto" />
                                </div>


                                <div class="col-12 text-center" :style="'display:' + boton">
                                    <button class="btn delicious-btn mt-30" type="submit" title="Enviar">Enviar</button>
                                </div>
                                <div class="col-12 text-center" :style="`display:${preloader}`">
                                    <img src="/img/img/load.gif" alt="" />
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <Footer />
</template>
