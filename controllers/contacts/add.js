const contactsOperations = require('../../models/contacts')

const add = async (req, res, next) => {
  try {
    const result = await contactsOperations.addContact(req.body)
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
