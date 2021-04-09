// Määritellään palvelimelle portti.
const PORT = process.env.PORT || 8081;

// Otetaan express-, ja mongoose-moduulit käyttöön
var express = require("express");
var app = express();
var mongoose = require("mongoose");

// bodyParser on nyt osa express- moduulia niin sitä ei tarvitse ottaa erikseen käyttöön!
// Mahdollistetaan urlencoded tyyppisten post käskyjen luonti
app.use(express.urlencoded({ extended: true }));
//app.use(express.json());

// Määritellään tietokannan osoite
const uri = process.env.DB_URI;

// Yhdistetään tietokantaan
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// Tallennetaan tieto yhteyden onnistumisesta muuttujaan
var db = mongoose.connection;
// Tulostetaan tieto mahdollisesta yhteysvirheestä tai yhteyden onnistumisesta
db.on("error", function () {
  console.log("Can not connect to Mongoose!");
});

db.once("open", function () {
  console.log("Connected to Mongoose.");
});

// Määritellään Ficci-niminen Schema
const Fics = mongoose.model(
  "Ficci",
  {
    name: String,
    series: String,
    part: String,
    pairing: String,
    plot: String,
    chapters: Number,
    finished: Boolean,
    good: Boolean,
    link: String,
  },
  "potterfics"
);

// Luodaan reitit ja niiden toiminnallisuudet
// Tulostetaan kaikki ficit
app.get("/api/getall", function (req, res) {
  Fics.find({}, function (err, results) {
    console.log("Data of all fics was fetched");
    res.json(results);
  });
});

// Tulostetaan ficci id-numeron perusteella
app.get("/api/:id", function (req, res) {
  Fics.find({ _id: req.params.id }, function (err, results) {
    console.log("A fic with id " + req.params.id + " was fetched");
    res.json(results);
  });
});

// Tulostetaan ficci nimen perusteella
app.get("/api/name/:id", function (req, res) {
  Fics.find({ name: req.params.id }, function (err, results) {
    console.log("A fic with name \"" + req.params.id + "\" was fetched");
    res.json(results);
  });
});

// Lisätään yksi ficci
app.post("/api/add", function (req, res) {
  // Luodaan uusi tallennettava olio
  var newFic = new Fics({
    name: req.body.name,
    series: req.body.series,
    part: req.body.part,
    pairing: req.body.pairing,
    plot: req.body.plot,
    chapters: req.body.chapters,
    finished: req.body.finished,
    good: req.body.good,
    link: req.body.link
  });

  // Tallennetaan olio tietokantaan
  newFic.save(function (err, result) {
    if (err) console.log(err);
    console.log("Added a fic called \"" + req.body.name + "\"");
    res.send("Added a fic called \"" + req.body.name + "\"");
  });
});

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

// Muokataan ficin tietoja id-numeron perusteella
app.put("/api/update/:id", function (req, res) {
  Fics.findByIdAndUpdate(req.params.id, req.body, {new: true}, 
    (err, todo) => {
      // Handle any possible database errors
          if (err) return res.status(500).send(err);
          console.log("Updated a fic with id " + req.params.id);
          res.send("Updated a fic with id " + req.params.id);
      })
});

// Poistetaan ficci id:n perusteella
app.delete("/api/delete/:id", function (req, res) {
  // Poimitaan id talteen ja välitetään se tietokannan poisto-operaatioon
  var id = req.params.id;

  Fics.findByIdAndDelete(id, function (err, results) {
    if (err) {
      console.log(err);
      res.json("Error happened", 500);
    } else if (results == null) {
      res.json("Nothing to delete", 200);
    } else {
      console.log("Deleted a fic with id " + id);
      res.json("Deleted a fic with id " + id);
    }
  });
});

// Luodaan web-palvelin.
app.listen(PORT, () => {
  console.log("Listening on port 8081.");
});