/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
  .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
  .createTable('Exchange', table => {
    table.uuid('exchangeID').primary().notNullable().defaultTo(knex.raw('uuid_generate_v4()'))
    table.uuid('userID1').notNullable()
    table.uuid('userID2').notNullable()
    table.uuid('offerID').notNullable()
    table.geography('deliveryGeoCoords')
    table.text('deliveryAddress')
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
    .dropTable('Exchange')
    .alterTable('Item', table => {
        table.dropColumn('exchangeID')
    })
    .raw('DROP EXTENSION IF EXISTS "uuid-ossp";')
};
