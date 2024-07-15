import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'addresses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('client_id')
        .unsigned()
        .references('id')
        .inTable('clients')
        .onDelete('CASCADE')
        .onUpdate('CASCADE').notNullable
      table.string('estado').notNullable
      table.string('cidade').notNullable
      table.string('rua').notNullable
      table.integer('numero_casa')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
