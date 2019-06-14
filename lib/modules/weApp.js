"use strict";
// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>
Object.defineProperty(exports, "__esModule", { value: true });
var ts_resource_tastypie_1 = require("ts-resource-tastypie");
exports.Tastypie = ts_resource_tastypie_1.Tastypie;
var config_1 = require("./config");
var doador_1 = require("./doador");
var doadorEmpresa_1 = require("./doadorEmpresa");
var doadorFundo_1 = require("./doadorFundo");
var ong_1 = require("./ong");
var AppProfile = /** @class */ (function () {
    function AppProfile(app_token) {
        this._doador = new doador_1.Doador();
        this._empresa = new doadorEmpresa_1.Empresa();
        this._org = new doadorFundo_1.Org();
        this._ong = new ong_1.Ong();
        this._app_token = app_token;
        this._app_profile_id = null;
        this._initialized = false;
    }
    AppProfile.prototype.init = function (obj_filter) {
        var _this = this;
        if (this._app_token == 'home') {
            return doador_1.Doador.resource.objects.findOne(obj_filter).then(function (resp) {
                _this._doador = resp;
                _this._app_profile_id = resp.id;
                _this._initialized = true;
                return _this;
            });
        }
        else if (this._app_token == 'doador') {
            return doador_1.Doador.resource.objects.findOne(obj_filter).then(function (resp) {
                _this._doador = resp;
                _this._app_profile_id = resp.id;
                _this._initialized = true;
                return _this;
            });
        }
        else if (this._app_token == 'doador_empresa') {
            return doadorEmpresa_1.Empresa.resource.objects.findOne(obj_filter).then(function (resp) {
                _this._empresa = resp;
                _this._app_profile_id = resp.id;
                _this._initialized = true;
                return _this;
            });
        }
        else if (this._app_token == 'doador_fundo') {
            return doadorFundo_1.Org.resource.objects.findOne(obj_filter).then(function (resp) {
                _this._org = resp;
                _this._app_profile_id = resp.id;
                _this._initialized = true;
                return _this;
            });
        }
        else if (this._app_token == 'ong') {
            return ong_1.Ong.resource.objects.findOne(obj_filter).then(function (resp) {
                _this._ong = resp;
                _this._app_profile_id = resp.id;
                _this._initialized = true;
                return _this;
            });
        }
        else {
            Promise.reject('invalid app_token');
        }
    };
    Object.defineProperty(AppProfile.prototype, "doador", {
        get: function () {
            return this._doador;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppProfile.prototype, "empresa", {
        get: function () {
            return this._empresa;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppProfile.prototype, "org", {
        get: function () {
            return this._org;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppProfile.prototype, "ong", {
        get: function () {
            return this._ong;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppProfile.prototype, "app_token", {
        get: function () {
            return this._app_token;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppProfile.prototype, "app_profile_id", {
        get: function () {
            return this._app_profile_id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppProfile.prototype, "initialized", {
        get: function () {
            return this._initialized;
        },
        enumerable: true,
        configurable: true
    });
    return AppProfile;
}());
exports.AppProfile = AppProfile;
var AppManager = /** @class */ (function () {
    function AppManager(setup) {
        config_1.Environment.set(setup.env);
        this._app_token = setup.app_token;
        this._fnc_change_route = setup.fnc_change_route;
        this._route_app_home = setup.route_app_home;
        this._route_account_new = setup.route_account_new;
        this._route_access_denied = setup.route_access_denied;
        this._route_account_list = setup.route_account_list;
        this._route_landing_page = setup.route_landing_page;
        this._route_page_not_found = setup.route_page_not_found;
        this._app_profile = new AppProfile(setup.app_token);
    }
    Object.defineProperty(AppManager.prototype, "token", {
        get: function () {
            return this._app_token;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppManager.prototype, "route_app_home", {
        get: function () {
            return this._route_app_home;
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
    Object.defineProperty(AppManager.prototype, "route_account_list", {
        get: function () {
            return this._route_account_list;
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
    Object.defineProperty(AppManager.prototype, "route_access_denied", {
        get: function () {
            return this._route_access_denied;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppManager.prototype, "route_page_not_found", {
        get: function () {
            return this._route_page_not_found;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppManager.prototype, "profile", {
        get: function () {
            return this._app_profile;
        },
        enumerable: true,
        configurable: true
    });
    AppManager.prototype.concatDomainSite = function (app_token, uri) {
        if (uri && !uri.startsWith("/")) {
            uri = "/" + uri;
        }
        return config_1.Environment.getDomainSite(app_token, uri);
    };
    AppManager.prototype.concatDomainApi = function (uri) {
        if (uri && !uri.startsWith("/")) {
            uri = "/" + uri;
        }
        return ts_resource_tastypie_1.Tastypie.Provider.getDefault().concatDomain(uri);
    };
    AppManager.prototype.changeRoute = function (app_route, app_token, next) {
        if (!app_route.startsWith("/")) {
            app_route = "/" + app_route;
        }
        if (!app_token || (app_token == this._app_token)) {
            if (this._fnc_change_route) {
                this._fnc_change_route([app_route]);
            }
        }
        else {
            if (this._user.is_authenticated && app_token != 'home') {
                app_route = app_route + "/quick-login/" + this._user.auth.username + "/" + this._user.auth.api_key;
            }
            if (next) {
                app_route = app_route + "?nextd=" + next.app_token + "&next=" + next.app_route;
            }
            window.location.href = this.concatDomainSite(app_token, app_route);
        }
    };
    AppManager.prototype.quickLogin = function (auth, kwargs) {
        var _this = this;
        return this._user.quickLogin(auth, kwargs).then(function () {
            if (kwargs.hasOwnProperty('app_route')) {
                _this.changeRoute(kwargs.app_route);
            }
            else {
                _this.changeRoute('/');
            }
            return true;
        }).catch(function () {
            if (kwargs.hasOwnProperty('app_route')) {
                _this.changeRoute('login', 'home', { app_route: kwargs.app_route, app_token: _this._app_token });
            }
            else {
                _this.changeRoute('login', 'home');
            }
            return false;
        });
    };
    AppManager.prototype.authGuardPublic = function () {
        if (this._user.is_authenticated) {
            return Promise.resolve(true);
        }
        else {
            return this._user.quickLogin().then(function () {
                return true;
            }).catch(function () {
                return true;
            });
        }
    };
    AppManager.prototype.authGuardUser = function (current_app_route) {
        var _this = this;
        if (this._user.is_authenticated) {
            return Promise.resolve(true);
        }
        else {
            return this._user.quickLogin().then(function () {
                return true;
            }).catch(function () {
                _this.changeRoute('login', 'home', { app_route: current_app_route, app_token: _this._app_token });
                return false;
            });
        }
    };
    AppManager.prototype.authGuardMember = function (current_app_route) {
        var _this = this;
        return this.authGuardUser(current_app_route).then(function (auth) {
            if (auth) {
                if (_this._app_profile.initialized) {
                    return Promise.resolve(_this.user_has_perm(['member']));
                }
                else {
                    return _this._loading_app_profile_member();
                }
            }
            else {
                return false;
            }
        });
    };
    AppManager.prototype.user_has_perm = function (perm_token_list) {
        return this._user.has_perm({
            app_token: this._app_token,
            app_profile_id: this._app_profile.app_profile_id,
            perm_token_list: perm_token_list
        });
    };
    AppManager.prototype._loading_app_profile_member = function () {
        if (!this._user.current_user_app) {
            return Promise.resolve(false);
        }
        if (this._user.current_user_app.app_token != this._app_token) {
            return Promise.resolve(false);
        }
        return this._app_profile.init({ id: this._user.current_user_app.app_profile_id }).then(function (resp) {
            return resp.initialized;
        }).catch(function () { return false; });
    };
    return AppManager;
}());
exports.AppManager = AppManager;
//# sourceMappingURL=weApp.js.map