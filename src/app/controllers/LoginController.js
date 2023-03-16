class LoginController{
    login(req, res, next) {
        res.render('Login', {
            title: 'Login'
        })
    }
}

module.exports = new LoginController();