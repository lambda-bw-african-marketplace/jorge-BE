const abc12345 = "$2a$14$qHqCbXUImiBOgXlFNX47wuA7uFWNGNAZutYLvOeye9eotewGlfYV6"

exports.seed = async function(knex) {
	await knex("customers").insert([
    {id: 1, email: "customer1@gmail.com", password: abc12345, full_name: "Peter Black" },
    {id: 2, email: "customer2@gmail.com", password: abc12345, full_name: "Sandra Dogde" },
    {id: 3, email: "customer3@gmail.com", password: abc12345, full_name: "Juan Salzedo" },
  ])
}
