const pool = require("../../config/database");


module.exports = {
  
    create: (data, callBack) => {
      pool.query(
        "INSERT INTO `order`(`phone`, `status`) VALUES (?, 'Рассматривается')",
        [
          data.phone
        ],
        (error, results, fields) => {
          if (error) {callBack(error)}
          return callBack(null, results);
        }
      );
    },

    createClient: (data, callBack) => {
        pool.query(
          "INSERT INTO `client`(`phone`, `FIO`, `mail`) VALUES (?, ?, ?)",
          [
            data.phone,
            data.FIO,
            data.mail
          ],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
        );
      },

      updateClient: (data, callBack) => {
        pool.query(
          "UPDATE `client` SET `FIO`=?, `mail`=? WHERE `phone`=?",
          [
            data.FIO,
            data.mail,
            data.phone
          ],
          (error, results, fields) => {
            if (error) {callBack(error)}
            return callBack(null, results);
          }
        );
      },

      updateOrder: (data, callBack) => {
        pool.query(
          "UPDATE `order` SET `status`=? WHERE `id_order`=?",
          [
            data.status,
            data.id_order
          ],
          (error, results, fields) => {
            if (error) {callBack(error)}
            return callBack(null, results);
          }
        );
      },

    createBasket: (id, data, callBack) => {
       
       for (i in data.products){
        pool.query(
          `insert into basket(id_order, id_product, count) 
                    values(?, ?, ?)`,
          [
            id,
            data.products[i].id_product,
            data.products[i].count
          ],
          (error, results, fields) => {
            if (error) {callBack(error)}
            return callBack(null, results);
          }
        );
       }

        
      },

      getDataOrder: callBack => {
        pool.query(
          'SELECT * FROM `order` WHERE `status`=? ORDER BY `id_order` DESC',
          ["Рассматривается"],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
        );
      },

      getAllDataOrder: callBack => {
        pool.query(
          'SELECT * FROM `order` ORDER BY `id_order` DESC',
          [],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
        );
      },

      getDataProducts: (id, callBack) => {
        pool.query(
          'SELECT product.model, product.price, product.catalog, basket.count FROM basket INNER JOIN product ON basket.id_product = product.id_product WHERE id_order = ?',
          [id],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
        );
      },

      getDataClient: (id, callBack) => {
        pool.query(
          'SELECT * FROM client WHERE phone = ?',
          [id],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
        );
      }

 
}
