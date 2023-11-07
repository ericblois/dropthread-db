/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .alterTable('Item', table => {
        table.dropColumns(['deliveryMethods', 'styles'])
        table.text('address').nullable()
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .alterTable('Item', table => {
        table.specificType('deliveryMethods', 'text ARRAY').notNullable().defaultTo('{}')
        table.specificType('styles', 'text ARRAY').notNullable().defaultTo('{}')
        table.dropColumn('address')
    })
};
