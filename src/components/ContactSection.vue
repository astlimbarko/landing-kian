<template>
    <section
      id="contact"
      class="relative py-8 text-white"
      style="background: linear-gradient(to right, rgba(0, 92, 185, 0.7), rgba(0, 75, 148, 0.7));"
    >
      <!-- Contenedor de la imagen con desenfoque -->
      <div
        class="absolute inset-0 hero-background"
        style="
          background: linear-gradient(to right, rgba(0, 92, 185, 0.7), rgba(0, 75, 148, 0.7)),
          url('/background.jpg');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          filter: blur(1.5px); /* Desenfoque al 30% */
        "
      ></div>
  
      <!-- Capa oscura translúcida -->
      <div class="absolute inset-0 bg-black/40 z-0"></div>
  
      <!-- Contenido principal -->
      <div class="relative z-10 container-custom">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-4xl font-bold mb-8">Enviar ahora</h2>
  
          <div class="grid md:grid-cols-2 gap-6">
            <!-- Primer Cajero -->
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1">
              <div class="flex items-center justify-center mb-4">
                <img 
                  src="../assets/bolivia-flag.svg" 
                  alt="Bandera Bolivia" 
                  class="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                />
              </div>
              <h3 class="text-xl font-semibold mb-2">Carlos Rodríguez</h3>
              <a 
                href="https://wa.me/59178987891" 
                target="_blank"
                class="inline-flex items-center gap-3 px-6 py-3 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                <i class="fab fa-whatsapp text-2xl"></i>
                <span class="text-sm font-medium">+591 78987891</span>
              </a>
            </div>
  
            <!-- Segundo Cajero -->
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1">
              <div class="flex items-center justify-center mb-4">
                <img 
                  src="../assets/bolivia-flag.svg"  
                  alt="Bandera Bolivia" 
                  class="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                />
              </div>
              <h3 class="text-xl font-semibold mb-2">Ana Martínez</h3>
              <a 
                href="https://wa.me/59178987891" 
                target="_blank"
                class="inline-flex items-center gap-3 px-6 py-3 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                <i class="fab fa-whatsapp text-2xl"></i>
                <span class="text-sm font-medium">+591 78987891</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  // No se requiere lógica adicional por ahora
  </script>
  