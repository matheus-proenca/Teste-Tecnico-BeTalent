import { BaseModel, column } from '@adonisjs/lucid/orm'

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
}
