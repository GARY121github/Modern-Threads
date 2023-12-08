import { User } from '../models/index.js';
import sendEmail from '../utils/nodemailer.js';

export const showSignUpPage = (req, res) => {
    res.render('auth/signUp');
};

export const registerUser = async (req, res) => {
    try {
        const { username, email, password, first, last, role } = req.body;

        // Validation
        if ([username, email, password, first].some((field) => !field || field.trim() === "")) {
            console.log("Invalid user input");
            res.flash('error', "Invalid user input");
            return res.redirect('/auth/register');
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            console.log("User already exists");
            re.flash('error', "User already exists");
            return res.status(400).redirect('/auth/register');
        }

        // Create a new user
        const newUser = await User.create({ username, email, password, first, last, role });

        // Set session and cookies after successful registration
        const token = await newUser.generateAccessToken();
        res.cookie('userToken', token);

        // Retrieve previous URL from cookies
        const previousUrl = (req.headers.cookie || '').split('previousUrl=')[1]?.split('%').filter(Boolean);

        // Construct redirecting URL
        const redirectingUrl = '/' + (previousUrl || []).map(url => url.substring(2)).join('/');

        // Clear the previousUrl cookie
        res.clearCookie('previousUrl');

        console.log('User registration successful!!!');
        req.flash('success', "User registration successful!!!");

        await sendEmail(email);
    
        // Redirect to the appropriate URL
        res.redirect(redirectingUrl || '/');
    } catch (error) {
        console.error("Error during registration:", error);
        req.flash('error', "Error during registration");
        res.status(500).send("Internal Server Error");
    }
};

export const showSignInPage = (req, res) => {
    req.flash('success', "Welcome to signup page!!");
    res.render('auth/signIn');
};

export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ username });

        if (!user) {
            console.log("Invalid username");
            req.flash('error', "Invalid username");
            return res.redirect('/auth/login');
        }

        // Check if the password is valid
        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            console.log("Invalid password");
            req.flash('error', "Invalid password");
            return res.redirect('/auth/login');
        }

        // Retrieve previous URL from cookies
        const previousUrl = (req.headers.cookie || '').split('previousUrl=')[1]?.split('%').filter(Boolean);

        // Construct redirecting URL
        const redirectingUrl = '/' + (previousUrl || []).map(url => url.substring(2)).join('/');

        // Clear the previousUrl cookie
        res.clearCookie('previousUrl');

        const token = await user.generateAccessToken();
        res.cookie('userToken', token);
        // res.cookies.set('userToken' , token);

        console.log("User is logged in!!");
        req.flash('success', "user logged in successfully");
        

        // Redirect to the appropriate URL
        res.redirect(redirectingUrl || '/');
    } catch (error) {
        console.error("Error during login:", error);
        req.flash('error', "Error during login");
        res.status(500).send("Internal Server Error");
    }
};

export const logoutUser = (req, res) => {
    // req.flash('success', "User logged out successfully");
    req.session.destroy();
    res.clearCookie('userToken');
    res.redirect('/auth/login');
};
