/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
  .alterTable('Item', table => {
    table.decimal('lastPrice', 7, 2).defaultTo(null)
    table.decimal('currentPrice', 7, 2).defaultTo(null)
    table.renameColumn('price', 'minPrice')
  })
  .alterTable('UserInteractsItem', table => {
    table.decimal('likePrice', 7, 2).defaultTo(null)
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .alterTable('UserInteractsItem', table => {
        table.dropColumn('likePrice')
    })
    .alterTable('Item', table => {
        table.dropColumn('lastPrice')
        table.dropColumn('currentPrice')
        table.renameColumn('minPrice', 'price')
    })
};
