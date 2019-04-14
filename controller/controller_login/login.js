const backend = require("../../backend/backend_login/login")

function checkID(req, res) {
     if (req.cookies.token) {
        res.render('view_dashboard/dashboard');
    } else {
        res.render('view_dashboard/login');
    }
}

async function setID(req, res) {
    try {
        var login =  await backend.check_login(req.body)
        if(login.status === "ok" ){
            res.cookie('token', login.token).render('view_dashboard/dashboard');
        }else{
            res.render('view_dashboard/login', { message: login.message });
        }
    } catch (e) {
        console.log(e)
    }
}



module.exports = {
    checkID, setID
}