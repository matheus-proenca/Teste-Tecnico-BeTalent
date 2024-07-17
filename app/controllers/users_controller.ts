import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'

export default class UsersController {
  async signup({ request, response }: HttpContext) {
    try {
      const body = request.only(['email', 'password'])
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!body.email || !body.password) {
        return response.status(400).json({
          message: 'all fields are required',
        })
      }
      if (!emailRegex.test(body.email)) {
        return response.status(400).json({
          message: 'email is invalid',
        })
      }
      await User.create(body)
      response.status(201)
      return {
        message: 'user created successfully',
      }
    } catch (error) {
      response.status(409)
      return response.json({
        message: 'User already exist',
      })
    }
  }

  async login({ request, response }: HttpContext) {
    try {
      const { email, password } = request.only(['email', 'password'])
      if (!email || !password) {
        return response.status(400).json({
          message: 'all fields are required',
        })
      }
      const user = await User.verifyCredentials(email, password)

      const token = await User.accessTokens.create(user)

      return response.status(200).json({
        type: 'bearer',
        value: token.value?.release(),
      })
    } catch (error) {
      return response.status(400).json({
        message: 'password or email is incorrect',
      })
    }
  }
}
