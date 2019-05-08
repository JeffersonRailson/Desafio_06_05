const express = require("express");
const nunjucks = require("nunjucks");
const bodyParser = require("body-parser");

const app = express();

let idade = "";

nunjucks.configure("view", {
    autoescape: true,
    express: app,
    watch: false
});

app.set("view engine", "njk");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const condicaoMiddleware = (req, res, next) => {
    if (idade) {
        idade = null;
        return next();
    } else {
        res.redirect("/");
        console.log(req.body.idade);
    }
};

app.get("/", (req, res) => res.render("index"));

app.post("/check", (req, res) => {
    idade = req.body.idade;
    if (req.body.idade >= 18) {
        res.redirect("maior");
    } else {
        res.redirect("menor");
    }
});
app.get("/menor", condicaoMiddleware, (req, res) => res.render("menor"));
app.get("/maior", condicaoMiddleware, (req, res) => res.render("maior"));

app.listen(3000);
