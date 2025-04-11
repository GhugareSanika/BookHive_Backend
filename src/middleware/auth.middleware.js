import jwt from "jsonwebtoken";
import User from "../models/User.js";
// import protectRoute from "../routes/bookRoutes.js";

const protectRoute = async (req, res, next) => {
  try {
    console.log("Entered in protect route");
    // const token = req.header("Authorization").replace("Bearer","");
    const token = req.header("Authorization")?.replace("Bearer ", "").trim();

    console.log("Token received:", token);

    if (!token)
      return res
        .status(401)
        .json({ message: "No authentication token, access denied" });

    //verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //find user
    const user = await User.findById(decoded.userId).select("-password");
    console.log(user);
    if (!user) return res.status(401).json({ message: "Token is not valid" });
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(401).json({ message: "Unauthorized, invalid token" });
  }
};

export default protectRoute;
