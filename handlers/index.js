const homeHandler = require('./home');
//const filesHandler = require('./static-files');
const productHandler = require('./product');
const categoryHandler = require('./category');

module.exports = { //[homeHandler, filesHandler, productHandler, categoryHandler];
    home: homeHandler,
    product: productHandler,
    category: categoryHandler
}