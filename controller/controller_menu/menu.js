const backendMenu = require("../../backend/backend_menu/menu")

async function getMenu(req, res) {
    if (req.cookies.token) {
        var getMenu =await backendMenu.getMenu(req.cookies.token)
        res.json(getMenu)
    } else {
        res.render('view_dashboard/login');
    }
}

module.exports = {
    getMenu
}