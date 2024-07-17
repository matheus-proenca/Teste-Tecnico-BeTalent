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

      if (!body.nome || !body.quantidade_estoque || !body.descricao || !body.valor) {
        return response.status(400).json({
          message: 'all fields are required',
        })
      }

      if (image && body.nome && body.quantidade_estoque && body.valor && body.descricao) {
        const nameImage = `${cuid()}.${image.extname}`
        await image.move(app.makePath('uploads'), {
          name: nameImage,
        })

        body.imagem = nameImage
      }
      await Product.create(body)
      return response.status(201).json({
        message: 'product created successfully',
      })
    } catch (error) {
      response.status(400).json({
        message: 'failure to create the product',
      })
    }
  }

  async index({ response }: HttpContext) {
    try {
      const productList = await Product.query().orderBy('products.nome', 'asc')

      return response.status(200).json({
        data: productList,
      })
    } catch (error) {
      return response.status(400).json({
        message: 'error when listing products',
      })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const product = await Product.findOrFail(params.id)
      return response.status(200).json({
        data: product,
      })
    } catch (error) {
      return response.status(400).json({
        message: 'id does not exist',
      })
    }
  }

  async update({ request, response, params }: HttpContext) {
    try {
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

      return response.status(200).json({
        message: 'product updated successfully',
        data: product,
      })
    } catch (error) {
      return response.status(400).json({
        message: 'failed to update',
      })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const product = await Product.findOrFail(params.id)
      await product.delete()

      response.status(200).json({
        message: 'product deleted successfully',
      })
    } catch (error) {
      response.status(400).json({
        message: 'failed to delete',
      })
    }
  }
}
