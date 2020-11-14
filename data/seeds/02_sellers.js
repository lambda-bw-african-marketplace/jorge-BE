
const abc12345 = "$2a$14$qHqCbXUImiBOgXlFNX47wuA7uFWNGNAZutYLvOeye9eotewGlfYV6"

exports.seed = async function(knex) {
	await knex("sellers").insert([
    {id: 1, email: "seller1@gmail.com", password: abc12345, full_name: "Mike Prince" },
    {id: 2, email: "seller2@gmail.com", password: abc12345, full_name: "Sara Collins" },
    {id: 3, email: "seller3@gmail.com", password: abc12345, full_name: "Raul Saenz" },
  ])
}
