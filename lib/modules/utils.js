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
exports.StepMenuService = exports.WeStatus = exports.CheckBoxManager = exports.Currency = exports.Country = exports.Address = exports.StyleUi = exports.PluginNavegador = exports.Banco = exports.Tools = void 0;
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
        enumerable: false,
        configurable: true
    });
    Tools.setData = function (obj_from, obj_to) {
        var properties = ts_resource_tastypie_1.Tastypie.Tools.getProperties(obj_from);
        for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
            var propertie = properties_1[_i];
            try {
                obj_to[propertie] = obj_from[propertie];
            }
            catch (e) { }
        }
    };
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
            for (var _i = 0, properties_2 = properties; _i < properties_2.length; _i++) {
                var propertie = properties_2[_i];
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
    Address.prototype._get_geocode_result = function (data) {
        var address_list = [];
        if (data.status == "OK") {
            for (var _i = 0, _a = data.results; _i < _a.length; _i++) {
                var add_temp = _a[_i];
                var obj_address = {
                    street_number: {},
                    route: {},
                    locality: {},
                    sublocality_level_1: {},
                    administrative_area_level_2: {},
                    administrative_area_level_1: {},
                    country: {},
                    postal_code: {}
                };
                var _loop_1 = function (type) {
                    for (var _i = 0, _a = add_temp.address_components; _i < _a.length; _i++) {
                        var component = _a[_i];
                        var result = component.types.find(function (_obj) { return _obj === type; });
                        if (result) {
                            obj_address[type] = component;
                            break;
                        }
                    }
                };
                for (var type in obj_address) {
                    _loop_1(type);
                }
                address_list.push(new Address(this.resource, {
                    region: add_temp.formatted_address,
                    place_id: add_temp.place_id,
                    geocode: add_temp,
                    number: obj_address.street_number['long_name'],
                    street: obj_address.route['long_name'],
                    district: obj_address.sublocality_level_1['long_name'] || obj_address.locality['long_name'],
                    city: obj_address.administrative_area_level_2['long_name'],
                    state: obj_address.administrative_area_level_1['long_name'],
                    state_code: obj_address.administrative_area_level_1['short_name'],
                    country: obj_address.country['long_name'],
                    country_code: obj_address.country['short_name'],
                    postal_code: obj_address.postal_code['long_name']
                }));
            }
            if (address_list.length === 1) {
                this.setData(address_list[0]);
            }
        }
        return address_list;
    };
    Address.prototype.search = function (obj) {
        var _this = this;
        this._searching = true;
        return this._geocode.objects.findOne(obj, true).then(function (resp) {
            var geocode_result = _this._get_geocode_result(resp);
            _this._searching = false;
            return geocode_result;
        }).catch(function () {
            _this._searching = false;
            return [];
        });
    };
    Object.defineProperty(Address.prototype, "searching", {
        get: function () {
            return this._searching;
        },
        enumerable: false,
        configurable: true
    });
    return Address;
}(ts_resource_tastypie_1.Tastypie.Model));
exports.Address = Address;
var Country = /** @class */ (function (_super) {
    __extends(Country, _super);
    function Country(obj) {
        return _super.call(this, Country.resource, obj) || this;
    }
    Country.resource = new ts_resource_tastypie_1.Tastypie.Resource('utils/l10n/country', { model: Country });
    return Country;
}(ts_resource_tastypie_1.Tastypie.Model));
exports.Country = Country;
var Currency = /** @class */ (function (_super) {
    __extends(Currency, _super);
    function Currency(obj) {
        return _super.call(this, Currency.resource, obj) || this;
    }
    Currency.resource = new ts_resource_tastypie_1.Tastypie.Resource('utils/l10n/currency', { model: Currency });
    return Currency;
}(ts_resource_tastypie_1.Tastypie.Model));
exports.Currency = Currency;
var CheckBoxManager = /** @class */ (function () {
    function CheckBoxManager() {
        this.reset();
    }
    CheckBoxManager.prototype.reset = function () {
        this._list = [];
        this.onNgModel = {};
    };
    CheckBoxManager.prototype.check = function (p, checked) {
        this.reset();
        for (var _i = 0, p_1 = p; _i < p_1.length; _i++) {
            var id = p_1[_i];
            this.onNgModel[id] = checked;
        }
        this.onCheck();
    };
    CheckBoxManager.prototype.onCheck = function () {
        this._list = [];
        for (var id in this.onNgModel) {
            if (this.onNgModel[id])
                this._list.push(+id);
        }
    };
    Object.defineProperty(CheckBoxManager.prototype, "checked", {
        get: function () {
            return this._list;
        },
        enumerable: false,
        configurable: true
    });
    return CheckBoxManager;
}());
exports.CheckBoxManager = CheckBoxManager;
var WeStatus = /** @class */ (function (_super) {
    __extends(WeStatus, _super);
    function WeStatus(obj) {
        return _super.call(this, WeStatus.resource, obj) || this;
    }
    WeStatus.resource = new ts_resource_tastypie_1.Tastypie.Resource('utils/we-status', { model: WeStatus });
    return WeStatus;
}(ts_resource_tastypie_1.Tastypie.Model));
exports.WeStatus = WeStatus;
var StepMenuService = /** @class */ (function () {
    function StepMenuService(title, itens) {
        this.title = title;
        this.itens = itens;
        this.current = null;
    }
    StepMenuService.prototype.setCurrent = function (token) {
        this.current = this.itens.find(function (item) { return item.token === token; });
    };
    StepMenuService.prototype.setParams = function (check_params, url_params) {
        for (var i = 0; i < this.itens.length; i++) {
            var url = this.itens[i].url;
            for (var param in url_params) {
                url = url.replace(":" + param, url_params[param]);
            }
            this.itens[i].url = url || "/";
            this.itens[i].completed = check_params[this.itens[i].token] || false;
        }
    };
    return StepMenuService;
}());
exports.StepMenuService = StepMenuService;
//# sourceMappingURL=utils.js.map