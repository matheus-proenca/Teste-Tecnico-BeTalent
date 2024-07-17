import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import Client from './client.js'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import Product from './product.js'

export default class Sell extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare client_id: number

  @hasOne(() => Client, {
    foreignKey: 'client_id',
  })
  declare cliente: HasOne<typeof Client>

  @column()
  declare product_id: number

  @hasOne(() => Product, {
    foreignKey: 'product_id',
  })
  declare produto: HasOne<typeof Product>

  @column()
  declare quantidade: number

  @column()
  declare preco_unitario: number

  @column()
  declare preco_total: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
