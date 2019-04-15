const moment = require('moment');
const knex = require("../../helper/knex");
let pattern = /\D+/g;
async function insertInvoice(id, data) {
    var res;
    try {
        var dataInsert = {
            invoice_id: "INV" + moment().format("YYYYMMDDHHmmssx"),
            invoice_price: data.amount.replace(pattern, ""),
            invoice_total: data.total,
            invoice_status: 1,
            created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
            created_by: id
        }
        var query = await knex('tb_invoice').insert(dataInsert)
        res = {
            status: "ok",
            message: "Data Penjualan Berhasil Diinput"
        }
        return res
    } catch (e) {
        res = {
            status: "nok",
            message: e
        }
        return res
    }
}

module.exports = {
    insertInvoice
}