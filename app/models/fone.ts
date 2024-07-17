import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Client from '#models/client'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Fone extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare ddd: number

  @column()
  declare numero: number

  @column()
  declare client_id: number

  @belongsTo(() => Client, {
    foreignKey: 'client_id',
  })
  declare cliente: BelongsTo<typeof Client>
}
