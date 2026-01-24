// controllers/googleAuthController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { OAuth2Client } = require('google-auth-library');
const axios = require('axios'); // Added validation via UserInfo endpoint

// FIX: Read CLIENT_ID from process.env instead of hardcoding
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

// Security Check: Ensure CLIENT_ID is available
if (!CLIENT_ID) {
    console.error('FATAL ERROR: GOOGLE_CLIENT_ID is not defined in environment variables.');
}

const googleClient = new OAuth2Client(CLIENT_ID);

// Helper to generate a JWT for your application
const generateToken = (userId, email) => {
    return jwt.sign(
        { user: { id: userId, email } },
        process.env.JWT_SECRET,
        { expiresIn: '5h' }
    );
};

// Helper: Verify Google Token (Success with either ID Token OR Access Token)
const verifyGoogleToken = async (token) => {
    try {
        // Strategy 1: Try verifying as ID Token
        const ticket = await googleClient.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();
        console.log("✅ Verified as ID Token");
        return {
            firstName: payload.given_name || 'User',
            lastName: payload.family_name || '',
            email: payload.email,
            photoUrl: payload.picture,
            googleId: payload.sub
        };
    } catch (idTokenError) {
        console.log("⚠️ ID Token verification failed, trying as Access Token...");
        // Strategy 2: Try verifying as Access Token (UserInfo Endpoint)
        try {
            const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const payload = response.data;
            console.log("✅ Verified as Access Token");
            return {
                firstName: payload.given_name || 'User',
                lastName: payload.family_name || '',
                email: payload.email,
                photoUrl: payload.picture,
                googleId: payload.sub
            };
        } catch (accessTokenError) {
            console.error("❌ Access Token verification also failed.");
            throw new Error("Invalid Token: Could not verify as ID Token or Access Token");
        }
    }
};

// ===================================================================
// New Helper: Finds a unique username (Needed for Mongoose validation)
// ===================================================================
const findUniqueUsername = async (initialUsername) => {
    // 1. Sanitize the base username
    let base = initialUsername.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (!base) base = 'user';

    let username = base;
    let counter = 0;

    // 2. Check for uniqueness and append a number if needed
    while (await User.findOne({ username })) {
        counter++;
        username = `${base}${counter}`;
    }
    return username;
};


// @route   POST /api/auth/google
// @desc    Sign in or Sign up user using Google token
// @access  Public
exports.googleAuth = async (req, res) => {
    // Clients might send 'idToken' or 'access_token', we check both.
    const token = req.body.idToken || req.body.access_token;

    if (!token) {
        return res.status(400).json({ msg: 'No authentication token provided.' });
    }

    try {
        console.log('Received Google Token for verification'); // DEBUG

        // 1. Verify Token and get user info
        const googleUser = await verifyGoogleToken(token);
        const { firstName, lastName, email, photoUrl, googleId } = googleUser;
        console.log('Token Verified. User Data:', { email, firstName, lastName, googleId }); // DEBUG

        // --- Username Generation Logic ---
        const namePart = `${firstName || ''}${lastName || ''}`.replace(/\s+/g, '');
        const emailPart = email.split('@')[0];
        // Use name, then email prefix, then unique Google ID as the starting point
        const initialUsername = namePart || emailPart || `user${googleId}`;
        // --- End Username Generation Logic ---


        // 2. Check if the user already exists in the database
        let user = await User.findOne({ email });

        if (user) {
            console.log('User found in DB. Updating...'); // DEBUG
            // --- SIGN IN / UPDATE (FIX IMPLEMENTED HERE) ---

            // CRITICAL FIX: If the existing user is missing a username, generate and save it.
            if (!user.username) {
                const username = await findUniqueUsername(initialUsername);
                user.username = username;
            }

            // Update latest info if changed
            let isUpdated = false;
            if (photoUrl && user.photoUrl !== photoUrl) { user.photoUrl = photoUrl; isUpdated = true; }
            if (firstName && user.firstName !== firstName) { user.firstName = firstName || user.firstName; isUpdated = true; }
            if (lastName && user.lastName !== lastName) { user.lastName = lastName || user.lastName; isUpdated = true; }

            if (isUpdated) await user.save();

            const authToken = generateToken(user.id, user.email);

            return res.json({
                message: 'Signed in with Google successfully.',
                token: authToken,
                userId: user.id,
                name: `${user.firstName} ${user.lastName}`,
                email: user.email,
                photoUrl: user.photoUrl
            });
        } else {
            console.log('User not found. Creating new user...'); // DEBUG
            // --- SIGN UP ---
            const dummyPassword = await bcrypt.hash(Math.random().toString(36), 10);

            // Generate a guaranteed unique username for the new user
            const username = await findUniqueUsername(initialUsername);
            console.log('Final Username for new user:', username); // DEBUG

            user = new User({
                firstName,
                lastName,
                email,
                password: dummyPassword,
                username: username,
                photoUrl,
                googleId
            });

            await user.save();
            console.log('New user saved.'); // DEBUG

            const authToken = generateToken(user.id, user.email);

            return res.json({
                message: 'Signed up with Google successfully.',
                token: authToken,
                userId: user.id,
                name: `${user.firstName} ${user.lastName}`,
                email: user.email,
                photoUrl: user.photoUrl
            });
        }

    } catch (err) {
        // --- UPDATED LOGGING: THIS WILL SHOW THE SPECIFIC GOOGLE AUTH ERROR ---
        console.error('================================================');
        console.error('Google Auth Token Verification Failed:');
        console.error('Error Type (Name):', err.name);
        console.error('Specific Error Message:', err.message);
        console.error('Error Stack (for internal debugging):', err.stack);
        console.error('================================================');

        res.status(401).json({ msg: 'Google authentication failed. Please try again.' });
    }
};