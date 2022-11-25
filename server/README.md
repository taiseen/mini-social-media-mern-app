
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
controller ==> end point logic...

<br/>

```
MONGODB_URI = mongodb+srv://USER_NAME:USER_PASS@cluster0.z9kin.mongodb.net/YOUR_DB_NAME?retryWrites=true&w=majority
JWT_SECRET = 'useItForTokenCreation'
PORT = 3001
```

<br/>

## Data Table Relationships
<img src="./public/dataTableRelation.png" />

<br/>

## JWT System
<img src="./public/jwt.jpg" />

