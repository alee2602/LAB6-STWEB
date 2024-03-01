CREATE TABLE IF NOT EXISTS blog_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    winner_name VARCHAR(255) NOT NULL,
    song_album_name VARCHAR(255) NOT NULL,
    record_label VARCHAR(255),
    award_date DATE NOT NULL,
    image_url TEXT,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);