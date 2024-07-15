import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Fone extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare ddd: number

  @column()
  declare numero: number
}
