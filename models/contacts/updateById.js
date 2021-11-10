const getContactsList = require('./getContactsList')
const updateContacts = require('./updateContacts')

const updateById = async (id, data) => {
  const contacts = await getContactsList()
  const idx = contacts.findIndex(item => item.id === id)
  if (idx === -1) {
    return null
  }
  contacts[idx] = { id, ...data }
  await updateContacts(contacts)
  return contacts[idx]
}

module.exports = updateById
