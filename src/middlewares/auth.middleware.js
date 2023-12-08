import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
    if (res.locals.user) {
        next();
    } else {
        // Token is not present, redirect to the login page
        req.flash('error' , "you need to login first");
        res.cookie('previousUrl', req.originalUrl);
        res.redirect('/auth/login');
    }
};

export default authenticate;
