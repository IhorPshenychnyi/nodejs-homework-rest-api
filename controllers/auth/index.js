const register = require('./register')
const login = require('./login')
const logout = require('./logout')
const getCurrentUser = require('./getCurrentUser')
const updateUserSubscription = require('./updateUserSubscription')

module.exports = {
  register,
  login,
  logout,
  getCurrentUser,
  updateUserSubscription,
}
