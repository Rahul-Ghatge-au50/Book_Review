------ PROJECT SETUP INSTRUCTION ------
Clone the Repository
git clone https://github.com/Rahul-Ghatge-au50/Book_Review.git and then cd Book_Review
Install Dependencies by npm intall
Create a .env file in root directory
PORT = 8000;
MONGO_URI = 'mongodb+srv://rahulghatge166:Rahul210519@cluster0.c8zsamg.mongodb.net/BOOK_REVIEW'
JWT_SECRET = 'BOOKREVIEW'
RUN the app by command npm Start



------ HOW TO RUN LOCALLY -------
The setup will be running on http://localhost:8000


------ EXAPMPLE OF API USES ------
Register User - POST http://localhost:8000/api/auth/signup
Body - {
          "name":"Test",
          "email":"test@gmail.com",
          "password":"1234"
      }
Login User - POST http://localhost:8000/api/auth/login
Body - {
    "email":"adi@gmail.com",
    "password":"1234"
}

Add Book - POST http://localhost:8000/api/books
Body - {
    "title":"The Harry Potter Part 2",
    "author":"Harry",
    "genre":"Horror,Magical",
    "description":"Perfect book for the Young Youth"
}
Authorization - Bearer Token

Get Books - GET http://localhost:8000/api/books?title=The&genre=Motivat
In Params title,genre and author

Get Single Book - GET http://localhost:8000/api/books/682c7e79e42a587d7f9b2456

Add Review for Book - POST http://localhost:8000/api/reviews/?userId=682c797141e66566bb9af734&bookId=682c7ec8e42a587d7f9b2777
Body - {
    "rating":3.3,
    "comment":"It was an not that Good "
}
Authorization - Bearer Token
In Params userId and bookId

Update Review 
http://localhost:8000/api/reviews/682c87a4e5fd767fc23287e8/?userId=682c7cdb99b2a33a03af0938
Body - {
    "comment":"It was awesome"
}
Authorization - Bearer Token
In Params userId 

Delete Review
http://localhost:8000/api/reviews/682c8a55583fdf8e2d997102/?userId=682c7cdb99b2a33a03af0938
Authorization - Bearer Token
In Params userId 




------- BRIEF SCHEMA DESIGN -------
BOOK SCHEMA
| Field         | Type   | Description               |
| ------------- | ------ | ------------------------- |
| `title`       | String | Title of the book         |
| `author`      | String | Author's name             |
| `description` | String | Short summary             |
| `genre`       | String | Book genre (e.g. Fantasy) |


USER SCHEMA
| Field      | Type   | Description       |
| ---------- | ------ | ----------------- |
| `name`     | String | User's full name  |
| `email`    | String | Unique user email |
| `password` | String | Hashed password   |


REVIEW SCHEMA
| Field       | Type     | Description                    |
| ----------- | -------- | ------------------------------ |
| `user`      | ObjectId | Reference to `User` (reviewer) |
| `book`      | ObjectId | Reference to `Book`            |
| `rating`    | Number   | Rating from 1 to 5             |
| `comment`   | String   | Review text                    |
| `createdAt` | Date     | Timestamp of review creation   |

A Book can have many Reviews.
Each Review belongs to one User and one Book.

ER DIAGRAM
User ────────┐
             │
             ▼
          Review
             ▲
             │
Book ────────┘

