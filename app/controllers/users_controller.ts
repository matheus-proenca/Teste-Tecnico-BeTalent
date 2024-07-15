import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'

export default class UsersController {
  async singup({ request, response }: HttpContext) {
    try {
      const body = request.only(['email', 'password'])
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
    const { email, password } = request.only(['email', 'password'])
    const user = await User.verifyCredentials(email, password)

    const token = await User.accessTokens.create(user)
    response.status(200)
    return {
      type: 'bearer',
      value: token.value?.release(),
    }
  }
}
