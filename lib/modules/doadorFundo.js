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
var api = require("ts-resource-tastypie");
var Org = /** @class */ (function (_super) {
    __extends(Org, _super);
    function Org(obj) {
        return _super.call(this, Org.resource, obj) || this;
    }
    Org.resource = new api.Tastypie.Resource('doador-fundo/profile', { model: Org });
    return Org;
}(api.Tastypie.Model));
exports.Org = Org;
var OrgActivity = /** @class */ (function (_super) {
    __extends(OrgActivity, _super);
    function OrgActivity(obj) {
        return _super.call(this, OrgActivity.resource, obj) || this;
    }
    OrgActivity.resource = new api.Tastypie.Resource('doador-fundo/activity', { model: OrgActivity });
    return OrgActivity;
}(api.Tastypie.Model));
exports.OrgActivity = OrgActivity;
var OrgAddress = /** @class */ (function (_super) {
    __extends(OrgAddress, _super);
    function OrgAddress(obj) {
        return _super.call(this, OrgAddress.resource, obj) || this;
    }
    OrgAddress.resource = new api.Tastypie.Resource('doador-fundo/address', { model: OrgAddress });
    return OrgAddress;
}(api.Tastypie.Model));
exports.OrgAddress = OrgAddress;
var OrgAdm = /** @class */ (function (_super) {
    __extends(OrgAdm, _super);
    function OrgAdm(obj) {
        return _super.call(this, OrgAdm.resource, obj) || this;
    }
    OrgAdm.resource = new api.Tastypie.Resource('doador-fundo/adm', { model: OrgAdm });
    return OrgAdm;
}(api.Tastypie.Model));
exports.OrgAdm = OrgAdm;
//# sourceMappingURL=doadorFundo.js.map