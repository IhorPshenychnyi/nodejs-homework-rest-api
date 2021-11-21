const { User } = require('../../models')

const getCurrentUser = async (req, res, next) => {
  try {
    const { token, email, subscription } = req.user
    await User.findOne({ token })

    res.json({
      status: 'success',
      code: 200,
      data: {
        email,
        subscription,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getCurrentUser
