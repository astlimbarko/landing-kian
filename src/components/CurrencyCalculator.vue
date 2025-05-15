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
                  @input="calculateBOB"
                  class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                  type="text"
                  :value="bobAmount"
                  class="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg"
                  readonly
                  :placeholder="preciosCargados ? '0.00' : 'Cargando tasas...'"
                />
              </div>
              <div v-if="tasaAplicada" class="mt-2 text-sm text-gray-600">
                Tasa aplicada: {{ tasaAplicada === 'especial' ? 'Especial' : 'Estándar' }}
                <span v-if="precios.precioEstandar" class="text-xs text-gray-500">
                  (1 SEK = {{ tasaAplicada === 'especial' ? precios.precioEspecial : precios.precioEstandar }} BOB)
                </span>
              </div>
            </div>
          </div>

          <!-- Información adicional -->
          <div v-if="preciosCargados" class="mt-8 pt-6 border-t border-gray-100">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <h3 class="text-sm font-medium text-gray-500">Tasa estándar</h3>
                <p class="mt-1 text-lg font-medium text-gray-900">
                  {{ precios.precioEstandar ? `1 SEK = ${precios.precioEstandar} BOB` : '---' }}
                </p>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-500">Tasa especial (más de {{ precios.umbralEspecial }} SEK)</h3>
                <p class="mt-1 text-lg font-medium text-green-600">
                  {{ precios.precioEspecial ? `1 SEK = ${precios.precioEspecial} BOB` : '---' }}
                </p>
              </div>
            </div>
            <p class="mt-4 text-xs text-gray-500">
              Última actualización: {{ ultimaActualizacion }}
            </p>
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
    const tasaAplicada = ref(null);
    const precios = ref({
      precioEstandar: null,
      precioEspecial: null,
      umbralEspecial: 5000
    });
    const loading = ref(true);
    const error = ref(null);
    const preciosCargados = ref(false);
    const ultimaActualizacion = ref('No disponible');

    const calculateBOB = () => {
      if (!preciosCargados.value) return;
      const amount = parseFloat(sekAmount.value) || 0;
      
      if (amount <= 0) {
        bobAmount.value = '';
        tasaAplicada.value = null;
        return;
      }

      const esTasaEspecial = amount >= precios.value.umbralEspecial;
      const tasa = esTasaEspecial ? precios.value.precioEspecial : precios.value.precioEstandar;
      
      if (tasa) {
        const result = (amount * tasa).toFixed(2);
        bobAmount.value = result.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        tasaAplicada.value = esTasaEspecial ? 'especial' : 'estandar';
      } else {
        bobAmount.value = '---';
        tasaAplicada.value = null;
      }
    };

    const actualizarPrecios = (data) => {
      if (!data) return;
      
      precios.value = {
        precioEstandar: data.precioEstandar,
        precioEspecial: data.precioEspecial,
        umbralEspecial: data.umbralEspecial
      };
      
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
      
      // Recalcular si hay un monto ingresado
      if (sekAmount.value) {
        calculateBOB();
      }
    };

    // Cargar configuración inicial
    const cargarConfiguracionInicial = async () => {
      try {
        loading.value = true;
        const { success, data, error: configError } = await getConfiguracion();
        
        if (success) {
          actualizarPrecios(data);
        } else {
          throw new Error(configError || 'Error desconocido');
        }
      } catch (err) {
        console.error('Error al cargar configuración:', err);
        error.value = 'No se pudieron cargar las tasas de cambio. Por favor, intente más tarde.';
        loading.value = false;
      }
    };

    // Configurar suscripción a cambios en tiempo real
    let unsuscribe;
    
    onMounted(() => {
      // Cargar configuración inicial
      cargarConfiguracionInicial();
      
      // Suscribirse a cambios en tiempo real
      unsuscribe = suscribirACambios((data) => {
        actualizarPrecios(data);
      });
    });
    
    // Limpiar suscripción al desmontar el componente
    onUnmounted(() => {
      if (unsuscribe) {
        unsuscribe();
      }
    });

    return {
      sekAmount,
      bobAmount,
      tasaAplicada,
      precios,
      preciosCargados,
      loading,
      error,
      ultimaActualizacion,
      calculateBOB
    };
  }
};
</script>