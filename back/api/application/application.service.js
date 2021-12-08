const pool = require("../../config/database");


module.exports = {
    create: (data, callBack) => {
        pool.query(
          `insert into application(phone, status) 
                    values(?,?)`,
          [
            data.phone,
            "Рассматривается"
          ],
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
          "UPDATE `application` SET `status`=? WHERE `id_application`=?",
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

    getStoreApplication : callBack => {
        pool.query(
            `select * from application ORDER BY id_application DESC`,
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
