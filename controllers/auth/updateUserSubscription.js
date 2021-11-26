const { User } = require('../../models')

const updateUserSubscription = async (req, res, next) => {
  try {
    const { subscription } = req.body
    const { _id, email } = req.user
    await User.findByIdAndUpdate(_id, { subscription })

    res.json({
      status: 'success',
      code: 200,
      user: {
        email,
        subscription,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = updateUserSubscription
