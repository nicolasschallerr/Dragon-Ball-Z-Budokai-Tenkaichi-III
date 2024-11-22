# Dragon Ball Z: Budokai Tenkaichi III

**Dragon Ball Combat** es una simulación interactiva basada en la popular serie "Dragon Ball Z", que permite a los usuarios seleccionar personajes, participar en combates y activar poderes especiales. La simulación está diseñada para ofrecer una experiencia visualmente atractiva, utilizando una interfaz web interactiva que permite seleccionar personajes de una lista, iniciar combates entre ellos y ver los resultados en tiempo real.

## Descripción

Este proyecto permite a los usuarios elegir entre varios personajes de **Dragon Ball Z**, cada uno con sus propias estadísticas de ataque y defensa. Los personajes tienen un poder especial que se activa automáticamente después de un tiempo determinado, aumentando su capacidad de ataque. Los usuarios pueden seleccionar hasta dos personajes para luchar, con la opción de ver un historial de combates pasados.

### Funcionalidades:

- **Selección de Personajes**: Los usuarios pueden elegir hasta dos personajes para iniciar un combate.
- **Poder Especial**: Cada personaje tiene un poder especial que aumenta su ataque temporalmente.
- **Combate**: Al seleccionar los personajes, comienza un combate en el que las estadísticas de ataque y defensa se enfrentan.
- **Historial de Combates**: Se guarda un historial de los combates pasados.
- **Interfaz de Usuario**: Las alertas y botones son estilizados para proporcionar una experiencia visual consistente.

## Tecnologías y Frameworks Utilizados

### 1. **HTML5**

- Se utiliza para la estructura de la página web, incluyendo la creación de las secciones de personajes, combate, y demás funcionalidades.
- [HTML5](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)

### 2. **CSS3**

- El diseño de la página y los estilos visuales, incluidos los fondos, tarjetas de personajes y botones, se logran con CSS.
- Se utiliza para crear una experiencia de usuario moderna y atractiva con temas oscuros y destructivos.
- [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS)

### 3. **Bootstrap 5**

- Se utiliza para estructurar el diseño de manera eficiente, con un sistema de rejilla responsive, y componentes como botones y tarjetas.
- [Bootstrap 5](https://getbootstrap.com/)

### 4. **JavaScript (ES6)**

- El JavaScript se utiliza para la lógica del juego: cargar los personajes, manejar las selecciones, calcular los combates y aplicar los poderes especiales.
- Uso de funciones como `setTimeout()` para la activación de poderes especiales.
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

### 5. **SweetAlert2**

- Se utiliza para mostrar alertas personalizadas en el juego, como advertencias y mensajes de error. Las alertas tienen un diseño consistente con el tema del juego.
- SweetAlert2

### 6. **Fetch API**

- Se emplea para cargar los personajes desde un archivo JSON externo y actualizar la interfaz con la información de los personajes.
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

### 7. **Session Storage**

- Se utiliza para almacenar los personajes seleccionados en el almacenamiento de sesión, de manera que los usuarios no pierdan su progreso al recargar la página.
- [SessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)

## Estructura del Proyecto

DragonBallCombat/
├── index.html # Página principal
├── css/
│ ├── style.css # Estilos principales de la página
├── js/
│ ├── personajes.js # Lógica de los personajes y su interacción
│ ├── combates.js # Lógica de los combates y los movimientos
├── db/
│ └── personajes.json # Archivo JSON con la información de los personajes
├── assets/
│ └── destruction_bg.jpg # Imagen de fondo para las secciones
└── README.md # Descripción del proyecto

## Funciones Principales

### 1. **Personaje**

La clase `Personaje` define los atributos y métodos que tiene cada personaje del juego. Estos incluyen:

- **Atributos**: `nombre`, `ataque`, `defensa`, `imagen` y un `id` único para cada personaje.
- **Métodos**:
  - **poderEspecial()**: Aumenta el ataque del personaje después de 30 segundos.
  - **recuperar()**: Aumenta la defensa del personaje en 10 puntos.
  - **esquivar()**: Devuelve un valor booleano aleatorio para determinar si el personaje esquiva un ataque.
  - **mostrarDetalles()**: Muestra las estadísticas del personaje.

### 2. **cargarPersonajes()**

Esta función utiliza `fetch` para cargar los personajes desde el archivo JSON y los convierte en instancias de la clase `Personaje`. Luego renderiza las tarjetas de los personajes en la interfaz.

### 3. **seleccionarPersonaje()**

Permite a los usuarios seleccionar un personaje y agregarlo a una lista de personajes seleccionados, con un máximo de dos personajes.

### 4. **guardarPersonajesSeleccionados() y cargarPersonajesSeleccionados()**

Estas funciones permiten almacenar y recuperar los personajes seleccionados usando `sessionStorage`.

### 5. **renderizarPersonajes()**

Esta función actualiza la interfaz, mostrando las tarjetas de los personajes disponibles y asignando los eventos para seleccionar personajes.
