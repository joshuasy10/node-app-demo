import { Request, Response } from "express";
import session = require("express-session");
import { Product } from "./model/product";

const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');

const app = express();

// configure nunjucks
const appViews = path.join(__dirname, '/views/');

const nunjucksConfig = {
    autoescape: true,
    noCache: true,
    express: app
};

nunjucks.configure(appViews, nunjucksConfig);

// confugure Express
app.set('view engine', 'html');

app.use('public', express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session({secret: 'abcdefg', cookie: {maxAge: 60000}}))
declare module "express-session" {
    interface SessionData {
        product: Product;
        token: string;
    }
}

app.listen(3000, () =>{
    console.log('Server listening on port 3000');
});

// Express Routes
app.get('/', (req: Request, res: Response) => {
    res.render('pizza',{
        title: 'New Pizza Time',
    });
});

require('./controller/productController')(app);
require('./controller/orderController')(app);
require('./controller/authController')(app);
