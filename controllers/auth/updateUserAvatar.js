const fs = require('fs').promises
const path = require('path')
const Jimp = require('jimp')
const { Unauthorized, UnsupportedMediaType } = require('http-errors')

const { User } = require('../../models')

const avatarsDir = path.join(__dirname, '../../public/avatars')

const updateUserAvatar = async (req, res, next) => {
  if (!req.file) {
    return next(new UnsupportedMediaType('Error loading file'))
  }

  const { _id } = req.user
  const { path: tempUpload, originalname } = req.file

  try {
    const filename = `${_id}_${originalname}`
    const resultUpload = path.join(avatarsDir, String(_id), filename)

    await fs.rename(tempUpload, resultUpload)

    const avatarURL = path.join('/avatars', String(_id), filename)

    const userAvatar = await Jimp.read(resultUpload)
    userAvatar.resize(250, 250).write(resultUpload)

    const result = await User.findByIdAndUpdate(_id, { avatarURL })

    if (!result) {
      throw new Unauthorized()
    }

    res.json({
      status: 'success',
      code: 200,
      user: {
        avatarURL: result.avatarURL,
      },
    })
  } catch (error) {
    await fs.unlink(tempUpload)
    next(error)
  }
}

module.exports = updateUserAvatar
