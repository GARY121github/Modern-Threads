import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
    if (res.locals.user) {
        next();
    } else {
        // Token is not present, redirect to the login page
        console.log("user is not verified!!");
        res.cookie('previousUrl', req.originalUrl);
        res.redirect('/auth/login');
    }
};

export default authenticate;
