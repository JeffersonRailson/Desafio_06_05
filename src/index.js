const express = require("express");
const nunjucks = require("nunjucks");
const bodyParser = require("body-parser");

const app = express();

nunjucks.configure("view", {
    autoescape: true,
    express: app,
    watch: false
});

app.set("view engine", "njk");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const condicaoMiddleware = (req, res, next) => {
    const { idade } = req.query;
    !idade ? res.redirect("/") : next();
};

app.get("/", (req, res) => res.render("index"));

app.post("/check", (req, res) => {
    const idade = req.body.idade;
    if (req.body.idade >= 18) {
        res.redirect(`/maior?idade=${idade}`);
    } else {
        res.redirect(`/menor?idade=${idade}`);
    }
});
app.get("/menor", condicaoMiddleware, (req, res) => {
    const { idade } = req.query;
    res.render("menor", { idade });
});

app.get("/maior", condicaoMiddleware, (req, res) => {
    const { idade } = req.query;
    res.render("maior", { idade });
});

app.listen(3000);
