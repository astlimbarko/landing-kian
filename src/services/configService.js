import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase.config';

// Configuración actual
let configuracionActual = {
  precioEstandar: '--',
  precioEspecial: '--',
  umbralEspecial: '--',
  ultimaActualizacion: '--'
};

// Suscriptores a los cambios
const suscriptores = new Set();

// Función para notificar a los suscriptores
const notificarSuscriptores = (success = true, error = null) => {
  console.log('=== NOTIFICANDO SUSCRIPTORES ===');
  console.log('Datos a notificar:', { ...configuracionActual, success, error });
  suscriptores.forEach(callback => callback({
    ...configuracionActual,
    success,
    error
  }));
};

// Configurar el listener en tiempo real
const configRef = doc(db, "configuracion", "precios");
const unsubscribe = onSnapshot(
  configRef,
  (docSnap) => {
    console.log('=== INICIO CAMBIO FIRESTORE ===');
    console.log('Documento existe:', docSnap.exists());
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log('=== DATOS DE FIRESTORE ===');
      console.log('Datos completos:', data);
      
      // Asignar valores directamente sin ningún procesamiento
      configuracionActual = {
        precioEstandar: data.precioEstandar || '--',
        precioEspecial: data.precioEspecial || '--',
        umbralEspecial: data.umbralEspecial || '--',
        ultimaActualizacion: data.ultimaActualizacion || '--'
      };
      
      console.log('=== CONFIGURACIÓN ACTUAL ===');
      console.log('Configuración completa:', configuracionActual);
      
      notificarSuscriptores(true);
    } else {
      console.log('Documento no existe en Firestore');
      notificarSuscriptores(false, "No se encontró la configuración en la base de datos");
    }
    console.log('=== FIN CAMBIO FIRESTORE ===');
  },
  (error) => {
    console.error("Error en tiempo real:", error);
    notificarSuscriptores(false, "Error al obtener datos en tiempo real");
  }
);

// Obtener configuración actual
export const getConfiguracion = () => {
  console.log('=== OBTENIENDO CONFIGURACIÓN ===');
  console.log('Configuración actual:', configuracionActual);
  return new Promise((resolve) => {
    resolve({
      success: true,
      data: { ...configuracionActual }
    });
  });
};

// Suscribirse a cambios
export const suscribirACambios = (callback) => {
  console.log('=== NUEVA SUSCRIPCIÓN ===');
  console.log('Configuración actual al suscribir:', configuracionActual);
  
  callback({
    ...configuracionActual,
    success: true
  });
  
  suscriptores.add(callback);
  
  return () => {
    console.log('Suscripción eliminada');
    suscriptores.delete(callback);
  };
};
