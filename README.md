# Formularios Fundos

Sitio de ejemplo para cargar formularios de manera dinámica usando Firebase para la autenticación.

## Estructura del proyecto
- **index.html**: página principal que lista las pestañas de formularios.
- **login.html**: formulario de acceso con validación mediante Firebase.
- **forms/**: contiene cada formulario HTML que se carga en la página principal.
- **js/**: scripts JavaScript separados por funcionalidad.
- **css/**: estilos generales y específicos de la página de login.
- **assets/**: recursos estáticos como el logotipo.

## Uso
1. Hospeda el proyecto en un servidor estático (por ejemplo `npx serve` o la extensión Live Server de VSCode).
2. Abre `login.html` para iniciar sesión con tus credenciales de Firebase.
3. Una vez autenticado se mostrará `index.html` con las pestañas para cada formulario.
4. Los datos enviados desde un formulario se muestran en la consola del navegador a modo de ejemplo.

## Personalización
- Modifica `js/firebaseConfig.js` con tus claves de Firebase.
- Agrega nuevos formularios en la carpeta `forms/` y regístralos en `js/main.js`.

