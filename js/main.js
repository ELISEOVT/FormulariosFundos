// Lógica de carga dinámica de formularios y manejo de pestañas

document.addEventListener('DOMContentLoaded', () => {
  // Mostrar nombre de usuario almacenado tras el login
  const usernameDisplay = document.getElementById('username-display');
  if (usernameDisplay) {
    usernameDisplay.textContent = localStorage.getItem('username') || 'Usuario';
  }

  // Botón para cerrar sesión
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
  }

  // Definición de los formularios disponibles
  const forms = [
    { id: 'form1', title: 'Registro', file: 'forms/form1.html' },
    { id: 'form2', title: 'Encuesta', file: 'forms/form2.html' }
  ];

  const tabsContainer = document.getElementById('tabs-container');
  const formContainer = document.getElementById('form-container');

  // Crear pestañas
  forms.forEach((form, index) => {
    const button = document.createElement('button');
    button.className = 'tab-button';
    button.textContent = form.title;
    button.dataset.formId = form.id;
    if (index === 0) {
      button.classList.add('active');
    }
    button.addEventListener('click', () => loadForm(form, button));
    tabsContainer.appendChild(button);
  });

  // Cargar el primer formulario por defecto
  if (forms.length > 0) {
    loadForm(forms[0], tabsContainer.querySelector('.tab-button'));
  }

  // Función para cargar el formulario seleccionado
  function loadForm(form, button) {
    const active = tabsContainer.querySelector('.active');
    if (active) {
      active.classList.remove('active');
    }
    button.classList.add('active');

    formContainer.innerHTML = '<div class="loading">Cargando formulario...</div>';
    fetch(form.file)
      .then(r => r.text())
      .then(html => {
        formContainer.innerHTML = html;
      })
      .catch(err => {
        console.error('Error al cargar el formulario', err);
        formContainer.innerHTML = '<div class="error">No se pudo cargar el formulario.</div>';
      });
  }
});
