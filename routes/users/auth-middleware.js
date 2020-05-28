const jwt = require('jsonwebtoken');

function authenticate() {
  return async (req, res, next) => {
    //     const authErr = {
    //       message: 'You shall not pass!',
    //     };
    //     try {
    //       const token = req.body.token;
    //       // const token = req.headers.authorization;
    //       // console.log(req.headers.authorization);
    //       if (!token) {
    //         return res.status(401).json(authErr);
    //       }
    //       jwt.verify(token, process.env.JWT_SECRET, (err, decodedPayload) => {
    //         if (err) {
    //           return res.status(401).json(authErr);
    //         }
    //         req.token = decodedPayload;
    //         next();
    //       });
    //     } catch (err) {
    //       next(err);
    //     }
    //   };

    const token = req.body.token;

    console.log('check token', token);

    try {
      if (!token) {
        return res.status(401).json(authErr);
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.decoded = decoded;
      // console.log(decoded);
      next();
    } catch (err) {
      res.status(401).json({ message: 'You shall not pass!' });
    }
  };
}
module.exports = authenticate;
