import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import Client from './client.js'
import { HasOne } from '@adonisjs/lucid/types/relations'
import Product from './product.js'

export default class Sell extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @hasOne(() => Client)
  declare client_id: HasOne<typeof Client>

  @hasOne(() => Product)
  declare product_id: HasOne<typeof Product>

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
