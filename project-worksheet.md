# Project Overview

## Project Schedule

## Project Description

Use this section to describe your final project and perhaps any links to relevant sites that help convey the concept and\or functionality

Definitely working with the Spotify api. Not sure how exactly yet. Been looking at the showcase page for ideas. https://developer.spotify.com/showcase/
There's some cool ones using d3js so maybe I can think of something that would incorporate that library.

The idea I originally had was to create a site that would allow users to log into a "venue" that would have a dj and a queue of 3 djs on "stage", with users as avatars can join a venue and give the dj "points" and chat etc, but then I remembered Spotify will not let any one account stream from more than one device at one time. So I am not sure if my idea is possible. I might be able to as long as every user has their own account. Without looking at the data that comes back from Spotify, I have to be flexible with my idea for now.

## Priority Matrix

Include a full list of features that have been prioritized based on the `Time and Importance` Matix.

## MVP

Include the full list of features that will be part of your MVP

<!-- Two views: a landing view (1 player button) and a game view -->

### PHASE ONE

Log into Venue, Log into Spotify, One venue

Starting with very basic graphics I will first create the basic functionality and then expand.

*   --Create a user database and login to venue
*   --Landing login page for venue
*   Error handling for login, signup
*   // wait - Use the spotify api to log users into their spotify account
*   --create a venue listing page
*   --create a venue page
*   --exit button to go back to the venue listing page
*   playlist display
*   search functionality

## POST MVP

Include the full list of features that you are considering for POST MVP

### PHASE TWO

*   users, venues, playlists, djs
*   style the site
*   go to venue page and have a dj button
*   store dj in database
*   dj can open their playlists or create a new one
*   page through playlists
*   dj can add to playlist
*   handle log in errors

### PHASE TWO

*   store dj in database
*   dj can open their playlists or create a new one
*   dj can add to playlist
*   handle log in errors

Questions:
What can I do about the spotify loggedin
Looks like a bunch of code i dont need
plus something weird loads when you get to the Page

do sessions go away on refresh??

### PHASE THREE

Ways to lose a guy:

*   Customer makes it to the end of the row without getting a beer
*   Bartender sent too many beers
*   Bartender does not collect the empty glass

Points:

*   Add points to events
*   Add points display

### PHASE FOUR

Landing Page:

*   1 player button, instructions button

Form:

*   Scoreboard initals input - input text field and button

CSS:

*   CSS transition: Beer fills glass - fired by a DOM event
*   Media query for tablet
*   Style form, landing page, and game page with class-based CSS

### PHASE FIVE ### optional

Landing Page:

*   add 2 player button

Game view:

*   2 player logic

Bonus round:

*   see rules below

Ways to lose a guy:

*   Music is on and customers start dancing and beer was served

Points:

*   Sometimes there is money on bar for tip

## Wireframes

