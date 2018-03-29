import * as express from 'express';
import * as passport from 'passport';
import * as LocalStrategy from 'passport-local';

import UsersController from './users.controller';

export default (app: express.Express): void => {

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, UsersController.configure));

    app.post('/api/signup', UsersController.signup);

    app.post('/api/login', passport.authenticate('local', { failureRedirect: '/api/failure' }), UsersController.login);

    app.get('/api/failure', UsersController.fail);

    app.post('/api/logout', UsersController.logout);
};
