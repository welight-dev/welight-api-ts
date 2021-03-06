"use strict";
// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrgMember = exports.OrgAuthGroup = exports.OrgFundBalanceCreditCustom = exports.OrgFundBalance = exports.OrgFundBalanceSource = exports.OrgFundMember = exports.OrgFundMemberInvited = exports.OrgFundCategory = exports.OrgFund = exports.OrgCategoryFund = exports.OrgAdm = exports.OrgAdmVote = exports.OrgAdmInvited = exports.OrgAddress = exports.OrgActivity = exports.Org = void 0;
var ts_resource_tastypie_1 = require("ts-resource-tastypie");
var doador_1 = require("./doador");
var utils_1 = require("./utils");
var Org = /** @class */ (function (_super) {
    __extends(Org, _super);
    function Org(obj) {
        var _this = _super.call(this, Org.resource, obj) || this;
        if (!obj) {
            obj = {};
        }
        if (obj.activity) {
            _this._activity = new OrgActivity(obj.activity);
        }
        else {
            _this._activity = new OrgActivity();
        }
        if (obj.id) {
            _this._adm = new ts_resource_tastypie_1.Tastypie.Resource(OrgAdm.resource.endpoint, { model: OrgAdm, defaults: { org_id: obj.id } });
            _this._rs_fund = new ts_resource_tastypie_1.Tastypie.Resource(OrgFund.resource.endpoint, { model: OrgFund, defaults: { org_id: obj.id } });
            _this._rs_fund_balance_source = new ts_resource_tastypie_1.Tastypie.Resource(OrgFundBalanceSource.resource.endpoint, { model: OrgFundBalanceSource, defaults: { org_id: obj.id } });
            _this._rs_auth_group = new ts_resource_tastypie_1.Tastypie.Resource(OrgAuthGroup.resource.endpoint, { model: OrgAuthGroup, defaults: { org_id: obj.id } });
        }
        _this._rs_activity = new ts_resource_tastypie_1.Tastypie.Resource(OrgActivity.resource.endpoint, { model: OrgActivity, defaults: { org_id: obj.id || 0 } });
        _this._rs_category_fund = new ts_resource_tastypie_1.Tastypie.Resource(OrgCategoryFund.resource.endpoint, { model: OrgCategoryFund, defaults: { org_id: obj.id || 0 } });
        return _this;
    }
    Object.defineProperty(Org.prototype, "rs_adm", {
        get: function () {
            return this._adm;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Org.prototype, "rs_fund", {
        get: function () {
            return this._rs_fund;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Org.prototype, "rs_fund_balance_source", {
        get: function () {
            return this._rs_fund_balance_source;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Org.prototype, "rs_auth_group", {
        get: function () {
            return this._rs_auth_group;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Org.prototype, "rs_category_fund", {
        get: function () {
            return this._rs_category_fund;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Org.prototype, "rs_activity", {
        get: function () {
            return this._rs_activity;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Org.prototype, "md_activity", {
        get: function () {
            return this._activity;
        },
        enumerable: false,
        configurable: true
    });
    Org.prototype.send_invite_adm = function (name, email, passw) {
        var _this = this;
        if (this.id) {
            return OrgAdm.add({ org_id: this.id, name: name, email: email, passw: passw }).then(function (resp_adm) {
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
}(utils_1.Address));
exports.OrgAddress = OrgAddress;
var OrgAdmInvited = /** @class */ (function (_super) {
    __extends(OrgAdmInvited, _super);
    function OrgAdmInvited(obj) {
        var _this = _super.call(this, OrgAdmInvited.resource, obj) || this;
        if (obj) {
            if (obj.org)
                _this.org = new Org(obj.org);
            if (obj.moderator)
                _this.moderator = new OrgAdm(obj.moderator);
            if (obj.invited)
                _this.invited = new OrgAdm(obj.invited);
        }
        return _this;
    }
    OrgAdmInvited.resource = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo/adm/accept', { model: OrgAdmInvited });
    return OrgAdmInvited;
}(ts_resource_tastypie_1.Tastypie.Model));
exports.OrgAdmInvited = OrgAdmInvited;
var OrgAdmVote = /** @class */ (function (_super) {
    __extends(OrgAdmVote, _super);
    function OrgAdmVote(obj) {
        var _this = _super.call(this, OrgAdmVote.resource, obj) || this;
        if (obj) {
            if (obj.invited)
                _this.invited = new OrgAdm(obj.invited);
        }
        return _this;
    }
    OrgAdmVote.resource = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo/adm/vote', { model: OrgAdmVote });
    return OrgAdmVote;
}(ts_resource_tastypie_1.Tastypie.Model));
exports.OrgAdmVote = OrgAdmVote;
var OrgAdm = /** @class */ (function (_super) {
    __extends(OrgAdm, _super);
    function OrgAdm(obj) {
        var _this = _super.call(this, OrgAdm.resource, obj) || this;
        if (obj) {
            if (obj.doador)
                _this.doador = new doador_1.Doador(obj.doador);
            if (obj.parent)
                _this.parent = new OrgAdm(obj.parent);
        }
        return _this;
    }
    OrgAdm.add = function (obj) {
        return OrgAdm.resource_add.objects.create(obj);
    };
    OrgAdm.accept = function (obj) {
        return OrgAdm.resource_add.objects.create(obj);
    };
    OrgAdm.resource = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo/adm', { model: OrgAdm });
    OrgAdm.resource_add = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo/adm/add', { model: OrgAdm });
    return OrgAdm;
}(ts_resource_tastypie_1.Tastypie.Model));
exports.OrgAdm = OrgAdm;
var OrgCategoryFund = /** @class */ (function (_super) {
    __extends(OrgCategoryFund, _super);
    function OrgCategoryFund(obj) {
        return _super.call(this, OrgCategoryFund.resource, obj) || this;
    }
    OrgCategoryFund.resource = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo/category-fund', { model: OrgCategoryFund });
    return OrgCategoryFund;
}(ts_resource_tastypie_1.Tastypie.Model));
exports.OrgCategoryFund = OrgCategoryFund;
var OrgFund = /** @class */ (function (_super) {
    __extends(OrgFund, _super);
    function OrgFund(obj) {
        var _this = _super.call(this, OrgFund.resource, obj) || this;
        _this._init(obj);
        return _this;
    }
    OrgFund.prototype.save = function (obj) {
        var _this = this;
        return _super.prototype.save.call(this, obj).then(function (response) {
            _this._init(response);
            return _this;
        });
    };
    OrgFund.prototype._init = function (obj) {
        this._categories = [];
        if (!this.categories_id) {
            this.categories_id = [];
        }
        if (!this.summary) {
            this.summary = {
                current_balance: 0.00,
                qty_projects_pending: 0,
                qty_projects_accepted: 0,
                qty_projects_total: 0,
                qty_giving_stream: 0,
                donated: 0.00,
                balance: 0.00,
                realtime: 0.00,
                commited: 0.00
            };
        }
        if (obj) {
            if (obj.id) {
                this._rs_balance = new ts_resource_tastypie_1.Tastypie.Resource(OrgFundBalance.resource.endpoint, { model: OrgFundBalance, defaults: { org_fund_id: obj.id } });
                this._rs_member = new ts_resource_tastypie_1.Tastypie.Resource(OrgFundMember.resource.endpoint, { model: OrgFundMember, defaults: { org_fund_id: obj.id } });
                this._rs_category = new ts_resource_tastypie_1.Tastypie.Resource(OrgFundCategory.resource.endpoint, { model: OrgFundCategory, defaults: { org_fund_id: obj.id } });
            }
            if (obj.categories) {
                for (var _i = 0, _a = obj.categories; _i < _a.length; _i++) {
                    var cat = _a[_i];
                    this._categories.push(new OrgCategoryFund(cat));
                }
            }
        }
    };
    Object.defineProperty(OrgFund.prototype, "rs_balance", {
        get: function () {
            return this._rs_balance;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OrgFund.prototype, "rs_member", {
        get: function () {
            return this._rs_member;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OrgFund.prototype, "rs_category", {
        get: function () {
            return this._rs_category;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OrgFund.prototype, "categories", {
        get: function () {
            return this._categories;
        },
        enumerable: false,
        configurable: true
    });
    OrgFund.prototype.add_credit = function (source_id, amount, passw) {
        var _this = this;
        if (this.id) {
            return OrgFundBalance.add_credit({
                org_fund_id: this.id,
                source_id: source_id,
                amount: amount,
                passw: passw
            }).then(function (resp_balance) {
                if (_this._rs_balance.page.initialized) {
                    return _this._rs_balance.page.refresh().then(function () {
                        return _this.refresh().then(function () {
                            return resp_balance;
                        }).catch(function () {
                            return resp_balance;
                        });
                    }).catch(function () {
                        return _this.refresh().then(function () {
                            return resp_balance;
                        }).catch(function () {
                            return resp_balance;
                        });
                    });
                }
                else {
                    return _this.refresh().then(function () {
                        return resp_balance;
                    }).catch(function () {
                        return resp_balance;
                    });
                }
            });
        }
        else {
            return Promise.reject('Fund not found.');
        }
    };
    OrgFund.prototype.send_invite_member = function (name, email, auth_group_list, passw) {
        var _this = this;
        if (this.id) {
            return OrgFundMember.add({
                org_fund_id: this.id,
                name: name,
                email: email,
                auth_group_list: auth_group_list,
                passw: passw
            }).then(function (resp_member) {
                if (_this._rs_member.page.initialized) {
                    return _this._rs_member.page.refresh().then(function () {
                        return resp_member;
                    }).catch(function () {
                        return resp_member;
                    });
                }
                else {
                    return resp_member;
                }
            });
        }
        else {
            return Promise.reject('Fund not found.');
        }
    };
    OrgFund.prototype.check_step = function () {
        if (this.id) {
            return OrgFund.resource_check_step.objects.get(this.id);
        }
        else {
            return Promise.reject('Fund not found.');
        }
    };
    OrgFund.resource = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo/fund', { model: OrgFund });
    OrgFund.resource_check_step = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo/fund/<id>/check-step');
    return OrgFund;
}(ts_resource_tastypie_1.Tastypie.Model));
exports.OrgFund = OrgFund;
var OrgFundCategory = /** @class */ (function (_super) {
    __extends(OrgFundCategory, _super);
    function OrgFundCategory(obj) {
        return _super.call(this, OrgFundCategory.resource, obj) || this;
    }
    OrgFundCategory.resource = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo/fund-category', { model: OrgFundCategory });
    return OrgFundCategory;
}(ts_resource_tastypie_1.Tastypie.Model));
exports.OrgFundCategory = OrgFundCategory;
var OrgFundMemberInvited = /** @class */ (function (_super) {
    __extends(OrgFundMemberInvited, _super);
    function OrgFundMemberInvited(obj) {
        var _this = _super.call(this, OrgFundMemberInvited.resource, obj) || this;
        if (obj) {
            if (obj.org)
                _this.org = new Org(obj.org);
            if (obj.fund)
                _this.fund = new OrgFund(obj.fund);
            if (obj.invited)
                _this.invited = new OrgFundMember(obj.invited);
        }
        return _this;
    }
    OrgFundMemberInvited.resource = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo/fund-member/accept', { model: OrgFundMemberInvited });
    return OrgFundMemberInvited;
}(ts_resource_tastypie_1.Tastypie.Model));
exports.OrgFundMemberInvited = OrgFundMemberInvited;
var OrgFundMember = /** @class */ (function (_super) {
    __extends(OrgFundMember, _super);
    function OrgFundMember(obj) {
        var _this = _super.call(this, OrgFundMember.resource, obj) || this;
        _this._permissions = [];
        if (obj) {
            if (obj.doador)
                _this.doador = new doador_1.Doador(obj.doador);
            if (obj.permissions) {
                for (var _i = 0, _a = obj.permissions; _i < _a.length; _i++) {
                    var perm = _a[_i];
                    _this._permissions.push(new OrgAuthGroup(perm));
                }
            }
        }
        return _this;
    }
    Object.defineProperty(OrgFundMember.prototype, "permissions", {
        get: function () {
            return this._permissions;
        },
        enumerable: false,
        configurable: true
    });
    OrgFundMember.add = function (obj) {
        return OrgFundMember.resource_add.objects.create(obj);
    };
    OrgFundMember.resource = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo/fund-member', { model: OrgFundMember });
    OrgFundMember.resource_add = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo/fund-member/add', { model: OrgFundMember });
    return OrgFundMember;
}(ts_resource_tastypie_1.Tastypie.Model));
exports.OrgFundMember = OrgFundMember;
var OrgFundBalanceSource = /** @class */ (function (_super) {
    __extends(OrgFundBalanceSource, _super);
    function OrgFundBalanceSource(obj) {
        return _super.call(this, OrgFundBalanceSource.resource, obj) || this;
    }
    OrgFundBalanceSource.resource = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo/balance-source', { model: OrgFundBalanceSource });
    return OrgFundBalanceSource;
}(ts_resource_tastypie_1.Tastypie.Model));
exports.OrgFundBalanceSource = OrgFundBalanceSource;
var OrgFundBalance = /** @class */ (function (_super) {
    __extends(OrgFundBalance, _super);
    function OrgFundBalance(obj) {
        var _this = _super.call(this, OrgFundBalance.resource, obj) || this;
        if (obj) {
            if (obj.source)
                _this._md_source = new OrgFundBalanceSource(obj.source);
            if (obj.credit_custom)
                _this._md_credit_custom = new OrgFundBalanceCreditCustom(obj.credit_custom);
        }
        return _this;
    }
    OrgFundBalance.add_credit = function (obj) {
        return OrgFundBalance.resource_add.objects.create(obj);
    };
    Object.defineProperty(OrgFundBalance.prototype, "md_source", {
        get: function () {
            return this._md_source;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OrgFundBalance.prototype, "md_credit_custom", {
        get: function () {
            return this._md_credit_custom;
        },
        enumerable: false,
        configurable: true
    });
    OrgFundBalance.resource = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo/balance', { model: OrgFundBalance });
    OrgFundBalance.resource_add = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo/balance/add-credit', { model: OrgFundBalance });
    return OrgFundBalance;
}(ts_resource_tastypie_1.Tastypie.Model));
exports.OrgFundBalance = OrgFundBalance;
var OrgFundBalanceCreditCustom = /** @class */ (function () {
    function OrgFundBalanceCreditCustom(obj) {
        if (obj) {
            this.user_id = obj.user_id;
            this.user_name = obj.user_name;
            this.user_email = obj.user_email;
            this.dt_created = obj.dt_created;
        }
    }
    return OrgFundBalanceCreditCustom;
}());
exports.OrgFundBalanceCreditCustom = OrgFundBalanceCreditCustom;
var OrgAuthGroup = /** @class */ (function (_super) {
    __extends(OrgAuthGroup, _super);
    function OrgAuthGroup(obj) {
        return _super.call(this, OrgAuthGroup.resource, obj) || this;
    }
    OrgAuthGroup.resource = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo/auth-group', { model: OrgAuthGroup });
    return OrgAuthGroup;
}(ts_resource_tastypie_1.Tastypie.Model));
exports.OrgAuthGroup = OrgAuthGroup;
var OrgMember = /** @class */ (function (_super) {
    __extends(OrgMember, _super);
    function OrgMember(obj) {
        var _this = _super.call(this, null, obj) || this;
        _this._auth_group = [];
        if (obj) {
            if (obj.auth_group) {
                for (var _i = 0, _a = obj.auth_group; _i < _a.length; _i++) {
                    var group = _a[_i];
                    _this._auth_group.push(new OrgAuthGroup(group));
                }
            }
        }
        return _this;
    }
    Object.defineProperty(OrgMember.prototype, "auth_group", {
        get: function () {
            return this._auth_group;
        },
        enumerable: false,
        configurable: true
    });
    return OrgMember;
}(ts_resource_tastypie_1.Tastypie.Model));
exports.OrgMember = OrgMember;
//# sourceMappingURL=doadorFundo.js.map