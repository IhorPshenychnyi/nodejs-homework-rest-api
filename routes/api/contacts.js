const express = require('express')

const router = express.Router()

const { validation, athenticate } = require('../../middlewares')
const { joiSchema } = require('../../models/contact')
const { contactsController } = require('../../controllers')

router.get('/', athenticate, contactsController.getAll)

router.get('/:contactId', athenticate, contactsController.getById)

router.post('/', athenticate, validation(joiSchema), contactsController.add)

router.delete('/:contactId', athenticate, contactsController.removeById)

router.put(
  '/:contactId',
  athenticate,
  validation(joiSchema),
  contactsController.updateById,
)

router.patch(
  '/:contactId/favorite',
  athenticate,
  validation(joiSchema),
  contactsController.updateStatusContact,
)

module.exports = router
