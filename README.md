# User-Services
This code is owned by mandeepkaur1208@gmail.com


This code snippet is used for User Services.
Following are the features handled as part of this code:
    1. Created a login api with auth.
    2. Created a registration api (first name, last name, email, password, mobile no, address) (with use hash and salt for password).
    3. Listed api for all users with token and pagination.
    4. Updated user details api with token.
    5. Search api on (first name, last name, email,  mobile no) single key with token and pagination.
    6. APis provided for above operation(User Services.postman_collection.json)
    7. Database with structure and data (user_service.sql)
    
  Technology/Language/PackagesDependencies
     Node.js v10.16.3
    "bcrypt": "^5.0.1",
    "body-parser": "^1.19.0",
    "express": "^4.17.1",
    "express-bearer-token": "^2.4.0",
    "http-status-codes": "^2.1.4",
    "mysql": "^2.18.1",
    "njwt": "^1.1.0",
    "nodemon": "^2.0.7"
