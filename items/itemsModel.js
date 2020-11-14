const db = require('../data/configDb');

// to get all items
function getItems() {
    return db("items as i")
    .innerJoin("sellers as s", "s.id", "i.seller_id")
    .select(["i.*", "s.full_name", "s.email" ])
}

// to get items of specific for specific seller
function getItemsBySeller(id) {
return db('items as i') 
.where("seller_id", id)
.select("i.*")
}

// to get a specific item by id
function getItemsById(id) {
    return db("items as i")
    .innerJoin("sellers as s", "s.id", "i.seller_id")
    .select(["i.*", "s.full_name", "s.email"])
    .where("i.id", id)
    .first();
}

// to get items searched by location
function getItemsByLocation() {
    return db("items as i")
    .innerJoin("sellers as s", "s.id", "i.seller_id")
    .select(["i.id", "i.item_location", "i.item_name", "i.item_description", "i.item_price", "i.item_category", "i.url_item", "i.added_at", "i.seller_id", "s.full_name", "s.email"])
    .orderBy("i.item_location")
}


// to get a specific item by location by id
function getItemsByLocationById(id) {
  return db("items as i")
  .innerJoin("sellers as s", "s.id", "i.seller_id")
  .select(["i.id", "i.item_location", "i.item_name", "i.item_description", "i.item_price", "i.item_category", "i.url_item", "i.added_at", "i.seller_id", "s.full_name", "s.email"])
  .where("i.id", id)
  .first();
}

// to get items searched by category
function getItemsByCategory() {
    return db("items as i")
    .innerJoin("sellers as s", "s.id", "i.seller_id")
    .select(["i.id", "i.item_category", "i.item_name", "i.item_description", "i.item_price", "i.item_location", "i.url_item", "i.added_at", "i.seller_id", "s.full_name", "s.email"])
    .orderBy("i.item_category")
}

// to get a specific item by category by id
function getItemsByCategoryId(id) {
  return db("items as i")
  .innerJoin("sellers as s", "s.id", "i.seller_id")
  .select(["i.id", "i.item_category", "i.item_name", "i.item_description", "i.item_price", "i.item_location", "i.url_item", "i.added_at", "i.seller_id", "s.full_name", "s.email"])
  .where("i.id", id)
  .first();
}



// to add a new item
function insertItem(items) {
    return db("items")
      .insert(items)
      .then(([id]) => getItemsById(id));
  }
 
  // to update item
  function updateItem(id, changes) {
    return db("items")
      .where("id", id)
      .update(changes)
      .then(count => (count > 0 ? getItemsById(id) : null));
  }
  
  //to remove a item
  function removeItem(id) {
    return db("items")
      .where("id", id)
      .del();
  }
  



module.exports = {
 getItems,
 getItemsBySeller, 
 getItemsById,
 getItemsByLocation,
 getItemsByLocationById,
 getItemsByCategory,
 getItemsByCategoryId,
 insertItem,
 updateItem,
 removeItem
};