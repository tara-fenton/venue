\c venue_app

INSERT INTO venues (name, playlist_id)
VALUES ('Ewoks', '1BD1K3MScX6w7NlRPqxdZt');

INSERT INTO venues (name, playlist_id)
VALUES ('Endor', '4qwFVghVdOJMmOHRUktDZ6');

INSERT INTO venues (name, playlist_id)
VALUES ('Avengers', '74eSK1LW0Trl4ZNUjUiySF');

INSERT INTO users (user_name, hashed_password)
VALUES ('tara', '$2a$10$XVZRCAmMi5REehBuXAV5l.RCCzqB5X2MydEyAj5xEDNzViC4uH.A.');

INSERT INTO users (user_name, hashed_password)
VALUES ('taraDJ', '$2a$10$XVZRCAmMi5REehBuXAV5l.ouZZEvPdGyvsYul/oO3ae9hgFc9wouG');


-- 1BD1K3MScX6w7NlRPqxdZt
-- CREATE TABLE playlists (
--   id BIGSERIAL PRIMARY KEY,
--   song_id INTEGER REFERENCES songs(id)
-- );
--
-- CREATE TABLE djs (
--   id BIGSERIAL PRIMARY KEY,
--   user_id INTEGER REFERENCES users(id),
--   venue_id INTEGER REFERENCES venues(id),
--   playlist_id INTEGER REFERENCES playlists(id)
-- );
