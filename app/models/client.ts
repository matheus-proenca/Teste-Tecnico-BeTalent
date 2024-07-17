import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasOne } from '@adonisjs/lucid/orm'
import Fone from '#models/fone'
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations'
import Address from '#models/address'
import Sell from './sell.js'

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @column()
  declare cpf: string

  @hasOne(() => Fone, {
    foreignKey: 'client_id',
  })
  declare telefone: HasOne<typeof Fone>

  @hasOne(() => Address, {
    foreignKey: 'client_id',
  })
  declare endereco: HasOne<typeof Address>

  @belongsTo(() => Sell, {
    foreignKey: 'client_id',
  })
  declare venda: BelongsTo<typeof Sell>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
