
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

