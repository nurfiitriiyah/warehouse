const moment = require('moment');
const knex = require("../../helper/knex");
let pattern = /\D+/g;
const getDecoded = require('../backend_helper/jwt')

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

function getListInvoice(start, length, draw, order, custom_search, token) {
    return new Promise((resolve, reject) => {
        var res;
        let orderDir = order[0].dir;
        let orderColumn = parseInt(order[0].column);
        var query = knex.select('inv.*', 'user.user_name')
            .from('tb_invoice as inv')
            .join('tb_user as user', 'inv.created_by', 'user.user_id');
        switch (orderColumn) {
            case 0:
                query = query.orderBy('created_at', orderDir);
                break;
            case 1:
                query = query.orderBy('created_at', orderDir);
                break;
            case 2:
                query = query.orderBy('user_name', orderDir);
                break;
            case 3:
                query = query.orderBy('invoice_total', orderDir);
                break;
            case 4:
                query = query.orderBy('invoice_price', orderDir);
                break;
            default:
                query = query.orderBy('created_at', 'DESC');
                break;
        }
        query.then((resultFull) => {
            query.limit(length).offset(start).then((result) => {
                let data = [];
                for (let i = 0; i < result.length; i++) {
                    data[i] = [];
                    data[i][0] = (i + 1) + (start);
                    data[i][1] = result[i].created_at;
                    data[i][2] = result[i].user_name;
                    data[i][3] = result[i].invoice_total;
                    data[i][4] = result[i].invoice_price;
                    data[i][5] = result[i].invoice_id;
                }
                resolve({
                    data: data,
                    recordsTotal: resultFull.length,
                    recordsFiltered: resultFull.length
                });
            })
        }).catch((error) => {
            reject(error.message);
        });


    })
}

async function getDetailInvoice(id, token) {
    var res;
    try {
        console.log("--------")
        console.log(id)
        var query = await knex.select('inv.*', 'user_name')
            .from('tb_invoice as inv')
            .join('tb_user as users', 'inv.created_by', 'users.user_id')
            .where('invoice_id',id)
        res = {
            status: "ok",
            data: query
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
    insertInvoice, getListInvoice, getDetailInvoice
}