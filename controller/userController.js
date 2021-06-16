const mysql = require('mysql');
const db = require('../config/db').localConnect;
const nJwt = require('njwt');
const secret = require('../config/secret');
const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports = {
    userMobileExistCheck: (req) => {
        return new Promise((resolve, reject) => {
            let userMobileExistQuery = 'SELECT \n\
        user_id \n\
    FROM \n\
        user_detail\n\
    WHERE \n\
        user_mobile_number = ' + mysql.escape(req.body.user_mobile_number) + '';
            db.query(userMobileExistQuery, (errs, rows) => {
                if (errs) {
                    return reject(new Error('woops'));
                } else if (rows.length > 0) {
                    return reject({ msg: 'mobile alreday exist' });
                } else {
                    return resolve({ msg: 'mobile not exist' });
                }
            });
        });
    },
    newHashPassword: (req) => {
        return new Promise((resolve, reject) => {
            bcrypt.hash(req.body.user_password, saltRounds, function (err, hash) {
                if (err) {
                    return resolve('');
                } else {
                    return resolve(hash);
                }
            });

        })
    },
    newUserDetails: (data, req) => {
        return new Promise((resolve, reject) => {
            let user_id = req.body.user_id ? req.body.user_id : '';
            let user_first_name = req.body.user_first_name ? req.body.user_first_name : '';
            let user_last_name = req.body.user_last_name ? req.body.user_last_name : '';
            let user_email = req.body.user_email ? req.body.user_email : '';
            let user_password = data ? data : '';
            let user_mobile_number = req.body.user_mobile_number ? req.body.user_mobile_number : '';
            let user_address = req.body.user_address ? req.body.user_address : '';

            let userSql = 'INSERT user_detail SET ';
            let userGenrSql = '';
            if (user_id != '') {
                if (userGenrSql !== '') {
                    userGenrSql += ',';
                }
                userGenrSql += ' user_id = ' + mysql.escape(user_id) + '';
            }
            if (user_first_name != '') {
                if (userGenrSql !== '') {
                    userGenrSql += ',';
                }
                userGenrSql += ' user_first_name = ' + mysql.escape(user_first_name) + '';
            }
            if (user_last_name != '') {
                if (userGenrSql !== '') {
                    userGenrSql += ',';
                }
                userGenrSql += ' user_last_name = ' + mysql.escape(user_last_name) + '';
            }
            if (user_email != '') {
                if (userGenrSql !== '') {
                    userGenrSql += ',';
                }
                userGenrSql += ' user_email = ' + mysql.escape(user_email) + '';
            }
            if (user_password != '') {
                if (userGenrSql !== '') {
                    userGenrSql += ',';
                }

                userGenrSql += ' user_password = ' + mysql.escape(user_password) + '';
            }
            if (user_mobile_number != '') {
                if (userGenrSql !== '') {
                    userGenrSql += ',';
                }
                userGenrSql += ' user_mobile_number = ' + mysql.escape(user_mobile_number) + '';
            }
            if (user_address != '') {
                if (userGenrSql !== '') {
                    userGenrSql += ',';
                }
                userGenrSql += ' user_address = ' + mysql.escape(user_address) + '';
            }
            userSql = userSql + ' ' + userGenrSql + ' , user_create_date = now() ON DUPLICATE KEY UPDATE ' + userGenrSql + ' ';

            db.query(userSql, (err, result) => {
                if (err) {
                    console.log(err)
                    reject([]);
                } else {
                    resolve("User Detail Updated");
                }
            });
        })
    },
    logInUser: (req) => {
        return new Promise((resolve, reject) => {
            let user_mobile_number = req.body.user_mobile_number;
            let user_password = req.body.user_password;
            let results = [];
            let sQuery = '';
            sQuery = ' SELECT \n\
                         user_id, \n\
                         user_password  ';
            sQuery += ' FROM \n\
                         user_detail \n\
                         WHERE user_active_flag = 1  ';
            sQuery += '  AND user_mobile_number = ' + mysql.escape(user_mobile_number) + '';
            db.query(sQuery, (err, rows) => {
                if (err) {
                    return reject([]);
                }
                else if (rows && rows.length) {
                    let jwt = nJwt.create({ user_id: rows[0].user_id }, secret.secret);
                    bcrypt.compare(user_password, rows[0].user_password, function (err, result) {
                        if (result) {
                            results = {
                                user_id: rows[0].user_id,
                                auth: true,
                                token: jwt.compact()
                            };
                            return resolve(results);
                        }
                        else {
                            return reject([]);
                        }
                    });
                } else {
                    return reject([]);
                }
            });
        });
    },
    getUsersDetail: (req) => {
        return new Promise((resolve, reject) => {
            let user_id = req.query.user_id ? req.query.user_id : '';
            let user_first_name = req.query.user_first_name ? req.query.user_first_name : '';
            let user_last_name = req.query.user_last_name ? req.query.user_last_name : '';
            let user_email = req.query.user_email ? req.query.user_email : '';
            let user_mobile_number = req.query.user_mobile_number ? req.query.user_mobile_number : '';
            let page = req.query.page ? req.query.page : '';
            let result = [];
            let limit = secret.limit;
            let offset = (page - 1) * limit
            let sQuery = '';
            sQuery = ' SELECT \n\
                       user_id, \n\
            user_first_name,\n\
            user_last_name,\n\
            user_email,\n\
            user_mobile_number,\n\
            user_address';
            sQuery += ' FROM \n\
                            user_detail \n\
                      WHERE user_active_flag = 1 ';
            if (user_id != '') {
                sQuery += ' AND user_id = ' + mysql.escape(user_id) + "";
            }
            if (user_first_name != '') {
                sQuery += ' AND MATCH(user_first_name) AGAINST(' + mysql.escape(user_first_name + '*') + ' IN BOOLEAN MODE)';
            }
            if (user_last_name != '') {
                sQuery += ' AND MATCH(user_last_name) AGAINST(' + mysql.escape(user_last_name + '*') + ' IN BOOLEAN MODE)';
            }
            if (user_email != '') {
                sQuery += ' AND MATCH(user_email) AGAINST(' + mysql.escape(user_email + '*') + ' IN BOOLEAN MODE)';
            }
            if (user_mobile_number != '') {
                sQuery += ' AND MATCH(user_mobile_number) AGAINST(' + mysql.escape(user_mobile_number + '*') + ' IN BOOLEAN MODE)';
            }
            if (page != '') {
                sQuery += 'limit ' + limit + ' OFFSET ' + offset + '';
            }
            db.query(sQuery, (err, rows) => {
                if (err) {
                    return reject([]);
                } else if (rows && rows.length) {
                    rows.forEach(element => {
                        result.push({
                            user_id: element.user_id,
                            user_first_name: element.user_first_name,
                            user_last_name: element.user_last_name,
                            user_email: element.user_email,
                            user_mobile_number: element.user_mobile_number,
                            user_address: element.user_address
                        });
                    });
                    return resolve(result);

                } else {
                    return reject({ msg: "data not found" });
                }
            });
        });
    }
}