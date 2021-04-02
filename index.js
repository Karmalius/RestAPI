
// Otetaan express-moduuli käyttöön
var express = require("express");
var app = express();

// Tuodaan moduuli ohjelmaan
const MongoClient = require("mongodb").MongoClient;

// Määritellään salasana ja yhteysosoite tietokantaan
const passwd = "";
const uri = "mongodb+srv://m001-student:" + passwd + "mongodb+srv://sandbox.yvhzr.mongodb.net/myFirstDatabase"


// Luodaan uusi yhteysolio käyttäen edellä määriteltyä URI:a sekä tarvittavia parametreja
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Määritellään tietokantaan tehtävä kyselu JSON-oliona. Tässä voi käyttää
// apuna esim. MondoDB Compass -työkalua.
var query = {
  title: new RegExp("") // Mitä laitetaan, kun haetaan kaikki?
};

// Luodaan yhteys tietokantaan nimeltä "fanfiction" ja sieltä kokoelmaan "potterfics"
client.connect(err => {
  const collection = client.db("fanfiction").collection("potterfics");
  if (err) throw err;

  // Express - palvelimen luonti
  app.listen(8081, () => {
    
    // Luodaan reitit ja niiden toiminnallisuudet
    app.get("/api/getall", (req, res) => {
      collection.find(query).toArray(function(err, results) {
        console.log("Toimii");
        var html = parse(results);
        res.send(html);
      });
    });
  });

});