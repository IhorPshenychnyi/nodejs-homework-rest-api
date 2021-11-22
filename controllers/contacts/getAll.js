const { Contact } = require('../../models')

const getAll = async (req, res, next) => {
  try {
    const { favorite = false } = req.query
    const page = Number(req.query.page)
    const limit = Number(req.query.limit)

    const { _id } = req.user

    const filteredContacts = []

    //           Фильтрация контактов по полю избранного (GET /contacts?favorite=true)

    if (favorite === 'true') {
      const contacts = await Contact.find(
        { owner: _id },
        '_id name email phone favorite',
      ).populate('owner', '_id email')

      contacts.forEach(contact => {
        if (contact.favorite === true) {
          filteredContacts.push(contact)
        }
      })

      return res.json({
        status: 'success',
        code: 200,
        message: 'Contacts found',
        data: {
          filteredContacts,
        },
      })
    }
    //                                   Пагинация колекции контактов

    const skip = (page - 1) * limit
    const contacts = await Contact.find(
      { owner: _id },
      '_id name email phone favorite',
      {
        skip,
        limit,
      },
    ).populate('owner', '_id email')

    return res.json({
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
