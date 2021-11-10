const contactsOperations = require('../../models/contacts')

const getAll = async (req, res, next) => {
  try {
    const contacts = await contactsOperations.getContactsList()
    res.json({
      status: 'success',
      code: 200,
      message: 'Contacts found',
      data: {
        contacts,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getAll
