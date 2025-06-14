// Lógica principal de la interfaz
// Requiere que firebaseConfig.js y auth.js se hayan cargado previamente

document.addEventListener('DOMContentLoaded', () => {
    mostrarNombreUsuario();
    configurarLogout();
    inicializarCargaDeFormularios();
});

function mostrarNombreUsuario() {
    const usernameDisplay = document.getElementById('username-display');
    if (usernameDisplay) {
        const username = localStorage.getItem('username') || 'Usuario';
        usernameDisplay.textContent = username;
    }
}

function configurarLogout() {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
}

function inicializarCargaDeFormularios() {
    fetch('data/forms.json')
        .then(resp => resp.json())
        .then(data => crearPestanas(data.forms))
        .catch(err => {
            console.error('Error al cargar la lista de formularios:', err);
            document.getElementById('form-container').innerHTML =
                '<div class="error">No se pudo cargar la lista de formularios.</div>';
        });
}

function crearPestanas(forms) {
    const tabsContainer = document.getElementById('tabs-container');
    const formContainer = document.getElementById('form-container');

    if (!Array.isArray(forms) || forms.length === 0) {
        formContainer.innerHTML = '<div class="error">No hay formularios disponibles.</div>';
        return;
    }

    forms.forEach((form, index) => {
        const btn = document.createElement('button');
        btn.textContent = form.name;
        btn.classList.add('tab-button');
        if (index === 0) btn.classList.add('active');
        btn.addEventListener('click', () => cargarFormulario(form, btn, tabsContainer));
        tabsContainer.appendChild(btn);
    });

    // Cargar el primer formulario por defecto
    cargarFormulario(forms[0], tabsContainer.querySelector('.tab-button'), tabsContainer);
}

function cargarFormulario(form, clickedButton, tabsContainer) {
    const formContainer = document.getElementById('form-container');
    formContainer.innerHTML = '<div class="loading">Cargando formulario...</div>';

    fetch(form.url)
        .then(resp => resp.text())
        .then(html => {
            // Si el archivo es una página completa, obtenemos sólo el contenido del body
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const bodyContent = doc.body ? doc.body.innerHTML : html;
            formContainer.innerHTML = bodyContent;

            // Actualizar pestañas activas
            tabsContainer.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
            if (clickedButton) clickedButton.classList.add('active');
        })
        .catch(err => {
            console.error('Error al cargar el formulario:', err);
            formContainer.innerHTML = '<div class="error">Error al cargar el formulario.</div>';
        });
}
