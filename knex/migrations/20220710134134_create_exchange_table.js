/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
  .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
  .createTable('Exchange', table => {
    table.uuid('exchangeID').primary().notNullable().defaultTo(knex.raw('uuid_generate_v4()'))
    table.uuid('sellerID').notNullable()
    table.uuid('buyerID').notNullable()
    table.specificType('sellerItems', 'uuid ARRAY').notNullable()
    table.specificType('buyerItems', 'uuid ARRAY')
    table.decimal('buyerPayment', 7, 2).notNullable()
    table.text('deliveryMethod').notNullable()
    table.bigInteger('sellerAcceptTime').notNullable()
    table.bigInteger('buyerAcceptTime')
    table.bigInteger('deliveryPlannedTime')
    table.bigInteger('deliveryActualTime')
    table.text('stripePaymentID')
    table.boolean('cancelled').defaultTo(false)
    }).alterTable('Item', table => {
        table.uuid('exchangeID')
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .raw('DROP EXTENSION IF EXISTS "uuid-ossp";')
    .dropTable('Exchange')
    .alterTable('Item', table => {
        table.dropColumn('exchangeID')
    })
};
