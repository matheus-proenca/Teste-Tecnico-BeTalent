import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'

export default class UsersController {
  async singup({ request }: HttpContext) {
    const body = request.only(['email', 'password'])

    await User.create(body)
  }

  async login({ request }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.verifyCredentials(email, password)

    const token = await User.accessTokens.create(user)
    return {
      type: 'bearer',
      value: token.value?.release(),
    }
  }
}
