const { Conflict } = require('http-errors')
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const fs = require('fs').promises
const path = require('path')

const { User } = require('../../models')

const avatarsDir = path.join(__dirname, '../../public/avatars')

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user) {
      throw new Conflict('Email in use')
    }
    const avatarURL = gravatar.url(email)
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    const newUser = await User.create({
      email,
      password: hashPassword,
      avatarURL,
    })

    const avatarFolder = path.join(avatarsDir, String(newUser._id))
    await fs.mkdir(avatarFolder)

    res.status(201).json({
      status: 'Created',
      code: 201,
      data: {
        user: {
          email: newUser.email,
          subscription: newUser.subscription,
          avatarURL: newUser.avatarURL,
        },
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = register
