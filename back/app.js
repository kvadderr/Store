const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const userRouter = require("./api/users/user.router");
const postRouter = require("./api/posts/post.router");
const storeRouter = require("./api/store/store.router");
const ApplicationRouter = require ("./api/application/application.router");
const orderRouter = require("./api/order/order.router");

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/store", storeRouter);
app.use("/api/application", ApplicationRouter);
app.use("/api/order", orderRouter);

app.listen(4000);
console.log("Сервер на порту 4000: Запущен");