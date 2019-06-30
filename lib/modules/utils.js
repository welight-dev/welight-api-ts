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
var ts_resource_tastypie_1 = require("ts-resource-tastypie");
var config_1 = require("./config");
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
    Banco.resource = new ts_resource_tastypie_1.Tastypie.Resource('utils/banco', { model: Banco });
    return Banco;
}(ts_resource_tastypie_1.Tastypie.Model));
exports.Banco = Banco;
var PluginNavegador = /** @class */ (function () {
    function PluginNavegador(obj) {
        this.instalado = false;
    }
    PluginNavegador.prototype.instalarExtensaoChrome = function () {
        var _self = this;
        return new Promise(function (resolve, reject) {
            if (chrome) {
                window.open('https://chrome.google.com/webstore/detail/welight/ghkiiifahcdlbeieldikdjheaokhajdi', '_blank');
                setTimeout(function () {
                    _self.instalado = true;
                    resolve(true);
                }, 5000);
                // chrome.webstore.install(
                //     'https://chrome.google.com/webstore/detail/ghkiiifahcdlbeieldikdjheaokhajdi',
                //     function(){
                //         clearTimeout(limitTimeInstall);
                //         _self.instalado = true;
                //         resolve(true);
                //     },
                //     function(error: any){
                //         clearTimeout(limitTimeInstall);
                //         _self.instalado = true;
                //         resolve(true);
                //     }
                // );
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
var StyleUi = /** @class */ (function () {
    function StyleUi(obj) {
        if (obj) {
            var _self = this;
            var properties = ts_resource_tastypie_1.Tastypie.Tools.getProperties(obj);
            for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
                var propertie = properties_1[_i];
                try {
                    _self[propertie] = obj[propertie];
                }
                catch (e) { }
            }
        }
    }
    return StyleUi;
}());
exports.StyleUi = StyleUi;
var Address = /** @class */ (function (_super) {
    __extends(Address, _super);
    function Address(resource, obj) {
        var _this = _super.call(this, resource, obj) || this;
        _this._geocode = new ts_resource_tastypie_1.Tastypie.Resource('geocode/json', {
            defaults: { key: config_1.Environment.getGoogleApiKey('geocode') },
            provider: "google-maps"
        });
        _this._searching = false;
        return _this;
    }
    Address.prototype._set_geocode_result = function (data) {
        if (data.status == "OK") {
            var add_temp = data.results[0];
            this.region = add_temp.formatted_address;
            this.place_id = add_temp.place_id;
            var obj_address = {
                street_number: '',
                route: '',
                locality: '',
                administrative_area_level_2: '',
                administrative_area_level_1: '',
                country: '',
                postal_code: ''
            };
            var _loop_1 = function (type) {
                for (var _i = 0, _a = add_temp.address_components; _i < _a.length; _i++) {
                    var component = _a[_i];
                    var result = component.types.find(function (_obj) { return _obj === type; });
                    if (result) {
                        obj_address[type] = component.long_name;
                        break;
                    }
                }
            };
            for (var type in obj_address) {
                _loop_1(type);
            }
            this.number = obj_address.street_number;
            this.street = obj_address.route;
            this.district = obj_address.locality;
            this.city = obj_address.administrative_area_level_2;
            this.state = obj_address.administrative_area_level_1;
            this.country = obj_address.country;
            this.postal_code = obj_address.postal_code;
        }
    };
    Address.prototype.search = function (obj) {
        var _this = this;
        this._searching = true;
        return this._geocode.objects.findOne(obj, true).then(function (resp) {
            _this._set_geocode_result(resp);
            _this._searching = false;
            return _this;
        }).catch(function (error) {
            _this._searching = false;
            return _this;
        });
    };
    Object.defineProperty(Address.prototype, "searching", {
        get: function () {
            return this._searching;
        },
        enumerable: true,
        configurable: true
    });
    return Address;
}(ts_resource_tastypie_1.Tastypie.Model));
exports.Address = Address;
//# sourceMappingURL=utils.js.map