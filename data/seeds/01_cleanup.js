
exports.seed = async function(knex) {
  await knex("items").truncate()
  await knex("customers").truncate()
	await knex("sellers").truncate()
}
