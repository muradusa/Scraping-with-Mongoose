

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