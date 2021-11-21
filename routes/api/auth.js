const express = require('express')

const { validation, athenticate } = require('../../middlewares')
const { authController } = require('../../controllers')
const { joiSchema } = require('../../models/user')

const router = express.Router()

router.post('/register', validation(joiSchema), authController.register)

router.post('/login', validation(joiSchema), authController.login)

router.get('/logout', athenticate, authController.logout)

router.get('/current', athenticate, authController.getCurrentUser)

router.patch(
  '/',
  athenticate,
  validation(joiSchema),
  authController.updateUserSubscription,
)

module.exports = router
