const pool = require("../../config/database");


module.exports = {
    create: (data, callBack) => {
        pool.query(
          "INSERT INTO  product(model, detail, articul, price, image, catalog) VALUES (?, ?, ?, ?, ?, ?)",
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

    getData : callBack => {
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
