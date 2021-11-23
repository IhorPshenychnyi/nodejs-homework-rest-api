const express = require('express')

const { validation, authenticate } = require('../../middlewares')
const { authController } = require('../../controllers')
const { joiSchema } = require('../../models/user')

const router = express.Router()

router.post('/register', validation(joiSchema), authController.register)

router.post('/login', validation(joiSchema), authController.login)

router.get('/logout', authenticate, authController.logout)

router.get('/current', authenticate, authController.getCurrentUser)

router.patch(
  '/',
  authenticate,
  validation(joiSchema),
  authController.updateUserSubscription,
)

module.exports = router
