class HomeController{
    home(req, res, next) {
        res.render('home', {
            title: 'Home'
        })
    }
}

module.exports = new HomeController();