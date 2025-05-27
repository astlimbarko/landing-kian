<template>
  <section id="calculator" class="py-16 bg-gradient-to-br from-blue-50 to-white">
    <div class="container-custom">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-8">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">¿Cuánto deseas enviar?</h2>
          <p class="text-xl text-gray-600">
            Calcule de coronas a bolivianos
          </p>
          <!-- Mostrar estado de carga o error -->
          <div v-if="loading" class="mt-4 text-blue-600">
            Cargando tasas de cambio...
          </div>
          <div v-if="error" class="mt-4 text-red-600">
            {{ error }}
          </div>
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
                  @input="convertFromSEK"
                  @focus="activeInput = 'sek'"
                  :class="[
                    baseInputStyle,
                    activeInput === 'sek' ? focusStyle : '',
                    !preciosCargados ? disabledStyle : 'bg-white'
                  ]"
                  placeholder="0.00"
                  :disabled="!preciosCargados"
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
                  @input="convertFromBOB"
                  @focus="activeInput = 'bob'"
                  :class="[
                    baseInputStyle,
                    activeInput === 'bob' ? focusStyle : '',
                    !preciosCargados ? disabledStyle : 'bg-white',
                    !bobAmount && 'bg-gray-50'
                  ]"
                  :placeholder="preciosCargados ? '0.00' : 'Cargando tasas...'"
                />
              </div>
            </div>
          </div>

          <!-- Indicador de tasa aplicada -->
          <div class="mt-4 text-center">
            <span class="text-sm text-gray-600">
              Tasa aplicada: 
              <span :class="{'font-bold text-green-600': tasaAplicada === 'especial'}">
                {{ tasaAplicada === 'especial' ? 'Especial' : 'Estándar' }}
              </span>
              <span v-if="precios.precioEstandar" class="text-xs text-gray-500">
                (1 SEK = 
                <span :class="{'font-bold text-green-600': tasaAplicada === 'especial'}">
                  {{ tasaAplicada === 'especial' ? precios.precioEspecial : precios.precioEstandar }}
                </span>
                BOB)
              </span>
            </span>
          </div>

          <!-- Información adicional - Versión compacta -->
          <div v-if="preciosCargados" class="mt-6 pt-4 border-t border-gray-100">
            <div class="max-w-2xl mx-auto">
              <!-- Tarjetas de precios en línea -->
              <div class="flex flex-wrap justify-center gap-4 mb-2">
                <!-- Tasa Estándar -->
                <div class="text-center px-4 py-2 bg-white rounded-lg border border-gray-100">
                  <p class="text-sm text-gray-500">Tasa Estándar</p>
                  <p class="text-lg font-semibold text-gray-800">
                    {{ precios.precioEstandar || '---' }} <span class="text-sm font-normal text-gray-500">BOB</span>
                  </p>
                </div>

                <!-- Tasa Especial -->
                <div class="text-center px-4 py-2 bg-white rounded-lg border border-gray-100">
                  <p class="text-sm text-gray-500">Tasa Especial <span class="text-xs">(>{{" "}}{{ precios.umbralEspecial }} SEK)</span></p>
                  <p class="text-lg font-semibold text-green-600">
                    {{ precios.precioEspecial || '---' }} <span class="text-sm font-normal text-gray-500">BOB</span>
                  </p>
                </div>
              </div>
              
              <!-- Fecha de actualización más compacta -->
               <!--
              <div class="text-center mt-2">
                <p class="text-xs text-gray-400">
                  Actualizado: {{ ultimaActualizacion }}  
                </p> 
              </div>
            -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { getConfiguracion, suscribirACambios } from '../services/configService';

