"use strict";
// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var api = require("ts-resource-tastypie");
var Tools = /** @class */ (function () {
    function Tools() {
    }
    Object.defineProperty(Tools, "localStorageSuported", {
        get: function () {
            var test = 'test';
            try {
                localStorage.setItem(test, test);
                localStorage.removeItem(test);
                return true;
            }
            catch (e) {
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    return Tools;
}());
exports.Tools = Tools;
var Banco = /** @class */ (function (_super) {
    __extends(Banco, _super);
    function Banco(obj) {
        return _super.call(this, Banco.resource, obj) || this;
    }
    Banco.resource = new api.Tastypie.Resource('utils/banco', { model: Banco });
    return Banco;
}(api.Tastypie.Model));
exports.Banco = Banco;
var PluginNavegador = /** @class */ (function () {
    function PluginNavegador(obj) {
        this.instalado = false;
    }
    PluginNavegador.prototype.instalarExtensaoChrome = function () {
        var _self = this;
        return new Promise(function (resolve, reject) {
            if (chrome) {
                var limitTimeInstall_1 = setTimeout(function () {
                    resolve(true);
                }, 10000);
                chrome.webstore.install('https://chrome.google.com/webstore/detail/ghkiiifahcdlbeieldikdjheaokhajdi', function () {
                    clearTimeout(limitTimeInstall_1);
                    _self.instalado = true;
                    resolve(true);
                }, function (error) {
                    clearTimeout(limitTimeInstall_1);
                    _self.instalado = true;
                    resolve(true);
                });
            }
            else {
                reject('chrome.webstore not found.');
            }
        });
    };
    PluginNavegador.prototype.instalarExtensaoFirefox = function () {
        var _self = this;
        return new Promise(function (resolve, reject) {
            var limitTimeInstall = setTimeout(function () {
                resolve(true);
            }, 10000);
            var xpi = { 'XPInstall Dialog Display Name': 'https://addons.mozilla.org/firefox/downloads/latest/welight/' };
            InstallTrigger.install(xpi, function (url, status) {
                clearTimeout(limitTimeInstall);
                _self.instalado = true;
                resolve(true);
            });
        });
    };
    PluginNavegador.prototype.notificarPlugin = function (user, doador) {
        var $wl_msg_profile = { user: user, doador: doador };
        var $wl_msg_event = new CustomEvent('$wl_msg_sendUserProfile', { 'detail': $wl_msg_profile });
        document.dispatchEvent($wl_msg_event);
    };
    return PluginNavegador;
}());
exports.PluginNavegador = PluginNavegador;
//# sourceMappingURL=utils.js.map