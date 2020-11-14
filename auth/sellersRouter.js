const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const db = require("./sellersModel")
const { validateSellersId, validateSellers } = require("../middleware/sellers")
const { authSellers } = require("../middleware/auth")

const router = express.Router()

// to get all sellers

router.get("/", authSellers(), async (req, res, next) => {
	try {
		res.json(await db.findSellers())
	} catch(err) {
		next(err)
	}
})

//specific seller by id

router.get("/:id", authSellers(), async(req,res,next) =>{
    try {
        const seller = await db.findByIdSeller(req.params.id)
        if(!seller){
            return res.status(404).json({
                message: "seller Not Found"
            })
        }
        res.json(seller)

    }catch(err){
        next(err)
    }
})

// register a seller

router.post("/register", validateSellers(), async (req, res, next) => {
	try {
		const { email, password, full_name } = req.body
		const seller = await db.findBySeller({ email }).first()


		if (seller) {
			return res.status(409).json({
				message: "email already exist",
			})
		}

		const newSeller = await db.addSeller({
			email,
            password: await bcrypt.hash(password, 14),
            full_name,
		})

		.then(info => { res.status(201).json({ message: "Registration Successful", info });})

        res.status(201).json(newSeller)
        
	} catch(err) {
		next(err)
	}
})

// login a seller account

router.post("/login", validateSellers(), async (req, res, next) => {
	try {
		const { email, password } = req.body
		const seller = await db.findBySeller({ email }).first()
		
		if (!seller) {
			return res.status(401).json({
				message: "Seller Email is Invalid",
			})
		}

		const passwordValid = await bcrypt.compare(password, seller.password)

		if (!passwordValid) {
			return res.status(401).json({
				message: "Seller Credentials Are Invalid",
			})
		}

		const token = jwt.sign({
			sellerID: seller.id,
		}, process.env.JWT_SECRET_SELLER)


        res.json({
			message: `Welcome ${seller.full_name}!`,
			token,
			seller_id: seller.id,

		})
	} catch(err) {
		next(err)
	}
})

//update a seller

router.put("/:id",  authSellers(), validateSellersId(), async (req, res, next) => {
	try {
		const changes = req.body;
		if (changes.password) {
		  changes.password = bcrypt.hashSync(changes.password, 14);
		}
	  const sellers = await db.updateSeller(req.params.id, req.body);
	
	  if (sellers) {
		res.status(200).json(sellers);
	  } else {
		res.status(404).json({
		  message: "The seller could not be found",
		});
	  }
	} catch (error) {
	  next(error);
	}
  });



// remove a seller

router.delete('/:id', authSellers(), validateSellersId(), async (req, res, next) => {
	
	try {
		const action = await db.removeSeller(req.params.id);
	
		if (action > 0) {
		  res.status(200).json({
			message: "The seller has been erased",
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