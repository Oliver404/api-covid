const express = require("express");
const axios = require("axios")
const app = express();
const port = process.env.PORT || 3000;

function onSuccessCountries(response) {
    this.send(response.data);
}
function onError(error) {
    console.log("Error");
    this.send("error");
    console.log(error);
}

function onFinally() {
    console.log("Termino");

}

function onSuccessCovid(response) {
    console.log("Success");
    this.send(response.data);
}

app.get('/', function (req, res) {res.send("Hello :D ");});

app.get('/countries', function (req, res) {
    // res.send('Saludos desde express');
    axios.get("https://restcountries.com/v3.1/all")
        .then(onSuccessCountries.bind(res))
        .catch(onError.bind(res))
        .finally(onFinally.bind(res));
});

app.get('/covid', function (req, res) {
    axios.get(`https://api.covid19api.com/country/${req.query.country}/status/confirmed/live`)
        .then(onSuccessCovid.bind(res))
        .catch(onError.bind(res))
        .finally(onFinally.bind(res));
});

app.listen(port, () => {
    console.log("El servidor está inicializado en el puerto " + port);
});

// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment#example_installing_locallibrary_on_heroku