//const url = require("url");
// const database = require("../config/database.config");
const fs = require("fs");
//const path = require("path");
//const qs = require("querystring");
//const multiparty = require("multiparty");
//const shortid = require("shortid");

const Product = require("../models/Product");
const Category = require("../models/Category");

module.exports.addGet = (req, res) => {
    /* let filePath = path.normalize(
        path.join(__dirname, "../views/products/add.html")
    );

    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.log(err);
            return;
        } */

    Category.find().then((categories) => {
        res.render('products/add', { categories: categories });

        /* let replacement = '<select class="input-field" name="category"';
        for (let category of categories) {
            replacement += `<option value="${category._id}">${category.name}</option>`;
        }
        replacement += "</select>";

        let html = data.toString().replace("{categories}", replacement);

        res.writeHead(200, {
            "Content-Type": "text/html"
        });

        res.write(html);
        res.end(); */
        //});
    });
}

module.exports.addPost = (req, res) => {
    let productObj = req.body;
    productObj.image = '\\' + req.file.path;

    Product.create(productObj).then((product) => {
        Category.findById(product.category).then((category) => {
            category.products.push(product._id);
            category.save();
        });
        res.redirect('/');
    })
}


module.exports.editGet = (req, res) => {
    let prodId = req.params.id;

    Product.findById(prodId).then((product) => {
        if (!product) {
            res.sendStatus(404);
            return;
        }

        Category.find().then((categories) => {
            res.render('products/edit', {
                product: product, 
                categories: categories
            });
        })
    });
};

module.exports.editPost = (req, res) => {
    let prodId = req.params.id;
    let editedProduct = req.body;

    Product.findById(prodId).then((product) => {
        if (!product) {
            res.redirect(
                `/?error=${enncodeURIComponent('error=Product was not found!')}`);
            return;
        }

        product.name = editedProduct.name;
        product.description = editedProduct.description;
        product.price = editedProduct.price;

        if (req.file) {
            product.image = '\\' + req.file.path;
        }

        if (product.category.toString() !== editedProduct.category) {
            Category.findById(product.category).then((currentCategory) => {
                Category.findById(editedProduct.category).then((nextCategory) => {
                    let index = currentCategory.products.indexOf(product._id);
                    if (index >= 0) currentCategory.products.splice(index, 1);

                    currentCategory.save();

                    nextCategory.products.push(product._id);
                    nextCategory.save();

                    product.category = editedProduct.category;

                    product.save().then(() => {
                        res.redirect(
                            `/?success=${encodeURIComponent('Product was edited successfully!')}`
                        );
                    }).catch(console.log);
                });
            });
        } else {
            product.save().then(() => {
                res.redirect(`/?success=${encodeURIComponent('Product was edited successfully!')}`);
            }).catch(console.log);
        }
    })
};

module.exports.deleteGet = (req, res) => {
    let id = req.params.id;

    Product.findById(id).then((product) => {
        if (!product /*|| product.buyer !== undefined*/) {
            res.sendStatus(404);
            return;
        }

        res.render('products/delete', {product: product});

        /*if (product.creator.equals(req.user._id) || req.user.roles.indexOf('Admin') >= 0) {
         } else {
         res.redirect(`/?error=${encodeURIComponent('You are can only view this product!!!')}`);
         }*/
    });
};

module.exports.deletePost = (req, res) => {
    let id = req.params.id;

    Product.findById(id).then((product) => {
        /*if (!product) {
         res.redirect(`/?error=${encodeURIComponent('error=Product was not found!')}`);
         return;
         }*/

        fs.unlink('./' + product.image, err => {
            if (err) console.log(err);
        });

        Product.remove(product).then(() => {
            res.redirect(`/?success=${encodeURIComponent('Product was deleted successfully!')}`);
        });

        /*if (product.creator.equals(req.user._id) || req.user.roles.indexOf('Admin') >= 0) {
         }*/
    });
};

module.exports.buyGet = (req, res) => {
    let id = req.params.id;

    Product.findById(id).then((product) => {
        if (!product) {
            res.sendStatus(404);
            return;
        }

        res.render('products/buy', {product: product});
    });
};



/* 


else if (req.pathname === "/product/add" && req.method === "POST") {
    let form = new multiparty.Form();
    let product = {};
    form.on("part", (part) => {
        if (part.filename) {
            let dataString = "";

            part.setEncoding("binary");
            part.on("data", (data) => {
                dataString += data;
            });

            part.on("end", () => {
                console.log(part.filename);
                let extension = part.filename.split(".").pop();
                let fileName = shortid.generate();
                let filePath = `./content/images/${fileName}.${extension}`;

                product.image = filePath;
                fs.writeFile(filePath, dataString, { encoding: "ascii" }, (err) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                });
            });

        } else {
            part.setEncoding("utf-8");
            let field = "";
            part.on("data", (data) => {
                field += data;
            });

            part.on("end", () => {
                product[part.name] = field;
            });
        }
    });

    form.on("close", () => {
        Product.create(product).then((insertedProduct) => {
            Category.findById(product.category).then((category) => {
                category.products.push(insertedProduct._id);
                category.save();

                res.writeHead(302, {
                    "Location": "/"
                });

                res.end();
            });
        });
    });

    form.parse(req);
} else {
    return true;
}
} */