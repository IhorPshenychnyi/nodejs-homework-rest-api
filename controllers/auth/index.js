const register = require('./register')
const login = require('./login')
const logout = require('./logout')
const getCurrentUser = require('./getCurrentUser')
const updateUserSubscription = require('./updateUserSubscription')
const updateUserAvatar = require('./updateUserAvatar')
const verify = require('./verify')
const reVerify = require('./reVerify')

module.exports = {
  register,
  login,
  logout,
  getCurrentUser,
  updateUserSubscription,
  updateUserAvatar,
  verify,
  reVerify,
}
