
const {
    create,
    getPosts,
    getPostsByUser,
    getFavoritePost,
    createCOMMENT,
    getComments,
    updatePost
  } = require("./post.service");
  
  module.exports = {
    createPost: (req, res) => {
      const body = req.body;
      body.Image = req.file.path;
      create(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection errror"
          });
        }
        return res.status(200).json({
          success: 1,
          data: results
        });
      });
    },
    updatePosts: (req, res) => {
      const body = req.body;
      body.Image = req.file.path;
      console.log(body);
      updatePost(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection errror"
          });
        }
        return res.status(200).json({
          success: 1,
          message: "updated successfully"
        });
      });
      
    },
    createComments: (req, res) => {
      const body = req.body;
      body.Image = req.file.path;
      createCOMMENT(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection errror"
          });
        }
        return res.status(200).json({
          success: 1,
          data: results
        });
      });
    },
    getPosts: (req, res) => {
      getPosts((err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json(results);
      });
    },
    getCommentsById: (req, res) => {

      const id = req.params.id;

      getComments(id, (err, results) => {
        
        if (err) {
          console.log(err);
          return;
        }
        return res.json(results);
      });
    },
    getPostsByUserId: (req, res) => {

      const id = req.params.id;

      getPostsByUser(id, (err, results) => {
        
        if (err) {
          console.log(err);
          return;
        }
        return res.json(results);
      });
    },
       
    getFavPost: (req, res) => {

      const id = req.params.id;
      getFavoritePost(id,  (err, results) => {
        
        if (err) {
          console.log(err);
          return;
        }
        return res.json(results);
      });
    }	

  };