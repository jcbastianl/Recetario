<script setup>
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
import { onMounted, ref } from 'vue';
import {Form, Field, ErrorMessage} from 'vee-validate';

import {recetasSchema} from '@/schemas/validacionesSchema';
import axios from 'axios';

//injectar fancybox en vue
//npm install @fancyapps/ui@4.0.31
import { Fancybox } from '@fancyapps/ui';
import "@fancyapps/ui/dist/fancybox.css";



let datos = ref([]);
let categorias = ref([]);

onMounted(async ()=>{
    let respuesta =  await fetch(`${import.meta.env.VITE_API_URL}recetas-panel/${localStorage.getItem('recetas_flaites_id')}`, {
        headers:{'content-type':'application/json', 'Authorization': `Bearer ${localStorage.getItem('recetas_flaites_token')}`}
    });
    datos.value = await respuesta.json();

    let respuesta2 =  await fetch(`${import.meta.env.VITE_API_URL}categorias`, {
        headers:{'content-type':'application/json'}
    });
    categorias.value = await respuesta2.json();

});
//formulario
let nombre = ref('');
let tiempo = ref('');
let descripcion = ref('');
let categoria_id = ref("0");
let recetas_id=ref('0');
let boton  = ref('block');
let preloader  = ref('none');

let enviar=()=>
{
    boton.value="none";
    preloader.value="block";
    if(modal_titulo.value=="Crear")
    {
        let file = document.querySelector("input[type=file]").files[0];

        // Validar si se seleccionó un archivo
        if(!file) {
            alert("Por favor selecciona una imagen para la receta");
            boton.value="block";
            preloader.value="none";
            return;
        }

        let formData =new FormData();
        formData.append('foto', file);
        formData.append('categoria_id', categoria_id.value);
        formData.append('nombre', nombre.value);
        formData.append('tiempo', tiempo.value);
        formData.append('descripcion', descripcion.value);

        axios.post(`${import.meta.env.VITE_API_URL}recetas`, formData, {headers:{'Authorization': `Bearer ${localStorage.getItem('recetas_flaites_token')}`}})
        .then((response)=>{
            alert("Se creó el registro exitosamente");
            window.location="/panel";
        })
        .catch((err)=>{
            alert("Ocurrió un error inesperado "+err);
            window.location="/panel";
        });
    }
    if(modal_titulo.value=="Editar")
    {
        axios.put(`${import.meta.env.VITE_API_URL}recetas/${recetas_id.value}`, {nombre:nombre.value, tiempo: tiempo.value, descripcion:descripcion.value, categoria_id: categoria_id.value}, {headers:{'Authorization': `Bearer ${localStorage.getItem('recetas_flaites_token')}`}})
        .then((response)=>{
            alert("Se modificó el registro exitosamente");
            window.location="/panel";
        })
        .catch((err)=>{
            alert("Ocurrió un error inesperado "+err);
            window.location="/panel";
        });
    }
};
//ventana modal
let modal_titulo = ref('');
let crear =()=>
{
    modal_titulo.value='Crear';
    categoria_id.value="0";
    nombre.value='';
    tiempo.value='';
    descripcion.value='';
};
let editar =(modelo)=>
{
    modal_titulo.value='Editar';
    recetas_id.value=modelo.id;
    categoria_id.value=modelo.categoria_id;
    nombre.value=modelo.nombre;
    tiempo.value=modelo.tiempo;
    descripcion.value=modelo.descripcion;
};
const eliminar=(id)=>
{
    if(window.confirm("¿Realmente desea eliminar este registro?"))
    {
        axios.delete(`${import.meta.env.VITE_API_URL}recetas/${id}`, {headers:{'Authorization': `Bearer ${localStorage.getItem('recetas_flaites_token')}`}})
        .then((response)=>{
            alert("Se eliminó el registro exitosamente");
            window.location="/panel";
        })
        .catch((err)=>{
            alert("Ocurrió un error inesperado "+err);
            window.location="/panel";
        });
    }
};
</script>

