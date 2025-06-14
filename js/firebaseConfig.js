// Configuración y inicialización de Firebase
// Las credenciales deberían obtenerse de variables de entorno en un entorno real
const firebaseConfig = {
  apiKey: "AIzaSyDUItFotBBQjM4Uuh1DYkm5ARecZ_utooo",
  authDomain: "formularios-fundos.firebaseapp.com",
  projectId: "formularios-fundos",
  storageBucket: "formularios-fundos.firebasestorage.app",
  messagingSenderId: "884518397631",
  appId: "1:884518397631:web:85b14f9c0c1ee451fc880a"
};

// Inicializar Firebase únicamente una vez
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
