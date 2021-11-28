```
TWITEE - is a mini and substandard runoff of Twitter. Users register and login and can put up anything that crosses their mind. The whole world can view their twits and comment on their twits /and like them
```



## Code structure explanation
This project work contains the follwing folders.
* controllers: Contains two controllers which are the | auth | and twit controller
* db: A function used to establish a connection
* middleware:  Authentcation ,  Asyncronous wrapping , errorHandler and notFound handler
* model:  Twit and User models, User (Register and Login) ,  Twit (Post comment, like post and comment on post)
* routes:  auth and twit route 

#### Routes ⚡
| Routes | HTTP Methods| Description
|:------- |:---------------|:--------------
| /api/user      | GET                  | Displays all users
| /api/user      | POST               | Post a twit
| /api/user      | DELETE            | Deletes all twit/post
| /api/user/:id| GET     | Displays a specific tea, given its name
| /api/user/:id| POST  | Adds a comment to a post request, given its an authenticated user id
|/api/user/:id| DELETE | Deletes a specific twit, given its ID



```
Project is created with:
```
<!-- <p>
<img src="https://img.shields.io/badge/-MongoDB%20-1AA121?style=for-the-badge&logo=mongodb&logoColor=green">
<img src="https://img.shields.io/badge/-Expressjs%20-%23323330?style=for-the-badge&logo=express">
<img src="https://img.shields.io/badge/react%20-%2320232a.svg?&style=for-the-badge&logo=react" >   
<img src="https://img.shields.io/badge/-Nodejs%20-%23323330?style=for-the-badge&logo=Node.js&logoColor=green">
</p> -->

* Node 
* Express 
* Mongoose 
* Jwt 
* MongoDB Atlas


### Setup
To run this project locally, clone repo and add an `.env` file in the root:

```
MONGODB_URI='mongodb+srv://username:password@cluster0.eetsx.mongodb.net/database_name'
```

Then execute in command prompt:
```
$ cd TWITEE_API
$ npm install
$ node app.js
```
