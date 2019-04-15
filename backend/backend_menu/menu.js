const knex = require("../../helper/knex");
const getDecoded = require('../backend_helper/jwt')

async function getMenu(token) {
    var res;
    try {
        var cekAuth = await getDecoded.authCheck(token)
        if (cekAuth.status === "ok") {
            var query = await knex.select('*')
                .from('tb_menu_all as all')
                .join('tb_menu_matrix as matrix', 'all.menu_id', 'matrix.menu_id')
                .where({'matrix.role_id': cekAuth.data.role , 'matrix.matrix_status': 1})
            res = {
                status: "ok",
                data: query
            }
        } else {
            res = {
                status: "nok",
                message: cekAuth.message
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
    getMenu
};
