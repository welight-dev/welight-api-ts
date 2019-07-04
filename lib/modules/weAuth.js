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
var utils_1 = require("./utils");
var crypto = require("crypto-js");
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
var AppPermission = /** @class */ (function () {
    function AppPermission(obj) {
        this._name = obj.name;
        this._token = obj.token;
    }
    Object.defineProperty(AppPermission.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppPermission.prototype, "token", {
        get: function () {
            return this._token;
        },
        enumerable: true,
        configurable: true
    });
    return AppPermission;
}());
exports.AppPermission = AppPermission;
var UserApp = /** @class */ (function () {
    function UserApp(id, app_name, app_token, app_profile_id, display_name, admin, permissions) {
        this._id = id;
        this._app_name = app_name;
        this._app_token = app_token;
        this._app_profile_id = app_profile_id;
        this._display_name = display_name;
        this._admin = admin;
        this._permissions = [];
        for (var _i = 0, permissions_1 = permissions; _i < permissions_1.length; _i++) {
            var perm = permissions_1[_i];
            this._permissions.push(perm);
        }
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
    UserApp.prototype.has_perm = function (perm_token_list) {
        if (this._admin) {
            return true;
        }
        else {
            var resp_return = false;
            for (var _i = 0, perm_token_list_1 = perm_token_list; _i < perm_token_list_1.length; _i++) {
                var token = perm_token_list_1[_i];
                for (var _a = 0, _b = this._permissions; _a < _b.length; _a++) {
                    var perm = _b[_a];
                    if (perm.name == token) {
                        resp_return = true;
                        break;
                    }
                }
                if (resp_return) {
                    break;
                }
            }
            return resp_return;
        }
    };
    return UserApp;
}());
exports.UserApp = UserApp;
var UserBar = /** @class */ (function () {
    function UserBar() {
        this._app_admin = [];
        this._app_shared = [];
        this._app_available = [];
        this._set_available();
    }
    UserBar.prototype._set_available = function () {
        this._app_available.push(new UserApp(0, 'OMG', 'ong', 0, 'OMG', false, []));
        this._app_available.push(new UserApp(0, 'Company', 'doador_empresa', 0, 'Company', false, []));
        this._app_available.push(new UserApp(0, 'ORG Funds', 'doador_fundo', 0, 'ORG Funds', false, []));
    };
    UserBar.prototype.add_app = function (obj) {
        if (obj.admin) {
            for (var i = 0; i < this._app_available.length; i++) {
                if (this._app_available[i].app_token === obj.app_token) {
                    this._app_available.splice(i, 1);
                }
            }
            this._app_admin.push(obj);
        }
        else {
            this._app_shared.push(obj);
        }
    };
    Object.defineProperty(UserBar.prototype, "app_admin", {
        get: function () {
            return this._app_admin;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserBar.prototype, "app_shared", {
        get: function () {
            return this._app_shared;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserBar.prototype, "app_available", {
        get: function () {
            return this._app_available;
        },
        enumerable: true,
        configurable: true
    });
    return UserBar;
}());
exports.UserBar = UserBar;
var User = /** @class */ (function () {
    function User() {
        this.reset();
        this._encrypt_key = 's7hsj2d12easd63ksye598sdhw312ed8';
        this._plugin_navegador = new utils_1.PluginNavegador();
        this._we_auth_user_create_account_resource = new ts_resource_tastypie_1.Tastypie.Resource('we-auth/user/create-account');
        this._we_auth_user_create_account_ong_resource = new ts_resource_tastypie_1.Tastypie.Resource('we-auth/user/create-account-ong');
        this._we_auth_user_create_account_doador_empresa_resource = new ts_resource_tastypie_1.Tastypie.Resource('we-auth/user/create-account-doador-empresa');
        this._we_auth_user_create_account_doador_fundo_resource = new ts_resource_tastypie_1.Tastypie.Resource('we-auth/user/create-account-doador-fundo');
        this._we_auth_user_login_resource = new ts_resource_tastypie_1.Tastypie.Resource('we-auth/user/login');
        this._we_auth_user_logout_resource = new ts_resource_tastypie_1.Tastypie.Resource('we-auth/user/logout');
        this._we_auth_user_profile_resource = new ts_resource_tastypie_1.Tastypie.Resource('we-auth/user/profile');
        this._we_auth_user_reset_pass_request_resource = new ts_resource_tastypie_1.Tastypie.Resource('we-auth/user/reset-password-request');
        this._we_auth_user_reset_pass_execute_resource = new ts_resource_tastypie_1.Tastypie.Resource('we-auth/user/reset-password-execute');
        this._we_auth_user_change_pass_resource = new ts_resource_tastypie_1.Tastypie.Resource('we-auth/user/change-password');
        var _self = this;
        document.addEventListener("$wl_msg_checkSite", function (data) {
            _self._plugin_navegador.instalado = true;
            _self.notificarPlugin();
        });
    }
    User.prototype.reset = function () {
        this.name = '';
        this._email = '';
        this._auth = new Auth('', '');
        this._account = new UserAccount();
        this._address = new UserAddress();
        this._current_user_app = null;
        this._apps = [];
        this._bar = new UserBar();
        this._is_authenticated = false;
    };
    User.prototype.save = function () {
        var _self = this;
        return _self._we_auth_user_profile_resource.objects.update(_self._id, { name: _self.name }).then(function () {
            _self.notificarPlugin();
            return _self;
        });
    };
    User.prototype.unselect_profile = function () {
        this._current_user_app = null;
        if (utils_1.Tools.localStorageSuported) {
            var weUser = localStorage.getItem('weUserX');
            if (weUser) {
                var auth_user = JSON.parse(crypto.AES.decrypt(weUser, this._encrypt_key).toString(crypto.enc.Utf8));
                var kwargs = auth_user.kwargs || {};
                var removed = false;
                if (kwargs.hasOwnProperty('source')) {
                    if (kwargs.source.detail.hasOwnProperty('user_app_id')) {
                        delete kwargs.source.detail['user_app_id'];
                        removed = true;
                    }
                }
                if (removed) {
                    auth_user.kwargs = kwargs;
                    var encrypted_user = crypto.AES.encrypt(JSON.stringify(auth_user), this._encrypt_key).toString();
                    localStorage.setItem('weUserX', encrypted_user);
                }
            }
        }
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
    Object.defineProperty(User.prototype, "bar", {
        get: function () {
            return this._bar;
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
    Object.defineProperty(User.prototype, "address", {
        get: function () {
            return this._address;
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
        var userapp_return = null;
        for (var _i = 0, _a = this.apps; _i < _a.length; _i++) {
            var userapp = _a[_i];
            if (userapp.app_token == app_token && userapp.admin) {
                userapp_return = userapp;
                break;
            }
        }
        return userapp_return;
    };
    User.prototype.getUserAppById = function (id) {
        var userapp_return = null;
        for (var _i = 0, _a = this.apps; _i < _a.length; _i++) {
            var userapp = _a[_i];
            if (userapp.id == id) {
                userapp_return = userapp;
                break;
            }
        }
        return userapp_return;
    };
    User.prototype.getUserAppByProfile = function (token, profile_id) {
        var userapp_return = null;
        for (var _i = 0, _a = this.apps; _i < _a.length; _i++) {
            var userapp = _a[_i];
            if (userapp.app_token == token && userapp.app_profile_id == profile_id) {
                userapp_return = userapp;
                break;
            }
        }
        return userapp_return;
    };
    User.prototype.has_perm = function (obj_perm) {
        var obj_userapp = null;
        if (this._current_user_app.app_token == obj_perm.app_token
            && this._current_user_app.app_profile_id == obj_perm.app_profile_id) {
            obj_userapp = this._current_user_app;
        }
        else {
            obj_userapp = this.getUserAppByProfile(obj_perm.app_token, obj_perm.app_profile_id);
        }
        if (!obj_userapp) {
            return false;
        }
        var obj_member = {
            admin: false,
            member: false
        };
        for (var _i = 0, _a = obj_perm.perm_token_list; _i < _a.length; _i++) {
            var token = _a[_i];
            if (token == 'admin') {
                obj_member.admin = true;
                break;
            }
            if (token == 'member') {
                obj_member.member = true;
            }
        }
        if (obj_member.admin) {
            return obj_userapp.admin;
        }
        if (obj_member.member) {
            return true;
        }
        return obj_userapp.has_perm(obj_perm.perm_token_list);
    };
    User.prototype.setProfile = function (data, kwargs) {
        var _self = this;
        if (data &&
            data.hasOwnProperty('name') &&
            data.hasOwnProperty('email') &&
            data.hasOwnProperty('auth') &&
            data.hasOwnProperty('apps') &&
            data.hasOwnProperty('account') &&
            data.hasOwnProperty('address')) {
            ts_resource_tastypie_1.Tastypie.Provider.setAuth('welight', data.auth.username, data.auth.api_key);
            _self._id = data.id;
            _self.name = data.name;
            _self._email = data.email;
            _self._auth = new Auth(data.auth.username, data.auth.api_key);
            _self._account = new UserAccount(data);
            _self._address = new UserAddress(data);
            _self._apps = [];
            _self._bar = new UserBar();
            for (var _i = 0, _a = data.apps; _i < _a.length; _i++) {
                var userapp = _a[_i];
                var obj_userapp = new UserApp(userapp.id, userapp.app_name, userapp.app_token, userapp.app_profile_id, userapp.display_name, userapp.admin, userapp.permissions);
                _self._apps.push(obj_userapp);
                _self._bar.add_app(obj_userapp);
            }
            if (!kwargs) {
                kwargs = {};
            }
            if (!kwargs.hasOwnProperty('source')) {
                kwargs['source'] = {
                    detail: {}
                };
            }
            if (data.hasOwnProperty('current_user_app')) {
                kwargs.source.detail['user_app_id'] = data.current_user_app.id;
            }
            if (kwargs.hasOwnProperty('source')) {
                if (kwargs.source.detail.hasOwnProperty('user_app_id')) {
                    _self._current_user_app = _self.getUserAppById(kwargs.source.detail.user_app_id);
                }
            }
            _self._is_authenticated = true;
            _self.notificarPlugin();
            if (utils_1.Tools.localStorageSuported) {
                var encrypted_user = crypto.AES.encrypt(JSON.stringify({
                    username: data.auth.username,
                    apikey: data.auth.api_key,
                    kwargs: kwargs.source
                }), _self._encrypt_key).toString();
                localStorage.setItem('weUserX', encrypted_user);
            }
        }
        else {
            _self.reset();
            if (utils_1.Tools.localStorageSuported)
                localStorage.removeItem('weUserX');
        }
    };
    User.prototype.createAccount = function (name, email, password, kwargs) {
        var _this = this;
        return this._we_auth_user_create_account_resource.objects.create({
            name: name,
            email: email,
            password: password,
            kwargs: kwargs
        }).then(function (data) {
            _this.setProfile(data, kwargs);
            if (_this._is_authenticated) {
                return _this;
            }
            else {
                return ts_resource_tastypie_1.Tastypie.Tools.generate_exception("[WeAuth][create_account_ong] Usuario não identificado");
            }
        });
    };
    User.prototype.createAccountOng = function (nome, email, razao_social, cnpj, kwargs) {
        var _this = this;
        return this._we_auth_user_create_account_ong_resource.objects.create({
            nome: nome,
            email: email,
            razao_social: razao_social,
            cnpj: cnpj,
            kwargs: kwargs
        }).then(function (data) {
            _this.setProfile(data, kwargs);
            if (_this._is_authenticated) {
                return _this;
            }
            else {
                return ts_resource_tastypie_1.Tastypie.Tools.generate_exception("[WeAuth][create_account_ong] Usuario não identificado");
            }
        });
    };
    User.prototype.createAccountDoadorEmpresa = function (nome, email, cpf_cnpj, kwargs) {
        var _this = this;
        return this._we_auth_user_create_account_doador_empresa_resource.objects.create({
            nome: nome,
            email: email,
            cpf_cnpj: cpf_cnpj,
            kwargs: kwargs
        }).then(function (data) {
            _this.setProfile(data, kwargs);
            if (_this._is_authenticated) {
                return _this;
            }
            else {
                return ts_resource_tastypie_1.Tastypie.Tools.generate_exception("[WeAuth][create_account_doador_empresa] Usuario não identificado");
            }
        });
    };
    User.prototype.createAccountDoadorFundo = function (name, email, activity_id, kwargs) {
        var _this = this;
        return this._we_auth_user_create_account_doador_fundo_resource.objects.create({
            name: name,
            email: email,
            activity_id: activity_id,
            kwargs: kwargs
        }).then(function (data) {
            _this.setProfile(data, kwargs);
            if (_this._is_authenticated) {
                return _this;
            }
            else {
                return ts_resource_tastypie_1.Tastypie.Tools.generate_exception("[WeAuth][create_account_doador_fundo] Usuario não identificado");
            }
        });
    };
    User.prototype.login = function (username, password, kwargs) {
        var _this = this;
        return this._we_auth_user_login_resource.objects.create({
            username: username,
            password: password,
            kwargs: kwargs
        }).then(function (data) {
            _this.setProfile(data, kwargs);
            if (_this._is_authenticated) {
                return _this;
            }
            else {
                return ts_resource_tastypie_1.Tastypie.Tools.generate_exception("[WeAuth][login] Usuario não identificado");
            }
        });
    };
    User.prototype.loginFacebook = function (username, facebook_uid, facebook_access_token, kwargs) {
        var _this = this;
        return this._we_auth_user_login_resource.objects.create({
            username: username,
            facebook_uid: facebook_uid,
            facebook_access_token: facebook_access_token,
            kwargs: kwargs
        }).then(function (data) {
            _this.setProfile(data, kwargs);
            if (_this._is_authenticated) {
                return _this;
            }
            else {
                return ts_resource_tastypie_1.Tastypie.Tools.generate_exception("[WeAuth][login_facebook] Usuario não identificado");
            }
        });
    };
    User.prototype._quickLogin = function (username, apikey, kwargs) {
        var _this = this;
        ts_resource_tastypie_1.Tastypie.Provider.setAuth('welight', username, apikey);
        return this._we_auth_user_profile_resource.objects.findOne({ kwargs: kwargs }).then(function (data) {
            _this.setProfile(data, kwargs);
            if (_this._is_authenticated) {
                return _this;
            }
            else {
                return ts_resource_tastypie_1.Tastypie.Tools.generate_exception("[WeAuth][quick_login] Usuario não identificado");
            }
        }).catch(function () {
            this._logout();
            return ts_resource_tastypie_1.Tastypie.Tools.generate_exception("[WeAuth][quick_login] Usuario não identificado");
        });
    };
    User.prototype.quickLogin = function (auth, kwargs) {
        if (auth) {
            return this._quickLogin(auth.username, auth.apikey, kwargs);
        }
        else {
            if (utils_1.Tools.localStorageSuported) {
                var weUser = localStorage.getItem('weUserX');
                if (weUser) {
                    var auth_user = JSON.parse(crypto.AES.decrypt(weUser, this._encrypt_key).toString(crypto.enc.Utf8));
                    return this._quickLogin(auth_user.username, auth_user.apikey, auth_user.kwargs);
                }
                else {
                    return ts_resource_tastypie_1.Tastypie.Tools.generate_exception("[WeAuth][quick_login] Usuario não identificado");
                }
            }
            else {
                return ts_resource_tastypie_1.Tastypie.Tools.generate_exception("[WeAuth][quick_login] Usuario não identificado");
            }
        }
    };
    User.prototype._logout = function () {
        ts_resource_tastypie_1.Tastypie.Provider.removeAuth('welight');
        this.reset();
        if (utils_1.Tools.localStorageSuported)
            localStorage.removeItem('weUserX');
        if (config_1.Environment.env == 'prod') {
            var wl_msg_event = new CustomEvent('$wl_msg_sendUserProfile', { 'detail': {} });
            document.dispatchEvent(wl_msg_event);
        }
    };
    User.prototype.logout = function () {
        var _this = this;
        return this._we_auth_user_logout_resource.objects.findOne().then(function () {
            _this._logout();
            return _this;
        }).catch(function () {
            _this._logout();
            return _this;
        });
    };
    User.prototype.reset_password_request = function (email, kwargs) {
        return this._we_auth_user_reset_pass_request_resource.objects.create({
            email: email,
            kwargs: kwargs
        });
    };
    User.prototype.reset_password_execute = function (token, password, kwargs) {
        var _this = this;
        return this._we_auth_user_reset_pass_execute_resource.objects.create({
            token: token,
            pass: password,
            kwargs: kwargs
        }).then(function (data) {
            _this.setProfile(data, kwargs);
            if (_this._is_authenticated) {
                return _this;
            }
            else {
                return ts_resource_tastypie_1.Tastypie.Tools.generate_exception("[WeAuth][reset_password_execute] Usuario não identificado");
            }
        });
    };
    User.prototype.change_password = function (username, pass_old, pass_new, kwargs) {
        var _this = this;
        return this._we_auth_user_change_pass_resource.objects.create({
            username: username,
            pass_old: pass_old,
            pass_new: pass_new,
            kwargs: kwargs
        }).then(function (data) {
            _this.setProfile(data, kwargs);
            if (_this._is_authenticated) {
                return _this;
            }
            else {
                return ts_resource_tastypie_1.Tastypie.Tools.generate_exception("[WeAuth][change_password] Usuario não identificado");
            }
        });
    };
    User.prototype.notificarPlugin = function () {
        if (config_1.Environment.env == 'prod' && this._is_authenticated) {
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
    UserAccount.resource = new ts_resource_tastypie_1.Tastypie.Resource('we-auth/user/profile', { model: UserAccount });
    return UserAccount;
}(ts_resource_tastypie_1.Tastypie.Model));
exports.UserAccount = UserAccount;
var UserAddress = /** @class */ (function (_super) {
    __extends(UserAddress, _super);
    function UserAddress(obj) {
        var _this = _super.call(this, UserAddress.resource) || this;
        if (obj) {
            _this.setData(obj.address);
            _this.user_id = obj.id;
        }
        return _this;
    }
    UserAddress.prototype.save = function () {
        var _this = this;
        return UserAddress.resource.objects.update(this.user_id, { address: this.getData() }).then(function (data) {
            _this.setData(data);
            return _this;
        });
    };
    UserAddress.resource = new ts_resource_tastypie_1.Tastypie.Resource('we-auth/user/profile', { model: UserAddress });
    return UserAddress;
}(utils_1.Address));
exports.UserAddress = UserAddress;
//# sourceMappingURL=weAuth.js.map