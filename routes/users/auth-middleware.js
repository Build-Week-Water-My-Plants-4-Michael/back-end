const jwt = require('jsonwebtoken');

function authenticate() {
  return async (req, res, next) => {
    const authErr = {
      message: 'Authentication error, please try again.',
    };
    try {
      const token = req.cookies.token;
      console.log(req.cookies.token);
      if (!token) {
        return res.status(401).json(authErr);
      }
      jwt.verify(token, process.env.JWT_SECRET, (err, decodedPayload) => {
        if (err) {
          return res.status(401).json(authErr);
        }
        req.token = decodedPayload;
        next();
      });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = authenticate;
