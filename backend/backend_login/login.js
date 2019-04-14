const knex = require("../../helper/knex");
const jwt = require("jsonwebtoken");
// const sha1 = require('sha1');
const conf = require("../../config/config_dev");

async function check_login(data) {
    try {
        var res;
        var query = await knex.select('*')
            .from('tb_user')
            .where({'user_uname': data.username}, {'user_pass': data.userpass}, {'user_status': '1'})
        if (query.length > 0) {
            console.log("true")
            /**
             * Set JWT
             * */
            let datas = {
                id: query[0].user_id,
                nama: query[0].user_name,
                username: query[0].user_uname,
                pass: query[0].user_pass,
                role: query[0].role_id
            };

            res = {
                status: "ok",
                token: jwt.sign(datas, conf.jwt_conf.secret, {expiresIn: conf.jwt_conf.expired})
            }
        } else {
            res = {
                status: "nok", message: "Silahkan cek username dan password"
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
    check_login
}