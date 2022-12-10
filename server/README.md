> 23 - Nov - 2022
# Server Site Dependencies...

|No| Package Installs        | Use for                                       |
|--|-------------------------|-----------------------------------------------|
|1 | yarn add `body-parser`  | enabling POST request                         |
|2 | yarn add `cors`         | enabling Cors origin request                  |
|3 | yarn add `express`      | creating routing for application              |
|4 | yarn add `mongoose`     | creating DB modals for POST-ing data          |
|5 | yarn add `nodemon`      | changing happen, server restart automatically |
|6 | yarn add `dotenv`       | hide the confidential data from public        |
|7 | yarn add `bcryptjs`     | hashing function for password security        |
|8 | yarn add `jsonwebtoken` | share security information between two parties|
|9 | yarn add `gridfs-stream`| writable/readable Nodejs compatible GridFS streams|
|10| yarn add `helmet`       | help secure Express/Connect apps with various HTTP headers|
|11| yarn add `morgan`       | HTTP request logger middleware for node.js    |
|12| yarn add `multer`       | middleware for handling multipart/form-data.  |


<br/>

# File / Folder short info...
|No| File / Folder | Usage of...                                           |
|--|---------------|-------------------------------------------------------|
|1 | index         | all basic configurations                              |
|2 | routes        | user requesting url path for api calling...           |
|3 | controller    | url end point, logical function run upon database...  |
|4 | models        | database schema for formatted way store data into database...|
|5 | connections   | mongodb database connections...                       |
|6 | middleware    | 'verifyToken' function call, that user is authenticated for protected api call...|


<br/>

**.env**

```js
MONGODB_URI = mongodb+srv://dbUser:dbPass@cluster0.z9kin.mongodb.net/DB_NAME?retryWrites=true&w=majority

JWT_SECRET = useItForTokenCreation

PORT = 3001
```

<br/>

## NodeJs | Backend Basic Data Flow...
<img src="./public/backendDataFlow.png" />

<br/>

## Database Table Relationship...
<img src="./public/dataTableRelation.png" />

<br/>

## JWT System
<img src="./public/jwt.jpg" />

