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
var doadorFundoGsRound_1 = require("./doadorFundoGsRound");
var doadorFundoGsForm_1 = require("./doadorFundoGsForm");
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
        this._categories = [];
        if (!this.categories_id) {
            this.categories_id = [];
        }
        this.org_fund = new doadorFundo_1.OrgFund();
        this.product = new OrgGsProduct();
        if (obj) {
            if (obj.org_fund)
                this.org_fund = new doadorFundo_1.OrgFund(obj.org_fund);
            if (obj.product)
                this.product = new OrgGsProduct(obj.product);
            if (obj.categories) {
                for (var _i = 0, _a = obj.categories; _i < _a.length; _i++) {
                    var category = _a[_i];
                    this._categories.push(new OrgGsCategory(category));
                }
            }
            if (obj.id) {
                this._rs_round = new ts_resource_tastypie_1.Tastypie.Resource(doadorFundoGsRound_1.OrgFundGsRound.resource.endpoint, { model: doadorFundoGsRound_1.OrgFundGsRound, defaults: { gs_id: obj.id } });
                this._rs_form = new ts_resource_tastypie_1.Tastypie.Resource(doadorFundoGsForm_1.GsForm.resource.endpoint, { model: doadorFundoGsForm_1.GsForm, defaults: { gs_id: obj.id } });
            }
        }
    };
    Object.defineProperty(OrgFundGs.prototype, "rs_round", {
        get: function () {
            return this._rs_round;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrgFundGs.prototype, "rs_form", {
        get: function () {
            return this._rs_form;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrgFundGs.prototype, "categories", {
        get: function () {
            return this._categories;
        },
        enumerable: true,
        configurable: true
    });
    OrgFundGs.prototype.get_member = function () {
        if (this.id) {
            return OrgFundGs.resource_get_member.objects.get(this.id).then(function (data) {
                return new OrgGsMember(data);
            });
        }
        else {
            return Promise.reject('Giving stream not found');
        }
    };
    OrgFundGs.prototype.add_member = function (tokens_member, passw) {
        if (this.id) {
            return OrgFundGs.resource_add_member.objects.create({ gs_id: this.id, tokens_member: tokens_member, passw: passw }).then(function (data) {
                return new OrgGsMember(data);
            });
        }
        else {
            return Promise.reject('Giving stream not found');
        }
    };
    OrgFundGs.prototype.delete_member = function (token, passw) {
        if (this.id) {
            return OrgFundGs.resource_delete_member.objects.delete(this.id, { token: token, passw: passw }).then(function (data) {
                return new OrgGsMember(data);
            });
        }
        else {
            return Promise.reject('Giving stream not found');
        }
    };
    OrgFundGs.prototype.add_round = function (rounds) {
        var _this = this;
        if (this.id) {
            var params = [];
            for (var _i = 0, rounds_1 = rounds; _i < rounds_1.length; _i++) {
                var round = rounds_1[_i];
                round.gs_id = this.id;
                params.push(round.getData());
            }
            return doadorFundoGsRound_1.OrgFundGsRound.resource_add_round.objects.create({ gs_id: this.id, rounds: params }).then(function (data) {
                var rounds = [];
                for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                    var round = data_1[_i];
                    rounds.push(new doadorFundoGsRound_1.OrgFundGsRound(round));
                }
                if (_this._rs_round.page.initialized) {
                    return _this._rs_round.page.refresh().then(function () {
                        return rounds;
                    }).catch(function () {
                        return rounds;
                    });
                }
                else {
                    return rounds;
                }
            });
        }
        else {
            return Promise.reject('Giving stream not found');
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
    OrgFundGs.resource = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo/gs', { model: OrgFundGs });
    OrgFundGs.resource_get_member = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo/gs/<id>/get-member');
    OrgFundGs.resource_add_member = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo/gs/add-member');
    OrgFundGs.resource_delete_member = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo/gs/<id>/delete-member');
    OrgFundGs.resource_check_step = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo/gs/<id>/check-step');
    return OrgFundGs;
}(ts_resource_tastypie_1.Tastypie.Model));
exports.OrgFundGs = OrgFundGs;
var OrgGsCategory = /** @class */ (function (_super) {
    __extends(OrgGsCategory, _super);
    function OrgGsCategory(obj) {
        return _super.call(this, OrgGsCategory.resource, obj) || this;
    }
    OrgGsCategory.resource = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo/org-gs-category', { model: OrgGsCategory });
    return OrgGsCategory;
}(ts_resource_tastypie_1.Tastypie.Model));
exports.OrgGsCategory = OrgGsCategory;
var OrgGsProduct = /** @class */ (function (_super) {
    __extends(OrgGsProduct, _super);
    function OrgGsProduct(obj) {
        return _super.call(this, OrgGsProduct.resource, obj) || this;
    }
    OrgGsProduct.resource = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo/org-gs-product', { model: OrgGsProduct });
    return OrgGsProduct;
}(ts_resource_tastypie_1.Tastypie.Model));
exports.OrgGsProduct = OrgGsProduct;
var OrgMember = /** @class */ (function () {
    function OrgMember(obj) {
        this.auth_group = [];
        if (obj) {
            this.id = obj.id;
            this.name = obj.name;
            this.auth_group_display = obj.auth_group_display;
            this.admin = obj.admin;
            this.token = obj.token;
            if (obj.auth_group) {
                for (var _i = 0, _a = obj.auth_group; _i < _a.length; _i++) {
                    var group = _a[_i];
                    this.auth_group.push(new doadorFundo_1.OrgAuthGroup(group));
                }
            }
        }
    }
    return OrgMember;
}());
exports.OrgMember = OrgMember;
var OrgGsMember = /** @class */ (function () {
    function OrgGsMember(obj) {
        this.added_members = [];
        this.avaliable_members = [];
        if (obj) {
            if (obj.added_members) {
                for (var _i = 0, _a = obj.added_members; _i < _a.length; _i++) {
                    var member = _a[_i];
                    this.added_members.push(new OrgMember(member));
                }
            }
            if (obj.avaliable_members) {
                for (var _b = 0, _c = obj.avaliable_members; _b < _c.length; _b++) {
                    var member = _c[_b];
                    this.avaliable_members.push(new OrgMember(member));
                }
            }
        }
    }
    return OrgGsMember;
}());
exports.OrgGsMember = OrgGsMember;
//# sourceMappingURL=doadorFundoGs.js.map