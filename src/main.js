import express from 'express';
import cors from 'cors';
import { getAllPosts, createPost, getPost, updatePost, deletePost } from '../database/db.js';

const app = express()
const port = 3000

// CORS
app.use(cors());

app.use(express.json());


/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Obtiene todos los posts
 *     responses:
 *       200:
 *         description: Lista de posts obtenida correctamente
 *       500:
 *         description: Error del servidor
 */

// Endpoint para obtener todos los posts
app.get('/posts', async (req, res) => {
    try {
        const posts = await getAllPosts();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Crea un nuevo post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               category:
 *                 type: string
 *               winner_name:
 *                 type: string
 *               song_album_name:
 *                 type: string
 *               record_label:
 *                 type: string
 *               award_date:
 *                 type: string
 *               image_url:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post creado correctamente
 *       400:
 *         description: Bad Request - Datos faltantes o formato incorrecto
 *       500:
 *         description: Error del servidor
 */

// Endpoint para crear un nuevo post
app.post('/posts', async (req, res) => {
    try {
        const { title, category, winner_name, song_album_name, record_label, award_date, image_url, content } = req.body;
        // Validación del cuerpo de la solicitud
        if (!title || !category || !winner_name || !song_album_name || !record_label || !award_date || !image_url || !content) {
            return res.status(400).json({ error: 'Bad Request: Missing data or incorrect format' });
        }
        const result = await createPost(title, category, winner_name, song_album_name, record_label, award_date, image_url, content);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Obtiene un post por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del post a obtener
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Post obtenido correctamente
 *       404:
 *         description: Post no encontrado
 *       500:
 *         description: Error del servidor
 */

// Endpoint para obtener un post específico por ID
app.get('/posts/:id', async (req, res) => {
    try {
        const post = await getPost(req.params.id);
            res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Actualiza un post por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del post a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               category:
 *                 type: string
 *               winner_name:
 *                 type: string
 *               song_album_name:
 *                 type: string
 *               record_label:
 *                 type: string
 *               award_date:
 *                 type: string
 *               image_url:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post actualizado correctamente
 *       400:
 *         description: Bad Request - Datos faltantes o formato incorrecto
 *       404:
 *         description: Post no encontrado
 *       500:
 *         description: Error del servidor
 */

// Endpoint para actualizar un post por ID
app.put('/posts/:id', async (req, res) => {
    try {
        const idpost= req.params.id;
        const changedData = req.body;
         // Validación del cuerpo de la solicitud
        if (!changedData) {
            return res.status(400).json({ error: 'Bad Request: Missing data or incorrect format' });
        }

        const result = await updatePost(idpost, changedData);
        if (result.affectedRows) {
            const updatedPost = await getPost(req.params.id);
            res.json(updatedPost);
        } else {
            res.status(404).send('Post not found');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Elimina un post por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del post a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Post eliminado correctamente
 *       404:
 *         description: Post no encontrado
 *       500:
 *         description: Error del servidor
 */

// Endpoint para eliminar un post por ID
app.delete('/posts/:id', async (req, res) => {
    try {
        const result = await deletePost(req.params.id);
        if (result.affectedRows) {
            res.status(204).end(); 
        } else {
            res.status(404).send('Post not found');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.all('/posts*', (req, res, next) => {
    const supportedMethods = ['GET', 'POST', 'PUT', 'DELETE'];
    if (!supportedMethods.includes(req.method)) {
    return res.status(501).send('Method not implemented');
    }
    next();
});

app.use('*', (req, res) => {
    res.status(400).send('Bad Request: Endpoint does not exist or request format is incorrect');
});



app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});