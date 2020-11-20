const db = require("../data/configDb")

// to add a seller
async function addSeller(user) {
	const [id] = await db("sellers").insert(user)
	return findByIdSeller(id)
}


// find all sellers
function findSellers() {
	return db("sellers").select("id", "email", "password", "full_name").orderBy("id")
}

// find a seller
function findBySeller(filter) {
	return db("sellers")
		.select("id", "email", "password", "full_name")
		.where(filter)
}

// find sellers by id
function findByIdSeller(id) {
	return db("sellers")
		.select("id", "email", "password", "full_name")
		.where({ id })
		.first()
}

// update a seller
function updateSeller(id, changes) {
	return db('sellers')
	  .where({ id })
	  .update(changes)
	  .then(count => (count > 0 ? findByIdSeller(id) : null));
}
  
  // delete a seller
  function removeSeller(id) {
	return db('sellers').where({ id }).del();
  }

module.exports = {
	addSeller,
	findSellers,
	findBySeller,
    findByIdSeller,
    updateSeller,
    removeSeller
}


