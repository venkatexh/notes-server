const jwt = require("jsonwebtoken")

exports.loginRequired = (req, res, next) => {
	try { 
		const token = req.headers.authorization.split(" ")[1]
		jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
			if(decoded) {
				return next()
			} else {
				return next({
					status: 401,
					message: "Please log in first."
				})
			}
		})
	} catch(err) {
		return next({
			status: 401,
			message: "Please log in first."
		})
	}
}

exports.isCorrectUser = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1]
		jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
			if(decoded && decoded.id === req.params.id) {
				return next()
			} else {
				return next({
					status: 401,
					message: "You are not authorized to do this."
				})
			}
		})
		
	} catch(err) {
		return next({
			status: 401,
			message: "You are not authorized to do this."
		})
	}
}