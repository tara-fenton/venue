# project-2

## Venue - Spotify API and CRUD App

## Wireframes

![alt text](https://git.generalassemb.ly/tara-fenton/project-2/blob/master/wireframe.png)

## User Stories

As a developer that listens to music all day while at work I want to have a website/app to listen to music with my coworkers so that we can have a shared music environment as well

As a student that has many classmates and friends I want to listen to music with them so that I can collaborate with them on our music selections

As an introvert that works from home I want to login into a place so that I can feel like a part of another community from the comfort of my home

As a Spotify user I want to have new ways of finding songs so that I can update my playlists with newly found songs/artists/genres

As a competitive person I want to gain points from playing good songs the crowd likes so that I can get more aviators/level up

As an aspiring dj I want to have a way to practice playing for a crowd of strangers so that I can perfect my craft

As a music lover I want to have a way to share with favorite music with friends or strangers so that feel good about contributing to the music community

As a Spotify user I want to be able to set up a venue account so that I can access the venue platform

As a Venue user I want to easily login to my Spotify account so that I can join a venue room

As a Venue VIP, a member with over 100 up votes I want to be able to create a Venue room so that I can invite my friends to my venue

As a Venue Fan I want to be able to up or down vote the djs song so that I can give the dj feedback on his song selection

As a Venue Fan I want to be able to leave the venue so that I can find another dj to listen to or go to a room I like better

As a Venue Fan I want to be able to be a dj so that if there is an open spot I can move into the queue

As a Venue dj I want to be able to search and browse or songs so that I can add to my set queue

As a Venue dj in queue I want to be able to create a playlist so that when it's my turn to dj I'm ready with my set

As a Venue dj or fan I want to chat with others in the venue so that we can discuss the music selection and any other topics

## The technologies, APIs, and modules you used and a description of each

### Spotify API
Using the Spotify API users with a premium account will be able to access their playlists to add to their Spotify playlists.

### Venues:
Venues are the CRUD aspect of the project. You can create, read, update and delete venues.

### dependencies:
- bcrypt -to crypt passwords
- body-parser - send data in post
- ejs - for templating
- es6-promise - for calls to promises
- eslint - to use for code hinting
- eslint-config-airbnb - to use for code hinting
- eslint-config-prettier - to use for code hinting
- eslint-plugin-import - to use for code hinting
- express - framework for node
- express-session - to store session variables
- isomorphic-fetch - to use fetch to post using api
- method-override - to use for crud, put and delete
- node-gyp - used with bcrypt
- nodemon - to run server while testing
- pg-promise - for calls to promises
- request - for http requests
- session-file-store - to store session variables even when server is restarted

## A code snippet of a part of the app you're particularly proud of

https://beta.developer.spotify.com/documentation/web-playback-sdk/quick-start/#
https://beta.developer.spotify.com/documentation/web-playback-sdk/reference/#api-spotify-player
![alt text](https://git.generalassemb.ly/tara-fenton/project-2/blob/master/codeSnippet1.png)
![alt text](https://git.generalassemb.ly/tara-fenton/project-2/blob/master/codeSnippet2.png)

## Any things you plan to fix or features you plan to add

- Clean up Spotify’s sample code for login
- Allow users to collaborate on playlists
- When adding a venue it will add the playlist it created
- Design to match wireframes


## Instructions for downloading the code and running it on localhost

- You need a Spotify premium account. I used a developer key to demonstrate the playing song, it will not work on heroku. Running locally, if you want to test it out you can get a key from https://beta.developer.spotify.com/documentation/web-playback-sdk/quick-start/# and click on the GET YOUR WEB PLAYBACK SDK ACCESS TOKEN button. Paste the key in track.ejs line 21 const token = ''   Also you would need to run the schema.sql and seed.sql files for the database setup.
