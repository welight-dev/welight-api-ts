"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var doador_1 = require("./doador");
var doadorEmpresa_1 = require("./doadorEmpresa");
var doadorFundo_1 = require("./doadorFundo");
var ong_1 = require("./ong");
var AppManager = /** @class */ (function () {
    function AppManager(app_token, route_account_new, route_landing_page) {
        this._app_token = app_token;
        this._route_account_new = route_account_new;
        this._route_landing_page = route_landing_page;
    }
    AppManager.prototype.init = function (app_id) {
        var param = {};
        if (app_id) {
            param = { id: app_id };
        }
        if (this._app_token == 'doador') {
            this._app_profile = new doador_1.Doador(param);
        }
        else if (this._app_token == 'doador_empresa') {
            this._app_profile = new doadorEmpresa_1.Empresa(param);
        }
        else if (this._app_token == 'doador_fundo') {
            this._app_profile = new doadorFundo_1.Org(param);
        }
        else if (this._app_token == 'ong') {
            this._app_profile = new ong_1.Ong(param);
        }
    };
    Object.defineProperty(AppManager.prototype, "profile", {
        get: function () {
            return this._app_profile;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppManager.prototype, "token", {
        get: function () {
            return this._app_token;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppManager.prototype, "route_account_new", {
        get: function () {
            return this._route_account_new;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppManager.prototype, "route_landing_page", {
        get: function () {
            return this._route_landing_page;
        },
        enumerable: true,
        configurable: true
    });
    AppManager.prototype.initProfile = function () {
        return Promise.all([]);
    };
    AppManager.prototype.quickLogin = function (auth, kwargs) {
        var _this = this;
        return this._user.quickLogin(auth, kwargs).then(function (user) {
            return _this;
        });
    };
    return AppManager;
}());
exports.AppManager = AppManager;
//# sourceMappingURL=weApp.js.map