const {
    create,
    createBasket,
    getDataOrder,
    getDataProducts,
    getDataClient,
    createClient,
    updateOrder, 
    updateClient,
    getAllDataOrder
} = require("./order.service");

const nodemailer = require('nodemailer')

let clientMail, clientFIO, orderStatus;

let transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '6ac026dd17e2ef',
    pass: '9fe767dca28972',
  },
})

const options  = {
  from: "<kvadder.shop@example.com>",
  to: clientMail,
  subject: orderStatus,
  text: "Приветствую, " + clientFIO + ". Ваш заказ получил статус '"+orderStatus+"'"
}

module.exports = {

    createOrder: (req, res) => {
        const body = req.body;
        create(body, (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log(results.insertId);
          return res.status(200).json(
            
            createBasket(results.insertId, body, (err, results) => {
                if (err) {
                  
                  console.log(err);
                  return;
                }
                return res.status(200).json(
                  
                );
              })
          );
        });
      },
    
    createClient: (req, res) => {
        const body = req.body;
        createClient(body, (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          return res.status(200).json(
            
            updateOrder(body, (err, results) => {
                if (err) {
                  
                  console.log(err);
                  return;
                }
                return res.status(200).json(
                  transporter.sendMail(options, function (err, info){
                    if (err) {
                      console.log(err);
                      return;
                    }
                    console.log(info.response);
                  })
                );
              })
          );
        });
      },

    updateClientData: (req, res) => {
      const body = req.body;
      
      updateClient(body, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.status(200).json(
          
          updateOrder(body, (err, results) => {
              if (err) {
                
                console.log(err);
                return;
              }
              console.log("CLIENT UPDADED");
              return res.status(200).json(
                transporter.sendMail(options, function (err, info){
                  if (err) {
                    console.log(err);
                    return;
                  }
                  console.log(info.response);
                })
              );
              
            })
        );
      });
    },

    getProducts: (req, res) => {

        const id = req.params.id;

        getDataProducts(id, (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          return res.json(
            results
          );
        });
    },

    getClient: (req, res) => {

      const id = req.params.phone;

      getDataClient(id, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json(
          results
        );
      });
  },

    getData: (req, res) => {
        getDataOrder((err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          return res.json(
            results
          );
        });
      },

      getAllData: (req, res) => {
        getAllDataOrder((err, results) => {
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

