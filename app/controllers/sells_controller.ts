import Client from '#models/client'
import Product from '#models/product'
import Sell from '#models/sell'
import type { HttpContext } from '@adonisjs/core/http'

export default class SellsController {
  async store({ request, response }: HttpContext) {
    try {
      const body = request.only(['client_id', 'product_id', 'quantidade'])
      const client = await Client.findOrFail(body.client_id)
      if (!client) {
        return response.status(400).json({
          message: 'client not found',
        })
      }
      const product = await Product.find(body.product_id)
      if (!product) {
        return response.status(400).json({
          message: 'product not found',
        })
      }
      if (product.quantidade_estoque < body.quantidade) {
        return response.status(400).json({
          message: 'product out of stock',
        })
      }
      const totalValor = Number(product.valor) * body.quantidade
      const sell = await Sell.create({
        client_id: client.id,
        product_id: product.id,
        quantidade: body.quantidade,
        preco_unitario: Number(product.valor),
        preco_total: totalValor,
      })
      product.quantidade_estoque = Number(product.quantidade_estoque) - body.quantidade
      await product.save()

      return response.status(200).json({
        message: 'sell created successfully',
        data: {
          cliente: {
            nome: client.nome,
            cpf: client.cpf,
          },
          produto: {
            nome: product.nome,
            imagem: product.imagem,
            descricao: product.descricao,
            quantidade_estoque: product.quantidade_estoque,
            valor: product.valor,
          },
          quantidade: sell.quantidade,
          preco_unitario: sell.preco_unitario,
          preco_total: totalValor,
        },
      })
    } catch (error) {
      return response.status(400).json({
        message: 'failed to created',
      })
    }
  }
}
