/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema
    .createTable('Offer', table => {
        table.uuid('offerID').primary().notNullable().defaultTo(knex.raw('uuid_generate_v4()'))
        table.uuid('fromID').notNullable()
        table.uuid('toID').notNullable()
        table.specificType('fromItems', 'uuid ARRAY')
        table.specificType('toItems', 'uuid ARRAY')
        table.decimal('fromPayment', 7, 2)
        table.decimal('toPayment', 7, 2)
        table.text('deliveryMethod').notNullable()
        table.bigInteger('offerTime').notNullable()
        table.text('responseType')
        table.bigInteger('responseTime')
        table.uuid('counterOfferID')
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema
      .dropTable('Offer')
  };
  