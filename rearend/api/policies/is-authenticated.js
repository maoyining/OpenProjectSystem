const passport = require('passport');

module.exports = (req, res, next) => {

  passport.authenticate('jwt', (error, user, info) => {
    if (error) return res.negotiate(error || info);

    if (!user) {
      let message = _.get(info, 'reason') || _.get(info, 'message');
      return res.unauthorized(null, { message });
    }

    req.me = user;

    next();
  })(req, res);

};
