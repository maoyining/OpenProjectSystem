module.exports = (req, res, next) => {

  User.findOne({
    id: req.me.id
  })
  .exec((err, user) => {
    if (err) { return next(err); }

    if (!user || user.role !== constants.ROLE_ADMIN) {
      return res.forbidden();
    }

    return next();
  });

};
