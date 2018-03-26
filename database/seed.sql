\c venue_app

INSERT INTO venues (name)
VALUES ('Ewoks');

INSERT INTO venues (name)
VALUES ('Endor');

INSERT INTO venues (name)
VALUES ('Avengers');

INSERT INTO users (user_name, hashed_password)
VALUES ('tara', '$2a$10$XVZRCAmMi5REehBuXAV5l.RCCzqB5X2MydEyAj5xEDNzViC4uH.A.');


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
