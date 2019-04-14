const backend = require("../../backend/backend_helper/jwt")

async function getMenu(req, res) {
    if (req.cookies.token) {
        var req_url = req.baseUrl;
        var checkAuth = await backend.authCheck(req.cookies.token)
        // var getMenu = await backend.authCheck(req.cookies.token)
        if(checkAuth.status === "ok"){
            res.json(checkAuth)
        }else{
            cookies.set('token', {expires: Date.now()});
            res.render('view_dashboard/login');

        }
        // var checkRole = await backend.checkRole(req_url,checkAuth.data.role)

    } else {
        res.render('view_dashboard/login');
    }
}

module.exports = {
    getMenu
}