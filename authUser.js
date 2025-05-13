import jwt from 'jsonwebtoken';

// Universal user authentication middleware
const authUser = async (req, res, next) => {
  try {
    let token = req.headers.token;

    // If not provided in headers.token, check Authorization
    if (!token && req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.json({ success: false, message: "Not Authorized! Login again." });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;

