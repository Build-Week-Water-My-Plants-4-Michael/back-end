const jwt = require('jsonwebtoken');
const secrets = require('../../config/secret.js');

function authenticate() {
  return async (req, res, next) => {
    const authErr = {
      message: 'You shall not pass!',
    };

    try {
      const token = req.body.token;
      console.log('check token', token);

      if (!token) {
        return res.status(401).json(authErr);
      }
      const decoded = jwt.verify(token, secrets.jwtSecret);
      req.decoded = decoded;
      // console.log(decoded);
      next();
    } catch (err) {
      res.status(401).json(authErr);
    }
  };
}
module.exports = authenticate;
