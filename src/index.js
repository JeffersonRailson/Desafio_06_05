const express = require("express");
const nunjucks = require("nunjucks");

const app = express();

nunjucks.configure("view", {
    autoescape: true,
    express: app,
    watch: true
});

app.set("view engine", "njk");

const logMiddleware = (req, res, next) => {
    console.log(`
        HOST: ${req.headers.host} | URL: ${req.url} METHOD: ${req.method}`);
    req.appName = "teste";
    return next();
};

app.use(logMiddleware);

app.get("/", (req, resp) => resp.render("index"));

app.get("/check", (req, res) => res.render(`check`));

app.get("/nome", (req, res) =>
    res.send(`parametro query parametro: ${req.query.teste}`)
);

app.listen(3000);
