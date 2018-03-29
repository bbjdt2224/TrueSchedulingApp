import db from '../../database/models/index';
import * as passport from 'passport';
import * as bcrypt from 'bcrypt';


class UsersController {
    //sets up passport to deal with login authentication
    configure(username, password, done) {
        db.users.findOne({ where: { email: username }}).then( function (user) {
            if (!user) { return done(null, false); }

            passport.serializeUser(function(user, done) {
                done(null, user);
            });
            passport.deserializeUser(function(user, done) {
                done(null, user);
            });

            bcrypt.compare(password, user.password, function(err, res) {
                if (res === true) {
                    return done(null, user);
                }
                if (res === false) {
                    return done(null, false);
                }
                return done(null, false);
            });
        });
    }
    /* POST /signup
    adds new user to database
        email
        isTracker
        password
    */
    signup(req, res) {
        db.users.create({
            email: req.body.email,
            name: req.body.name,
            grouplist: '0'
        }).then( user => {
            bcrypt.hash(req.body.password , 10, function(err, hash) {
                user.update ({
                    password: hash
                });
            });
            res.send(user.name);
        });
    }
    /* POST /login
    if username and password are correct then redirect to next page
        email
        password
    */
    login(req, res) {
        res.send(req.session.passport.user);
    }
    /*If Login fails*/
    fail(req, res) {
        res.send('Incorrect');
    }
    /* POST /logout
    logout the user
    */
    logout(req, res) {
        req.logout();
        res.send('Logged Out');
        //redirect
    }

}

export default new UsersController();

