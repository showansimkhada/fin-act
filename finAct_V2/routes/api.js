const passport = require('passport');

module.exports = app => {
    app.route("/").get((req, res) => {
        res.render('signin', {title: 'Welcome', message: 'Please Sign In'});
    });

    app.route('/signin').post(passport.authenticate('local', {failureRedirect: '/'}), (req, res) => {
        res.redirect('/home');
    });

    app.route('/home').get(ensureAuthenticated, (req, res) => {
        res.render('home', {username: req.user.username, firstname: req.user.firstname, sfirstname: req.user.sfirstname});
    });

    app.route('/signout')
        .get((req, res) => {
            req.logout(function(err){
                if(err) return console.log(err)
            });
            res.redirect('/');
    });
}

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
};