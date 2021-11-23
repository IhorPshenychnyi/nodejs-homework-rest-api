const { User } = require('../../models')

const getCurrentUser = async (req, res, next) => {
  try {
    const { token } = req.user
    const user = await User.findOne({ token })

    res.json({
      status: 'success',
      code: 200,
      data: {
        email: user.email,
        subscription: user.subscription,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getCurrentUser
