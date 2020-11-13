# Forumsite

Finished product here: https://imageboardsite.herokuapp.com/

This is an forum / imageboard site I decided to build with React. Still adding new features but give it a whirl!

## Features
- Create a Post with Title, Picture, and Text
- Dark Mode
- Comments
- Voting system (Reddit-like)
- Login

## Technologies Used
-React
-Node
-Mongo for DB (Atlas)
-Mongoose
-Express

## Installation
- npm / yarn install for server-side dependencies. Cd into the client directory to install client-side dependencies.

- Start the server as normal (npm / yarn start in server directory)

- You will need a ENV file with your database url. If you're running locally it'll just be your mongo url. 

Otherwise you'll have to look at other options (more on that below)

## Deploying / Database Options
I hit a snag with this one deploying to Heroku. I wasn't able to find any free mongodb hosting addons on there so had to look elsewhere for a 
db hosting option.

Luckily, it was free and very easy to use Mongo Atlas for this. I would highly recommend it if someone is trying to replicate this and needs a free option.

After that it's as easy as deploying it all to heroku after running yarn build in the client directory.

## TO-DO
- Try to make it so each user can only vote once on particular post
- Add collapse / shrink and expand feature for posts and comments
- Add ability to upload videos / images as files (need more storage space on server for this)




