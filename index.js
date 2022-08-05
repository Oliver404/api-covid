const express = require("express");
const axios = require("axios")
const app = express();
const port = process.env.PORT || 3000;

function onSuccessCountries(response) {
    this.send(response.data);
    console.log(response);
}
function onErrorCountries(error) {
    this.send("error");
    console.log(error);
}

function onFinallyCountries() {
    console.log("Termino");

}

app.get('/', function (req, res) {res.send("Hello :D ");});

app.get('/countries', function (req, res) {
    // res.send('Saludos desde express');
    axios.get("https://restcountries.com/v3.1/all")
        .then(onSuccessCountries.bind(res))
        .catch(onErrorCountries.bind(res))
        .finally(onFinallyCountries.bind(res));
});

app.listen(port, () => {
    console.log("El servidor está inicializado en el puerto " + port);
});

// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment#example_installing_locallibrary_on_heroku