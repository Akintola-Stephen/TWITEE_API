```
TWITEE - is a mini and substandard runoff of Twitter. Users register and login and can put up anything that crosses their mind. The whole world can view their twits and comment on their twits /and like them
```

## Code structure explanation

This project work contains the follwing folders.

- controllers: Contains two controllers which are the | auth | and twit controller
- db: A function used to establish a connection
- middleware: Authentcation , Asyncronous wrapping , errorHandler and notFound handler
- model: Twit and User models, User (Register and Login) , Twit (Post comment, like post and comment on post)
- routes: auth and twit route

#### Routes ⚡

| Routes             | HTTP Methods | Description                                                          |
| :----------------- | :----------- | :------------------------------------------------------------------- |
| /api/user/register | POST         | User registration route                                              |
| /api/user/login    | POST         | User login page                                                      |
| /api/twits/        | GET          | Get all posts                                                        |
| /api/twits/:id     | GET          | Get a single post                                                    |
| /api/user/:id      | POST         | Adds a comment to a post request, given its an authenticated user id |
| /api/user/:id      | DELETE       | Deletes a specific twit, given its Id                                |

```
Project is created with:
```

<p>
<img src="https://img.shields.io/badge/-MongoDB%20-1AA121?style=for-the-badge&logo=mongodb&logoColor=green">
<img src="https://img.shields.io/badge/-Expressjs%20-%23323330?style=for-the-badge&logo=express">
<img src="https://img.shields.io/badge/jsonwebtoken%20-%2320232a.svg?&style=for-the-badge&logo=jwt" >   
<img src="https://img.shields.io/badge/-Nodejs%20-%23323330?style=for-the-badge&logo=Node.js&logoColor=green">
</p>

- Node
- Express
- Mongoose
- Jwt
- MongoDB Atlas

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