export default {
  name: 'CurrencyCalculator',
  setup() {
    const sekAmount = ref('');
    const bobAmount = ref('');
    const activeInput = ref('sek'); // 'sek' o 'bob' para saber qué campo está activo
    const tasaAplicada = ref(null);
    
    // Estilos
    const focusStyle = 'ring-2 ring-blue-400 border-blue-300 shadow-sm';
    const baseInputStyle = 'w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none transition-all duration-200';
    const disabledStyle = 'bg-gray-50 cursor-not-allowed';
    
    // Estado
    const precios = ref({
      precioEstandar: null,
      precioEspecial: null,
      umbralEspecial: 5000
    });
    const loading = ref(true);
    const error = ref(null);
    const preciosCargados = ref(false);
    const ultimaActualizacion = ref('No disponible');

    const convertFromSEK = () => {
      if (!preciosCargados.value) return;
      const amount = parseFloat(sekAmount.value) || 0;
      
      if (amount <= 0) {
        bobAmount.value = '';
        // Mostrar tasa estándar cuando no hay monto
        tasaAplicada.value = 'estandar';
        return;
      }

      // Calcular el monto en BOB para determinar si aplicar tasa especial
      const montoBOB = amount * precios.value.precioEstandar;
      // Aplicar tasa especial solo si el monto en BOB es 5000 o más
      const esTasaEspecial = montoBOB >= 5000;
      const tasa = esTasaEspecial ? precios.value.precioEspecial : precios.value.precioEstandar;
      
      if (tasa) {
        const result = (amount * tasa).toFixed(2);
        bobAmount.value = result;
        tasaAplicada.value = esTasaEspecial ? 'especial' : 'estandar';
      } else {
        bobAmount.value = '';
        tasaAplicada.value = 'estandar';
      }
    };

    const convertFromBOB = () => {
      if (!preciosCargados.value) return;
      const amount = parseFloat(bobAmount.value) || 0;
      
      if (amount <= 0) {
        sekAmount.value = '';
        // Mostrar tasa estándar cuando no hay monto
        tasaAplicada.value = 'estandar';
        return;
      }

      // Determinar qué tasa usar basado en el monto en BOB
      const esTasaEspecial = amount >= 5000; // Aplicar tasa especial solo si es 5000 BOB o más
      const tasa = esTasaEspecial ? precios.value.precioEspecial : precios.value.precioEstandar;
      
      if (tasa) {
        const result = (amount / tasa).toFixed(2);
        sekAmount.value = result;
        tasaAplicada.value = esTasaEspecial ? 'especial' : 'estandar';
      } else {
        sekAmount.value = '';
        tasaAplicada.value = 'estandar';
      }
    };

    // Función para manejar cambios en los precios
    const actualizarCalculos = () => {
      if (activeInput.value === 'sek') {
        convertFromSEK();
      } else {
        convertFromBOB();
      }
    };

    const actualizarPrecios = (data) => {
      if (!data) return;
      
      precios.value = {
        precioEstandar: data.precioEstandar,
        precioEspecial: data.precioEspecial,
        umbralEspecial: 5000 // Forzamos el umbral a 5000 BOB
      };
      
      // Establecer la tasa estándar por defecto
      tasaAplicada.value = 'estandar';
      
      if (data.ultimaActualizacion) {
        const fecha = new Date(data.ultimaActualizacion);
        ultimaActualizacion.value = fecha.toLocaleDateString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      }
      
      if (!preciosCargados.value) {
        preciosCargados.value = true;
      }
      
      loading.value = false;
      
      // Recalcular basado en el campo activo
      actualizarCalculos();
    };

    // Cargar configuración inicial
    onMounted(async () => {
      let unsuscribe;
      
      try {
        const config = await getConfiguracion();
        actualizarPrecios(config);
        
        // Suscribirse a cambios en tiempo real
        unsuscribe = suscribirACambios(actualizarPrecios);
      } catch (err) {
        console.error('Error al cargar configuración:', err);
        error.value = 'No se pudieron cargar las tasas de cambio. Por favor, intente más tarde.';
        loading.value = false;
      }
      
      // Retornar función de limpieza para onUnmounted
      return () => {
        if (unsuscribe) unsuscribe();
      };
    });

    // Retornar todo lo necesario para la plantilla
    return {
      // Datos reactivos
      sekAmount,
      bobAmount,
      tasaAplicada,
      precios,
      loading,
      error,
      preciosCargados,
      ultimaActualizacion,
      activeInput,
      
      // Estilos
      focusStyle,
      baseInputStyle,
      disabledStyle,
      
      // Métodos
      convertFromSEK,
      convertFromBOB,
      actualizarCalculos
    };
  }
};
</script>