/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .alterTable('Exchange', table => {
        table.dropColumns(['userID1', 'userID2', 'deliveryGeoCoords', 'deliveryAddress', 'deliveryPlannedTime', 'deliveryActualTime', 'stripePaymentID', 'cancelled'])
        table.text('status').notNullable()
        table.bigInteger('plannedDeliveryTime').nullable()
        table.bigInteger('completionTime').nullable()
        table.text('completionImage').nullable()
    })
    .alterTable('Item', table => {
        table.dropColumns(['exchangeID', 'offerIDs'])
    })
    .dropTableIfExists('ItemInOffer')
    .dropTableIfExists('PriceHistory');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .alterTable('Exchange', table => {
        table.dropColumns(['status', 'plannedDeliveryTime', 'completionTime', 'completionImage'])
        table.uuid('userID1').notNullable()
        table.uuid('userID2').notNullable()
        table.geography('deliveryGeoCoords')
        table.text('deliveryAddress')
        table.bigInteger('deliveryPlannedTime')
        table.bigInteger('deliveryActualTime')
        table.text('stripePaymentID')
        table.boolean('cancelled').defaultTo(false)
    }).alterTable('Item', table => {
        table.uuid('exchangeID')
        table.specificType('offerIDs', 'uuid ARRAY').notNullable().defaultTo("{}")
    }).createTable(('ItemInOffer'), table => {
        table.uuid('offerID').notNullable()
        table.uuid('itemID').notNullable()
        table.primary(['offerID', 'itemID'])
    })
};
