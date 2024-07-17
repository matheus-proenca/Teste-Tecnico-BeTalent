import Address from '#models/address'
import Client from '#models/client'
import Fone from '#models/fone'
import { isCPF } from 'validation-br'
import { HttpContext } from '@adonisjs/core/http'
import Sell from '#models/sell'

export default class ClientsController {
  async store({ request, response }: HttpContext) {
    try {
      const body = request.only(['nome', 'cpf', 'endereco', 'telefone'])
      const client = await Client.create(body)
      const address = body.endereco
      const fone = body.telefone

      if (isCPF(body.cpf) === false) {
        return response.status(500).json({
          message: 'CPF is invalid',
        })
      }

      if (!body.nome || !body.cpf || !body.endereco || !body.telefone) {
        return response.status(400).json({
          message: 'all fields are required',
        })
      }

      const addressFill = new Address()
      addressFill.client_id = client.id
      addressFill.fill(address)
      await client.related('endereco').save(addressFill)

      const foneFill = new Fone()
      foneFill.client_id = client.id
      foneFill.fill(fone)
      await client.related('telefone').save(foneFill)

      client.load('endereco')
      client.load('telefone')

      return response.status(201).json({
        message: 'client created successfully',
      })
    } catch (error) {
      return response.status(400).json({
        message: 'error when registering the customer',
      })
    }
  }

  async index({ response }: HttpContext) {
    try {
      const clients = await Client.query().preload('endereco').preload('telefone')

      return response.status(200).json({
        data: clients,
      })
    } catch (error) {
      return response.status(400).json({
        message: 'error when listing clients',
      })
    }
  }

  async show({ params, request, response }: HttpContext) {
    try {
      const { mes, ano } = request.qs()
      const client = await Client.query()
        .where('id', params.id)
        .preload('endereco')
        .preload('telefone')

      if (mes || ano) {
        const sales = await Sell.query()
          .where('client_id', params.id)
          .whereBetween('created_at', [`${ano}-${mes}-1 00:00:00`, `${ano}-${mes}-31 23:59:59`])
          .orderBy('createdAt', 'desc')

        return response.status(200).json({
          data: {
            cliente: client,
            vendas: sales,
          },
        })
      }

      const sales = await Sell.query().where('client_id', params.id).orderBy('createdAt', 'desc')

      return response.status(200).json({
        data: {
          cliente: client,
          vendas: sales,
        },
      })
    } catch (error) {
      return response.status(400).json({
        message: 'error in listing customers and sales',
      })
    }
  }

  async update({ request, params, response }: HttpContext) {
    const body = request.only(['nome', 'cpf', 'endereco', 'telefone'])
    const client = await Client.findOrFail(params.id)
    const fone = await Fone.findOrFail(params.id)
    const address = await Address.findOrFail(params.id)

    if (!client || !fone || !address) {
      return response.status(200).json({
        message: 'client not found',
      })
    }
    client.nome = body.nome || client.nome
    client.cpf = body.cpf || client.cpf
    address.estado = body.endereco.estado || address.estado
    address.cidade = body.endereco.cidade || address.cidade
    address.numero_casa = body.endereco.numero_casa || address.numero_casa
    address.rua = body.endereco.rua || address.rua
    fone.ddd = body.telefone.ddd || fone.ddd
    fone.numero = body.telefone.numero || fone.numero

    client.save()
    address.save()
    fone.save()

    return response.status(200).json({
      message: 'client updated successfully',
    })
  }

  async destroy({ response, params }: HttpContext) {
    try {
      await Client.query().where('id', params.id).preload('endereco').preload('telefone').delete()
      return response.status(200).json({
        message: 'client deleted successfully',
      })
    } catch (error) {
      return response.status(400).json({
        message: 'failed to delete',
      })
    }
  }
}
