const { Contact } = require('../../models')

const getAll = async (req, res, next) => {
  try {
    const contacts = await Contact.find({})
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
