<script setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
</script>

<template>
<Header />
<div class="breadcumb-area bg-img bg-overlay" style="background-image: url(/img/bg-img/breadcumb1.jpg)">
  <div class="container h-100">
      <div class="row h-100 align-items-center">
          <div class="col-12">
              <div class="breadcumb-text text-center">
                  <h2>Sobre nosotros</h2>
              </div>
          </div>
      </div>
  </div>
</div>
<section class="about-area section-padding-80">
  <div class="container">
      <div class="row">
          <div class="col-12">
              <div class="section-heading">
                  <h3>¿Quiénes somos y qué hacemos? </h3>
              </div>
          </div>
      </div>

      <div class="row">
          <div class="col-12">
              <h6 class="sub-heading pb-5">Somos una comunidad apasionada de cocineros caseros, chefs profesionales y amantes de la gastronomía que creen que la cocina es el corazón de cada hogar. Fundado en 2023 por un grupo de amigos que compartían recetas familiares en una pequeña cocina, hemos crecido hasta convertirnos en la plataforma de recetas más querida de América Latina.</h6>
          </div>
      </div>

      <div class="row">
          <div class="col-12">
              <h4 class="text-center mb-4">Nuestros Valores</h4>
              
              <div class="row">
                <div class="col-md-4 text-center mb-4">
                  <h5>🏠 Tradición Familiar</h5>
                  <p>Honramos las recetas que han pasado de generación en generación, preservando sabores y memorias que definen nuestra identidad culinaria.</p>
                </div>
                
                <div class="col-md-4 text-center mb-4">
                  <h5>🌍 Diversidad Gastronómica</h5>
                  <p>Celebramos la riqueza culinaria de todas las culturas, creando un espacio donde cada tradición tiene su lugar especial.</p>
                </div>
                
                <div class="col-md-4 text-center mb-4">
                  <h5>💡 Innovación Accesible</h5>
                  <p>Combinamos técnicas tradicionales con herramientas modernas para hacer que cocinar sea más fácil y emocionante para todos.</p>
                </div>
              </div>
              
              <div class="row mt-4">
                <div class="col-12 text-center">
                  <h4>¿Por qué elegirnos?</h4>
                  <p class="lead">
                    Con más de <strong>10,000 recetas verificadas</strong>, <strong>50,000 cocineros activos</strong> y 
                    <strong>1 millón de platos exitosos</strong> creados cada mes, somos la comunidad culinaria 
                    de confianza donde la pasión por cocinar se encuentra con la innovación tecnológica.
                  </p>
                  
                  <p class="text-center mt-4">
                    <em>"En cada receta hay una historia, en cada plato hay amor, y en cada cocina hay un chef esperando a ser descubierto."</em><br>
                    <small>- Equipo Recetario</small>
                  </p>
                </div>
              </div>
          </div>
      </div>


      <div class="row">
          <div class="col-12">
              <img class="mb-70" src="/img/bg-img/about.png" alt="Equipo Recetario cocinando juntos" />

          </div>
      </div>
  </div>
</section>
<Footer></Footer>

</template>
