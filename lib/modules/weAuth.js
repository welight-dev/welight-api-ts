"use strict";
// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>
Object.defineProperty(exports, "__esModule", { value: true });
var api = require("ts-resource-tastypie");
var utils = require("./utils");
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
var UserApp = /** @class */ (function () {
    function UserApp(app_name, app_token, app_profile_id, admin) {
        this._app_name = app_name;
        this._app_token = app_token;
        this._app_profile_id = app_profile_id;
        this._admin = admin;
    }
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
        this._we_auth_user_create_account_resource = new api.Tastypie.Resource('we-auth/user/create_account');
        this._we_auth_user_login_resource = new api.Tastypie.Resource('we-auth/user/login');
        this._we_auth_user_logout_resource = new api.Tastypie.Resource('we-auth/user/logout');
        this._we_auth_user_profile_resource = new api.Tastypie.Resource('we-auth/user/profile');
        this._name = '';
        this._email = '';
        this._is_authenticated = false;
        this._auth = new Auth('', '');
        this._apps = [];
    }
    Object.defineProperty(User.prototype, "is_authenticated", {
        get: function () {
            return this._is_authenticated;
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
    User.prototype.setProfile = function (data) {
        var _self = this;
        if (data &&
            data.hasOwnProperty('name') &&
            data.hasOwnProperty('email') &&
            data.hasOwnProperty('auth') &&
            data.hasOwnProperty('apps')) {
            api.Tastypie.Provider.setAuth('welight', data.auth.username, data.auth.api_key);
            _self._name = data.name;
            _self._email = data.email;
            _self._auth = new Auth(data.auth.username, data.auth.api_key);
            for (var _i = 0, _a = data.apps; _i < _a.length; _i++) {
                var userapp = _a[_i];
                _self._apps.push(new UserApp(userapp.app_name, userapp.app_token, userapp.app_profile_id, userapp.admin));
            }
            _self._is_authenticated = true;
            if (utils.Tools.localStorageSuported) {
                var encrypted_user = crypto.AES.encrypt(JSON.stringify({
                    username: data.auth.username,
                    apikey: data.auth.api_key
                }), _self._encrypt_key).toString();
                localStorage.setItem('weUser', encrypted_user);
            }
        }
        else {
            _self._name = '';
            _self._email = '';
            _self._is_authenticated = false;
            _self._auth = new Auth('', '');
            _self._apps = [];
            if (utils.Tools.localStorageSuported)
                localStorage.removeItem('weUser');
        }
    };
    User.prototype.create_account = function (name, email, password, kwargs) {
        var _self = this;
        return _self._we_auth_user_create_account_resource.objects.create({
            name: name,
            email: email,
            password: password,
            kwargs: kwargs
        }).then(function (data) {
            _self.setProfile(data);
            if (_self._is_authenticated) {
                return _self;
            }
            else {
                return api.Tastypie.Tools.generate_exception("[WeAuth][create_account] Usuario não identificado");
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
            _self.setProfile(data);
            if (_self._is_authenticated) {
                return _self;
            }
            else {
                return api.Tastypie.Tools.generate_exception("[WeAuth][login] Usuario não identificado");
            }
        });
    };
    User.prototype.login_facebook = function (username, facebook_uid, facebook_access_token, kwargs) {
        var _self = this;
        return _self._we_auth_user_login_resource.objects.create({
            username: username,
            facebook_uid: facebook_uid,
            facebook_access_token: facebook_access_token,
            kwargs: kwargs
        }).then(function (data) {
            _self.setProfile(data);
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
        return _self._we_auth_user_profile_resource.objects.findOne().then(function (data) {
            _self.setProfile(data);
            if (_self._is_authenticated) {
                return _self;
            }
            else {
                return api.Tastypie.Tools.generate_exception("[WeAuth][quick_login] Usuario não identificado");
            }
        });
    };
    User.prototype.quickLogin = function (auth, kwargs) {
        var _self = this;
        if (auth) {
            return _self._quickLogin(auth.username, auth.apikey, kwargs);
        }
        else {
            if (utils.Tools.localStorageSuported) {
                var weUser = localStorage.getItem('weUser');
                if (weUser) {
                    var auth_user = JSON.parse(crypto.AES.decrypt(weUser, _self._encrypt_key).toString(crypto.enc.Utf8));
                    return _self._quickLogin(auth_user.username, auth_user.apikey, kwargs);
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
    User.prototype.logout = function () {
        var _self = this;
        if (utils.Tools.localStorageSuported)
            localStorage.removeItem('weUser');
        return _self._we_auth_user_logout_resource.objects.findOne().then(function (data) {
            _self._name = '';
            _self._email = '';
            _self._is_authenticated = false;
            _self._auth = new Auth('', '');
            _self._apps = [];
            if (utils.Tools.localStorageSuported)
                localStorage.removeItem('weUser');
            return data;
        });
    };
    return User;
}());
exports.User = User;
//# sourceMappingURL=weAuth.js.map