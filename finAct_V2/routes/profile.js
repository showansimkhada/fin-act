const User = require('../Schema/model').User;
const bcrypt = require('bcrypt');

module.exports = app => {
    app.route('/profile').get(ensureAuthenticated, (req, res) => {
        res.render('profile', {username: req.user.username, firstname: req.user.firstname})
    })
    app.route('/profile/data')
        .get(ensureAuthenticated, (req, res) => {
            User.findOne({username: req.user.username}, (err, data) => {
                if (err || !data) {
                    console.log(err);
                } else {
                    res.send(data);
                }
            })
        })
        .post((req, res) => {
            let username = req.user.username;
            let firstname = req.body.firstname;
            let lastname = req.body.lastname;
            let sfirstname = req.body.sfirstname;
            let slastname = req.body.slastname;
            User.findOne({username: username}, (err, data) => {
                if (err || !data) {
                    console.log(err);
                } else {
                    console.log('inserting data')
                    data.firstname = firstname;
                    data.lastname = lastname;
                    data.sfirstname = sfirstname;
                    data.slastname = slastname;
                    data.save((err, doc) => {
                        if (err || !doc) {
                            console.log(err);
                        } else {
                            res.redirect('/profile');
                        }
                    })
                }
            })
    });

    app.route('/profile/update-password')
        .post((req, res) => {
            let username = req.user.username;
            let oldpass = req.body.oldpass;
            let newpass = req.body.newpass;
            let confirmpass = req.body.confirmpass;
            User.findOne({username: username}, (err, data) => {
                if (err || !data) {
                    console.log(err);
                } else {
                    if (bcrypt.compareSync(oldpass, req.user.password)) {
                        if (newpass === confirmpass) {
                            data.password = bcrypt.hashSync(newpass, 12);
                            data.save((err, doc) => {
                                if (err || !doc) {
                                    console.log(err)
                                } else {
                                    req.logout(function(err){
                                        if(err) return console.log(err)
                                    });
                                    res.render('signin', {message: 'password changed'});
                                }
                            })
                        } else {
                            res.render('signin', {message: 'incorrect password'});
                        }
                    } else {
                        res.redirect('/profile');
                    }
                }
            }) 
    });

    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/');
    };
}