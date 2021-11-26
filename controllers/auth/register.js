const { Conflict } = require('http-errors')
const bcrypt = require('bcryptjs')
const { User } = require('../../models')

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user) {
      throw new Conflict('Email in use')
    }

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    const newUser = await User.create({ email, password: hashPassword })
    res.status(201).json({
      status: 'Created',
      code: 201,
      data: {
        user: {
          email: newUser.email,
          subscription: newUser.subscription,
        },
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = register
