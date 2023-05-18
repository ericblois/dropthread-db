/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .alterTable('ShippingInfo', table => {
        table.double('lat').notNullable()
        table.double('long').notNullable()
    })
    .renameTable('ShippingInfo', 'DeliveryAddress')
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .alterTable('DeliveryAddress', table => {
        table.dropColumns(['lat', 'long'])
    })
    .renameTable('DeliveryAddress', 'ShippingInfo')
};
