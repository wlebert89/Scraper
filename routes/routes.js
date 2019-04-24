var axios = require("axios");
var cheerio = require("cheerio");
// var db = require("../models");
// var express = require("express");
// var app = express();

module.exports = function (app) {

    app.get("/scrape", function (req, res) {
        axios.get("https://politics.theonion.com/").then(function (response) {

            var $ = cheerio.load(response.data);

            $("div.post-wrapper").each(function (i, element) {

                var result = {};

                result.title = $(this).find("h1.headline").text();
                result.link = $(this).find("a.js_entry-link").attr("href");
                result.summary = $(this).find("div.excerpt").text();

                console.log("----------------------------------------")
                console.log(result.title);
                console.log("")
                console.log(result.link);
                console.log("")
                console.log(result.summary);
                console.log("----------------------------------------")
                console.log("")
            });

            res.send("Scrape Complete");
        });
    });

}