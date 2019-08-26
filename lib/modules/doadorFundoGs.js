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
var doadorFundo_1 = require("./doadorFundo");
var OrgFundGs = /** @class */ (function (_super) {
    __extends(OrgFundGs, _super);
    function OrgFundGs(obj) {
        var _this = _super.call(this, OrgFundGs.resource, obj) || this;
        _this._init(obj);
        return _this;
    }
    OrgFundGs.prototype.save = function (obj) {
        var _this = this;
        return _super.prototype.save.call(this, obj).then(function (response) {
            _this._init(response);
            return _this;
        });
    };
    OrgFundGs.prototype._init = function (obj) {
        this.categories = [];
        if (!this.categories_id) {
            this.categories_id = [];
        }
        if (obj) {
            if (obj.org_fund)
                this.org_fund = new doadorFundo_1.OrgFund(obj.org_fund);
            if (obj.product)
                this.product = new OrgGsProduct(obj.product);
            if (obj.categories) {
                for (var _i = 0, _a = obj.categories; _i < _a.length; _i++) {
                    var category = _a[_i];
                    this.categories.push(new OrgGsCategory(category));
                }
            }
        }
    };
    OrgFundGs.prototype.check_step = function () {
        if (this.id) {
            return OrgFundGs.resource_check_step.objects.get(this.id);
        }
        else {
            return Promise.reject('Giving stream not found');
        }
    };
    OrgFundGs.resource = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo-gs/gs', { model: OrgFundGs });
    OrgFundGs.resource_check_step = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo-gs/gs/<id>/check-step');
    return OrgFundGs;
}(ts_resource_tastypie_1.Tastypie.Model));
exports.OrgFundGs = OrgFundGs;
var OrgGsCategory = /** @class */ (function (_super) {
    __extends(OrgGsCategory, _super);
    function OrgGsCategory(obj) {
        return _super.call(this, OrgGsCategory.resource, obj) || this;
    }
    OrgGsCategory.resource = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo-gs/category', { model: OrgGsCategory });
    return OrgGsCategory;
}(ts_resource_tastypie_1.Tastypie.Model));
exports.OrgGsCategory = OrgGsCategory;
var OrgGsProduct = /** @class */ (function (_super) {
    __extends(OrgGsProduct, _super);
    function OrgGsProduct(obj) {
        return _super.call(this, OrgGsProduct.resource, obj) || this;
    }
    OrgGsProduct.resource = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo-gs/product', { model: OrgGsProduct });
    return OrgGsProduct;
}(ts_resource_tastypie_1.Tastypie.Model));
exports.OrgGsProduct = OrgGsProduct;
var OfgsMember = /** @class */ (function (_super) {
    __extends(OfgsMember, _super);
    function OfgsMember(obj) {
        var _this = _super.call(this, OfgsMember.resource, obj) || this;
        if (obj && obj.member) {
            _this.member = new doadorFundo_1.OrgFundMember(obj.member);
        }
        return _this;
    }
    OfgsMember.resource = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo-gs/member', { model: OfgsMember });
    return OfgsMember;
}(ts_resource_tastypie_1.Tastypie.Model));
exports.OfgsMember = OfgsMember;
//# sourceMappingURL=doadorFundoGs.js.map