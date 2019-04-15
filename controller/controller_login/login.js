const backend = require("../../backend/backend_login/login")
const backendCheckRole = require("../../backend/backend_helper/jwt")

async function checkID(req, res) {
    try{
        if (req.cookies.token) {
            var req_url = req.baseUrl;
            var checkRole = await backendCheckRole.checkRole(req_url,req.cookies.token)
            if(checkRole.status === "ok" ){
                res.render('view_dashboard/dashboard');
            }else{
                res.render('404');
            }
        } else {
            res.render('view_dashboard/login');
        }
    }catch (e) {
        res.render('404');

    }

}

async function setID(req, res) {
    try {
        var login = await backend.check_login(req.body)
        if (login.status === "ok") {
            res.cookie('token', login.token).render('view_dashboard/dashboard');
        } else {
            res.render('view_dashboard/login', {message: login.message});
        }
    } catch (e) {
        console.log(e)
    }
}


module.exports = {
    checkID, setID
}