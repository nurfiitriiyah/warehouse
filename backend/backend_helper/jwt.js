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
                if (err) {
                    res = {
                        status: "nok",
                        message: 'Failed Authenticated'
                    }
                }
                else {
                    res = {
                        status: "ok",
                        data: decoded
                    }
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

async function checkRole(data, token) {
    var res;
    try {
        var checkAuth = await authCheck(token);
        if (checkAuth.status === "ok") {
            var query = await knex.select('menu_action', 'menu_label')
                .from('tb_menu_all as alls')
                .join('tb_menu_matrix as matrix', 'alls.menu_id', 'matrix.menu_id')
                .where({'menu_action': data , 'role_id' : checkAuth.data.role,'matrix_status': 1})
            if (query.length > 0) {
                res = {
                    status: "ok"
                }
            } else {
                res = {
                    status: "nok",
                    message: "404"
                }
            }
        } else {
            res = {
                status: "nok",
                message: checkAuth.message
            }
        }
        return res;
    } catch (e) {
        res = {
            status: "nok",
            message: e
        }
        return res;
    }
}

module.exports = {
    authCheck,
    checkRole
};
