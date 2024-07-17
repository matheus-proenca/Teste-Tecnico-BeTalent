import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { compose } from '@adonisjs/core/helpers'
import { SoftDeletes } from 'adonis-lucid-soft-deletes'
import Sell from './sell.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Product extends compose(BaseModel, SoftDeletes) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @column()
  declare imagem: string

  @column()
  declare descricao: string

  @column()
  declare quantidade_estoque: number

  @column()
  declare valor: Number

  @belongsTo(() => Sell, {
    foreignKey: 'product_id',
  })
  declare venda: BelongsTo<typeof Sell>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime()
  declare deletedAt: DateTime | null
}
