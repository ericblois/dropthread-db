/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .alterTable('Offer', table => {
        table.dropColumn('counterOfferID');
        table.dropColumn('fromPayment');
        table.dropColumn('toPayment');
        table.renameColumn('fromID', 'fromUserID');
        table.renameColumn('toID', 'toUserID');
        table.specificType('itemIDs', 'uuid ARRAY').notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .alterTable('Offer', table => {
            table.uuid('counterOfferID').nullable().defaultTo(null);
            table.decimal('fromPayment', 7, 2).defaultTo(0)
            table.decimal('toPayment', 7, 2).defaultTo(0)
            table.renameColumn('fromUserID', 'fromID');
            table.renameColumn('toUserID', 'toID');
            table.dropColumn('itemIDs');
        })
};
