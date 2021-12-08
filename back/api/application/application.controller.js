const {
    getStoreApplication,
    create,
    update 
} = require("./application.service");

module.exports = {

    createAppplication: (req, res) => {
        const body = req.body;
        create(body, (err, results) => {
          if (err) {
            console.log(body);
            console.log(err);
            return;
          }
          return res.status(200).json(
            results
          );
        });
      },

    updateAppData: (req, res) => {
        const body = req.body;
        
        update(body, (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          return res.status(200).json(
          );
        });
      },


    getApplication: (req, res) => {
        getStoreApplication((err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          return res.json(
            results
          );
        });
      }

}

