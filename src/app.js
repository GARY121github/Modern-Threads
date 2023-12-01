import express from 'express';
import engine from 'ejs-mate';
import path from 'path';
import methodOverride from 'method-override';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import expressSession from 'express-session';
import flash from 'connect-flash';




// Get the current module's filename and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create an Express application
const app = express();

// Configure the view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));
app.engine('ejs', engine);

// Middleware setup
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static(path.join(__dirname, '..', 'public')));

// Method override middleware
app.use(methodOverride('_method'));


// create express session
const session = expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true, // Ensures cookies are only sent over HTTPS
        httpOnly: true, // Helps prevent XSS attacks by not allowing the browser to access cookies via JavaScript
        maxAge: 7 * 24 * 60 * 60 * 1000, // Set maxAge to 7 days (7 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
    },
});
app.use(session);
app.use(flash());

app.use((req,res,next)=>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})


// app.locals.user = null;
import jwt from 'jsonwebtoken';
import { User } from './models/index.js';

app.use(async (req, res, next) => {
    res.locals.user = null;
    const token = req.headers.cookie?.split('=')[1];
    try {
        if (token) {
            // Verify the token
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const id = decoded._id;

            // Retrieve user details excluding sensitive information
            const user = await User.findById(id).select('-password -orders -payments -reviews -products');

            res.locals.user = user;
        }
    } catch (err) {
        // Handle JWT verification errors
        console.error('JWT Verification Error:', err.message);
    }
    console.log(req.flash());
    console.log(res.locals.success);
    next();
});


// routers
import {
    productRouter, reviewRouter,
    userRouter, cartRouter, paymentRouter
} from './routes/index.js';

app.use(productRouter);
app.use('/auth', userRouter);
app.use('/review', reviewRouter);
app.use('/cart', cartRouter);
app.use('/payment', paymentRouter);


export default app;