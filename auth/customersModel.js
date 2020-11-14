const db = require("../data/configDb")

// to add a customer
async function addCustomer(user) {
	const [id] = await db("customers").insert(user)
	return findByIdCustomer(id)
}


// find all customers
function findCustomers() {
	return db("customers").select("id", "email", "password", "full_name").orderBy("id")
}

// find customers
function findByCustomer(filter) {
	return db("customers")
		.select("id", "email", "password", "full_name")
		.where(filter)
}

// find customers by id
function findByIdCustomer(id) {
	return db("customers")
		.select("id", "email", "full_name")
		.where({ id })
		.first()
}

// update a customer
function updateCustomer(id, changes) {
	return db('customers')
	  .where({ id })
	  .update(changes)
	  .then(count => (count > 0 ? findByIdCustomer(id) : null));
}
  
  // delete a customers
  function removeCustomer(id) {
	return db('customers').where({ id }).del();
  }

module.exports = {
	addCustomer,
	findCustomers,
	findByCustomer,
    findByIdCustomer,
    updateCustomer,
    removeCustomer
}