<template>
    <Header />
    <div class="breadcumb-area bg-img bg-overlay" style="background-image: url(img/bg-img/breadcumb6.jpg)">
        <div class="container h-100">
          <div class="row h-100 align-items-center">
            <div class="col-12">
              <div class="breadcumb-text text-center">
                <h2>Panel</h2>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div class="contact-area section-padding-0-80">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="section-heading">
                <h3>Mis recetas publicadas</h3>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <div class="receipe-ratings text-right my-5">
                <a href="#modal2" @click="crear()" class="btn delicious-btn"><i class="fas fa-plus"></i> Crear</a>
              </div>
            </div>
            <hr />
            <div class="col-12">
              <div class="table-responsive">
                <table class="table table-bordered table-hover table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Categoría</th>
                      <th>Nombre</th>
                      <th>Tiempo</th>
                      <th>Detalle</th>
                      <th>Foto</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(dato, index) in datos.data" :key="index">
                        <td>{{ dato.id }}</td>
                        <td>{{ dato['categoria'] }}</td>
                        <td>{{ dato.nombre }}</td>
                        <td>{{ dato.tiempo }}</td>
                        <td>{{ dato.descripcion }}</td>
                        <td class="text-center">
                            <a :href="dato.imagen" class="lightbox d-block" data-fancybox="image-gallery">
                                <img :src="dato.imagen" :alt="dato.nombre" style="width: 100px;" />
                            </a>
                        </td>
                        <td class="text-center">
                            <router-link :to="{name:'panel_editar', params:{id:dato.id}}" title="Editar foto">
                                <i class="fas fa-pen-square"></i>
                            </router-link>
                            &nbsp;&nbsp;
                            <a href="#modal2" title="Editar" @click="editar(dato)">
                                <i class="fas fa-edit"></i>
                            </a>
                            &nbsp;&nbsp;
                            <router-link to="#" @click.navigate="eliminar(dato.id)" title="Eliminar">
                                <i class="fas fa-trash"></i>
                            </router-link>
                        </td>
                    </tr>
                  </tbody>

                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    <Footer />
    <!--modal-->
      <div class="modalmask" id="modal2">
        <div class="modalbox rotate">
            <a href="#close" title="Cerrar" class="close">X</a>
            <h2>{{modal_titulo}}</h2>
            <!--formulairo-->
                <Form :validation-schema="recetasSchema" @submit="enviar()">
                    <div class="contact-form-area">
                    <div class="row container">

                        <div class="col-12 col-lg-12">
                            <ErrorMessage name="categoria_id" class="text text-danger" />
                            <Field as="select" name="categoria_id" v-model="categoria_id" class="form-control" style="height: calc(2.25rem + 10px);">
                                <option value="0">Selecciones.....</option>
                                <option v-for="(categoria, i) in categorias.data" :key="i" :value="categoria.id">{{categoria.nombre}}</option>
                            </Field>
                        </div>

                        <div class="col-12 col-lg-12">
                            <ErrorMessage name="nombre" class="text text-danger" />
                            <Field type="text" name="nombre" v-model="nombre" placeholder="Nombre" class="form-control" />
                        </div>

                        <div class="col-12 col-lg-12">
                            <ErrorMessage name="tiempo" class="text text-danger" />
                            <Field type="text" name="tiempo" v-model="tiempo" placeholder="Tiempo" class="form-control" />
                        </div>

                        <div class="col-12 col-lg-12">
                            <ErrorMessage name="descripcion" class="text text-danger" />
                            <Field as="textarea" name="descripcion" v-model="descripcion" placeholder="Descripción" class="form-control" />
                        </div>

                        <div v-if="modal_titulo=='Crear'" class="col-12 col-lg-12">
                            <input type="file" name="foto" id="file" class="form-control" />
                        </div>

                        <div class="col-12 text-center" :style="'display:'+boton">
                            <button class="btn delicious-btn mt-30" type="submit" title="Enviar">
                                Enviar
                            </button>
                        </div>
                        <div class="col-12 text-center" :style="'display:'+preloader">
                            <img src="/img/img/load.gif" />
                        </div>

                    </div>
                </div>
                </Form>
            <!--/formulario-->
        </div>
      </div>
    <!--/modal-->
</template>
<style scoped>
/*Efecto*/
.modalmask {
  position: fixed;
  font-family: Arial, sans-serif;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 99999;
  opacity: 0;
  -webkit-transition: opacity 400ms ease-in;
  -moz-transition: opacity 400ms ease-in;
  transition: opacity 400ms ease-in;
  pointer-events: none;
}

.modalmask:target {
  opacity: 1;
  pointer-events: auto;
}

/*Formato de la ventana*/
.modalbox {
  width: 600px;
  position: relative;
  padding: 5px 20px 13px 20px;
  background: #fff;
  border-radius: 3px;
  -webkit-transition: all 500ms ease-in;
  -moz-transition: all 500ms ease-in;
  transition: all 500ms ease-in;

}

/*Movimientos*/

.rotate {
  margin: 1% auto;
  -webkit-transform: scale(-5, -5);
  transform: scale(-5, -5);
}


.modalmask:target .rotate {
  transform: rotate(360deg) scale(1, 1);
  -webkit-transform: rotate(360deg) scale(1, 1);
}



/*Boton de cerrar*/
.close {
  background: #606061;
  color: #FFFFFF;
  line-height: 25px;
  position: absolute;
  right: 1px;
  text-align: center;
  top: 1px;
  width: 24px;
  text-decoration: none;
  font-weight: bold;
  border-radius: 3px;

}

.close:hover {
  background: #FAAC58;
  color: #222;
}
</style>
