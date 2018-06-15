const homeHandler = require('./home');
//const filesHandler = require('./static-files');
const productHandler = require('./product');
const categoryHandler = require('./category');
const userHandler = require('./user')

module.exports = { //[homeHandler, filesHandler, productHandler, categoryHandler];
    home: homeHandler,
    product: productHandler,
    category: categoryHandler,
    user: userHandler
}