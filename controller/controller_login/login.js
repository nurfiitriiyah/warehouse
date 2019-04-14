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
        await backend.check_login(req.body)
        res.cookie('token', 'express').render('view_dashboard/dashboard');
    } catch (e) {
        console.log(e)
    }
}



module.exports = {
    checkID, setID
}