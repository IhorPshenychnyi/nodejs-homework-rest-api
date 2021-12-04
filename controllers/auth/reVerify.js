const { BadRequest, NotFound } = require('http-errors')

const { User } = require('../../models')
const { sendMail } = require('../../helpers')

const reVerify = async (req, res, next) => {
  try {
    const { email } = req.body
    const user = await User.findOne({ email })

    if (!user) {
      throw new NotFound('User not found')
    }

    if (user.verify) {
      throw new BadRequest('Verification has already been passed')
    }

    const mail = {
      to: email,
      subject: 'Сonfirmation of registration',
      html: `<a href='http://localhost:3000/api/auth/verify/${user.verificationToken}'>Сlick to confirm email</a>`,
    }
    await sendMail(mail)

    res.status(200).json({
      message: 'Verification email sent',
    })
  } catch (error) {
    next(error)
  }
}

module.exports = reVerify
