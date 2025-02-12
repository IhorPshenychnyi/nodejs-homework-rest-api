const { NotFound } = require('http-errors')

const { Contact } = require('../../models')

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await Contact.findById(contactId)

    if (!result) {
      throw new NotFound(`Contact with id=${contactId} not found`)
    }
    res.json({
      status: 'success',
      code: 200,
      message: 'Contact found',
      data: {
        result,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getById
