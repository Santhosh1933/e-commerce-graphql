const { AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_KEY;

const authenticateToken = (context) => {
  const authHeader = context.req.headers.authorization;
  if (!authHeader) {
    throw new AuthenticationError("Authorization header is required");
  }
  const token = authHeader.split("Bearer ")[1];
  if (!token) {
    throw new AuthenticationError("Authorization token must be 'Bearer [token]'");
  }
  try {
    const decodedToken = jwt.verify(token, SECRET_KEY);
    return decodedToken;
  } catch (error) {
    throw new AuthenticationError("Invalid/Expired token");
  }
};

module.exports = authenticateToken;
