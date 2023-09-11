export default (req, res, next) => {
    if (!req.cookies.token) {
        res.redirect('/login')
        return
    }
    next()
}