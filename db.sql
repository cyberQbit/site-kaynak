-- Veritabanı oluşturma
CREATE DATABASE IF NOT EXISTS aydinayd_database;
USE aydinayd_database;

-- Sosyal medya bağlantıları tablosu
CREATE TABLE social_links (
    id INT AUTO_INCREMENT PRIMARY KEY,
    platform_name VARCHAR(50) NOT NULL,
    url VARCHAR(255) NOT NULL,
    icon_class VARCHAR(50) NOT NULL
);

-- Örnek sosyal medya bağlantıları
INSERT INTO social_links (platform_name, url, icon_class) VALUES
('Instagram', 'https://www.instagram.com', 'fab fa-instagram'),
('Facebook', 'https://www.facebook.com', 'fab fa-facebook-f'),
('Twitter', 'https://www.twitter.com', 'fab fa-twitter'),
('Email', 'mailto:example@example.com', 'fas fa-envelope');

-- İçerik blokları tablosu
CREATE TABLE content_blocks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    block_class VARCHAR(50) NOT NULL
);

-- Örnek içerik blokları
INSERT INTO content_blocks (title, description, block_class) VALUES
('Art live stream', 'Catch me on Twitch every Saturday as I make art live', 'art-stream'),
('Tutorials', 'Videos to guide and to inspire you create', 'tutorials'),
('Top picks + recos', 'Materials I stand by and would love for you to try', 'top-picks');

-- Galeri tablosu
CREATE TABLE gallery_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image_url VARCHAR(255) NOT NULL,
    alt_text VARCHAR(100) NOT NULL,
    caption VARCHAR(50) NOT NULL
);

-- Örnek galeri öğeleri
INSERT INTO gallery_items (image_url, alt_text, caption) VALUES
('placeholder-art.jpg', 'Art', 'art'),
('placeholder-inspo.jpg', 'Inspo', 'inspo'),
('placeholder-fashion.jpg', 'Fashion', 'fashion');