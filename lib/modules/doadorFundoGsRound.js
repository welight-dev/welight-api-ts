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
var doadorFundoGsQuiz_1 = require("./doadorFundoGsQuiz");
var OrgFundGsRound = /** @class */ (function (_super) {
    __extends(OrgFundGsRound, _super);
    function OrgFundGsRound(obj) {
        var _this = _super.call(this, OrgFundGsRound.resource, obj) || this;
        if (obj) {
            if (obj.id) {
                _this._rs_stage = new ts_resource_tastypie_1.Tastypie.Resource(OfgsStage.resource.endpoint, { model: OfgsStage, defaults: { round_id: obj.id } });
            }
        }
        return _this;
    }
    Object.defineProperty(OrgFundGsRound.prototype, "rs_stage", {
        get: function () {
            return this._rs_stage;
        },
        enumerable: true,
        configurable: true
    });
    OrgFundGsRound.prototype.add_stage = function (stages) {
        var stage_list = [];
        for (var _i = 0, stages_1 = stages; _i < stages_1.length; _i++) {
            var stage = stages_1[_i];
            stage_list.push(stage.getData());
        }
        return OfgsStage.resource_add_stage.objects.create({ round_id: this.id, stages: stage_list }).then(function (data) {
            var stages_saved = [];
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var obj = data_1[_i];
                stages_saved.push(new OfgsStage(obj));
            }
            return stages_saved;
        });
    };
    OrgFundGsRound.resource = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo/gs-round', { model: OrgFundGsRound });
    OrgFundGsRound.resource_add_round = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo/gs-round/add-list');
    return OrgFundGsRound;
}(ts_resource_tastypie_1.Tastypie.Model));
exports.OrgFundGsRound = OrgFundGsRound;
var OfgsStage = /** @class */ (function (_super) {
    __extends(OfgsStage, _super);
    function OfgsStage(obj) {
        var _this = _super.call(this, OfgsStage.resource, obj) || this;
        _this._evaluators = [];
        _this._questions = [];
        _this._member_manager = new OfgsStageMemberManager();
        if (obj) {
            if (obj.evaluators) {
                for (var _i = 0, _a = obj.evaluators; _i < _a.length; _i++) {
                    var ev = _a[_i];
                    _this._evaluators.push(new OfgsStageEvaluator(ev));
                }
            }
            if (obj.questions) {
                for (var _b = 0, _c = obj.questions; _b < _c.length; _b++) {
                    var qt = _c[_b];
                    _this._questions.push(new doadorFundoGsQuiz_1.QuestionTemplate(qt));
                }
            }
        }
        return _this;
    }
    OfgsStage.prototype.getData = function () {
        var obj = _super.prototype.getData.call(this);
        obj['evaluators'] = [];
        for (var _i = 0, _a = this._evaluators; _i < _a.length; _i++) {
            var ev = _a[_i];
            obj['evaluators'].push(ev.getData());
        }
        obj['questions'] = this._questions;
        return obj;
    };
    Object.defineProperty(OfgsStage.prototype, "evaluators", {
        get: function () {
            return this._evaluators;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OfgsStage.prototype, "questions", {
        get: function () {
            return this._questions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OfgsStage.prototype, "member_manager", {
        get: function () {
            return this._member_manager;
        },
        enumerable: true,
        configurable: true
    });
    OfgsStage.prototype.select_members = function (tokens) {
        var _loop_1 = function (token) {
            var member = this_1._member_manager.avaliable_members.find(function (m) { return m.token === token; });
            if (!this_1._evaluators.find(function (m) { return m.member.token === member.token; })) {
                this_1._evaluators.push(new OfgsStageEvaluator({ member: member, permission: 'evaluate' }));
            }
        };
        var this_1 = this;
        for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
            var token = tokens_1[_i];
            _loop_1(token);
        }
        this._member_manager.select_members(tokens);
    };
    OfgsStage.prototype.unselect_member = function (token) {
        if (this._evaluators.find(function (m) { return m.member.token === token; })) {
            for (var i = 0; i < this._evaluators.length; i++) {
                if (this._evaluators[i].member.token === token) {
                    this._evaluators.splice(i, 1);
                    break;
                }
            }
        }
        this._member_manager.unselect_member(token);
    };
    OfgsStage.prototype.add_question = function (obj) {
        this._questions.push(new doadorFundoGsQuiz_1.QuestionTemplate(obj));
    };
    OfgsStage.prototype.delete_question = function (index) {
        this._questions.splice(index, 1);
    };
    OfgsStage.resource = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo/gs-round-stage', { model: OfgsStage });
    OfgsStage.resource_add_stage = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo/gs-round-stage/add-list');
    return OfgsStage;
}(ts_resource_tastypie_1.Tastypie.Model));
exports.OfgsStage = OfgsStage;
var OfgsStageEvaluator = /** @class */ (function (_super) {
    __extends(OfgsStageEvaluator, _super);
    function OfgsStageEvaluator(obj) {
        var _this = _super.call(this, OfgsStageEvaluator.resource, obj) || this;
        if (obj) {
            if (obj.member)
                _this.member = new doadorFundo_1.OrgMember(obj.member);
        }
        return _this;
    }
    OfgsStageEvaluator.resource = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo/gs-round-stage-evaluator', { model: OfgsStageEvaluator });
    return OfgsStageEvaluator;
}(ts_resource_tastypie_1.Tastypie.Model));
exports.OfgsStageEvaluator = OfgsStageEvaluator;
var OfgsStageMemberManager = /** @class */ (function () {
    function OfgsStageMemberManager(obj) {
        this.added_members = [];
        this.avaliable_members = [];
        if (obj) {
            if (obj.added_members) {
                for (var _i = 0, _a = obj.added_members; _i < _a.length; _i++) {
                    var member = _a[_i];
                    this.added_members.push(new doadorFundo_1.OrgMember(member));
                }
            }
            if (obj.avaliable_members) {
                for (var _b = 0, _c = obj.avaliable_members; _b < _c.length; _b++) {
                    var member = _c[_b];
                    this.avaliable_members.push(new doadorFundo_1.OrgMember(member));
                }
            }
        }
    }
    OfgsStageMemberManager.prototype.unselect_member = function (token) {
        for (var i = 0; i < this.added_members.length; i++) {
            if (token === this.added_members[i].token) {
                if (!this.avaliable_members.find(function (member) { return member.token === token; })) {
                    this.avaliable_members.push(this.added_members[i]);
                }
                this.added_members.splice(i, 1);
                break;
            }
        }
    };
    OfgsStageMemberManager.prototype.select_members = function (tokens) {
        var _loop_2 = function (token) {
            if (!this_2.added_members.find(function (member) { return member.token === token; })) {
                for (var i = 0; i < this_2.avaliable_members.length; i++) {
                    if (token === this_2.avaliable_members[i].token) {
                        this_2.added_members.push(this_2.avaliable_members[i]);
                        this_2.avaliable_members.splice(i, 1);
                        break;
                    }
                }
            }
        };
        var this_2 = this;
        for (var _i = 0, tokens_2 = tokens; _i < tokens_2.length; _i++) {
            var token = tokens_2[_i];
            _loop_2(token);
        }
    };
    return OfgsStageMemberManager;
}());
exports.OfgsStageMemberManager = OfgsStageMemberManager;
//# sourceMappingURL=doadorFundoGsRound.js.map