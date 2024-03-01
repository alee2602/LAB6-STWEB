import express from 'express';
import cors from 'cors';
import { getAllPosts, createPost, getPost, updatePost, deletePost } from '../database/db.js';

const app = express()
const port = 3000

// CORS
app.use(cors());

app.use(express.json());


// Endpoint para obtener todos los posts
app.get('/posts', async (req, res) => {
    try {
        const posts = await getAllPosts();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

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

// Endpoint para obtener un post específico por ID
app.get('/posts/:id', async (req, res) => {
    try {
        const post = await getPost(req.params.id);
            res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

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