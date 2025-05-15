<template>
    <section
      id="hero"
      class="relative text-white py-20 overflow-hidden"
    >
      <!-- Contenedor de la imagen con desenfoque -->
      <div class="absolute inset-0 hero-background" style="
        background: linear-gradient(to right, rgba(35, 92, 224, 0.7), rgba(32, 79, 189, 0.7)),
        url('/background.jpg');
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
        filter: blur(1.5px); /* Desenfoque al 30% */
      "></div>
  
      <!-- Capa oscura translúcida -->
      <div class="absolute inset-0 bg-black/40 z-0"></div>
  
      <!-- Contenido principal -->
      <div class="relative z-10 container-custom pt-10">
        <div class="space-y-6">
          <h1 class="text-4xl md:text-5xl font-bold leading-tight">
            Envía dinero con las mejores tasas de cambio
          </h1>
          <p class="text-xl text-blue-100">
            Unimos Suecia y Bolivia con un Servicio Rápido y Seguro.
          </p>
  
          <div class="flex flex-wrap gap-4 mb-8">
            <a href="#calculator" class="btn-primary bg-white text-blue-600 hover:bg-blue-50">
              Calcular Envío
            </a>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  // No se requiere lógica adicional
  </script>
  