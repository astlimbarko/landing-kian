import { getFirestore, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { app } from '../firebase.config';

// Obtener la instancia de Firestore usando la app ya inicializada
const db = getFirestore(app);

// Configuración actual
let configuracionActual = {
  precioEstandar: 1000,
  precioEspecial: 1,
  umbralEspecial: 5000,
  ultimaActualizacion: null
};

// Suscriptores a los cambios
const suscriptores = new Set();

// Función para notificar a los suscriptores
const notificarSuscriptores = () => {
  suscriptores.forEach(callback => callback({
    ...configuracionActual,
    success: true
  }));
};

// Configurar el listener en tiempo real
const configRef = doc(db, "configuracion", "precios");
const unsubscribe = onSnapshot(
  configRef,
  (docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data();
      configuracionActual = {
        precioEstandar: data.precioEstandar || 1000,
        precioEspecial: data.precioEspecial || 1,
        umbralEspecial: data.umbralEspecial || 5000,
        ultimaActualizacion: data.ultimaActualizacion || new Date().toISOString()
      };
    } else {
      // Si no existe, crear con valores por defecto
      const defaultConfig = {
        precioEstandar: 1000,
        precioEspecial: 1,
        umbralEspecial: 5000,
        ultimaActualizacion: new Date().toISOString()
      };
      
      setDoc(configRef, defaultConfig);
      configuracionActual = { ...defaultConfig };
    }
    notificarSuscriptores();
  },
  (error) => {
    console.error("Error en tiempo real:", error);
    // Notificar del error a los suscriptores
    suscriptores.forEach(callback => callback({
      ...configuracionActual,
      success: false,
      error: "Error al obtener datos en tiempo real"
    }));
  }
);

// Obtener configuración actual
export const getConfiguracion = () => {
  return new Promise((resolve) => {
    resolve({
      success: true,
      data: { ...configuracionActual }
    });
  });
};

// Suscribirse a cambios
export const suscribirACambios = (callback) => {
  // Llamar inmediatamente con el valor actual
  callback({
    ...configuracionActual,
    success: true
  });
  
  // Agregar a los suscriptores
  suscriptores.add(callback);
  
  // Retornar función para desuscribirse
  return () => {
    suscriptores.delete(callback);
  };
};

// Actualizar configuración
export const actualizarConfiguracion = async (nuevaConfig) => {
  try {
    const docRef = doc(db, "configuracion", "precios");
    await setDoc(docRef, {
      ...nuevaConfig,
      ultimaActualizacion: new Date().toISOString()
    }, { merge: true });
    return { success: true };
  } catch (error) {
    console.error("Error al actualizar configuración:", error);
    return { success: false, error: "No se pudo actualizar la configuración" };
  }
};
