/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.raw(`
    DROP SCHEMA public CASCADE;
    CREATE SCHEMA public;
    
    GRANT ALL ON SCHEMA public TO public;
  `)
};
