//const url = require("url");
//const fs = require("fs");
//const path = require("path");
//const qs = require("querystring");
//const multiparty = require("multiparty");

const Category = require("../models/Category");

module.exports.addGet = (req, res) => {
    res.render('category/add');
}

module.exports.addPost = (req,res) => {
    let category = req.body;
    Category.create(category).then(() => {
        res.redirect('/');
    });
}
    
module.exports.productsByCategory = (req, res) => {
    let categoryName = req.params.category;

    Category.findOne({name: categoryName})
        .populate('products')
        .then((category) => {
            if (!category) {
                res.sendStatus(404);
                return;
            }

            res.render('category/products', {category: category})
        })

};

/* req.pathname = req.pathname || url.parse(req.url).pathname;

    if (req.pathname === "/category/add" && req.method === "GET") {
        fs.readFile("./views/category/add.html", (err, data) => {
            if (err) {
                console.log(err);
                res.writeHead(404, {
                    "Content-Type": "text/plain"
                });

                res.write("404 not found!");
                res.end();
                return;
            }

            res.writeHead(200, {
                "Content-Type": "text/html"
            });

            res.write(data);
            res.end();
        })
    } else if (req.pathname === "/category/add" && req.method === "POST") {
        let queryData = "";
        req.on("data", (data) => {
            queryData += data;
        });

        req.on("end", () => {
            let category = qs.parse(queryData);
            Category.create(category).then(() => {
                res.writeHead(302, {
                    "Location": "/"
                });
    
                res.end();
            });
        });
    } else {
        return true;
    }
} */