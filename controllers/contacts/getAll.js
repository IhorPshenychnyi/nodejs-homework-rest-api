const { BadRequest } = require('http-errors')

const { Contact } = require('../../models')

const getAll = async (req, res, next) => {
  try {
    const { favorite = false } = req.query
    const page = Number(req.query.page)
    const limit = Number(req.query.limit)
    const { _id } = req.user

    if (Number.isNaN(page) || Number.isNaN(limit)) {
      throw new BadRequest()
    }

    const skip = (page - 1) * limit

    const contacts = await Contact.find(
      { owner: _id, favorite },
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
