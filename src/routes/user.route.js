import { Router } from 'express';
import { User } from '../models/index.js';

const router = Router();

// Registration Route
router.get('/register', (req, res) => {
    res.render('auth/signUp');
});

router.post('/register', async (req, res) => {
    try {
        const { username, email, password, first, last, role } = req.body;

        // Validation
        if ([username, email, password, first].some((field) => !field || field.trim() === "")) {
            console.log("Invalid user input");
            return res.redirect('/auth/register');
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            console.log("User already exists");
            return res.status(400).redirect('/auth/register');
        }

        // Create a new user
        const newUser = await User.create({ username, email, password, first, last, role });



        // Set session and cookies after successful registration
        const token = await newUser.generateAccessToken();
        res.cookie('userToken', token);

        // req.app.locals.user = newUser;

        // Retrieve previous URL from cookies
        const previousUrl = (req.headers.cookie || '').split('previousUrl=')[1]?.split('%').filter(Boolean);

        // Construct redirecting URL
        const redirectingUrl = '/' + (previousUrl || []).map(url => url.substring(2)).join('/');

        // Clear the previousUrl cookie
        res.clearCookie('previousUrl');

        console.log('User registration successful!!!');
        res.redirect(redirectingUrl || '/');
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Login Routes
router.get('/login', (req, res) => {
    res.render('auth/signIn');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ username });

        if (!user) {
            console.log("Invalid username");
            return res.redirect('/auth/login');
        }

        // Check if the password is valid
        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            console.log("Invalid password");
            return res.redirect('/auth/login');
        }

        // Retrieve previous URL from cookies
        const previousUrl = (req.headers.cookie || '').split('previousUrl=')[1]?.split('%').filter(Boolean);

        // Construct redirecting URL
        const redirectingUrl = '/' + (previousUrl || []).map(url => url.substring(2)).join('/');

        // Clear the previousUrl cookie
        res.clearCookie('previousUrl');

        // console.log(req.session);
        const token = await user.generateAccessToken();
        res.cookie('userToken', token);


        console.log("user is logged in!!");

        // req.app.locals.user = user;

        // Redirect to the appropriate URL
        res.redirect(redirectingUrl || '/');
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("Internal Server Error");
    }
});


// Logout Route
router.get('/logout', (req, res) => {
    req.session.destroy();
    // req.app.locals.user = null;
    res.clearCookie('userToken');
    res.redirect('/auth/login');
});

export default router;
