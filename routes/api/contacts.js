const express = require('express')

const router = express.Router()

const { validation } = require('../../middlewares')
const { joiContactSchema } = require('../../validations')
const { contactsController } = require('../../controllers')

router.get('/', contactsController.getAll)

router.get('/:contactId', contactsController.getById)

router.post('/', validation(joiContactSchema), contactsController.add)

router.delete('/:contactId', contactsController.removeById)

router.put(
  '/:contactId',
  validation(joiContactSchema),
  contactsController.updateById,
)

module.exports = router
