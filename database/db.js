
import conn from './conn.js'

export async function getAllPosts() {
    const [rows] = await conn.query('SELECT * FROM blog_posts')
    return rows
}

export async function createPost(title, category, winner_name, song_album_name, record_label, award_date, image_base64, content) {
    const [result] = await conn.query('INSERT INTO blog_posts (title, category, winner_name, song_album_name, record_label, award_date, image_base64, content) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [title, category, winner_name, song_album_name, record_label, award_date, image_base64, content])
    return result
}

export async function getPost(id) {
    const [rows] = await conn.query('SELECT * FROM blog_posts WHERE id = ?', [id]);
    return rows[0];
}

export async function updatePost(id, title, category, winner_name, song_album_name, record_label, award_date, image_base64, content) {
    const [result] = await conn.query('UPDATE blog_posts SET title= ?, category = ?, winner_name = ?, song_album_name = ?, record_label = ?, award_date = ?, image_base64 = ?, content = ? WHERE id = ?', [title, category, winner_name, song_album_name, record_label, award_date, image_base64, content, id]);
    return result;
}

export async function deletePost(id) {
    const [result] = await conn.query('DELETE FROM blog_posts WHERE id = ?', [id]);
    return result;
}

