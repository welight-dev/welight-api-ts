"use strict";
// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var api = require("ts-resource-tastypie");
var utils = require("./utils");
var crypto = require("crypto-js");
var config = require("./config");
var Auth = /** @class */ (function () {
    function Auth(username, api_key) {
        this._username = username;
        this._api_key = api_key;
    }
    Object.defineProperty(Auth.prototype, "username", {
        get: function () {
            return this._username;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Auth.prototype, "api_key", {
        get: function () {
            return this._api_key;
        },
        enumerable: true,
        configurable: true
    });
    return Auth;
}());
exports.Auth = Auth;
var UserApp = /** @class */ (function () {
    function UserApp(id, app_name, app_token, app_profile_id, display_name, admin) {
        this._id = id;
        this._app_name = app_name;
        this._app_token = app_token;
        this._app_profile_id = app_profile_id;
        this._display_name = display_name;
        this._admin = admin;
    }
    Object.defineProperty(UserApp.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserApp.prototype, "app_name", {
        get: function () {
            return this._app_name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserApp.prototype, "app_token", {
        get: function () {
            return this._app_token;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserApp.prototype, "app_profile_id", {
        get: function () {
            return this._app_profile_id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserApp.prototype, "display_name", {
        get: function () {
            return this._display_name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserApp.prototype, "admin", {
        get: function () {
            return this._admin;
        },
        enumerable: true,
        configurable: true
    });
    return UserApp;
}());
exports.UserApp = UserApp;
var User = /** @class */ (function () {
    function User() {
        this._encrypt_key = 's7hsj2d12easd63ksye598sdhw312ed8';
        this._we_auth_user_create_account_resource = new api.Tastypie.Resource('we-auth/user/create-account');
        this._we_auth_user_create_account_ong_resource = new api.Tastypie.Resource('we-auth/user/create-account-ong');
        this._we_auth_user_create_account_doador_empresa_resource = new api.Tastypie.Resource('we-auth/user/create-account-doador-empresa');
        this._we_auth_user_login_resource = new api.Tastypie.Resource('we-auth/user/login');
        this._we_auth_user_logout_resource = new api.Tastypie.Resource('we-auth/user/logout');
        this._we_auth_user_profile_resource = new api.Tastypie.Resource('we-auth/user/profile');
        this._we_auth_user_reset_pass_request_resource = new api.Tastypie.Resource('we-auth/user/reset-password-request');
        this._we_auth_user_reset_pass_execute_resource = new api.Tastypie.Resource('we-auth/user/reset-password-execute');
        this._we_auth_user_change_pass_resource = new api.Tastypie.Resource('we-auth/user/change-password');
        this.name = '';
        this._email = '';
        this._is_authenticated = false;
        this._auth = new Auth('', '');
        this._account = new UserAccount();
        this._apps = [];
        this._plugin_navegador = new utils.PluginNavegador();
        var _self = this;
        document.addEventListener("$wl_msg_checkSite", function (data) {
            _self._plugin_navegador.instalado = true;
            _self.notificarPlugin();
        });
    }
    User.prototype.save = function () {
        var _self = this;
        return _self._we_auth_user_profile_resource.objects.update(_self._id, { name: _self.name }).then(function () {
            _self.notificarPlugin();
            return _self;
        });
    };
    Object.defineProperty(User.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "email", {
        get: function () {
            return this._email;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "auth", {
        get: function () {
            return this._auth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "apps", {
        get: function () {
            return this._apps;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "account", {
        get: function () {
            return this._account;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "is_authenticated", {
        get: function () {
            return this._is_authenticated;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "current_user_app", {
        get: function () {
            return this._current_user_app;
        },
        set: function (userapp) {
            this._current_user_app = userapp;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "plugin_navegador", {
        get: function () {
            return this._plugin_navegador;
        },
        enumerable: true,
        configurable: true
    });
    User.prototype.getUserAppAdmin = function (app_token) {
        var _self = this;
        var userapp_return;
        for (var _i = 0, _a = _self.apps; _i < _a.length; _i++) {
            var userapp = _a[_i];
            if (userapp.app_token == app_token && userapp.admin) {
                userapp_return = userapp;
                break;
            }
        }
        return userapp_return;
    };
    User.prototype.getUserAppById = function (id) {
        var _self = this;
        var userapp_return;
        for (var _i = 0, _a = _self.apps; _i < _a.length; _i++) {
            var userapp = _a[_i];
            if (userapp.id == id) {
                userapp_return = userapp;
                break;
            }
        }
        return userapp_return;
    };
    User.prototype.setProfile = function (data, kwargs) {
        var _self = this;
        if (data &&
            data.hasOwnProperty('name') &&
            data.hasOwnProperty('email') &&
            data.hasOwnProperty('auth') &&
            data.hasOwnProperty('apps') &&
            data.hasOwnProperty('account')) {
            api.Tastypie.Provider.setAuth('welight', data.auth.username, data.auth.api_key);
            _self._id = data.id;
            _self.name = data.name;
            _self._email = data.email;
            _self._auth = new Auth(data.auth.username, data.auth.api_key);
            _self._account = new UserAccount(data);
            for (var _i = 0, _a = data.apps; _i < _a.length; _i++) {
                var userapp = _a[_i];
                _self._apps.push(new UserApp(userapp.id, userapp.app_name, userapp.app_token, userapp.app_profile_id, userapp.display_name, userapp.admin));
            }
            if (kwargs) {
                if (kwargs.hasOwnProperty('source')) {
                    if (kwargs.source.detail.hasOwnProperty('user_app_id')) {
                        _self._current_user_app = _self.getUserAppById(kwargs.source.detail.user_app_id);
                    }
                }
            }
            _self._is_authenticated = true;
            _self.notificarPlugin();
            if (utils.Tools.localStorageSuported) {
                var encrypted_user = crypto.AES.encrypt(JSON.stringify({
                    username: data.auth.username,
                    apikey: data.auth.api_key,
                    kwargs: kwargs
                }), _self._encrypt_key).toString();
                localStorage.setItem('weUserX', encrypted_user);
            }
        }
        else {
            _self.name = '';
            _self._email = '';
            _self._is_authenticated = false;
            _self._auth = new Auth('', '');
            _self._apps = [];
            if (utils.Tools.localStorageSuported)
                localStorage.removeItem('weUserX');
        }
    };
    User.prototype.createAccount = function (name, email, password, kwargs) {
        var _self = this;
        return _self._we_auth_user_create_account_resource.objects.create({
            name: name,
            email: email,
            password: password,
            kwargs: kwargs
        }).then(function (data) {
            _self.setProfile(data, kwargs);
            if (_self._is_authenticated) {
                return _self;
            }
            else {
                return api.Tastypie.Tools.generate_exception("[WeAuth][create_account] Usuario não identificado");
            }
        });
    };
    User.prototype.createAccountOng = function (nome, email, razao_social, cnpj, kwargs) {
        var _self = this;
        return _self._we_auth_user_create_account_ong_resource.objects.create({
            nome: nome,
            email: email,
            razao_social: razao_social,
            cnpj: cnpj,
            kwargs: kwargs
        }).then(function (data) {
            _self.setProfile(data, kwargs);
            if (_self._is_authenticated) {
                return _self;
            }
            else {
                return api.Tastypie.Tools.generate_exception("[WeAuth][create_account_ong] Usuario não identificado");
            }
        });
    };
    User.prototype.createAccountDoadorEmpresa = function (nome, email, cpf_cnpj, kwargs) {
        var _self = this;
        return _self._we_auth_user_create_account_doador_empresa_resource.objects.create({
            nome: nome,
            email: email,
            cpf_cnpj: cpf_cnpj,
            kwargs: kwargs
        }).then(function (data) {
            _self.setProfile(data, kwargs);
            if (_self._is_authenticated) {
                return _self;
            }
            else {
                return api.Tastypie.Tools.generate_exception("[WeAuth][create_account_doador_empresa] Usuario não identificado");
            }
        });
    };
    User.prototype.login = function (username, password, kwargs) {
        var _self = this;
        return _self._we_auth_user_login_resource.objects.create({
            username: username,
            password: password,
            kwargs: kwargs
        }).then(function (data) {
            _self.setProfile(data, kwargs);
            if (_self._is_authenticated) {
                return _self;
            }
            else {
                return api.Tastypie.Tools.generate_exception("[WeAuth][login] Usuario não identificado");
            }
        });
    };
    User.prototype.loginFacebook = function (username, facebook_uid, facebook_access_token, kwargs) {
        var _self = this;
        return _self._we_auth_user_login_resource.objects.create({
            username: username,
            facebook_uid: facebook_uid,
            facebook_access_token: facebook_access_token,
            kwargs: kwargs
        }).then(function (data) {
            _self.setProfile(data, kwargs);
            if (_self._is_authenticated) {
                return _self;
            }
            else {
                return api.Tastypie.Tools.generate_exception("[WeAuth][login] Usuario não identificado");
            }
        });
    };
    User.prototype._quickLogin = function (username, apikey, kwargs) {
        var _self = this;
        api.Tastypie.Provider.setAuth('welight', username, apikey);
        return _self._we_auth_user_profile_resource.objects.findOne({ kwargs: kwargs }).then(function (data) {
            _self.setProfile(data, kwargs);
            if (_self._is_authenticated) {
                return _self;
            }
            else {
                return api.Tastypie.Tools.generate_exception("[WeAuth][quick_login] Usuario não identificado");
            }
        }).catch(function () {
            _self._logout();
            return api.Tastypie.Tools.generate_exception("[WeAuth][quick_login] Usuario não identificado");
        });
    };
    User.prototype.quickLogin = function (auth, kwargs) {
        var _self = this;
        if (auth) {
            return _self._quickLogin(auth.username, auth.apikey, kwargs);
        }
        else {
            if (utils.Tools.localStorageSuported) {
                var weUser = localStorage.getItem('weUserX');
                if (weUser) {
                    var auth_user = JSON.parse(crypto.AES.decrypt(weUser, _self._encrypt_key).toString(crypto.enc.Utf8));
                    return _self._quickLogin(auth_user.username, auth_user.apikey, auth_user.kwargs);
                }
                else {
                    return api.Tastypie.Tools.generate_exception("[WeAuth][quick_login] Usuario não identificado");
                }
            }
            else {
                return api.Tastypie.Tools.generate_exception("[WeAuth][quickLogin] Usuario não identificado");
            }
        }
    };
    User.prototype._logout = function () {
        api.Tastypie.Provider.removeAuth('welight');
        this.name = '';
        this._email = '';
        this._is_authenticated = false;
        this._auth = new Auth('', '');
        this._apps = [];
        if (utils.Tools.localStorageSuported)
            localStorage.removeItem('weUserX');
        if (config.Environment.env == 'prod') {
            var wl_msg_event = new CustomEvent('$wl_msg_sendUserProfile', { 'detail': {} });
            document.dispatchEvent(wl_msg_event);
        }
    };
    User.prototype.logout = function () {
        var _self = this;
        if (utils.Tools.localStorageSuported)
            localStorage.removeItem('weUserX');
        return _self._we_auth_user_logout_resource.objects.findOne().then(function () {
            _self._logout();
            return _self;
        }).catch(function () {
            _self._logout();
            return _self;
        });
    };
    User.prototype.reset_password_request = function (email, kwargs) {
        return this._we_auth_user_reset_pass_request_resource.objects.create({
            email: email,
            kwargs: kwargs
        });
    };
    User.prototype.reset_password_execute = function (token, password, kwargs) {
        var _self = this;
        return _self._we_auth_user_reset_pass_execute_resource.objects.create({
            token: token,
            pass: password,
            kwargs: kwargs
        }).then(function (data) {
            _self.setProfile(data, kwargs);
            if (_self._is_authenticated) {
                return _self;
            }
            else {
                return api.Tastypie.Tools.generate_exception("[WeAuth][reset_password_execute] Usuario não identificado");
            }
        });
    };
    User.prototype.change_password = function (username, pass_old, pass_new, kwargs) {
        var _self = this;
        return _self._we_auth_user_change_pass_resource.objects.create({
            username: username,
            pass_old: pass_old,
            pass_new: pass_new,
            kwargs: kwargs
        }).then(function (data) {
            _self.setProfile(data, kwargs);
            if (_self._is_authenticated) {
                return _self;
            }
            else {
                return api.Tastypie.Tools.generate_exception("[WeAuth][change_password] Usuario não identificado");
            }
        });
    };
    User.prototype.notificarPlugin = function () {
        if (config.Environment.env == 'prod' && this._is_authenticated) {
            var _self = this;
            var wl_msg_profile = {
                user: { username: _self._auth.username, api_key: _self._auth.api_key }
            };
            var wl_msg_event = new CustomEvent('$wl_msg_sendUserProfile', { 'detail': wl_msg_profile });
            document.dispatchEvent(wl_msg_event);
        }
    };
    User.prototype.instalarPluginNavegador = function (navegador) {
        var _self = this;
        return new Promise(function (resolve, reject) {
            if (navegador == "chrome") {
                _self._plugin_navegador.instalarExtensaoChrome().then(function (success) {
                    _self.notificarPlugin();
                    resolve(true);
                });
            }
            else if (navegador == "firefox") {
                _self._plugin_navegador.instalarExtensaoFirefox().then(function (success) {
                    _self.notificarPlugin();
                    resolve(true);
                });
            }
            else if (navegador == "safari") {
                window.open('https://safari-extensions.apple.com/details/?id=co.welight.safari.welight-AR7RY2A3BF', '_blank');
                resolve(true);
            }
            else {
                reject('Browser not supported.');
            }
        });
    };
    return User;
}());
exports.User = User;
var UserAccount = /** @class */ (function (_super) {
    __extends(UserAccount, _super);
    function UserAccount(obj) {
        var _this = _super.call(this, UserAccount.resource) || this;
        if (obj) {
            _this.setData(obj.account);
            _this.user_id = obj.id;
        }
        return _this;
    }
    UserAccount.prototype.save = function () {
        var _self = this;
        return UserAccount.resource.objects.update(_self.user_id, { account: _self.getData() }).then(function (data) {
            _self.setData(data);
            return _self;
        });
    };
    UserAccount.prototype.changeFoto = function (event) {
        var _self = this;
        var uploading = new Promise(function (resolve, reject) {
            var timeout = setTimeout(function () { reject('timeout'); }, 15000);
            var reader = new FileReader();
            reader.onload = function (loadEvent) {
                var paramFile = loadEvent.target.result;
                UserAccount.resource.objects.update(_self.user_id, { account: { foto: paramFile } }).then(function (data) {
                    clearTimeout(timeout);
                    _self.setData(data);
                    resolve(data);
                }).catch(function (error) {
                    clearTimeout(timeout);
                    reject(error);
                });
            };
            reader.readAsDataURL(event.target.files[0]);
        });
        return uploading;
    };
    UserAccount.prototype.changeFotoBase64 = function (dataBase64) {
        var _self = this;
        return UserAccount.resource.objects.update(_self.user_id, { account: { foto: dataBase64 } }).then(function (data) {
            _self.setData(data);
            return _self;
        });
    };
    UserAccount.resource = new api.Tastypie.Resource('we-auth/user/profile', { model: UserAccount });
    return UserAccount;
}(api.Tastypie.Model));
exports.UserAccount = UserAccount;
//# sourceMappingURL=weAuth.js.map