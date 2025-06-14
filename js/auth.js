// Funciones de autenticación de Firebase
// La inicialización de Firebase se realiza en firebaseConfig.js

document.addEventListener('DOMContentLoaded', function() {
    // Verificar estado de autenticación cuando carga la página
    checkAuthState();
    
    // Configurar el formulario de login
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

// Verificar estado de autenticación
function checkAuthState() {
    firebase.auth().onAuthStateChanged(function(user) {
        const isLoginPage = window.location.pathname.includes('login.html');
        
        if (user) {
            // Usuario está autenticado
            if (isLoginPage) {
                // Si está en la página de login pero ya está autenticado, redirigir a index
                window.location.href = 'index.html';
            }
        } else {
            // Usuario no está autenticado
            if (!isLoginPage) {
                // Si no está en la página de login y no está autenticado, redirigir a login
                window.location.href = 'login.html';
            }
        }
    });
}

// Manejar el envío del formulario de login
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError');
    
    // Limpiar mensaje de error previo
    errorDiv.textContent = '';
    
    // Validación básica
    if (!email || !password) {
        errorDiv.textContent = 'Por favor, complete todos los campos.';
        return;
    }
    
    // Mostrar indicador de carga
    const submitButton = document.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Iniciando sesión...';
    
    // Autenticación con Firebase
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Login exitoso
            const user = userCredential.user;
            
            // Guardar información básica del usuario
            localStorage.setItem('username', user.email.split('@')[0]);
            
            // La redirección ocurrirá automáticamente gracias a onAuthStateChanged
        })
        .catch((error) => {
            // Determinar mensaje de error adecuado según el código
            let errorMessage = 'Error al iniciar sesión';
            
            switch(error.code) {
                case 'auth/invalid-email':
                    errorMessage = 'El formato del correo electrónico no es válido.';
                    break;
                case 'auth/user-disabled':
                    errorMessage = 'Esta cuenta ha sido deshabilitada.';
                    break;
                case 'auth/user-not-found':
                    errorMessage = 'No existe un usuario con ese correo electrónico.';
                    break;
                case 'auth/wrong-password':
                    errorMessage = 'Contraseña incorrecta.';
                    break;
                case 'auth/too-many-requests':
                    errorMessage = 'Demasiados intentos fallidos. Intenta más tarde.';
                    break;
                default:
                    errorMessage = `Error: ${error.message}`;
            }
            
            errorDiv.textContent = errorMessage;
            console.error("Error de autenticación:", error);
            
            // Restaurar botón
            submitButton.disabled = false;
            submitButton.textContent = 'Iniciar Sesión';
        });
}

// Función para cerrar sesión
function logout() {
    firebase.auth().signOut().then(() => {
        // Eliminar datos del localStorage
        localStorage.removeItem('username');
        
        // La redirección ocurrirá automáticamente gracias a onAuthStateChanged
    }).catch((error) => {
        console.error("Error al cerrar sesión:", error);
    });
}