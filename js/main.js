
// Cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Mostrar nombre de usuario
    const usernameDisplay = document.getElementById('username-display');
    if (usernameDisplay) {
        const username = localStorage.getItem('username') || 'Usuario';
        usernameDisplay.textContent = username;
    }
    
    // Configurar botón de logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
// =================================================================
//     INICIO: Tu código de Firebase va pegado en esta sección
// Reemplaza este bloque de ejemplo con TUS propias claves de Firebase
// =================================================================
const firebaseConfig = {
    apiKey: "AIzaSyDUItFotBBQjM4Uuh1DYkm5ARecZ_utooo",
    authDomain: "formularios-fundos.firebaseapp.com",
    projectId: "formularios-fundos",
    storageBucket: "formularios-fundos.firebasestorage.app",
    messagingSenderId: "884518397631",
    appId: "1:884518397631:web:85b14f9c0c1ee451fc880a"
  };
  // =================================================================
  //     FIN: Tu código de Firebase
  // =================================================================
  
  
  // El resto del código no necesita ninguna modificación.
  // Simplemente se encarga de la lógica de la página.
  
  // Inicializar Firebase con la configuración de arriba
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  
  // Referencias a los elementos del DOM (los divs, forms, etc. del HTML)
  const loginView = document.getElementById('login-view');
  const dashboardView = document.getElementById('dashboard-view');
  const loginForm = document.getElementById('login-form');
  const loginError = document.getElementById('login-error');
  const userEmailDisplay = document.getElementById('user-email');
  const logoutButton = document.getElementById('logout-button');
  
  // --- MANEJADOR DEL FORMULARIO DE LOGIN ---
  // Esta parte del código "escucha" cuando el usuario hace clic en el botón "Entrar"
  loginForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Evita que la página se recargue
      
      // Obtenemos el correo y la contraseña que el usuario escribió
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      
      loginError.textContent = ''; // Limpiamos cualquier error anterior
  
      // Usamos Firebase para intentar iniciar sesión con esos datos
      auth.signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
              // Si Firebase dice que los datos son correctos, no hacemos nada aquí.
              // La función de abajo (onAuthStateChanged) se encargará de todo.
              console.log('Usuario autenticado:', userCredential.user.email);
          })
          .catch((error) => {
              // Si Firebase dice que hay un error, mostramos un mensaje.
              loginError.textContent = 'El correo o la contraseña son incorrectos.';
              console.error('Error de autenticación:', error.message);
          });
  });
  
  // --- OBSERVADOR DEL ESTADO DE AUTENTICACIÓN ---
  // Esta es la parte más importante. Es un "vigilante" que siempre está activo.
  // Se ejecuta automáticamente cuando alguien inicia o cierra sesión.
  auth.onAuthStateChanged((user) => {
      if (user) {
          // Si el vigilante detecta un usuario (alguien ha iniciado sesión)...
          // Ocultamos la vista de login y mostramos la de bienvenida.
          loginView.classList.add('hidden');
          dashboardView.classList.remove('hidden');
          userEmailDisplay.textContent = user.email; // Mostramos el email del usuario
      } else {
          // Si el vigilante no detecta ningún usuario (nadie ha iniciado sesión o ha cerrado sesión)...
          // Mostramos la vista de login y ocultamos la de bienvenida.
          loginView.classList.remove('hidden');
          dashboardView.classList.add('hidden');
      }
  });
  
  // --- MANEJADOR DEL BOTÓN DE LOGOUT ---
  // Le decimos al botón "Cerrar Sesión" qué hacer cuando le hagan clic.
  logoutButton.addEventListener('click', () => {
      // Le decimos a Firebase que cierre la sesión del usuario actual.
      auth.signOut();
  });
  
});