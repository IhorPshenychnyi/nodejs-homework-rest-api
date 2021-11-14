const express = require('express')

const router = express.Router()

const { validation } = require('../../middlewares')
const { joiSchema } = require('../../models/contact')
const { contactsController } = require('../../controllers')

router.get('/', contactsController.getAll)

router.get('/:contactId', contactsController.getById)

router.post('/', validation(joiSchema), contactsController.add)

router.delete('/:contactId', contactsController.removeById)

router.put('/:contactId', validation(joiSchema), contactsController.updateById)

router.patch(
  '/:contactId/favorite',
  validation(joiSchema),
  contactsController.updateStatusContact,
)

module.exports = router
