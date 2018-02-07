"use strict";
var api_doador = require("../lib/modules/doador");
var api_config = require("../lib/modules/config");
api_config.Environment.set('local');
var doador = new api_doador.Doador;
doador.login('admin@welight.co', '123').then(function (data) {
    console.log(data.nome);
    data.doacao.init().then(function (p) {
        console.log(p);
    });
});
