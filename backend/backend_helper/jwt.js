const jwt = require("jsonwebtoken");
const config = require("../../config/config_dev");
const knex = require("../../helper/knex");
async function authCheck(token) {
    var res;
    if (!token) {
        res = {
            status: "nok",
            message: 'No token provided.'
        }
        return res;
    } else {
        try {
            await jwt.verify(token, config.jwt_conf.secret, function (err, decoded) {
                res = {
                    status: "ok",
                    data: decoded
                }
            });
            return res;

        } catch (e) {
            res = {
                status: "nok",
                message: e
            }
            return res;
        }

    }
}

async function checkRole(data, role) {
    var res;
    try {
        var query = await knex.select('*')
            .from('tb_menu_all as all')
            .join('tb_menu_matrix as matrix', 'all.menu_id', 'matrix.menu_id')
            .where({'all.menu_action': data}, {'matrix,role_id': role}, {'matrix.matrix_status': '1'})
        if (query.length > 0) {
            res = {
                status: "ok",
                data: query
            }
        } else {
            res = {
                status: "nok",
                message: "404"
            }
        }
        console.log(res)
    } catch (e) {
        res = {
            status: "nok",
            message: e
        }
        console.log(res)

    }
}

module.exports = {
    authCheck,
    checkRole
};
