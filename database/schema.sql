CREATE DATABASE venue_app;

\c venue_app

DROP TABLE venues;

CREATE TABLE venues (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255)
);

DROP TABLE users;

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255),
  password VARCHAR(255)
);

DROP TABLE songs;

CREATE TABLE songs (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255),
  artist VARCHAR(255),
  song_uri VARCHAR(255)
);

DROP TABLE playlists;

CREATE TABLE playlists (
  id BIGSERIAL PRIMARY KEY,
  song_id INTEGER REFERENCES songs(id)
);

DROP TABLE djs;

CREATE TABLE djs (
  id BIGSERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  venue_id INTEGER REFERENCES venues(id),
  playlist_id INTEGER REFERENCES playlists(id)
);