Include images of your wireframes.
![alt text](https://git.generalassemb.ly/tara-fenton/project-1/blob/master/images/wireframes/IMG_0015.jpg)
![alt text](https://git.generalassemb.ly/tara-fenton/project-1/blob/master/images/wireframes/IMG_0016.jpg)
![alt text](https://git.generalassemb.ly/tara-fenton/project-1/blob/master/images/wireframes/IMG_0017.jpg)
![alt text](https://git.generalassemb.ly/tara-fenton/project-1/blob/master/images/wireframes/IMG_0018.jpg)
![alt text](https://git.generalassemb.ly/tara-fenton/project-1/blob/master/images/wireframes/IMG_0019.jpg)
![alt text](https://git.generalassemb.ly/tara-fenton/project-1/blob/master/images/wireframes/IMG_0020.jpg)
![alt text](https://git.generalassemb.ly/tara-fenton/project-1/blob/master/images/wireframes/IMG_0021.jpg)

## Game Components

### Landing Page

What will a player see when they start your game?

Intro landing screen with a button for the rules to be displayed on a seperate screen
Buttons for 1 player or 2 players

### Game Initialization

What will a player see when the game is started?

*   Four rows of bars
*   On the left of each row will be an opening that customers will come out of
*   On the right of each row will a be a tap graphic
*   Score at the top left (player 1) and right (player 2)
*   Beer mugs at the top in the middle for lives

### Playing The Game

What will be the flow of the game, what will the user be expected to do and what will the user expect from the gam

The bartender will be able to move through the rows. You can loop through the rows top to bottom or bottom to top. As customers come out it is your job to serve them beer, by pressing the spacebar. If you move to another row before the beer is full, it will not send it. You might want this to happen if you don't have a customer to serve.

One beer per customer! If you over pour you will lose a life. You must collect the glass when the customer finishes the beer. If you miss the glass before it reaches the end of the bar you will lose a life. You can run towards the glass to collect it. You can jump back to the tap by pouring a beer (spacebar). You can collect your tips for extra points.

# Rules:

Bartender moves up and down between the four rows of bars.

*   Can also loop around from the bottom to the top and from the top to the bottom
*   Can move to the left to catch a beer
*   Can jump back to tap by pouring key
*   Can stop pouring by moving to another row

Ways to lose a guy:

*   Customer makes it to the end of the row without getting a beer
*   Bartender sent too many beers
*   Bartender does not collect the empty glass
*   Music is on and customers start dancing and beer was served

Levels 1 & 2
States:

*   Customer comes to row - level 2 sends two customers
*   Bartender pours beer
*   Bartender sends beer
*   Customer gets beer
*   Customer drinks beer
*   Customer sends empty glass
*   Bartender must catch glass
*   Sometimes there is money on bar for tip ### optional

Points:

*   50 Points for each saloon patron you send off his aisle
*   100 Points for each empty mug you pick up
*   1500 Points for each tip you pick up
*   1000 Points for completing a level
*   Bonus Level 3000 Points for getting the bonus level right

Bonus Round - Suds

*   There are 6 beer cans on the screen
*   All but one is shaken by a bad guy
*   Then the cans are shuffled fast
*   You have one chance to select the one that doesn't spray is the bonus

### Winning The Game

What does it look like when the game ends, what determines winning or losing?

There is no winning, you get a score.

When the game ends the screen will display a scoreboard you can input 3 initals, there will be 5 spots for scores

2 players? not sure if the game displays who one the game (research)

### Game Reset

How will the user restart the game once it has been completed.

*   Insert Quarter (text on button)

## Functional Components

Based on the initial logic defined in the previous game phases section try and breakdown the logic further into functional components, and by that we mean functions. Does your logic indicate that code could be encapsulated for the purpose of reusablility. Once a function has been defined it can then be incorporated into a class as a method.

Time frames are also key in the development cycle. You have limited time to code all phases of the game. Your estimates can then be used to evalute game possibilities based on time needed and the actual time you have before game must be submitted.

| Component | Priority | Estimated Time | Time Invetsted | Actual Time |
| --------- | :------: | :------------: | :------------: | :---------: |
| PHASE 1   |    H     |      7hrs      |      5hrs      |     hrs     |
| PHASE 2   |    H     |      7hrs      |      hrs       |     hrs     |
| PHASE 3   |    H     |      5hrs      |      hrs       |     hrs     |
| PHASE 4   |    H     |     12hrs      |      hrs       |     hrs     |
| PHASE 5   |    L     |      9hrs      |      hrs       |     hrs     |

## Helper Functions

Helper functions should be generic enought that they can be reused in other applications. Use this section to document all helper functions that fall into this category.

| Function   |                    Description                    |
| ---------- | :-----------------------------------------------: |
| Capitalize | This will capitalize the first letter in a string |

## Additional Libraries

Use this section to list all supporting libraries and thier role in the project.

## jQuery Discoveries

Use this section to list some, but not all, of the jQuery methods and\or functionality discovered while working on this project.

## Change Log

Use this section to document what changes were made and the reasoning behind those changes.

## Issues and Resolutions

Use this section to list of all major issues encountered and their resolution.

#### SAMPLE.....

**ERROR**: app.js:34 Uncaught SyntaxError: Unexpected identifier  
**RESOLUTION**: Missing comma after first object in sources {} object
