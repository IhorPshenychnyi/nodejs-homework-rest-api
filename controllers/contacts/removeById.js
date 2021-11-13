const { NotFound } = require('http-errors')

const contactsOperations = require('../../models/contacts')

const removeById = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contactsOperations.removeById(contactId)

    if (!result) {
      throw new NotFound(`Contact with id=${contactId} not found`)
    }
    res.json({
      status: 'success',
      code: 200,
      message: 'Сontact deleted',
    })
  } catch (error) {
    next(error)
  }
}

module.exports = removeById
