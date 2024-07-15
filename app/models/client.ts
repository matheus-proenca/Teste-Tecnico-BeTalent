import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import Fone from './fone.js'
import { HasOne } from '@adonisjs/lucid/types/relations'
import Address from './address.js'

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @hasOne(() => Fone)
  declare telefone: HasOne<typeof Fone>

  @hasOne(() => Address)
  declare endereco: HasOne<typeof Address>

  @column()
  declare nome: string

  @column()
  declare cpf: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
