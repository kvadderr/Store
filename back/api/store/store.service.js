const pool = require("../../config/database");


module.exports = {
    create: (data, callBack) => {
        pool.query(
          `insert into product(model, detail, articul, price, image, catalog) 
                    values(?,?,?,?,?,?)`,
          [
            data.model,
            data.detail,
            data.articul,
            data.price,
            data.image,
            data.catalog
          ],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
        );
      },

    remove: (id, callBack) => {
        pool.query(
          `DELETE from product WHERE id_product=?`,
          [id],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
        );
      },
    update: (data, callBack) => {
        pool.query(
          `update product set model = ? , detail = ?, articul = ?, price = ?, image = ?, catalog = ? WHERE id_product=?`,
          [
            data.model,
            data.detail,
            data.articul,
            data.price,
            data.image,
            data.catalog,
            data.id
          ],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
        );
      },
    getStoreProducts : callBack => {
        pool.query(
            `select * from product`,
            [],
            (error, results, fields) => {
              if (error) {
                callBack(error);
              }
              return callBack(null, results);
            }
          );
    }
}
