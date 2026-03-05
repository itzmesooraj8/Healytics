const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "healytics-dev-secret";

/**
 * Verifies the Bearer JWT in the Authorization header.
 * Attaches decoded payload to req.user.
 * Returns 401 if missing or invalid.
 */
const requireAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"] || "";
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authentication required. Please log in." });
  }

  const token = authHeader.slice(7);
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Session expired. Please log in again." });
    }
    return res.status(401).json({ error: "Invalid token. Please log in again." });
  }
};

module.exports = { requireAuth };
