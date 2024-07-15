import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'sells'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('client_id').unsigned()
      table
        .foreign('client_id')
        .references('id')
        .inTable('clients')
        .onDelete('CASCADE')
        .onUpdate('CASCADE').notNullable
      table.integer('product_id').unsigned()
      table
        .foreign('product_id')
        .references('id')
        .inTable('products')
        .onDelete('CASCADE')
        .onUpdate('CASCADE').notNullable
      table.integer('quantidade').defaultTo(1)
      table.integer('preco_unitario').notNullable
      table.integer('preco_total').notNullable

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
