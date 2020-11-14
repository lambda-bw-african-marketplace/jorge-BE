const db = require("../items/itemsModel");

function validateItemsById() {
    return async (req, res, next) => {
      try {
        const items = await db.getItemsById(req.params.id);
  
        if (items) {
          req.items = items;
          next();
        } else {
          res.status(404).json({
            message: "Invalid items id",
          });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({
          message: "Error retrieving the Items",
        });
      }
    };
  }

  function validateItemsByLocationById() {
    return async (req, res, next) => {
      try {
        const items = await db.getItemsByLocationById(req.params.id);
  
        if (items) {
          req.items = items;
          next();
        } else {
          res.status(404).json({
            message: "Invalid items by id location",
          });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({
          message: "Error retrieving the Items by location",
        });
      }
    };
  }

  function validateItemsByCategoryId() {
    return async (req, res, next) => {
      try {
        const items = await db.getItemsByCategoryId(req.params.id);
  
        if (items) {
          req.items = items;
          next();
        } else {
          res.status(404).json({
            message: "Invalid items by id category",
          });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({
          message: "Error retrieving the Items by category",
        });
      }
    };
  }

  function validateItems() {
    return (req, res, next) => {
      if (Object.keys(req.body).length === 0) {
        res.status(400).json({
          message: "missing Items Data",
        });
      } else if (!req.body.item_name || !req.body.item_description || !req.body.item_price || !req.body.item_category || !req.body.item_location ) {
        res.status(400).json({
          message: "missing required item_name, item_description, item_price, item_category, and item_location fields",
        });
      } else {
        next();
      }
    };
  }

module.exports = {
    validateItemsById,
    validateItemsByLocationById,
    validateItemsByCategoryId,
    validateItems
}