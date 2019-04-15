const backend = require("../../backend/backend_inv/inv")
const backendCheckRole = require("../../backend/backend_helper/jwt")

async function getInv(req, res) {
    try {
        if (req.cookies.token) {
            var req_url = req.baseUrl;
            var checkRole = await backendCheckRole.checkRole(req_url, req.cookies.token)
            if (checkRole.status === "ok") {
                res.render('view_inv/inv');
            } else {
                if (checkRole.message === "Failed Authenticated") {
                    res.clearCookie('token').render('view_dashboard/login');
                } else {
                    res.render('404');
                }
            }
        } else {
            res.render('view_dashboard/login');
        }
    } catch (e) {
        res.render('404');

    }

}

async function insertInv(req, res) {
    try {
        if (req.cookies.token) {
            var checkAuth = await backendCheckRole.authCheck(req.cookies.token)
            if (checkAuth.status === "ok") {
                var insertInv = await backend.insertInvoice(checkAuth.data.id, req.body)
                res.json(insertInv);
            } else {
                if (checkAuth.message === "Failed Authenticated") {
                    res.clearCookie('token').render('view_dashboard/login');
                } else {
                    res.render('404');
                }
            }
        } else {
            res.render('view_dashboard/login');
        }
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    getInv,
    insertInv
}