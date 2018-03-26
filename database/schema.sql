CREATE DATABASE venue_app;

\c venue_app

DROP TABLE venues CASCADE;
DROP TABLE playlists CASCADE;
DROP TABLE djs CASCADE;
DROP TABLE users;

CREATE TABLE venues (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255)
);

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  user_name VARCHAR(255),
  hashed_password VARCHAR(255)
);

CREATE TABLE playlists (
  id BIGSERIAL PRIMARY KEY,
  song_array INTEGER[]
);

CREATE TABLE djs (
  id BIGSERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  venue_id INTEGER REFERENCES venues(id)
);
