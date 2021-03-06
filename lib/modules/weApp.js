"use strict";
// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppManager = exports.AppRoute = exports.AppDevice = exports.AppProfile = exports.Tastypie = void 0;
var ts_resource_tastypie_1 = require("ts-resource-tastypie");
Object.defineProperty(exports, "Tastypie", { enumerable: true, get: function () { return ts_resource_tastypie_1.Tastypie; } });
var config_1 = require("./config");
var utils_1 = require("./utils");
var weAuth_1 = require("./weAuth");
var doador_1 = require("./doador");
var doadorEmpresa_1 = require("./doadorEmpresa");
var doadorFundo_1 = require("./doadorFundo");
var ong_1 = require("./ong");
var AppProfile = /** @class */ (function () {
    function AppProfile(app_token) {
        this._app_token = app_token;
        this.reset();
    }
    AppProfile.prototype.reset = function () {
        this._doador = new doador_1.Doador();
        this._empresa = new doadorEmpresa_1.Empresa();
        this._org = new doadorFundo_1.Org();
        this._ong = new ong_1.Ong();
        this._app_profile_id = null;
        this._initialized = false;
    };
    AppProfile.prototype.init = function (obj_filter) {
        var _this = this;
        if (this._app_token == 'home') {
            return new Promise(function (resolve, reject) {
                doador_1.Doador.resource.objects.findOne(obj_filter).then(function (resp) {
                    if (!resp.id) {
                        reject('Profile not found.');
                    }
                    else {
                        _this._doador = resp;
                        _this._app_profile_id = resp.id;
                        _this._initialized = true;
                        resolve(_this);
                    }
                }).catch(function (error) { return reject(error); });
            });
        }
        else if (this._app_token == 'doador') {
            return new Promise(function (resolve, reject) {
                doador_1.Doador.resource.objects.findOne(obj_filter).then(function (resp) {
                    if (!resp.id) {
                        reject('Profile not found.');
                    }
                    else {
                        _this._doador = resp;
                        _this._app_profile_id = resp.id;
                        _this._initialized = true;
                        resolve(_this);
                    }
                }).catch(function (error) { return reject(error); });
            });
        }
        else if (this._app_token == 'doador_empresa') {
            return new Promise(function (resolve, reject) {
                doadorEmpresa_1.Empresa.resource.objects.findOne(obj_filter).then(function (resp) {
                    if (!resp.id) {
                        reject('Profile not found.');
                    }
                    else {
                        _this._empresa = resp;
                        _this._app_profile_id = resp.id;
                        _this._initialized = true;
                        resolve(_this);
                    }
                }).catch(function (error) { return reject(error); });
            });
        }
        else if (this._app_token == 'doador_fundo') {
            return new Promise(function (resolve, reject) {
                doadorFundo_1.Org.resource.objects.findOne(obj_filter).then(function (resp) {
                    if (!resp.id) {
                        reject('Profile not found.');
                    }
                    else {
                        _this._org = resp;
                        _this._app_profile_id = resp.id;
                        _this._initialized = true;
                        resolve(_this);
                    }
                }).catch(function (error) { return reject(error); });
            });
        }
        else if (this._app_token == 'ong') {
            return new Promise(function (resolve, reject) {
                ong_1.Ong.resource.objects.findOne(obj_filter).then(function (resp) {
                    if (!resp.id) {
                        reject('Profile not found.');
                    }
                    else {
                        _this._ong = resp;
                        _this._app_profile_id = resp.id;
                        _this._initialized = true;
                        resolve(_this);
                    }
                }).catch(function (error) { return reject(error); });
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
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppProfile.prototype, "empresa", {
        get: function () {
            return this._empresa;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppProfile.prototype, "org", {
        get: function () {
            return this._org;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppProfile.prototype, "ong", {
        get: function () {
            return this._ong;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppProfile.prototype, "app_token", {
        get: function () {
            return this._app_token;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppProfile.prototype, "app_profile_id", {
        get: function () {
            return this._app_profile_id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppProfile.prototype, "initialized", {
        get: function () {
            return this._initialized;
        },
        enumerable: false,
        configurable: true
    });
    return AppProfile;
}());
exports.AppProfile = AppProfile;
var AppDevice = /** @class */ (function () {
    function AppDevice(device) {
        this.is_mobile = device.is_mobile;
        if (device.app_site)
            this.app_site = device.app_site;
        if (device.app_mobile)
            this.app_mobile = device.app_mobile;
    }
    return AppDevice;
}());
exports.AppDevice = AppDevice;
var AppRoute = /** @class */ (function () {
    function AppRoute(app_manager, fnc_change_route, uri) {
        this._app_manager = app_manager;
        this._fnc_change_route = fnc_change_route;
        this._uri = uri;
        for (var key in this._uri) {
            this._uri[key] = this._check_uri_slash(this._uri[key]);
        }
    }
    AppRoute.prototype._check_uri_slash = function (uri) {
        if (!uri.startsWith("/")) {
            return "/" + uri;
        }
        return uri;
    };
    Object.defineProperty(AppRoute.prototype, "uri", {
        get: function () {
            return this._uri;
        },
        enumerable: false,
        configurable: true
    });
    AppRoute.prototype.concatDomainSite = function (app_token, uri) {
        return config_1.Environment.getDomainSite(app_token, this._check_uri_slash(uri));
    };
    AppRoute.prototype.concatDomainApi = function (uri) {
        if (!uri) {
            return "";
        }
        return ts_resource_tastypie_1.Tastypie.Provider.getDefault().concatDomain(this._check_uri_slash(uri));
    };
    AppRoute.prototype.change = function (app_route, app_token, kwargs) {
        app_route = this._check_uri_slash(app_route);
        if (!kwargs) {
            kwargs = {};
        }
        if (kwargs.hasOwnProperty('next')) {
            if (kwargs.next.app_route.startsWith("/")) {
                kwargs.next.app_route = kwargs.next.app_route.substring(1);
            }
        }
        if ((!app_token || (app_token == this._app_manager.app_token)) && !kwargs.hasOwnProperty('user_app_id')) {
            if (this._fnc_change_route) {
                var qparams = {};
                if (kwargs.hasOwnProperty('next')) {
                    qparams = { queryParams: { nextd: kwargs.next.app_token, next: kwargs.next.app_route } };
                }
                this._fnc_change_route(app_route, qparams);
            }
        }
        else {
            if (this._app_manager.user.is_authenticated && app_token != 'home') {
                if (kwargs.hasOwnProperty('user_app_id')) {
                    app_route = "/quick-login/" + this._app_manager.user.auth.username + "/" + this._app_manager.user.auth.api_key + "/" + kwargs.user_app_id + "?next=" + app_route.substring(1);
                }
                else {
                    app_route = "/quick-login/" + this._app_manager.user.auth.username + "/" + this._app_manager.user.auth.api_key + "?next=" + app_route.substring(1);
                }
            }
            else if ((app_route == '/login' || app_route == '/cadastro-usuario' || app_route == '/signup') && app_token == 'home') {
                if (kwargs.hasOwnProperty('next')) {
                    if (kwargs.hasOwnProperty('user_app_id')) {
                        app_route = app_route + "/?nextd=" + kwargs.next.app_token + "&next=" + kwargs.next.app_route + "&nextp=" + kwargs.user_app_id;
                    }
                    else {
                        app_route = app_route + "/?nextd=" + kwargs.next.app_token + "&next=" + kwargs.next.app_route;
                    }
                }
                else {
                    if (kwargs.hasOwnProperty('user_app_id')) {
                        app_route = app_route + "/?nextd=" + this._app_manager.app_token + "&nextp=" + kwargs.user_app_id;
                    }
                    else {
                        app_route = app_route + "/?nextd=" + this._app_manager.app_token;
                    }
                }
            }
            window.location.href = this.concatDomainSite(app_token, app_route);
        }
    };
    return AppRoute;
}());
exports.AppRoute = AppRoute;
var AppManager = /** @class */ (function () {
    function AppManager(setup) {
        config_1.Environment.set(setup.env);
        this._auth_loading = false;
        this._create_account_loading = false;
        this._app_token = setup.app_token;
        this._device = setup.device;
        this._user = new weAuth_1.User();
        this._app_profile = new AppProfile(setup.app_token);
        this._route = new AppRoute(this, setup.fnc_change_route, setup.route);
        this._auth_guard_user_checked = false;
        this._auth_guard_member_checked = false;
    }
    AppManager.prototype._get_source_login = function (kwargs) {
        if (!kwargs) {
            kwargs = {};
        }
        kwargs['source'] = {
            app_name: config_1.Environment.getAppName(this._app_token),
            detail: (this._device.app_site || this._device.app_mobile || {})
        };
        if (kwargs.hasOwnProperty('user_app_id')) {
            kwargs['source']['detail']['user_app_id'] = kwargs.user_app_id;
            delete kwargs["user_app_id"];
        }
        if (utils_1.Tools.localStorageSuported) {
            var invite_string = localStorage.getItem('WelightInvite');
            if (invite_string) {
                var invite = JSON.parse(invite_string);
                if (invite.hasOwnProperty('source') && ['donator', 'ong', 'company'].indexOf(invite['source']) >= 0) {
                    kwargs.source.detail['invite'] = invite;
                }
            }
        }
        return kwargs;
    };
    AppManager.prototype._init_app_profile_member = function () {
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
    AppManager.prototype._check_member_auth = function (profile_id, permissions) {
        if (this.user_has_perm(permissions)) {
            var userapp = this._user.getUserAppByProfile(this._app_token, profile_id);
            if (userapp) {
                this._user.select_profile(userapp);
                this._auth_guard_member_checked = true;
            }
            else {
                this._user.unselect_profile();
                this._auth_guard_member_checked = false;
            }
        }
        else {
            this._user.unselect_profile();
            this._auth_guard_member_checked = false;
        }
    };
    Object.defineProperty(AppManager.prototype, "user", {
        get: function () {
            return this._user;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppManager.prototype, "profile", {
        get: function () {
            return this._app_profile;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppManager.prototype, "app_token", {
        get: function () {
            return this._app_token;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppManager.prototype, "device", {
        get: function () {
            return this._device;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppManager.prototype, "route", {
        get: function () {
            return this._route;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppManager.prototype, "auth_loading", {
        get: function () {
            return this._auth_loading;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppManager.prototype, "create_account_loading", {
        get: function () {
            return this._create_account_loading;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppManager.prototype, "auth_guard_user_checked", {
        get: function () {
            return this._auth_guard_user_checked;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppManager.prototype, "auth_guard_member_checked", {
        get: function () {
            return this._auth_guard_member_checked;
        },
        enumerable: false,
        configurable: true
    });
    AppManager.prototype.createAccount = function (name, email, password, kwargs) {
        var _this = this;
        this._create_account_loading = true;
        if (!kwargs) {
            kwargs = {};
        }
        return this._user.createAccount(name, email, password, this._get_source_login(kwargs)).then(function () {
            if (kwargs.hasOwnProperty('next')) {
                _this._create_account_loading = false;
                _this._route.change(kwargs.next.app_route, kwargs.next.app_token);
            }
            else {
                if (_this._app_token == 'home') {
                    var user_app_selected = _this._user.getUserAppAdmin('doador');
                    _this._create_account_loading = false;
                    _this._route.change("/", user_app_selected.app_token, { user_app_id: user_app_selected.id });
                }
                else {
                    _this._create_account_loading = false;
                    _this._route.change('/');
                }
            }
            return true;
        }).catch(function (error) {
            _this._create_account_loading = false;
            return Promise.reject(error);
        });
    };
    AppManager.prototype.createAccountDoadorFundo = function (obj) {
        var _this = this;
        if (this._app_token != 'doador_fundo') {
            return Promise.resolve(false);
        }
        this._create_account_loading = true;
        var kwargs = {};
        kwargs['data'] = obj.getData();
        return this._user.createAccountDoadorFundo(obj.name, obj.email, obj.activity_id, this._get_source_login(kwargs)).then(function () {
            return _this._init_app_profile_member().then(function (auth) {
                _this._create_account_loading = false;
                return auth;
            });
        }).catch(function (error) {
            _this._create_account_loading = false;
            return Promise.reject(error);
        });
    };
    AppManager.prototype.createAccountOng = function (obj) {
        var _this = this;
        if (this._app_token != 'ong') {
            return Promise.resolve(false);
        }
        this._create_account_loading = true;
        var kwargs = {};
        kwargs['ong'] = obj.getData();
        kwargs['ong_detail'] = obj.profile_detail.getData();
        kwargs['address'] = obj.address.getData();
        return this._user.createAccountOng(obj.nome, obj.email, obj.razao_social, obj.cnpj, this._get_source_login(kwargs)).then(function () {
            return _this._init_app_profile_member().then(function (auth) {
                _this._create_account_loading = false;
                return auth;
            });
        }).catch(function (error) {
            _this._create_account_loading = false;
            return Promise.reject(error);
        });
    };
    AppManager.prototype.logout = function (redirect) {
        var _this = this;
        this._auth_guard_user_checked = false;
        this.unselect_profile();
        return this._user.logout().then(function () {
            if (redirect) {
                _this._route.change('/', 'home');
            }
            return true;
        }).catch(function () {
            if (redirect) {
                _this._route.change('/', 'home');
            }
            return true;
        });
    };
    AppManager.prototype.login = function (username, password, kwargs) {
        var _this = this;
        this._auth_loading = true;
        if (!kwargs) {
            kwargs = {};
        }
        return this._user.login(username, password, this._get_source_login(kwargs)).then(function () {
            if (kwargs.hasOwnProperty('next')) {
                _this._auth_loading = false;
                _this._route.change(kwargs.next.app_route, kwargs.next.app_token);
            }
            else {
                if (_this._app_token == 'home') {
                    var user_app_selected = _this._user.getUserAppAdmin('doador_fundo');
                    if (!user_app_selected) {
                        user_app_selected = _this._user.getUserAppAdmin('doador_empresa');
                    }
                    if (!user_app_selected) {
                        user_app_selected = _this._user.getUserAppAdmin('ong');
                    }
                    if (!user_app_selected) {
                        user_app_selected = _this._user.getUserAppAdmin('doador');
                    }
                    _this._auth_loading = false;
                    _this._route.change("/", user_app_selected.app_token, { user_app_id: user_app_selected.id });
                }
                else {
                    _this._auth_loading = false;
                    _this._route.change('/');
                }
            }
            return true;
        }).catch(function (error) {
            _this._auth_loading = false;
            return Promise.reject(error);
        });
    };
    AppManager.prototype.loginFacebook = function (username, facebook_uid, facebook_access_token, kwargs) {
        var _this = this;
        this._auth_loading = true;
        if (!kwargs) {
            kwargs = {};
        }
        return this._user.loginFacebook(username, facebook_uid, facebook_access_token, this._get_source_login(kwargs)).then(function () {
            if (kwargs.hasOwnProperty('next')) {
                _this._auth_loading = false;
                _this._route.change(kwargs.next.app_route, kwargs.next.app_token);
            }
            else {
                if (_this._app_token == 'home') {
                    var user_app_selected = _this._user.getUserAppAdmin('doador_fundo');
                    if (!user_app_selected) {
                        user_app_selected = _this._user.getUserAppAdmin('doador_empresa');
                    }
                    if (!user_app_selected) {
                        user_app_selected = _this._user.getUserAppAdmin('ong');
                    }
                    if (!user_app_selected) {
                        user_app_selected = _this._user.getUserAppAdmin('doador');
                    }
                    _this._auth_loading = false;
                    _this._route.change("/", user_app_selected.app_token, { user_app_id: user_app_selected.id });
                }
                else {
                    _this._auth_loading = false;
                    _this._route.change('/');
                }
            }
            return true;
        }).catch(function (error) {
            _this._auth_loading = false;
            return Promise.reject(error);
        });
    };
    AppManager.prototype.quickLogin = function (auth, kwargs) {
        var _this = this;
        this._auth_loading = true;
        if (!kwargs) {
            kwargs = {};
        }
        return this._user.quickLogin(auth, this._get_source_login(kwargs)).then(function () {
            if (kwargs.hasOwnProperty('app_route')) {
                _this._auth_loading = false;
                _this._route.change(kwargs.app_route);
            }
            else {
                _this._auth_loading = false;
                _this._route.change(_this._route.uri.home);
            }
            return true;
        }).catch(function () {
            if (kwargs.hasOwnProperty('app_route')) {
                _this._auth_loading = false;
                _this._route.change('login', 'home', { next: { app_route: kwargs.app_route, app_token: _this._app_token } });
            }
            else {
                _this._auth_loading = false;
                _this._route.change('login', 'home');
            }
            return false;
        });
    };
    AppManager.prototype.authGuardPublic = function () {
        var _this = this;
        if (this._user.is_authenticated) {
            return Promise.resolve(true);
        }
        else {
            this._auth_loading = true;
            return this._user.quickLogin().then(function () {
                _this._auth_loading = false;
                return true;
            }).catch(function () {
                _this._auth_loading = false;
                return true;
            });
        }
    };
    AppManager.prototype.authGuardUser = function (current_app_route, on_error_route) {
        var _this = this;
        if (this._user.is_authenticated) {
            this._auth_guard_user_checked = true;
            return Promise.resolve(true);
        }
        else {
            this._auth_loading = true;
            return this._user.quickLogin().then(function () {
                _this._auth_guard_user_checked = true;
                _this._auth_loading = false;
                return true;
            }).catch(function () {
                if (!on_error_route) {
                    on_error_route = {
                        app_route: 'login',
                        app_token: 'home'
                    };
                }
                _this._auth_guard_user_checked = false;
                _this._auth_loading = false;
                return _this.logout(false).then(function () {
                    _this._route.change(on_error_route.app_route, on_error_route.app_token, { next: { app_route: current_app_route, app_token: _this._app_token } });
                    return false;
                }).catch(function () {
                    _this._route.change(on_error_route.app_route, on_error_route.app_token, { next: { app_route: current_app_route, app_token: _this._app_token } });
                    return false;
                });
            });
        }
    };
    AppManager.prototype.authGuardMember = function (current_app_route, permissions, on_error_route) {
        var _this = this;
        return this.authGuardUser(current_app_route).then(function (auth) {
            if (auth) {
                _this._auth_loading = true;
                if (!permissions) {
                    permissions = ['member'];
                }
                if (!on_error_route) {
                    on_error_route = {
                        app_route: _this._route.uri.access_denied,
                        app_token: _this._app_token
                    };
                }
                if (_this._app_profile.initialized) {
                    if (_this.user_has_perm(permissions)) {
                        _this._auth_guard_member_checked = true;
                        _this._auth_loading = false;
                        return true;
                    }
                    else {
                        _this._auth_guard_member_checked = false;
                        _this._auth_loading = false;
                        _this._route.change(on_error_route.app_route, on_error_route.app_token);
                        return false;
                    }
                }
                else {
                    return _this._init_app_profile_member().then(function (auth) {
                        if (auth) {
                            if (_this.user_has_perm(permissions)) {
                                _this._auth_guard_member_checked = true;
                                _this._auth_loading = false;
                                return true;
                            }
                            else {
                                _this._auth_guard_member_checked = false;
                                _this._auth_loading = false;
                                _this._route.change(on_error_route.app_route, on_error_route.app_token);
                                return false;
                            }
                        }
                        else {
                            _this._auth_guard_member_checked = false;
                            _this._auth_loading = false;
                            _this._route.change(_this._route.uri.account_list, _this._app_token, { next: { app_route: current_app_route, app_token: _this._app_token } });
                            return false;
                        }
                    });
                }
            }
            else {
                _this._auth_guard_member_checked = false;
                return false;
            }
        });
    };
    AppManager.prototype.authGuardMemberOrPublic = function (profile_id, permissions, on_error_route) {
        var _this = this;
        return this.authGuardPublic().then(function () {
            _this._auth_loading = true;
            if (!permissions) {
                permissions = ['member'];
            }
            if (!on_error_route) {
                on_error_route = {
                    app_route: _this._route.uri.access_denied,
                    app_token: _this._app_token
                };
            }
            if (_this._app_profile.initialized && _this._app_profile.app_profile_id === +profile_id) {
                _this._check_member_auth(+profile_id, permissions);
                _this._auth_loading = false;
                return Promise.resolve(true);
            }
            return _this._app_profile.init({ id: +profile_id }).then(function () {
                _this._check_member_auth(+profile_id, permissions);
                _this._auth_loading = false;
                return true;
            }).catch(function () {
                _this.unselect_profile();
                _this._auth_guard_member_checked = false;
                _this._auth_loading = false;
                _this._route.change(on_error_route.app_route, on_error_route.app_token);
                return false;
            });
        });
    };
    AppManager.prototype.unselect_profile = function () {
        this._auth_guard_member_checked = false;
        this._user.unselect_profile();
        this._app_profile.reset();
    };
    AppManager.prototype.select_profile = function (app_token, user_app_id, app_route) {
        if (app_token === this._app_token) {
            this.unselect_profile();
        }
        this._route.change(app_route || '/', app_token, { user_app_id: user_app_id });
    };
    AppManager.prototype.list_profile = function () {
        var _this = this;
        return this.user.apps.filter(function (userapp) {
            return userapp.app_token === _this._app_token;
        });
    };
    AppManager.prototype.check_list_profile = function (app_route) {
        var profiles = this.list_profile();
        if (profiles.length === 0) {
            this._route.change(this._route.uri.account_new);
        }
        else if (profiles.length === 1) {
            this.select_profile(profiles[0].app_token, profiles[0].id, app_route);
        }
        return profiles;
    };
    AppManager.prototype.user_has_perm = function (perm_token_list) {
        return this._user.has_perm({
            app_token: this._app_token,
            app_profile_id: this._app_profile.app_profile_id,
            perm_token_list: perm_token_list
        });
    };
    Object.defineProperty(AppManager.prototype, "global_loading", {
        get: function () {
            return ts_resource_tastypie_1.Tastypie.Working.status;
        },
        set: function (p) {
            ts_resource_tastypie_1.Tastypie.Working.status = p;
        },
        enumerable: false,
        configurable: true
    });
    return AppManager;
}());
exports.AppManager = AppManager;
//# sourceMappingURL=weApp.js.map