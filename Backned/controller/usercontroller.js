const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const JWT_SECRET = "c30d664b98866d72eed1578def8035c0b40c6e715975db6fbf09f55432769152"; // Store this in an environment variable!

// Signup Controller
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        // Hash password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ name, email, password: hashedPassword });
        await user.save();

        // Generate JWT Token
        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

        res.status(201).json({ message: "User registered successfully", token,user:user.name });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Login Controller
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid email or password" });

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

        // Generate JWT Token
        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

        res.json({ message: "Login successful", token, user: { id: user._id, name: user.name, email: user.email, role:user.role } });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { signup, login };
