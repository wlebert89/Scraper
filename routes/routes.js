var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");

module.exports = function (app) {

    app.get("/", function (req, res) {
        db.Article.find({}).then(function (dbArticle) {
            var hbObject = {
                article: dbArticle
            }
            res.render("index", hbObject);
        }).catch(function (err) {
            res.json(err);
        });
    });

    app.get("/scrape", function (req, res) {
        axios.get("https://politics.theonion.com/").then(function (response) {

            var $ = cheerio.load(response.data);

            $("div.post-wrapper").each(function (i, element) {

                var result = {};

                result.title = $(this).find("h1.headline").text();
                result.link = $(this).find("a.js_entry-link").attr("href");
                result.summary = $(this).find("div.excerpt").text();

                db.Article.create(result).then(function (dbArticle) {
                    console.log(dbArticle);
                }).catch(function (err) {
                    console.log(err);
                });
            });
            location.reload();
        });
    });

    app.get("/article/:id", function (req, res) {
        db.Article.findOne({
                _id: req.params.id
            }).populate("note")
            .then(function (dbArticle) {
                res.json(dbArticle);
            }).catch(function (err) {
                res.json(err);
            });
    });

    app.post("/article/:id", function (req, res) {

        db.Note.create(req.body).then(function (dbNote) {

            return db.Article.findOneAndUpdate({
                _id: req.params.id
            }, {
                note: dbNote._id
            }, {
                new: true
            });
        }).then(function (dbArticle) {
            db.Article.findOne({
                    _id: req.params.id
                }).populate("note")
                .then(function (dbArticle) {
                    res.json(dbArticle);
                    console.log(dbArticle);
                }).catch(function (err) {
                    res.json(err);
                });
        });
    });
}