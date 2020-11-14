const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const db = require("./customersModel")
const { validateCustomersId, validateCustomers } = require("../middleware/customers")
const { authCustomers } = require("../middleware/auth")

const router = express.Router()

// to get all customers

router.get("/", authCustomers(), async (req, res, next) => {
	try {
		res.json(await db.findCustomers())
	} catch(err) {
		next(err)
	}
})

//specific customer by id

router.get("/:id", authCustomers(), async(req,res,next) =>{
    try {
        const customer = await db.findByIdCustomer(req.params.id)
        if(!customer){
            return res.status(404).json({
                message: "Customer Not Found"
            })
        }
        res.json(customer)

    }catch(err){
        next(err)
    }
})

// register a customer

router.post("/register", validateCustomers(), async (req, res, next) => {
	try {
		const { email, password, full_name } = req.body
		const customer = await db.findByCustomer({ email }).first()


		if (customer) {
			return res.status(409).json({
				message: "email already exist",
			})
		}

		const newCustomer = await db.addCustomer({
			email,
            password: await bcrypt.hash(password, 14),
            full_name,
		})

		.then(info => {res.status(201).json({message: "Registration Successful", info});})

		res.status(201).json(newCustomer)
	} catch(err) {
		next(err)
	}
})

// login customer account

router.post("/login", validateCustomers(), async (req, res, next) => {
	try {
		const { email, password } = req.body
		const customer = await db.findByCustomer({ email }).first()
		
		if (!customer) {
			return res.status(401).json({
				message: "Customer Email is Invalid",
			})
		}

		const passwordValid = await bcrypt.compare(password, customer.password)

		if (!passwordValid) {
			return res.status(401).json({
				message: "Customer Credentials Are Invalid",
			})
		}

		const token = jwt.sign({
			userID: customer.id,
		}, process.env.JWT_SECRET_CUSTOMER)


    
        
		res.json({
			message: `Welcome ${customer.full_name}!`,
			token,
			customer_id: customer.id,

		})
	} catch(err) {
		next(err)
	}
})

//update customers 

router.put("/:id",  authCustomers(), validateCustomersId(), async (req, res, next) => {
	try {
		const changes = req.body;
		if (changes.password) {
		  changes.password = bcrypt.hashSync(changes.password, 14);
		}
	  const customers = await db.updateCustomer(req.params.id, req.body);
	
	  if (customers) {
		res.status(200).json(customers);
	  } else {
		res.status(404).json({
		  message: "The costumer could not be found",
		});
	  }
	} catch (error) {
	  next(error);
	}
  });



// remove a customer

router.delete('/:id', authCustomers(), validateCustomersId(), async (req, res, next) => {
	
	try {
		const action = await db.removeCustomer(req.params.id);
	
		if (action > 0) {
		  res.status(200).json({
			message: "The customer has been erased",
		  });
		} else {
		  res.status(404).json({
			message: "The action could not be found",
		  });
		}
	  } catch (error) {
		next(error);
	  }
	});


module.exports = router