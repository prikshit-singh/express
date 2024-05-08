const jwt = require('jsonwebtoken');

 const authenticateToken =  async(req, res, next) => {
    const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
// console.log(authHeader,token)
    if (!authHeader) {
        return res.sendStatus(401);
    }

    jwt.verify(authHeader, 'secretkeygitgurus', (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}


module.exports = authenticateToken