const jwt =  require('jsonwebtoken')

const auth = async (req, res, next)=> {
    try {
        const token = req.headers.authorization
        const decoded = jwt.verify(token ,process.env.JWT_SECRET);
        req.currentUser = decoded;
        if(!token){
            res.status(401).json({message: "Invaild Token!"})
        }
    } catch (e) {
        res.status(500).json(e.message)
    }
    next()
};

module.exports = auth