const { Contact } = require('../../models')

const add = async (req, res, next) => {
  try {
    const result = await Contact.create(req.body)
    return res.status(201).json({
      status: 'success',
      code: 201,
      message: 'Add new contact',
      data: {
        result,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = add
