# App de libros utilizando Google Books

- Establecer la API KEY de Google Books
  - Se necesita una cuenta de Google
  - Acceder a https://console.cloud.google.com/
  - En el menú de la izquierda, acceder al apartado Credenciales
  - Aparecerá una pantalla, donde pincharemos sobre crear credenciales-> claves de api
  - automáticamente aparecerá una API KEY, que se deberá copiar
  - Dentro de la carpeta SERVICES, pegar la clave copiada en la variable key, linea 4

- Si se desea utilizar una base de datos de firebase propia, sustituir la URL de la REAL TIME DATABASE de firebase por una url propia

## Utilizar la aplicación

- Una vez completados los pasos anteriores, podrá iniciarse la aplicación sin problema alguno
- Si se ha empezado con una base de datos de Firebase propia, no habrá disponible ningún libro leído ni pendiente de leer
- Pinchar sobre Búsqueda de libros para iniciar la búsqueda
- Buscar cualquier cosa. Aparecerán 40 resultados con su respectiva paginación.
- Si se pincha sobre un libro, aparecerá una ventana emergente con más información del libro. Podrá añadirse a la lista de libros       pendientes. También podrá verse online.
- Ahora, se clicka sobre libros pendientes, aparecerá el libro
- Si se hace click sobre él, aparecerá información extra del libro, junto con dos botones: uno para cambiar el estado del libro a leído y otro para leerlo de forma online, siempre que esté disponible


