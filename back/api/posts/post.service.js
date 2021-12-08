const pool = require("../../config/database");


module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into post(userId, title, detail, image) 
                values(?,?,?, ?)`,
      [
        data.userID,
        data.title,
        data.detail,
        data.Image
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updatePost: (data, callBack) => {
    pool.query(
      `update post set UserID = ?, Title = ?, Detail = ?, Image = ? where Id = ?`,
      [
        data.userID,
        data.title,
        data.detail,
        data.Image,
        data.Id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  createCOMMENT: (data, callBack) => {
    pool.query(
      `insert into comment(postid, comment, userid, image) 
                values(?,?,?, ?)`,
      [
        data.postid,
        data.comment,
        data.userid,
        data.Image
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getPosts: callBack => {
    pool.query(
      `select * from post`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getComments: (id,callBack) => {
    pool.query(
      `select  comment.Comment AS "Message", comment.Image, users.Nick from comment INNER JOIN users ON comment.userid = users.id where postid = ? `,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getPostsByUser: (id, callBack) => {
    pool.query(
      `select * from post where UserId = ? `,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getFavoritePost: (id, callBack) => {
    pool.query(
      `SELECT * FROM post WHERE id IN (SELECT id_post FROM favorite WHERE id_user=?)  ORDER BY id DESC`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

};