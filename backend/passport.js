const client = require('./dbConfig');
const LocalStrategy = require('passport-local').Strategy;



function initialize(passport) {

  // Passport "serializes" objects to make them easy to store, converting the
  // user to an identifier (id)
  passport.serializeUser((user, done) => {
    console.log('serializing');
    done(null, user.id);
  });

  // Passport "deserializes" objects by taking the user's serialization (id)
  // and looking it up in the database
  passport.deserializeUser((id, done) => {
    console.log('deserializing');
    client.query('SELECT * FROM users WHERE id = $1', [id], (err, result) => {
      if (err) {
        console.log('Error deserializing user');
        done(err);
      }
      console.log('deserializing user');
      done(null, result.rows[0]);
    });
  });




  // This is the login strategy
  passport.use('local', new LocalStrategy(
    { passReqToCallback: true, usernameField: 'email', passwordField: 'password' },
    (req, username, password, done) => {
      console.log('local strategy');
      client.query('SELECT * FROM users WHERE email = $1', [username], (err, result) => {
        if (err) {
          console.log('Error when selecting user on login', err);
          return done(err);
        }

        if (result.rows.length > 0) {
          const first = result.rows[0];
          first.password = first.password.trim();
          first.email = first.email.trim();
          if (password === first.password) {
            console.log('correct password!');
            done(null, first);
          } else {
            console.log('Incorrect password!');
            done(null, false, { message: 'Incorrect password.' });
          }
        } else {
          console.log('No user found!');
          done(null, false, { message: 'Incorrect email.' });
        }

      });

    }
  ));

}

module.exports = initialize;