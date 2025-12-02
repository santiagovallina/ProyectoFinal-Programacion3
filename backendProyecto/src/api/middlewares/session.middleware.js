import session from 'express-session';
import enviroments from '../config/enviroments.js';

export default session({
    secret: enviroments.session_key,
    resave: false,
    saveUninitialized: true
});
