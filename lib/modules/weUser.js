"use strict";
// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>
Object.defineProperty(exports, "__esModule", { value: true });
var doador_1 = require("./doador");
var doadorEmpresa_1 = require("./doadorEmpresa");
var ong_1 = require("./ong");
var UserManager = /** @class */ (function () {
    function UserManager(app_token, route_account_new, route_landing_page) {
        this._doador = new doador_1.Doador();
        this._empresa = new doadorEmpresa_1.Empresa();
        this._ong = new ong_1.Ong();
        this._app_token = app_token;
        this._route_account_new = route_account_new;
        this._route_landing_page = route_landing_page;
    }
    Object.defineProperty(UserManager.prototype, "doador", {
        get: function () {
            return this._doador;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserManager.prototype, "empresa", {
        get: function () {
            return this._empresa;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserManager.prototype, "ong", {
        get: function () {
            return this._ong;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserManager.prototype, "app_token", {
        get: function () {
            return this._app_token;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserManager.prototype, "route_account_new", {
        get: function () {
            return this._route_account_new;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserManager.prototype, "route_landing_page", {
        get: function () {
            return this._route_landing_page;
        },
        enumerable: true,
        configurable: true
    });
    UserManager.prototype.initProfile = function () {
        return Promise.all([]);
    };
    UserManager.prototype.quickLogin = function (auth, kwargs) {
        var _this = this;
        return this._doador.quickLogin(auth, kwargs).then(function (doador) {
            return _this;
        });
    };
    return UserManager;
}());
exports.UserManager = UserManager;
//# sourceMappingURL=weUser.js.map