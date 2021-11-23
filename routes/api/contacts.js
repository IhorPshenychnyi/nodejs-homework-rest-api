const express = require('express')

const router = express.Router()

const { validation, authenticate } = require('../../middlewares')
const { joiSchema } = require('../../models/contact')
const { contactsController } = require('../../controllers')

router.get('/', authenticate, contactsController.getAll)

router.get('/:contactId', authenticate, contactsController.getById)

router.post('/', authenticate, validation(joiSchema), contactsController.add)

router.delete('/:contactId', authenticate, contactsController.removeById)

router.put(
  '/:contactId',
  authenticate,
  validation(joiSchema),
  contactsController.updateById,
)

router.patch(
  '/:contactId/favorite',
  authenticate,
  validation(joiSchema),
  contactsController.updateStatusContact,
)

module.exports = router
