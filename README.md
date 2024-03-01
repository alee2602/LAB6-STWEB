
# LAB6-STWEB/ Blog API

Esta es una API para gestionar publicaciones de un blog. Utiliza Express y MySQL para proporcionar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre las publicaciones del blog.

## Endpoints

### GET/posts

Devuelve una lista de todas las publicaciones del blog.

### POST/posts

Crea una nueva publicación en el blog. Debe enviar un objeto JSON con los siguientes campos en el cuerpo de la solicitud:

- `title` (String): Título de la publicación.
- `category` (String): Categoría de la publicación.
- `winner_name` (String): Nombre del ganador.
- `song_album_name` (String): Nombre del álbum de la canción.
- `record_label` (String): Sello discográfico.
- `award_date` (String): Fecha del premio.
- `image_base64` (String): Imagen en formato base64.
- `content` (String): Contenido de la publicación.

### GET/posts/:id

Devuelve los detalles de una publicación específica según su ID.

### PUT/posts/:id

Actualiza los detalles de una publicación específica según su ID. Debe enviar un objeto JSON con los campos que desea actualizar en el cuerpo de la solicitud.

### DELETE/posts/:id

Elimina una publicación específica según su ID.

## Gestión de Errores

- Error 400: La solicitud es incorrecta o incompleta.
- Error 404: No se encontró la publicación.
- Error 500: Error interno del servidor.

## Métodos no implementados

La API solo admite los métodos HTTP GET, POST, PUT y DELETE para el endpoint `/posts`. Otros métodos devolverán un error 501 "No implementado".

## Requisitos

- [ ] Implementar un comando npm lint que utilice eslint para mostrar que su código no tiene errores de estilo (30 puntos)
- [X] Implementar adecuadamente los status de error 500 cuando haya un problema contactando con la base de datos o un error de código (15 puntos)
- [X] Implementar el mensaje de error 501 cuando se trate de utilizar un método no implementado de HTTP (5 puntos)
- [ ] Implementar estados de error 400 cuando se visite un endpoint no existente, o cuando no se manden datos con el formato incorrecto en el body de los métodos PUT y POST (15 puntos)
- [ ] Escribir a un archivo de log.txt un detalle de cada endpoint llamado, que incluya la hora a la que fue llamado, el payload con el que se llamó y la respuesta que el endpoint envió (5 puntos)
- [ ] Utilizar Swagger para crear documentación de sus endpoints (20 puntos)
- [ ] Soportar imágenes en formato base64 en al menos una propiedad de su blog (10 puntos)
- [X] Implementar soporte para CORS (10 puntos)
- [X] Entregar un README bien formateado y un commit history ordenado en su repositorio de Git (20 puntos)
- [X] Hacer un Docker Compose que permita levantar 2 contenedores, uno para la aplicación y otro para la base de datos (30 puntos)
