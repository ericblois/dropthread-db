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
    .alterTable('Offer', table => {
        table.text('deliveryMethod').notNullable()
        table.json('deliveryAddress').nullable()
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
    .alterTable('Offer', table => {
        table.dropColumns(['deliveryMethod', 'deliveryAddress'])
    })
    .renameTable('DeliveryAddress', 'ShippingInfo')
};
