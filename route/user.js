const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const HttpStatus = require('http-status-codes');
const nJwt = require('njwt');
const auth = require('../config/auth')
const jwtAuth = auth.jwtAuth;

//Created a registration api (first name, last name, email, password, mobile no, address)
//Used hash and salt for password
router.post('/signupUser', function (req, res) {
  userController.userMobileExistCheck(req).then((data) => {
    userController.newHashPassword(req).then((data) => {
      userController.newUserDetails(data, req).then((data) => {
        res.status(HttpStatus.OK).send(data)
      }).catch((e) => {
        res.status(HttpStatus.CONFLICT).send(e);
      });
    }).catch((e) => {
      res.status(HttpStatus.CONFLICT).send(e);
    });
  }).catch((e) => {
    res.status(HttpStatus.CONFLICT).send(e);
  });
});

// Created a login api with auth
router.post('/logInUser', (req, res) => {
  userController.logInUser(req).then((data) => {
    res.send(data);
  }).catch((e) => {
    res.status(HttpStatus.CONFLICT).send(e);
  });
});

// Updated user details api with token
// provide parameter user_id for update detail
router.post('/updateUserDetail', jwtAuth, function (req, res) {
  userController.newHashPassword(req).then((data) => {
    userController.newUserDetails(data, req).then((data) => {
      res.status(HttpStatus.OK).send(data)
    }).catch((e) => {
      res.status(HttpStatus.CONFLICT).send(e);
    });
  }).catch((e) => {
    res.status(HttpStatus.CONFLICT).send(e);
  });
});

// List api for all users with token and pagination
// Search api on (first name, last name, email,  mobile no) single key with token and pagination
// For pagination use parameter page and for one page limit is 10
router.get("/getUsersDetail", jwtAuth, (req, res) => {
  userController.getUsersDetail(req).then((data) => {
    res.send(data);
  }).catch((e) => {
    res.status(HttpStatus.CONFLICT).send(e);
  });
});



module.exports = router