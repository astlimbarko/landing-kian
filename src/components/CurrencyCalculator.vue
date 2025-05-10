<template>
  <section id="calculator" class="py-16 bg-gradient-to-br from-blue-50 to-white">
    <div class="container-custom">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-8">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">¿Cuánto deseas enviar?</h2>
          <p class="text-xl text-gray-600">
            Calcule de coronas a bolivianos
          </p>
        </div>

        <div class="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div class="grid md:grid-cols-2 gap-8">
            <!-- Monto a enviar -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Monto a enviar (SEK)</label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">SEK</span>
                <input
                  type="number"
                  v-model="sekAmount"
                  @input="calculateBOB"
                  class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.00"
                />
              </div>
            </div>

            <!-- Monto a recibir -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Monto a recibir (BOB)</label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">BOB</span>
                <input
                  type="number"
                  v-model="bobAmount"
                  @input="calculateSEK"
                  class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          <div class="mt-8 text-center">
            <p class="text-sm text-gray-500">
              Tasa de cambio actual: 1 SEK = {{ currentRate }} BOB
              <span v-if="isSpecialRate" class="ml-2 text-green-600 font-medium">(Tarifa Especial)</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

// Tarifas (estas serán dinámicas en el futuro)
const standardRate = 1.2
const specialRate = 1.3
const specialRateThreshold = 5000 // Monto en BOB para tarifa especial

const sekAmount = ref('')
const bobAmount = ref('')

// Determinar si aplica tarifa especial
const isSpecialRate = computed(() => {
  return bobAmount.value >= specialRateThreshold
})

// Obtener la tasa actual
const currentRate = computed(() => {
  return isSpecialRate.value ? specialRate : standardRate
})

// Calcular BOB cuando se ingresa SEK
const calculateBOB = () => {
  if (sekAmount.value) {
    bobAmount.value = (sekAmount.value * currentRate.value).toFixed(2)
  } else {
    bobAmount.value = ''
  }
}

// Calcular SEK cuando se ingresa BOB
const calculateSEK = () => {
  if (bobAmount.value) {
    sekAmount.value = (bobAmount.value / currentRate.value).toFixed(2)
  } else {
    sekAmount.value = ''
  }
}
</script> 