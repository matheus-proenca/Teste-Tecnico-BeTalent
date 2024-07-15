import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'fones'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('client_id')
        .unsigned()
        .references('clients.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE').notNullable
      table.integer('ddd').notNullable
      table.integer('numero').notNullable
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
