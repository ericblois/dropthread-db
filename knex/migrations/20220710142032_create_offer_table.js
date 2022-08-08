/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema
    .createTable('Offer', table => {
        table.uuid('offerID').primary().notNullable().defaultTo(knex.raw('uuid_generate_v4()'))
        table.text('fromID').notNullable()
        table.text('toID').notNullable()
        table.text('fromName').notNullable()
        table.text('toName').notNullable()
        table.decimal('fromPayment', 7, 2).defaultTo(0)
        table.decimal('toPayment', 7, 2).defaultTo(0)
        table.bigInteger('offerTime').notNullable()
        table.text('responseType')
        table.bigInteger('responseTime')
        table.uuid('counterOfferID')
        table.uuid('exchangeID')
    })
    .createTable(('ItemInOffer'), table => {
        table.uuid('offerID').notNullable()
        table.uuid('itemID').notNullable()
        table.primary(['offerID', 'itemID'])
    })
    .alterTable('Item', table => {
        table.specificType('offerIDs', 'uuid ARRAY').notNullable().defaultTo("{}")
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema
      .dropTable('Offer')
      .dropTable('ItemInOffer')
      .alterTable('Item', table => {
        table.dropColumn('offerIDs')
      })
  };
  