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

async function getListInv(req, res, next) {
    let draw = req.query.draw;
    let start = parseInt(req.query.start);
    let length = parseInt(req.query.length);
    let order = req.query.order;

    let custom_search = {
        search_tanggal: req.query.search_tanggal
    };
    if (req.cookies.token) {
        var listInv = await backend.getListInvoice(start, length, draw, order, custom_search, req.cookies.token)
        res.json({
            draw: draw,
            recordsTotal: listInv.recordsTotal,
            recordsFiltered: listInv.recordsFiltered,
            data: listInv.data
        });
    } else {
        res.render('view_dashboard/login');
    }
}

async function getDetail(req, res, id) {
    if (req.cookies.token) {
        var detailInv = await backend.getDetailInvoice(req.query.id, req.cookies.token)
        console.log(detailInv)
        if (detailInv.status === "ok") {
            res.json(detailInv);
        } else {
            res.render('404');
        }
    } else {
        res.render('view_dashboard/login');
    }
}

module.exports = {
    getDetail,
    getInv,
    getListInv,
    insertInv
}