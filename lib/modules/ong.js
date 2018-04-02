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
var weauth_models = require("./weAuth");
var Ong = /** @class */ (function (_super) {
    __extends(Ong, _super);
    function Ong(obj) {
        var _this = _super.call(this, Ong.resource, obj) || this;
        _this._user = new weauth_models.User();
        _this.initProfile(obj);
        return _this;
    }
    Ong.prototype.initProfile = function (obj) {
        var _self = this;
        if (_self.id) {
            _self._timeline = new api.Tastypie.Resource('ong/timeline', { model: OngTimeLine, defaults: { ong_id: _self.id } });
            _self._fotos = new api.Tastypie.Resource('ong/timeline', { model: OngTimeLine, defaults: { ong_id: _self.id, tipo: 'fotos' } });
            _self._videos = new api.Tastypie.Resource('ong/timeline', { model: OngTimeLine, defaults: { ong_id: _self.id, tipo: 'videos' } });
        }
        if (obj.profile_detail)
            this._profile_detail = new OngDetail(obj.profile_detail);
    };
    Object.defineProperty(Ong.prototype, "profile_detail", {
        get: function () {
            return this._profile_detail;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ong.prototype, "timeline", {
        get: function () {
            return this._timeline;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ong.prototype, "fotos", {
        get: function () {
            return this._fotos;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ong.prototype, "videos", {
        get: function () {
            return this._videos;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ong.prototype, "user", {
        get: function () {
            return this._user;
        },
        enumerable: true,
        configurable: true
    });
    Ong.prototype.getEndereco = function () {
        if (this.id) {
            return OngEndereco.resource.objects.findOne({ ong_id: this.id });
        }
        else {
            return api.Tastypie.Tools.generate_exception("[Ong][getEndereco] Ong não identificada");
        }
    };
    Ong.prototype.createAccount = function (nome, email, razao_social, cnpj, kwargs) {
        var _self = this;
        return this._user.createAccountOng(name, email, razao_social, cnpj, kwargs).then(function (user) {
            var user_app = user.getUserAppAdmin('ong');
            return Ong.resource.objects.get(user_app.app_profile_id).then(function (data) {
                _self.setData(data);
                _self.initProfile(data);
                return _self;
            });
        });
    };
    Ong.prototype.quickLogin = function (auth, kwargs) {
        var _self = this;
        return this._user.quickLogin(auth, kwargs).then(function (user) {
            var user_app = user.current_user_app;
            if (!user_app) {
                user_app = user.getUserAppAdmin('ong');
            }
            if (!user_app) {
                _self._user = new weauth_models.User();
                return api.Tastypie.Tools.generate_exception("[Ong][quickLogin] Usuario não identificado");
            }
            _self._user.current_user_app = user_app;
            return Ong.resource.objects.get(user_app.app_profile_id).then(function (data) {
                _self.setData(data);
                _self.initProfile(data);
                return _self;
            });
        });
    };
    Ong.resource = new api.Tastypie.Resource('ong/profile', { model: Ong });
    return Ong;
}(api.Tastypie.Model));
exports.Ong = Ong;
var OngDetail = /** @class */ (function (_super) {
    __extends(OngDetail, _super);
    function OngDetail(obj) {
        return _super.call(this, OngDetail.resource, obj) || this;
    }
    OngDetail.resource = new api.Tastypie.Resource('ong/profile/<id>/detail', { model: OngDetail });
    return OngDetail;
}(api.Tastypie.Model));
exports.OngDetail = OngDetail;
var OngEndereco = /** @class */ (function (_super) {
    __extends(OngEndereco, _super);
    function OngEndereco(obj) {
        return _super.call(this, OngEndereco.resource, obj) || this;
    }
    OngEndereco.resource = new api.Tastypie.Resource('ong/endereco', { model: OngEndereco });
    return OngEndereco;
}(api.Tastypie.Model));
exports.OngEndereco = OngEndereco;
var OngTimeLine = /** @class */ (function (_super) {
    __extends(OngTimeLine, _super);
    function OngTimeLine(obj) {
        var _this = _super.call(this, OngTimeLine.resource, obj) || this;
        var _self = _this;
        if (_self.ong)
            _self.ong = new Ong(_self.ong);
        return _this;
    }
    OngTimeLine.resource = new api.Tastypie.Resource('ong/timeline', { model: OngTimeLine });
    return OngTimeLine;
}(api.Tastypie.Model));
exports.OngTimeLine = OngTimeLine;
//# sourceMappingURL=ong.js.map