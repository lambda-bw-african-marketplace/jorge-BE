const db = require("../auth/customersModel")

function validateCustomersId() {
    return async (req, res, next) => {
      try {
        const customers = await db.findByIdCustomer(req.params.id);
  
        if (customers) {
          req.customers = customers;
          next();
        } else {
          res.status(404).json({
            message: "Invalid customer id",
          });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({
          message: "Error retrieving the customers user",
        });
      }
    };
  }

  function validateCustomers() {
    return (req, res, next) => {
      if (Object.keys(req.body).length === 0) {
        res.status(400).json({
          message: "missing Customers Data",
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
    validateCustomersId,
    validateCustomers
}