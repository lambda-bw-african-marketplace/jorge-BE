const express = require("express")
const db = require("../items/itemsModel")
const { authSellers, authCustomers } = require("../middleware/auth")
const { validateItems, validateItemsById, validateItemsByLocationById, validateItemsByCategoryId } = require("../middleware/items")

const router = express.Router()

// to get all items 
router.get("/items",  async (req, res, next) => {
	try {
		const items = await db.getItems(req.params.id)
		res.json(items)
	} catch(err) {
		next(err)
	}
})

// to get a specific item 
router.get("/items/:id",  validateItemsById(), (req, res) => {
    res.status(200).json(req.items);
  });

// to get all items of specific seller
router.get("/sellers/:seller_id/items",  authSellers(), async (req, res, next) => {
	try {
		const items = await db.getItemsBySeller(req.params.seller_id)
		res.json(items)
	} catch(err) {
		next(err)
	}
})

// to get specific item by id for specific seller
router.get("/sellers/:seller_id/items/:id", authSellers(), validateItemsById(), (req, res) => {
    res.status(200).json(req.items);
  });

// to get all items by searched by location
router.get("/location/search", authCustomers(), async (req, res, next) => {
	try {
		const items = await db.getItemsByLocation(req.params.id)
		res.json(items)
	} catch(err) {
		next(err)
	}
})

// to get a specific item by location
router.get("/location/search/:id", authCustomers(), validateItemsByLocationById(), (req, res) => {
    res.status(200).json(req.items);
  });

  // to get all items by searched by category
router.get("/category/search", authCustomers(), async (req, res, next) => {
	try {
		const items = await db.getItemsByCategory(req.params.id)
		res.json(items)
	} catch(err) {
		next(err)
	}
})

// to get a specific item by category
router.get("/category/search/:id", authCustomers(), validateItemsByCategoryId(), (req, res) => {
    res.status(200).json(req.items);
  });



// request to add a new item
router.post("/items", authSellers(), validateItems(), async (req, res, next) => {
	try {
   
	   const items = await db.insertItem(req.body);
   
	   res.status(201).json(items);
	 } catch (err) {
	   next(err);
	 } 
   });
   
   
// request to updateitems
router.put("/items/:id", authSellers(), validateItemsById(),  validateItems(),async (req, res, next) => {
	 try {
	   const items = await db.updateItem(req.params.id, req.body);
   
	   if (items) {
		 res.status(200).json(items);
	   } else {
		 res.status(404).json({
		   message: "The items could not be found",
		 });
	   }
	 } catch (error) {
	   next(error);
	 }
   });
   
   // request to delete items
   router.delete("/items/:id", authSellers(), validateItemsById(), async (req, res, next) => {
	 try {
	   const items = await db.removeItem(req.params.id);
   
	   if (items > 0) {
		 res.status(200).json({
		   message: "The item has been erased.",
		 });
	   } else {
		 res.status(404).json({
		   message: "The item could not be found",
		 });
	   }
	 } catch (error) {
	   next(error);
	 }
   });
   
module.exports = router

