<template>
  <Header />
  
  <!-- Breadcrumb Area -->
  <div class="breadcumb-area bg-img bg-overlay" style="background-image: url(img/bg-img/breadcumb6.jpg)">
    <div class="container h-100">
      <div class="row h-100 align-items-center">
        <div class="col-12">
          <div class="breadcumb-text text-center">
            <h2>Gestión de Categorías</h2>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Main Content Area -->
  <div class="contact-area section-padding-0-80">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="section-heading">
            <h3>Administrar Categorías de Recetas</h3>
          </div>
        </div>
      </div>

      <!-- Messages -->
      <div class="row" v-if="mensaje.mostrar">
        <div class="col-12">
          <div :class="`alert alert-${mensaje.tipo} alert-dismissible fade show`" role="alert">
            {{ mensaje.texto }}
            <button type="button" class="btn-close" @click="cerrarMensaje" aria-label="Close"></button>
          </div>
        </div>
      </div>

      <!-- Action Button -->
      <div class="row">
        <div class="col-12">
          <div class="receipe-ratings text-right my-5">
            <a href="#modalCrear" @click="crear()" class="btn delicious-btn">
              <i class="fas fa-plus"></i> Nueva Categoría
            </a>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div class="row" v-if="cargando">
        <div class="col-12 text-center">
          <img src="/img/img/load.gif" alt="Cargando..." />
        </div>
      </div>

      <!-- Categories Table -->
      <div class="row" v-else>
        <div class="col-12">
          <div v-if="categorias.length === 0" class="text-center py-4">
            <p class="text-muted">No hay categorías registradas</p>
          </div>
          <div v-else class="table-responsive">
            <table class="table table-bordered table-hover table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="categoria in categorias" :key="categoria.id">
                  <td>{{ categoria.id }}</td>
                  <td>{{ categoria.nombre }}</td>
                  <td class="text-center">
                    <a href="#modalEditar" @click="editar(categoria)" title="Editar">
                      <i class="fas fa-edit"></i>
                    </a>
                    &nbsp;&nbsp;
                    <a href="#modalEliminar" @click="confirmarEliminar(categoria)" title="Eliminar">
                      <i class="fas fa-trash"></i>
                    </a>
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

  <!-- Modal Crear Categoría -->
  <div class="modalmask" id="modalCrear">
    <div class="modalbox rotate">
      <a href="#close" title="Cerrar" class="close">X</a>
      <h2>Nueva Categoría</h2>
      
      <Form :validation-schema="categoriaSchema" @submit="crearCategoria">
        <div class="contact-form-area">
          <div class="row container">
            <div class="col-12">
              <ErrorMessage name="nombre" class="text text-danger" />
              <Field 
                type="text" 
                name="nombre" 
                v-model="nuevaCategoria.nombre" 
                placeholder="Nombre de la categoría" 
                class="form-control" 
              />
            </div>
            
            <div class="col-12 text-center" :style="'display:'+boton">
              <button class="btn delicious-btn mt-30" type="submit" title="Crear">
                Crear Categoría
              </button>
            </div>
            <div class="col-12 text-center" :style="'display:'+preloader">
              <img src="/img/img/load.gif" />
            </div>
          </div>
        </div>
      </Form>
    </div>
  </div>

  <!-- Modal Editar Categoría -->
  <div class="modalmask" id="modalEditar">
    <div class="modalbox rotate">
      <a href="#close" title="Cerrar" class="close">X</a>
      <h2>Editar Categoría</h2>
      
      <Form :validation-schema="categoriaSchema" @submit="actualizarCategoria">
        <div class="contact-form-area">
          <div class="row container">
            <div class="col-12">
              <ErrorMessage name="nombre" class="text text-danger" />
              <Field 
                type="text" 
                name="nombre" 
                v-model="categoriaEditando.nombre" 
                placeholder="Nombre de la categoría" 
                class="form-control" 
              />
            </div>
            
            <div class="col-12 text-center" :style="'display:'+boton">
              <button class="btn delicious-btn mt-30" type="submit" title="Actualizar">
                Actualizar Categoría
              </button>
            </div>
            <div class="col-12 text-center" :style="'display:'+preloader">
              <img src="/img/img/load.gif" />
            </div>
          </div>
        </div>
      </Form>
    </div>
  </div>

  <!-- Modal Confirmar Eliminación -->
  <div class="modalmask" id="modalEliminar">
    <div class="modalbox rotate">
      <a href="#close" title="Cerrar" class="close">X</a>
      <h2>Confirmar Eliminación</h2>
      
      <div class="contact-form-area">
        <div class="row container">
          <div class="col-12">
            <p>¿Estás seguro de que deseas eliminar la categoría <strong>"{{ categoriaAEliminar?.nombre }}"</strong>?</p>
            <p class="text-warning"><i class="fas fa-exclamation-triangle"></i> Esta acción no se puede deshacer.</p>
          </div>
          
          <div class="col-12 text-center" :style="'display:'+boton">
            <button @click="eliminarCategoria" class="btn delicious-btn mt-30" type="button" title="Eliminar">
              Eliminar Categoría
            </button>
            <a href="#close" class="btn btn-secondary mt-30" style="margin-left: 10px;">
              Cancelar
            </a>
          </div>
          <div class="col-12 text-center" :style="'display:'+preloader">
            <img src="/img/img/load.gif" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import categoriaService from '@/services/categoriaService'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { categoriaSchema } from '@/schemas/validacionesSchema'

