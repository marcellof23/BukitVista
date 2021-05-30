const jwt = require('jsonwebtoken')

module.exports = function verifyToken(req,res,next){
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log("YEYYYYYYYYYY")
        console.log(token)
        console.log("KOK GAGAL")
        jwt.verify(token, "secretkey");
        console.log("KOK GAGAL")
        next();
    } catch (error) {
        res.status(401).json({ message: "Authentication failed!" });
    }
}