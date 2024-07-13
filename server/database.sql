CREATE DATABASE audiosphere;

CREATE TABLE user(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(20) UNIQUE NOT NULL,
    password VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
)

CREATE TABLE song(
    song_id SERIAL PRIMARY KEY,
    title VARCHAR(70) NOT NULL,
    artist VARCHAR(70),
    duration INT,
    genre VARCHAR(50),
    file_path VARCHAR(255),
    album_id INT,
    FOREIGN KEY (album_id) REFERENCES album(album_id)
)

CREATE TABLE album(
    album_id SERIAL PRIMARY KEY,
    album_name VARCHAR(100) NOT NULL,
    artist VARCHAR(70),
    release_date DATE,
    cover_image_path VARCHAR(255)
)
    
CREATE TABLE playlist(
    playlist_id SERIAL PRIMARY KEY,
    playlist_name VARCHAR(100) NOT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE like(
    like_id SERIAL PRIMARY KEY,
    user_id INT,
    audio_id INT,
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (song_id) REFERENCES song(song_id)
);

CREATE TABLE playlist_item(
    playlist_item_id SERIAL PRIMARY KEY,
    playlist_id INT,
    song_id INT,
    FOREIGN KEY (playlist_id) REFERENCES Playlists(playlist_id),
    FOREIGN KEY (song_id) REFERENCES song(song_id)
);