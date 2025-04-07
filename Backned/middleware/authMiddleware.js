const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    // Extract token after "Bearer "
    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, "c30d664b98866d72eed1578def8035c0b40c6e715975db6fbf09f55432769152"); // Use the same secret key from login
        req.user = decoded; // Attach user info to request
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or Expired Token" });
    }
};

module.exports = authenticateUser;
