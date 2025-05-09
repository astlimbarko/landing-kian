<template>
    <section
    id="hero"
      class="relative text-white py-20 overflow-hidden"
      style="background-image: linear-gradient(to right, #235CE0, #204fbd);"
    >
      <!-- Capa oscura translúcida -->
      <div class="absolute inset-0 bg-black/30 z-0"></div>
  
      <!-- Contenido principal -->
      <div class="relative z-10 container-custom">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="space-y-6">
            <h1 class="text-4xl md:text-5xl font-bold leading-tight">
              Envía Dinero de Suecia a Bolivia de Forma Rápida y Segura
            </h1>
            <p class="text-xl text-blue-100">
              Envía dinero a tus seres queridos de manera rápida, segura y con las mejores tasas de cambio.
            </p>
            <div class="flex flex-wrap gap-4">
              <a href="#contact" class="btn-primary bg-white text-blue-600 hover:bg-blue-50">
                Enviar Dinero
              </a>
              <a href="#calculator" class="btn-primary bg-transparent border-2 border-white hover:bg-white/10">
                Calcular Envío
              </a>
            </div>
          </div>
          <div class="relative">
            <div class="w-full max-w-lg mx-auto bg-white/10 rounded-lg p-8">
              <h3 class="text-2xl font-bold mb-4">¿Por qué elegirnos?</h3>
              <ul class="space-y-4">
                <li class="flex items-center gap-2">
                  <i class="fas fa-check-circle text-green-400"></i>
                  <span>Tasas de cambio competitivas</span>
                </li>
                <li class="flex items-center gap-2">
                  <i class="fas fa-check-circle text-green-400"></i>
                  <span>Envíos rápidos y seguros</span>
                </li>
                <li class="flex items-center gap-2">
                  <i class="fas fa-check-circle text-green-400"></i>
                  <span>Atención personalizada</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  // No se requiere lógica adicional
  </script>
  