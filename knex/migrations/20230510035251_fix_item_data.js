/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .table('Item', table => {
        table.dropColumns('minPrice', 'currentPrice', 'lastPrice')
        table.json('priceData').notNullable()
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .table('Item', table => {
        table.decimal('minPrice', 7, 2).defaultTo(0)
        table.decimal('lastPrice', 7, 2).defaultTo(0)
        table.decimal('currentPrice', 7, 2).defaultTo(0)
        table.dropColumn('priceData')
    })
};
