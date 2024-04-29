
import conn from './conn.js'

export async function getAllPosts() {
    const [rows] = await conn.query('SELECT * FROM blog_posts')
    return rows;
}

export async function createPost(title, category, winner_name, song_album_name, record_label, award_date, image_url, content) {
    const [result] = await conn.query('INSERT INTO blog_posts (title, category, winner_name, song_album_name, record_label, award_date, image_url, content) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [title, category, winner_name, song_album_name, record_label, award_date, image_url, content])
    return result;
}

export async function getPost(id) {
    const [rows] = await conn.query('SELECT * FROM blog_posts WHERE id = ?', [id]);
    return rows[0];
}

export async function updatePost(id, changedData) {
    const [result] = await conn.query('UPDATE blog_posts SET ? WHERE id = ?', [changedData, id]);
    return result;
}

export async function deletePost(id) {
    const [result] = await conn.query('DELETE FROM blog_posts WHERE id = ?', [id]);
    return result;
}

export async function startLogin(username,password) {
    const [user] = await conn.query('SELECT id, username, name, email FROM users WHERE username = ? AND password = ?', [username, password]);
    return user[0];
}

export async function createUser(username, hashedPassword, name, email) {
    try {
        const result = await conn.query(
            'INSERT INTO users (username, password, name, email) VALUES (?, ?, ?, ?)',
            [username, hashedPassword, name, email]
        );
    return { success: true, userId: result.insertId };
        } catch (error) {

    return { success: false, error: error.message };
    }
}
