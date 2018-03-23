\c venue_app

INSERT INTO venues (name)
VALUES ('ewoks');

INSERT INTO venues (name)
VALUES ('NYU');

INSERT INTO users (name, password)
VALUES ('tara', '$2a$10$jUSdcGGzyoPSRhYPI1iEquLyEl8hbxoopNS8rX0GTY3UKGlJ7Y/wG');

INSERT INTO songs (name, artist, song_uri)
VALUES ('test', 'test', 'test');


-- CREATE TABLE playlists (
--   id BIGSERIAL PRIMARY KEY,
--   song_id INTEGER
-- );


-- CREATE TABLE djs (
--   id BIGSERIAL PRIMARY KEY,
--   user_id INTEGER,
--   venue_id INTEGER,
--   playlist_id INTEGER
-- );
