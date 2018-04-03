import * as express from 'express';
import users from './modules/users/users.routes';
import classes from './modules/classes/classes.routes';
import groups from './modules/groups/groups.routes';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

const app: express.Express = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

users(app);
classes(app);
groups(app);

app.listen(3000, () => console.log('app is listening on port 3000'));
