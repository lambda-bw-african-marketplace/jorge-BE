const jwt = require("jsonwebtoken")


function authSellers() {
    return async (req, res, next) => {

        const authError = {
            message: "Invalid Sellers Credentials"
        }
        try {
            const token = req.headers.authorization
            if (!token) {
                return res.status(401).json(authError)
            }

            jwt.verify(token, process.env.JWT_SECRET_SELLER, (err, decoded) => {
                if (err) {
                    return res.status(401).json(authError)
                }

                req.token = decoded

                next()
            })
        } catch(err) {
            next(err)
        }
    }
}

function authCustomers() {
    return async (req, res, next) => {

        const authError = {
            message: "Invalid Customer Credentials"
        }
        try {
            const token = req.headers.authorization
            if (!token) {
                return res.status(401).json(authError)
            }

            jwt.verify(token, process.env.JWT_SECRET_CUSTOMER, (err, decoded) => {
                if (err) {
                    return res.status(401).json(authError)
                }

                req.token = decoded

                next()
            })
        } catch(err) {
            next(err)
        }
    }
}

module.exports = {
    authSellers,
    authCustomers
}