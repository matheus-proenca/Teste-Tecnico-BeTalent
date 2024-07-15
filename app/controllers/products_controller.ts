import Product from '#models/product'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'

export default class ProductsController {
  async store({ request, response }: HttpContext) {
    try {
      const body = request.only(['nome', 'quantidade_estoque', 'descricao', 'valor', 'imagem'])
      const image = request.file('imagem', {
        extnames: ['jpg', 'png', 'jpeg'],
        size: '2mb',
      })
      if (image && body.nome && body.quantidade_estoque && body.valor && body.descricao) {
        const nameImage = `${cuid()}.${image.extname}`
        await image.move(app.makePath('uploads'), {
          name: nameImage,
        })

        body.imagem = nameImage
      }
      await Product.create(body)
      response.status(201)
      return response.json({
        message: 'product created successfully',
      })
    } catch (error) {
      response.json({
        message: error,
      })
    }
  }

  async index({ response }: HttpContext) {
    const productList = await Product.query().orderBy('products.nome', 'asc')

    response.status(200)
    return response.json({
      data: productList,
    })
  }

  async show({ params, response }: HttpContext) {
    try {
      const product = await Product.findOrFail(params.id)
      response.status(200)
      return response.json({
        data: product,
      })
    } catch (error) {
      response.status(400)
      return response.json({
        message: 'id does not exist',
      })
    }
  }

  async update({ request, response, params }: HttpContext) {
    const product = await Product.findOrFail(params.id)
    const image = request.file('imagem', {
      extnames: ['jpg', 'png', 'jpeg'],
      size: '2mb',
    })
    const body = request.only(['nome', 'quantidade_estoque', 'descricao', 'valor', 'imagem'])
    if (image && body.nome && body.quantidade_estoque && body.valor && body.descricao) {
      const nameImage = `${cuid()}.${image.extname}`
      await image.move(app.makePath('uploads'), {
        name: nameImage,
      })
      body.imagem = nameImage
    }
    product.nome = body.nome || product.nome
    product.quantidade_estoque = body.quantidade_estoque || product.quantidade_estoque
    product.descricao = body.descricao || product.descricao
    product.valor = body.valor || product.valor
    product.imagem = body.imagem || product.imagem

    await product.save()
    response.status(200)

    return product
  }

  async destroy({ params, response }: HttpContext) {
    const product = await Product.findOrFail(params.id)
    await product.delete()

    response.noContent()
  }
}
