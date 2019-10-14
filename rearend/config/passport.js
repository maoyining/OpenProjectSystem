'use strict';

/**
 * Passport configuration file where you should configure all your strategies
 * @description :: Configuration file where you configure your passport authentication
 */

const _ = require('lodash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

/**
 * Configuration object for local strategy
 * @type {Object}
 * @private
 */
const LOCAL_STRATEGY_CONFIG = {
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
};

/**
 * Configuration object for JWT strategy
 * @type {Object}
 * @private
 */
const JWT_STRATEGY_CONFIG = {
  secretOrKeyProvider: function secretOrKeyProvider(req, rawJwtToken, done) {
    return done(null, sails.config.auth.jwt.secretKey);
  },
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  passReqToCallback: true
};

/**
 * Triggers when user authenticates via local strategy
 * @param {Object} req Request object
 * @param {String} username Username from body field in request
 * @param {String} password Password from body field in request
 * @param {Function} next Callback
 * @private
 */
const _onLocalStrategyAuth = (req, username, password, next) => {
  User
    .findOne({[LOCAL_STRATEGY_CONFIG.usernameField]: username})
    .then(async (user) => {
      if (!user) return next(null, null, sails.config.errors.USER_NOT_FOUND);

      await sails.helpers.passwords.checkPassword(password, user.password)
      .intercept('incorrect', () => {
        return next(null, null, {
          code: 'E_WRONG_PASSWORD',
          message: 'Password is wrong'
        });
      });

      return next(null, user, {});
    })
    .catch(next);
};

/**
 * Triggers when user authenticates via JWT strategy
 * @param {Object} req Request object
 * @param {Object} payload Decoded payload from JWT
 * @param {Function} next Callback
 * @private
 */
const _onJwtStrategyAuth = (req, payload, next) => {
  return next(null, { id: payload.id }, {});
};

passport.use(new LocalStrategy(_.assign({}, LOCAL_STRATEGY_CONFIG), _onLocalStrategyAuth));
passport.use(new JwtStrategy(_.assign({}, JWT_STRATEGY_CONFIG), _onJwtStrategyAuth));