export default {
  name: 'CategoriasView',
  components: {
    Header,
    Footer,
    Form,
    Field,
    ErrorMessage
  },
  data() {
    return {
      categorias: [],
      cargando: false,
      boton: 'block',
      preloader: 'none',
      mensaje: {
        mostrar: false,
        tipo: 'success',
        texto: ''
      },
      
      // Datos de formularios
      nuevaCategoria: {
        nombre: ''
      },
      categoriaEditando: {
        id: null,
        nombre: ''
      },
      categoriaAEliminar: null,
      
      // Schema de validación
      categoriaSchema
    }
  },
  
  async mounted() {
    await this.cargarCategorias()
  },
  
  methods: {
    async cargarCategorias() {
      this.cargando = true
      try {
        const response = await categoriaService.obtenerCategorias()
        if (response.success) {
          this.categorias = response.data
        } else {
          this.mostrarMensaje('Error al cargar las categorías: ' + response.message, 'danger')
        }
      } catch (error) {
        this.mostrarMensaje('Error al cargar las categorías', 'danger')
      } finally {
        this.cargando = false
      }
    },
    
    crear() {
      this.nuevaCategoria = { nombre: '' }
      this.boton = 'block'
      this.preloader = 'none'
    },
    
    async crearCategoria() {
      if (!this.nuevaCategoria.nombre.trim()) {
        this.mostrarMensaje('El nombre es obligatorio', 'danger')
        return
      }
      
      this.boton = 'none'
      this.preloader = 'block'
      
      try {
        const response = await categoriaService.crearCategoria(this.nuevaCategoria)
        if (response.success) {
          this.mostrarMensaje('Categoría creada exitosamente', 'success')
          await this.cargarCategorias()
          // Cerrar modal
          window.location.hash = '#close'
        } else {
          this.mostrarMensaje('Error al crear la categoría: ' + response.message, 'danger')
        }
      } catch (error) {
        this.mostrarMensaje('Error al crear la categoría', 'danger')
      } finally {
        this.boton = 'block'
        this.preloader = 'none'
      }
    },
    
    editar(categoria) {
      this.categoriaEditando = {
        id: categoria.id,
        nombre: categoria.nombre
      }
      this.boton = 'block'
      this.preloader = 'none'
    },
    
    async actualizarCategoria() {
      if (!this.categoriaEditando.nombre.trim()) {
        this.mostrarMensaje('El nombre es obligatorio', 'danger')
        return
      }
      
      this.boton = 'none'
      this.preloader = 'block'
      
      try {
        const response = await categoriaService.actualizarCategoria(
          this.categoriaEditando.id, 
          { nombre: this.categoriaEditando.nombre }
        )
        if (response.success) {
          this.mostrarMensaje('Categoría actualizada exitosamente', 'success')
          await this.cargarCategorias()
          // Cerrar modal
          window.location.hash = '#close'
        } else {
          this.mostrarMensaje('Error al actualizar la categoría: ' + response.message, 'danger')
        }
      } catch (error) {
        this.mostrarMensaje('Error al actualizar la categoría', 'danger')
      } finally {
        this.boton = 'block'
        this.preloader = 'none'
      }
    },
    
    confirmarEliminar(categoria) {
      this.categoriaAEliminar = categoria
      this.boton = 'block'
      this.preloader = 'none'
    },
    
    async eliminarCategoria() {
      if (!this.categoriaAEliminar) return
      
      this.boton = 'none'
      this.preloader = 'block'
      
      try {
        const response = await categoriaService.eliminarCategoria(this.categoriaAEliminar.id)
        if (response.success) {
          this.mostrarMensaje('Categoría eliminada exitosamente', 'success')
          await this.cargarCategorias()
          // Cerrar modal
          window.location.hash = '#close'
        } else {
          this.mostrarMensaje('Error al eliminar la categoría: ' + response.message, 'danger')
        }
      } catch (error) {
        this.mostrarMensaje('Error al eliminar la categoría', 'danger')
      } finally {
        this.boton = 'block'
        this.preloader = 'none'
        this.categoriaAEliminar = null
      }
    },
    
    mostrarMensaje(texto, tipo = 'success') {
      this.mensaje = {
        mostrar: true,
        tipo,
        texto
      }
      // Auto-cerrar después de 5 segundos
      setTimeout(() => {
        this.cerrarMensaje()
      }, 5000)
    },
    
    cerrarMensaje() {
      this.mensaje.mostrar = false
    }
  }
}
</script>

<style scoped>
/* Modales con el mismo estilo que Panel.vue */
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

.rotate {
  margin: 1% auto;
  -webkit-transform: scale(-5, -5);
  transform: scale(-5, -5);
}

.modalmask:target .rotate {
  transform: rotate(360deg) scale(1, 1);
  -webkit-transform: rotate(360deg) scale(1, 1);
}

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

/* Estilos adicionales */
.table th {
  border-top: none;
}

.text-warning {
  color: #ff6b35 !important;
}

.alert {
  margin-bottom: 20px;
}

.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
  color: white;
  padding: 15px 30px;
  text-decoration: none;
  border-radius: 3px;
  display: inline-block;
}

.btn-secondary:hover {
  background-color: #5a6268;
  color: white;
  text-decoration: none;
}
</style>
