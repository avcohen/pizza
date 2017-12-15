

exports.checkIfAuthenticated = (req, res, next){
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login')
}
