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
exports.OfgsTransferInvoiceItem = exports.OfgsTransferInvoice = exports.OfgsProjectReportSchedule = exports.OfgsProjectFinanceSchedule = exports.OfgsProjectComment = exports.OfgsProjectView = exports.OfgsProject = exports.ProjectSummary = exports.EvaluatorsData = exports.OrgFundGsFormRefSubscribe = exports.OrgFundGsFormSubscribe = exports.OfgsInvitationOng = exports.OrgGsMember = exports.OrgGsProduct = exports.OrgGsCategory = exports.OrgFundGs = void 0;
var ts_resource_tastypie_1 = require("ts-resource-tastypie");
var doadorFundo_1 = require("./doadorFundo");
var doadorFundoGsRound_1 = require("./doadorFundoGsRound");
var doadorFundoGsForm_1 = require("./doadorFundoGsForm");
var ong_1 = require("./ong");
var doador_1 = require("./doador");
var doadorFundoGsQuiz_1 = require("./doadorFundoGsQuiz");
var OrgFundGs = /** @class */ (function (_super) {
    __extends(OrgFundGs, _super);
    function OrgFundGs(obj, resource) {
        var _this = _super.call(this, resource || OrgFundGs.resource, obj) || this;
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
        if (!this.summary) {
            this.summary = {
                qty_projects_accepted: 0,
                qty_projects_total: 0,
                donated: 0,
                balance: 0,
                realtime: 0,
                commited: 0
            };
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
                this._rs_invite_ong = new ts_resource_tastypie_1.Tastypie.Resource(OfgsInvitationOng.resource.endpoint, { model: OfgsInvitationOng, defaults: { gs_id: obj.id } });
                this._rs_project = new ts_resource_tastypie_1.Tastypie.Resource(OfgsProject.resource.endpoint, { model: OfgsProject, defaults: { gs_id: obj.id } });
                this._rs_project_finance_schedule = new ts_resource_tastypie_1.Tastypie.Resource(OfgsProjectFinanceSchedule.resource.endpoint, { model: OfgsProjectFinanceSchedule, defaults: { gs_id: obj.id } });
                this._rs_transfer_invoice = new ts_resource_tastypie_1.Tastypie.Resource(OfgsTransferInvoice.resource.endpoint, { model: OfgsTransferInvoice, defaults: { gs_id: obj.id } });
            }
        }
    };
    Object.defineProperty(OrgFundGs.prototype, "rs_round", {
        get: function () {
            return this._rs_round;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OrgFundGs.prototype, "rs_form", {
        get: function () {
            return this._rs_form;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OrgFundGs.prototype, "rs_invite_ong", {
        get: function () {
            return this._rs_invite_ong;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OrgFundGs.prototype, "rs_project", {
        get: function () {
            return this._rs_project;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OrgFundGs.prototype, "rs_project_finance_schedule", {
        get: function () {
            return this._rs_project_finance_schedule;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OrgFundGs.prototype, "rs_transfer_invoice", {
        get: function () {
            return this._rs_transfer_invoice;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OrgFundGs.prototype, "categories", {
        get: function () {
            return this._categories;
        },
        enumerable: false,
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
    OrgFundGs.prototype.get_permissions = function () {
        if (this.id) {
            return OrgFundGs.resource_get_permissions.objects.get(this.id);
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
    OrgFundGs.resource_get_permissions = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo/gs/<id>/get-permissions');
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
var OrgGsMember = /** @class */ (function () {
    function OrgGsMember(obj) {
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
    return OrgGsMember;
}());
exports.OrgGsMember = OrgGsMember;
var OfgsInvitationOng = /** @class */ (function (_super) {
    __extends(OfgsInvitationOng, _super);
    function OfgsInvitationOng(obj) {
        var _this = _super.call(this, OfgsInvitationOng.resource, obj) || this;
        if (obj) {
            if (obj.gs)
                _this.md_gs = new OrgFundGs(obj.gs);
            if (obj.ong)
                _this.md_ong = new ong_1.Ong(obj.ong);
        }
        return _this;
    }
    OfgsInvitationOng.resource = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo/gs-invitation', { model: OfgsInvitationOng });
    return OfgsInvitationOng;
}(ts_resource_tastypie_1.Tastypie.Model));
exports.OfgsInvitationOng = OfgsInvitationOng;
var OrgFundGsFormSubscribe = /** @class */ (function (_super) {
    __extends(OrgFundGsFormSubscribe, _super);
    function OrgFundGsFormSubscribe(obj) {
        var _this = _super.call(this, obj, OrgFundGsFormSubscribe.resource) || this;
        _this.forms = [];
        if (obj) {
            if (obj.forms) {
                for (var _i = 0, _a = obj.forms; _i < _a.length; _i++) {
                    var form = _a[_i];
                    _this.forms.push(new doadorFundoGsForm_1.GsForm(form));
                }
            }
            if (obj.invite)
                _this.invite = new OfgsInvitationOng(obj.invite);
        }
        return _this;
    }
    OrgFundGsFormSubscribe.resource = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo/gs-form-subscribe', { model: OrgFundGsFormSubscribe });
    return OrgFundGsFormSubscribe;
}(OrgFundGs));
exports.OrgFundGsFormSubscribe = OrgFundGsFormSubscribe;
var OrgFundGsFormRefSubscribe = /** @class */ (function (_super) {
    __extends(OrgFundGsFormRefSubscribe, _super);
    function OrgFundGsFormRefSubscribe(obj) {
        var _this = _super.call(this, OrgFundGsFormRefSubscribe.resource, obj) || this;
        _this.questions = [];
        if (obj) {
            if (obj.questions) {
                for (var _i = 0, _a = obj.questions; _i < _a.length; _i++) {
                    var question = _a[_i];
                    _this.questions.push(new doadorFundoGsQuiz_1.QuestionTemplate(question));
                }
            }
            if (obj.gs_project) {
                _this._md_gs_project = new OfgsProject(obj.gs_project);
            }
        }
        return _this;
    }
    OrgFundGsFormRefSubscribe.get_form = function (token) {
        return OrgFundGsFormRefSubscribe.rs_form_ref.objects.findOne({ token: token });
    };
    OrgFundGsFormRefSubscribe.set_form = function (token, questions) {
        return OrgFundGsFormRefSubscribe.rs_form_ref.objects.create({ token: token, questions: questions });
    };
    Object.defineProperty(OrgFundGsFormRefSubscribe.prototype, "md_gs_project", {
        get: function () {
            return this._md_gs_project;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OrgFundGsFormRefSubscribe.prototype, "flag", {
        get: function () {
            return {
                green: this._count_question_flags('green'),
                yellow: this._count_question_flags('yellow'),
                red: this._count_question_flags('red')
            };
        },
        enumerable: false,
        configurable: true
    });
    OrgFundGsFormRefSubscribe.prototype._count_question_flags = function (flag) {
        var _total = 0;
        for (var _i = 0, _a = this.questions.filter(function (q) { return (q.form_type === 'radio' || q.form_type === 'checkbox'); }); _i < _a.length; _i++) {
            var q = _a[_i];
            _total += q.choices.filter(function (c) { return c.flag === flag && c.value === true; }).length;
        }
        return _total;
    };
    OrgFundGsFormRefSubscribe.resource = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo/gs-form-referral', { model: OrgFundGsFormRefSubscribe });
    OrgFundGsFormRefSubscribe.rs_form_ref = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo/gs-form-ref-subscribe', { model: OrgFundGsFormRefSubscribe });
    return OrgFundGsFormRefSubscribe;
}(ts_resource_tastypie_1.Tastypie.Model));
exports.OrgFundGsFormRefSubscribe = OrgFundGsFormRefSubscribe;
var EvaluatorsData = /** @class */ (function () {
    function EvaluatorsData(obj) {
        this.doador_id = null;
        this.stage_id = null;
        this.score = '';
        this.questions = [];
        if (obj) {
            if (obj.doador_id)
                this.doador_id = obj.doador_id;
            if (obj.stage_id)
                this.stage_id = obj.stage_id;
            if (obj.score)
                this.score = obj.score;
            if (obj.questions) {
                for (var _i = 0, _a = obj.questions; _i < _a.length; _i++) {
                    var q = _a[_i];
                    this.questions.push(new doadorFundoGsQuiz_1.QuestionTemplate(q));
                }
            }
        }
    }
    return EvaluatorsData;
}());
exports.EvaluatorsData = EvaluatorsData;
var ProjectSummary = /** @class */ (function () {
    function ProjectSummary(forms, forms_referral, obj) {
        this.views = 0;
        this.comments = 0;
        this.total_amount_sent = 0.00;
        this.total_amount_pending = 0.00;
        this.total_reports = 0;
        this.total_reports_sent = 0;
        this.total_tranche = 0;
        this.total_tranche_sent = 0;
        this._evaluators = [];
        this._evaluators_data = [];
        this._forms = forms;
        this._forms_referral = forms_referral;
        if (obj) {
            if (obj.views)
                this.views = obj.views;
            if (obj.comments)
                this.comments = obj.comments;
            if (obj.total_amount_sent)
                this.total_amount_sent = obj.total_amount_sent;
            if (obj.total_amount_pending)
                this.total_amount_pending = obj.total_amount_pending;
            if (obj.total_reports)
                this.total_reports = obj.total_reports;
            if (obj.total_reports_sent)
                this.total_reports_sent = obj.total_reports_sent;
            if (obj.total_tranche)
                this.total_tranche = obj.total_tranche;
            if (obj.total_tranche_sent)
                this.total_tranche_sent = obj.total_tranche_sent;
            if (obj.evaluators) {
                for (var _i = 0, _a = obj.evaluators; _i < _a.length; _i++) {
                    var item = _a[_i];
                    this._evaluators.push(new doador_1.Doador(item));
                }
            }
            if (obj.evaluators_data) {
                for (var _b = 0, _c = obj.evaluators_data; _b < _c.length; _b++) {
                    var item = _c[_b];
                    this._evaluators_data.push(new EvaluatorsData(item));
                }
            }
        }
        this._count_form_flags();
    }
    Object.defineProperty(ProjectSummary.prototype, "evaluators", {
        get: function () {
            return this._evaluators;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ProjectSummary.prototype, "evaluators_data", {
        get: function () {
            return this._evaluators_data;
        },
        enumerable: false,
        configurable: true
    });
    ProjectSummary.prototype.get_evaluators_questions = function (doador_id, stage_id) {
        return (this._evaluators_data.find(function (m) { return m.doador_id === doador_id && m.stage_id === stage_id; }) || { questions: [] }).questions;
    };
    ProjectSummary.prototype.get_evaluators_data = function (doador_id, stage_id) {
        return (this._evaluators_data.find(function (m) { return m.doador_id === doador_id && m.stage_id === stage_id; }) ||
            new EvaluatorsData({ doador_id: doador_id, stage_id: stage_id }));
    };
    ProjectSummary.prototype.get_evaluators_flag = function (doador_id) {
        return {
            green: this._count_question_flags_evaluator(doador_id, 'green'),
            yellow: this._count_question_flags_evaluator(doador_id, 'yellow'),
            red: this._count_question_flags_evaluator(doador_id, 'red')
        };
    };
    Object.defineProperty(ProjectSummary.prototype, "score", {
        get: function () {
            return {
                green: this._count_score('green'),
                yellow: this._count_score('yellow'),
                red: this._count_score('red')
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ProjectSummary.prototype, "flag", {
        get: function () {
            return {
                green: this._count_question_flags('green'),
                yellow: this._count_question_flags('yellow'),
                red: this._count_question_flags('red')
            };
        },
        enumerable: false,
        configurable: true
    });
    ProjectSummary.prototype._count_score = function (flag) {
        return this._evaluators_data.filter(function (m) { return m.score === flag; }).length;
    };
    ProjectSummary.prototype._count_question_flags = function (flag) {
        var _total = this._form_flags[flag] || 0;
        for (var _i = 0, _a = this._evaluators_data; _i < _a.length; _i++) {
            var item = _a[_i];
            for (var _b = 0, _c = item.questions.filter(function (q) { return (q.form_type === 'radio' || q.form_type === 'checkbox'); }); _b < _c.length; _b++) {
                var q = _c[_b];
                _total += q.choices.filter(function (c) { return c.flag === flag && c.value === true; }).length;
            }
        }
        return _total;
    };
    ProjectSummary.prototype._count_question_flags_evaluator = function (doador_id, flag) {
        var _total = 0;
        for (var _i = 0, _a = this._evaluators_data.filter(function (e) { return e.doador_id === doador_id; }); _i < _a.length; _i++) {
            var item = _a[_i];
            for (var _b = 0, _c = item.questions.filter(function (q) { return (q.form_type === 'radio' || q.form_type === 'checkbox'); }); _b < _c.length; _b++) {
                var q = _c[_b];
                _total += q.choices.filter(function (c) { return c.flag === flag && c.value === true; }).length;
            }
        }
        return _total;
    };
    ProjectSummary.prototype._count_form_flags = function () {
        this._form_flags = {
            green: 0,
            yellow: 0,
            red: 0
        };
        for (var _i = 0, _a = this._forms; _i < _a.length; _i++) {
            var f = _a[_i];
            this._form_flags.green += f.flag.green;
            this._form_flags.yellow += f.flag.yellow;
            this._form_flags.red += f.flag.red;
        }
        for (var _b = 0, _c = this._forms_referral; _b < _c.length; _b++) {
            var f = _c[_b];
            this._form_flags.green += f.flag.green;
            this._form_flags.yellow += f.flag.yellow;
            this._form_flags.red += f.flag.red;
        }
    };
    return ProjectSummary;
}());
exports.ProjectSummary = ProjectSummary;
var OfgsProject = /** @class */ (function (_super) {
    __extends(OfgsProject, _super);
    function OfgsProject(obj) {
        var _this = _super.call(this, OfgsProject.resource, obj) || this;
        _this.forms = [];
        _this.forms_referral = [];
        if (obj) {
            if (obj.project) {
                _this.md_project = new ong_1.OngProjeto(obj.project);
            }
            if (obj.ong) {
                _this.md_ong = new ong_1.Ong(obj.ong);
            }
            if (obj.doador) {
                _this.md_doador = new doador_1.Doador(obj.doador);
            }
            if (obj.forms) {
                for (var _i = 0, _a = obj.forms; _i < _a.length; _i++) {
                    var form = _a[_i];
                    _this.forms.push(new doadorFundoGsForm_1.GsFormResponse(form));
                }
            }
            if (obj.forms_referral) {
                for (var _b = 0, _c = obj.forms_referral; _b < _c.length; _b++) {
                    var form = _c[_b];
                    _this.forms_referral.push(new OrgFundGsFormRefSubscribe(form));
                }
            }
            if (obj.summary) {
                _this._summary = new ProjectSummary(_this.forms, _this.forms_referral, obj.summary);
            }
            if (obj.gs)
                _this._gs = new OrgFundGs(obj.gs);
            if (obj.id) {
                _this._rs_views = new ts_resource_tastypie_1.Tastypie.Resource(OfgsProjectView.resource.endpoint, { model: OfgsProjectView, defaults: { gs_project_id: obj.id } });
                _this._rs_comments = new ts_resource_tastypie_1.Tastypie.Resource(OfgsProjectComment.resource.endpoint, { model: OfgsProjectComment, defaults: { gs_project_id: obj.id } });
                _this._rs_finance_schedule = new ts_resource_tastypie_1.Tastypie.Resource(OfgsProjectFinanceSchedule.resource.endpoint, { model: OfgsProjectFinanceSchedule, defaults: { gs_project_id: obj.id } });
                _this._rs_report_schedule = new ts_resource_tastypie_1.Tastypie.Resource(OfgsProjectReportSchedule.resource.endpoint, { model: OfgsProjectReportSchedule, defaults: { gs_project_id: obj.id } });
            }
        }
        else {
            _this.md_project = new ong_1.OngProjeto();
            _this.md_ong = new ong_1.Ong();
            _this.md_doador = new doador_1.Doador();
            _this._summary = new ProjectSummary(_this.forms, _this.forms_referral);
            _this._gs = new OrgFundGs();
        }
        return _this;
    }
    Object.defineProperty(OfgsProject.prototype, "rs_views", {
        get: function () {
            return this._rs_views;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OfgsProject.prototype, "rs_comments", {
        get: function () {
            return this._rs_comments;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OfgsProject.prototype, "rs_finance_schedule", {
        get: function () {
            return this._rs_finance_schedule;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OfgsProject.prototype, "rs_report_schedule", {
        get: function () {
            return this._rs_report_schedule;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OfgsProject.prototype, "summary", {
        get: function () {
            return this._summary;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OfgsProject.prototype, "gs", {
        get: function () {
            return this._gs;
        },
        enumerable: false,
        configurable: true
    });
    OfgsProject.prototype.setStageMemberResponse = function (data) {
        return OfgsProject.resource_set_member_resp.objects.update(this.id, data);
    };
    OfgsProject.prototype.setView = function () {
        return this.rs_views.objects.create({ gs_project_id: this.id });
    };
    OfgsProject.prototype.checkApprove = function (total_approved) {
        return OfgsProject.resource_check_approve.objects.get(this.id, { total_approved: total_approved || null });
    };
    OfgsProject.prototype.approve = function (data, passw) {
        data['passw'] = passw;
        return OfgsProject.resource_approve.objects.update(this.id, data);
    };
    OfgsProject.prototype.approveCurrentStage = function (passw) {
        var _this = this;
        if (this.id) {
            return OfgsProject.resource_approve_stage.objects.get(this.id, { passw: passw }).then(function (data) {
                if (data.approved) {
                    return _this.refresh().then(function () {
                        return data;
                    });
                }
                else {
                    return data;
                }
            });
        }
        else {
            return Promise.reject('GsProject not found');
        }
    };
    OfgsProject.initSubscribe = function (gs_id) {
        return OfgsProject.resource_init_subscribe.objects.create({ gs_id: gs_id });
    };
    OfgsProject.resource = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo/gs-project', { model: OfgsProject });
    OfgsProject.resource_approve_stage = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo/gs-project/<id>/approve-stage');
    OfgsProject.resource_check_approve = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo/gs-project/<id>/check-approve');
    OfgsProject.resource_approve = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo/gs-project/<id>/approve');
    OfgsProject.resource_init_subscribe = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo/gs-form-subscribe/init_form', { model: OfgsProject });
    OfgsProject.resource_set_member_resp = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo/gs-project/<id>/set-stage-member-response', { model: EvaluatorsData });
    return OfgsProject;
}(ts_resource_tastypie_1.Tastypie.Model));
exports.OfgsProject = OfgsProject;
var OfgsProjectView = /** @class */ (function (_super) {
    __extends(OfgsProjectView, _super);
    function OfgsProjectView(obj) {
        var _this = _super.call(this, OfgsProjectView.resource, obj) || this;
        if (obj) {
            if (obj.doador)
                _this.md_doador = new doador_1.Doador(obj.doador);
        }
        return _this;
    }
    OfgsProjectView.resource = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo/gs-project-view', { model: OfgsProjectView });
    return OfgsProjectView;
}(ts_resource_tastypie_1.Tastypie.Model));
exports.OfgsProjectView = OfgsProjectView;
var OfgsProjectComment = /** @class */ (function (_super) {
    __extends(OfgsProjectComment, _super);
    function OfgsProjectComment(obj) {
        var _this = _super.call(this, OfgsProjectComment.resource, obj) || this;
        if (obj) {
            if (obj.doador)
                _this.md_doador = new doador_1.Doador(obj.doador);
        }
        return _this;
    }
    OfgsProjectComment.resource = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo/gs-project-comment', { model: OfgsProjectComment });
    return OfgsProjectComment;
}(ts_resource_tastypie_1.Tastypie.Model));
exports.OfgsProjectComment = OfgsProjectComment;
var OfgsProjectFinanceSchedule = /** @class */ (function (_super) {
    __extends(OfgsProjectFinanceSchedule, _super);
    function OfgsProjectFinanceSchedule(obj) {
        var _this = _super.call(this, OfgsProjectFinanceSchedule.resource, obj) || this;
        if (obj) {
            if (obj.gs_project)
                _this._md_gs_project = new OfgsProject(obj.gs_project);
        }
        else {
            _this._md_gs_project = new OfgsProject();
        }
        return _this;
    }
    Object.defineProperty(OfgsProjectFinanceSchedule.prototype, "md_gs_project", {
        get: function () {
            return this._md_gs_project;
        },
        enumerable: false,
        configurable: true
    });
    OfgsProjectFinanceSchedule.resource = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo/gs-project-finance-schedule', { model: OfgsProjectFinanceSchedule });
    return OfgsProjectFinanceSchedule;
}(ts_resource_tastypie_1.Tastypie.Model));
exports.OfgsProjectFinanceSchedule = OfgsProjectFinanceSchedule;
var OfgsProjectReportSchedule = /** @class */ (function (_super) {
    __extends(OfgsProjectReportSchedule, _super);
    function OfgsProjectReportSchedule(obj) {
        return _super.call(this, OfgsProjectReportSchedule.resource, obj) || this;
    }
    OfgsProjectReportSchedule.resource = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo/gs-project-report-schedule', { model: OfgsProjectReportSchedule });
    return OfgsProjectReportSchedule;
}(ts_resource_tastypie_1.Tastypie.Model));
exports.OfgsProjectReportSchedule = OfgsProjectReportSchedule;
var OfgsTransferInvoice = /** @class */ (function (_super) {
    __extends(OfgsTransferInvoice, _super);
    function OfgsTransferInvoice(obj) {
        var _this = _super.call(this, OfgsTransferInvoice.resource, obj) || this;
        _this._items = [];
        if (obj && obj.items) {
            for (var _i = 0, _a = obj.items; _i < _a.length; _i++) {
                var i = _a[_i];
                _this._items.push(new OfgsTransferInvoiceItem(i));
            }
        }
        return _this;
    }
    OfgsTransferInvoice.add = function (gs_id, passw, items) {
        return OfgsTransferInvoice.rs_add.objects.create({ gs_id: gs_id, passw: passw, items: items });
    };
    OfgsTransferInvoice.prototype.set_sent = function () {
        var _this = this;
        return OfgsTransferInvoice.rs_set_sent.objects.update(this.id, {}).then(function (data) {
            _this.setData(data);
            return _this;
        });
    };
    OfgsTransferInvoice.resource = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo/gs-transfer-invoice', { model: OfgsTransferInvoice });
    OfgsTransferInvoice.rs_add = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo/gs-transfer-invoice/add', { model: OfgsTransferInvoice });
    OfgsTransferInvoice.rs_set_sent = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo/gs-transfer-invoice/<id>/set-sent', { model: OfgsTransferInvoice });
    return OfgsTransferInvoice;
}(ts_resource_tastypie_1.Tastypie.Model));
exports.OfgsTransferInvoice = OfgsTransferInvoice;
var OfgsTransferInvoiceItem = /** @class */ (function () {
    function OfgsTransferInvoiceItem(obj) {
        if (obj) {
            this.id = obj.id;
            this.invoice_id = obj.invoice_id;
            this.gs_project_id = obj.gs_project_id;
            this.currency = obj.currency;
            this.amount = obj.amount;
            this.broker_status = obj.broker_status;
            this.broker_status_display = obj.broker_status_display;
            this.schedule_id = obj.schedule_id;
            this.dt_created = obj.dt_created;
        }
        if (obj && obj.gs_project) {
            this._md_gs_project = new OfgsProject(obj.gs_project);
        }
        else {
            this._md_gs_project = new OfgsProject();
        }
    }
    Object.defineProperty(OfgsTransferInvoiceItem.prototype, "md_gs_project", {
        get: function () {
            return this._md_gs_project;
        },
        enumerable: false,
        configurable: true
    });
    return OfgsTransferInvoiceItem;
}());
exports.OfgsTransferInvoiceItem = OfgsTransferInvoiceItem;
//# sourceMappingURL=doadorFundoGs.js.map