import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Client from '#models/client'

export default class Address extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare estado: string

  @column()
  declare cidade: string

  @column()
  declare rua: string

  @column()
  declare numero_casa: number

  @column()
  declare client_id: number

  @belongsTo(() => Client, {
    foreignKey: 'client_id',
  })
  declare cliente: BelongsTo<typeof Client>
}
