
exports.up = async function(knex) {
    await knex.schema.createTable("users", (table) => {
        table.increments("id")
        table.string("username").notNull().unique()
        table.string("password").notNull()
        table.string("first_name").notNull()
        table.string("last_name").notNull()
        table.string("email").notNull().unique()
        table.string("type").notNull()
      })
    }

exports.down =async function(knex) {
    await knex.schema.dropTableIfExists("users")
};
