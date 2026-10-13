# Javis y el Ámbar del Tiempo

PWA interactiva en español basada en el cuento de nueve páginas de **Javis y el Ámbar del Tiempo: Una aventura con el Capitán Escarabajo**.

## Incluye
- Diseño adaptable a móviles y escritorio.
- Lector por escenas, progreso y navegación entre páginas.
- Marcadores y última escena guardados en el dispositivo.
- Lectura en voz alta mediante la síntesis de voz del navegador.
- Manifiesto instalable y service worker para caché de la aplicación.
- Acceso al PDF original cuando el archivo se encuentre en la raíz del proyecto.

## Despliegue en Vercel
Es un sitio estático, sin paso de compilación ni instalación de dependencias:
- Framework Preset: **Other**
- Build Command: dejar vacío
- Output Directory: `.` (raíz del proyecto)
- Install Command: dejar vacío

Importa el repositorio `antonioortiz247-design/Javis` en Vercel y despliega desde `main`.

## PDF original
Coloca el archivo `Javis_y_el_Ambar_del_Tiempo.pdf` en la raíz del repositorio para activar el enlace al PDF original. El lector interactivo contiene el texto de la historia transcrito a partir del documento de referencia. Sube las nueve ilustraciones originales a la raíz del repositorio con los nombres exactos `1.png`, `2.png`, `3.png`, `4.png`, `5.png`, `6.png`, `7.png`, `8.png` y `9.png`. El lector las carga automáticamente en la escena correspondiente.

## Notas técnicas
La lectura por voz depende de las voces disponibles en el dispositivo. El modo sin conexión guarda la estructura de la PWA tras la primera visita con conexión; el PDF no se almacena automáticamente en caché.
