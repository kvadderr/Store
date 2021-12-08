const {
    getStoreProducts,
    create, 
    update,
    remove 
} = require("./store.service");

module.exports = {

    createProduct: (req, res) => {
        const body = req.body;
        create(body, (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          return res.status(200).json({
            body: body,
            success: 1,
            data: results
          });
          console.log(body);
        });
      },

    updateProducts: (req, res) => {
      const body = req.body;
      update(body, (err, results) => {
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

    deleteProducts: (req, res) => {
        const body = req.body;
        const id = req.params.id;

        remove(id, (err, results) => {
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

    getProducts: (req, res) => {
        getStoreProducts((err, results) => {
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

