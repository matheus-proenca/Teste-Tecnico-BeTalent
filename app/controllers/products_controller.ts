import type { HttpContext } from '@adonisjs/core/http'

export default class ProductsController {
  async store({ request }: HttpContext) {}

  async index({ request }: HttpContext) {}

  async show({ request }: HttpContext) {}

  async update({ request }: HttpContext) {}

  async delete({ request }: HttpContext) {}
}
