/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
  .createTable('ItemPriceHistory', table => {
        table.integer('changeID').notNullable()
        table.uuid('itemID').references('itemID').inTable('Item').notNullable()
        table.decimal('minPrice', 7, 2).notNullable()
        table.decimal('basePrice', 7, 2).notNullable()
        table.decimal('feePrice', 7, 2).notNullable()
        table.decimal('facePrice', 7, 2).notNullable()
        table.bigInteger('timestamp').notNullable()
        table.text('likeUserID').nullable().defaultTo(null)
        table.primary(['itemID', 'changeID'])
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('ItemPriceHistory')
};
