import { createRouter, createWebHistory } from 'vue-router';

import Error404 from '@/views/Error404.vue';
import SobreNosotros from '@/views/SobreNosotros.vue';
import RecetasDetalle from '@/views/RecetasDetalle.vue';
import Recetas from '@/views/Recetas.vue';
import RecetasBuscador from '@/views/RecetasBuscador.vue';
import Contacto from '@/views/Contacto.vue';
import Registro from '@/views/Registro.vue';
import Login from '@/views/Login.vue';
import Panel from '@/views/Panel.vue';
import PanelEditar from '@/views/PanelEditar.vue';
import Categorias from '@/views/Categorias.vue';
import { useAuthStore } from '@/stores/authStore';



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      component: ()=>import('@/views/Home.vue'),
      name:'home'
     },
     {
      path:'/sobre-nosotros',
      component: SobreNosotros,
      name:'sobreNosotros'
     },
     {
      path:'/recetas',
      component: Recetas,
      name:'recetas'
     },
     {
      path:'/recetas/buscador',
      component: RecetasBuscador,
     },
     {
      path:'/recetas/detalle/:slug',
      component: RecetasDetalle,
      name:'recetasDetalle'
     },
     {
      path:'/contacto',
      component: Contacto,
      name:'contacto'
     },
     {
      path:'/registro',
      component: Registro,
      name:'registro'
     },
     {
      path:'/login',
      component: Login,
      name:'login'
     },
     {
      path:'/panel',
      component: Panel,
      name:'panel',
      meta: {
        secure: true // This route requires authentication
      }
     },
     {
      path:'/panel/editar/:id',
      component: PanelEditar,
      name:'panel_editar',
     },
     {
      path:'/categorias',
      component: Categorias,
      name:'categorias',
      meta: {
        secure: true // This route requires authentication
      }
     },
     {
      path:'/:pathMatch(.*)*',
      component: Error404
     }
  ]
}); // cerrar createRouter

// Guard de navegación para rutas protegidas
router.beforeEach((to) => {
  if (to.meta.secure) {
    // Inicializar el store dentro del guard, cuando Pinia ya está disponible
    const store = useAuthStore();
    // console.log('logueado | pagina= ' + to.fullPath);
    store.estasLogueado();
  }
});

export default router;
