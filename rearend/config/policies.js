/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {


  // '*': false,

  // // ╔═╗┬ ┬┌┬┐┬ ┬
  // // ╠═╣│ │ │ ├─┤
  // // ╩ ╩└─┘ ┴ ┴ ┴
  // 'auth/*': true,
  // 'auth/me':  ['is-authenticated'],
  // 'auth/update-password':  ['is-authenticated'],

  '*': ['is-authenticated'],

  'auth/signin': true,



};
