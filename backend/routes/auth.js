const express = require('express');
const User = require('../model/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "mysecretkey";


//Route 1: Create a new user
// This route allows users to register by providing their name, email, and password
router.post('/createUser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    // Validate the request body
    // If there are validation errors, return a 400 response with the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Check if a user with the same email already exists
    // If yes, return an error response
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success, error: "User with this email already exists" });
        }
        // Hashing the password
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })
        // Create a JWT token
        const data = {
            user: {
                id: user.id
            }
        }
        success = true;
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({success, authToken });
    } catch (error) {
        res.status(500).send("Internal Server Error");
        console.error(error.message);
    }
});


//Route 2: Login Route
// This route allows users to log in with their email and password
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    let success = false;
    // Validate the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract email and password from the request body
    // If the email or password is incorrect, return a 400 response with an error message
    const { email, password } = req.body;
    try {
        // Find the user by email
        let user = await User.findOne({ email });
        if (!user) {

            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }
        // Compare the provided password with the stored hashed password
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }
        // Create a JWT token   
        const data = {
            user: {
                id: user.id
            }
        }
        success = true;
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({success, authToken });
    } catch (error) {
        res.status(500).send("Internal Server Error");
        console.error(error.message);
    }
});


//Route 3: Get logged in user details
// This route retrieves the details of the currently logged-in user
router.post('/getUser', fetchuser, async (req, res) => {
    // Get the user ID from the JWT token
    const userId = req.user.id;
    try {
        // Find the user by ID
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        res.status(500).send("Internal Server Error");
        console.error(error.message);
    }
});


module.exports = router;