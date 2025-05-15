<template>
    <footer class="relative text-gray-300 overflow-hidden py-12">
      <!-- Imagen de fondo con desenfoque y degradado azul -->
      <div
        class="absolute inset-0"
        style="
          background: linear-gradient(to right, rgba(35, 92, 224, 0.7), rgba(32, 79, 189, 0.7)),
          url('/background.jpg');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          filter: blur(1.5px);
        "
      ></div>
  
      <!-- Capa oscura translúcida -->
      <div class="absolute inset-0 bg-black/40 z-0"></div>
  
      <!-- Contenido del footer -->
      <div class="relative z-10 text-center">
        <p class="text-sm">
          © {{ new Date().getFullYear() }} Envios Kian. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  </template>
  
  <script setup>
  // No se requiere lógica adicional por ahora
  </script>
  