//const url = require('url');
//const fs = require('fs');
//const path = require('path');
//var qs = require('qs');
const Product = require('../models/Product');

module.exports.index = (req, res) => {
    /* let filePath = path.normalize(
        path.join(__dirname, '../views/home/index.html'));

    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.log(err);
            res.writeHead(404, {
                'Content-Type': 'text/plain'
            });
            res.write('404 not found!');
            res.end();
            return;
        }
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
 */
    let queryData = req.query;

    Product.find({buyer: null}).populate('category').then((products) => {
        if (queryData.query) {
            products = products.filter(
                p => p.name.toLowerCase().includes(queryData.query));
        }
        let data = { products: products};
        if(req.query.error) {
            data.error = req.query.error;
        } else if(req.query.success) {
            data.success = req.query.success;
        }

        res.render('home/index', data);
        /* let content = '';
        for (let product of products) {
            content += `<div class="product-card">
            <img class="product-img" src="${product.image}">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            </div>`
        }

        let html = data.toString().replace('{content}', content);
        res.write(html);
        res.end(); */
    });
} 