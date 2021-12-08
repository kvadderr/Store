const pool = require("../../config/database");

module.exports = {

  create: (data, callBack) => {
    pool.query(
      `insert into users(FIO, login, password, role) 
                values(?,?,?,?)`,
      [
        data.FIO,
        data.login,
        data.password,
        data.role
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getData: callBack => {
    pool.query(
      `select * from users`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  
    
  updateData: (data, callBack) => {
    pool.query(
      `update users set FIO=?, login=?, password=?, role=? where id_user=?`,
      [
        data.FIO,
        data.login,
        data.password,
        data.role,
        data.id_user
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  deleteData: (id, callBack) => {
    pool.query(
      `delete from users where id_user = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  getUserByUserEmail: (login, password, callBack) => {
    pool.query(
      `select * from users where login = ? AND password = ?`,
      [
        login,
        password
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};