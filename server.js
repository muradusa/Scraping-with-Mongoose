var express = require("express")
var logger = require("morgan")
var mongoose = require("mongoose")

var axios = require("axios")
var cheerio = require("cheerio")

// var db = require ("./models")

var PORT = 3000

var app = express()

app.use(logger("dev"))

app.use(express.urlencoded({ extended: true}))
app.use(express.json())

app.use(express.static("public"))

mongoose.connect("mongodb://localhost/mongoose", { useNewUrlParser: true })

// Here I will need to link my routes
app.get("/scrape", function (req, res) {
    axios.get("https://turkmen.news/").then(function(response) {
        var $ = cheerio.load(response.data)
        $("article h2").each(function(i, element) {
            var result = {}

            result.title = $(this).children("a").text()
            result.link = $(this).children("a").attr("href")

            db.Mongoose.create(result).then(function(dbMongoose) {
                console.log(dbMongoose)
            }).catch(function(err) {
                console.log(err)
            })
        })
        res.send("Scrape Complete")
    })
})

app.listen(PORT, function() {
    console.log("App running on port " + PORT + " !")
})