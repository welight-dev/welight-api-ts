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
var doador_1 = require("./doador");
var Org = /** @class */ (function (_super) {
    __extends(Org, _super);
    function Org(obj) {
        var _this = _super.call(this, Org.resource, obj) || this;
        if (obj) {
            if (obj.activity)
                _this.activity = new OrgActivity(obj.activity);
            if (obj.id) {
                _this._adm = new ts_resource_tastypie_1.Tastypie.Resource(OrgAdm.resource.endpoint, { model: OrgAdm, defaults: { org_id: obj.id } });
            }
        }
        return _this;
    }
    Object.defineProperty(Org.prototype, "adm", {
        get: function () {
            return this._adm;
        },
        enumerable: true,
        configurable: true
    });
    Org.prototype.send_invite_adm = function (name, email) {
        var _this = this;
        if (this.id) {
            return OrgAdm.add({ org_id: this.id, name: name, email: email }).then(function (resp_adm) {
                if (_this._adm.page.initialized) {
                    return _this._adm.page.refresh().then(function () {
                        return resp_adm;
                    }).catch(function () {
                        return resp_adm;
                    });
                }
                else {
                    return resp_adm;
                }
            });
        }
        else {
            return Promise.reject('Org not found.');
        }
    };
    Org.prototype.getAddress = function () {
        var _this = this;
        if (this.id) {
            return OrgAddress.resource.objects.findOne({ org_id: this.id }).then(function (data) {
                if (data && data.id) {
                    return data;
                }
                else {
                    return new OrgAddress({ org_id: _this.id });
                }
            });
        }
        else {
            return Promise.resolve(new OrgAddress());
        }
    };
    Org.resource = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo/profile', { model: Org });
    return Org;
}(ts_resource_tastypie_1.Tastypie.Model));
exports.Org = Org;
var OrgActivity = /** @class */ (function (_super) {
    __extends(OrgActivity, _super);
    function OrgActivity(obj) {
        return _super.call(this, OrgActivity.resource, obj) || this;
    }
    OrgActivity.resource = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo/activity', { model: OrgActivity });
    return OrgActivity;
}(ts_resource_tastypie_1.Tastypie.Model));
exports.OrgActivity = OrgActivity;
var OrgAddress = /** @class */ (function (_super) {
    __extends(OrgAddress, _super);
    function OrgAddress(obj) {
        return _super.call(this, OrgAddress.resource, obj) || this;
    }
    OrgAddress.resource = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo/address', { model: OrgAddress });
    return OrgAddress;
}(ts_resource_tastypie_1.Tastypie.Model));
exports.OrgAddress = OrgAddress;
var OrgAdm = /** @class */ (function (_super) {
    __extends(OrgAdm, _super);
    function OrgAdm(obj) {
        var _this = _super.call(this, OrgAdm.resource, obj) || this;
        if (obj) {
            if (obj.doador)
                _this.doador = new doador_1.Doador(obj.doador);
        }
        return _this;
    }
    OrgAdm.add = function (obj) {
        return OrgAdm.resource_add.objects.create(obj);
    };
    OrgAdm.resource = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo/adm', { model: OrgAdm });
    OrgAdm.resource_add = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo/adm/add', { model: OrgAdm });
    return OrgAdm;
}(ts_resource_tastypie_1.Tastypie.Model));
exports.OrgAdm = OrgAdm;
//# sourceMappingURL=doadorFundo.js.map