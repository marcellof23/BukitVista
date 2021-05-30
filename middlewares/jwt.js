const jwt = require('jsonwebtoken')

module.exports = function verifyToken(req,res,next){
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, "secretkey");
        res.cookie("token", token, {
			httpOnly: true,
			maxAge: 90000,
		});
        req.token = token;
        next();
    } catch (error) {
        res.status(401).json({ message: "Authentication failed!" });
    }
}