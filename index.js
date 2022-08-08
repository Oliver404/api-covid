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
    var str = "https://quickchart.io/chart?c={type: 'bar', data: {labels:['covid'], datasets: [";
    var confirmed = 0;
    var deaths = 0;
    var recovered = 0;
    var active = 0;
    for (let x in response.data) {
        confirmed += response.data[x].Confirmed;
        deaths += response.data[x].Deaths;
        recovered += response.data[x].Recovered;
        active += response.data[x].Active;
    }
    str += `{label: 'Confirmed', data: [${confirmed}]},`;
    str += `{label: 'Deaths', data: [${deaths}]},`;
    str += `{label: 'Recovered', data: [${recovered}]},`;
    str += `{label: 'Active', data: [${active}]},`;
    str += "]}}";
    this.send(str);
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
    let date24hrs = new Date();
    date24hrs = date24hrs.setDate(date24hrs.getDate() - 1);
    axios.get(`https://api.covid19api.com/live/country/${req.query.country}/status/confirmed/date/${date24hrs.toISOString()}`)
        .then(onSuccessCovid.bind(res))
        .catch(onError.bind(res))
        .finally(onFinally.bind(res));
});

app.listen(port, () => {
    console.log("El servidor está inicializado en el puerto " + port);
});

// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment#example_installing_locallibrary_on_heroku