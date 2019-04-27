# Mongo Scraper

### Overview

This full-stack web application utilizes Axios and Cheerio to scrape the title, summary, and link of each article from https://politics.theonion.com/. The data is then stored in MongoDB, inside a custom "Article" model created with Mongoose. Each piece of data is then rendered to the page using Express-Handlebars. The user can then view the article's source, or leave a comment for each article in a modal. The comments are stored in a separate "Notes" model and are associated with their corresponding "Article" model using Mongoose, so that the comments can be referenced later.

### Technologies

    * Axios
    * Cheerio
    * Express
    * Express-Handlebars
    * MongoDB
    * Mongoose.js
    * Bootstrap
