
import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    let token = req.cookies.token;

    if (!token) {
      return res.status(400).json({ message: "Not Authorised or Invalid token" });
    }

    let verifyToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!verifyToken) {
      return res.status(400).json({ message: "Not Authorised or Invalid token" });
    }

    // Attach email to request (you can also attach verifyToken.email)
    req.email = verifyToken.email;

    // Move to next middleware
    next();

  } catch (error) {
    console.log("AdminAuth error:", error.message);
    return res.status(500).json({ message: `AdminAuth error: ${error.message}` });
  }
};

export default adminAuth;
