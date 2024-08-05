const passport = require('passport');
const LocalStrategy = require('passport-local');
const bycrpt = require('bcrypt');
const USER = require('../Schema/model').User;
const { ObjectID } = require('mongodb');

module.exports = app => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    USER.findOne(new ObjectID(id), (err, data) => {
      if (err) return console.error(err);
      done(null, data);
    });
  })

  passport.use(new LocalStrategy((username, password, done) => {
    USER.findOne({ username: username }, (err, user) => {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!bycrpt.compareSync(password, user.password)) { 
          return done(null, false);
      }
      return done(null, user);
    });
  }));

}