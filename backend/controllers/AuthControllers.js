
exports.verifyToken = (req,res) =>{
    res.json({user: req.user});
 }