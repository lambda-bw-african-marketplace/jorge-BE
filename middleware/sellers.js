const db = require("../auth/sellersModel");

function validateSellersId() {
    return async (req, res, next) => {
      try {
        const sellers = await db.findByIdSeller(req.params.id);
  
        if (sellers) {
          req.sellers = sellers;
          next();
        } else {
          res.status(404).json({
            message: "Invalid seller id",
          });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({
          message: "Error retrieving the sellers user",
        });
      }
    };
  }

  function validateSellers() {
    return (req, res, next) => {
      if (Object.keys(req.body).length === 0) {
        res.status(400).json({
          message: "missing Sellers Data",
        });
      } else if (!req.body.email || !req.body.password) {
        res.status(400).json({
          message: "missing required email, and password field",
        });
      } else {
        next();
      }
    };
  }

module.exports = {
    validateSellersId,
    validateSellers
}