
exports.up = async function(knex) {

    await knex.schema.createTable("sellers", (table) => {
		table.increments("id")
		table.text("email").notNull().unique()
        table.text("password", 128).notNull()
        table.text("full_name").notNull()
    })

    await knex.schema.createTable("customers", (table) => {
		table.increments("id")
        table.text("email").notNull().unique()
        table.text("password", 128).notNull()
        table.text("full_name").notNull()
    })

    await knex.schema.createTable("items", (table) => {
		table.increments("id")
        table.text("item_name", 64).notNull()
        table.text("item_description", 64).notNull()
        table.decimal("item_price").notNull()
        table.text("item_category").notNull()
        table.text("item_location").notNull()
        table.text("url_item")
        table.timestamp('added_at', { useTz: true }).defaultTo(knex.raw("current_timestamp"))
        table
        .integer("seller_id")
        .notNull()
        .references("id")
        .inTable("sellers")
        .onDelete("SET NULL")
        .onUpdate("CASCADE")
    })


}

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("items")
    await knex.schema.dropTableIfExists("customers")
    await knex.schema.dropTableIfExists("sellers")

}

