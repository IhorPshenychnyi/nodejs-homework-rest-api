const crypto = require('crypto')

const getContactsList = require('./getContactsList')
const updateContacts = require('./updateContacts')

const addContact = async data => {
  const contacts = await getContactsList()
  const newContact = { id: crypto.randomUUID(), ...data }
  contacts.push(newContact)
  await updateContacts(contacts)
  return newContact
}

module.exports = addContact
