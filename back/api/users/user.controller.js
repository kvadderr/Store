const {
    create,
    getData,
    updateData,
    deleteData,
    getUserByUserEmail
  } = require("./user.service");

  
  module.exports = {
    createUser: (req, res) => {
      const body = req.body;
      create(body, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.status(200).json({
          data: results
        });
      });
    },
    
   
    getUsers: (req, res) => {
      getData((err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json(results);
      });
    },
  
    updateUsers: (req, res) => {
	    const body = req.body;
      updateData(body, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.status(200).json({
          results
        });
      });
      },

      deleteUser: (req, res) => {
        const id = req.params.id;

        deleteData(id, (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          return res.status(200).json({
            success: 1,
            data: results
          });
        });
      },
      
      login: (req, res) => {
        const login = req.params.login;
        const password = req.params.password;
  
        getUserByUserEmail(login, password, (err, results) => {
          if (err) {
            console.log(err);
          }
  
          if (!results) {
            return res.status(500).json({
              success: 0,
              data: "Invalid login or password"
            });
          } else {
            return res.json(results);
          }
        });
      }
    
   
  };