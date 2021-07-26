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
exports.GsFormResponse = exports.GsForm = exports.GsFormModel = void 0;
var ts_resource_tastypie_1 = require("ts-resource-tastypie");
var doadorFundoGsQuiz_1 = require("./doadorFundoGsQuiz");
var GsFormModel = /** @class */ (function (_super) {
    __extends(GsFormModel, _super);
    function GsFormModel(resource, obj) {
        var _this = _super.call(this, resource, obj) || this;
        _this.questions = [];
        if (obj) {
            if (obj.questions) {
                for (var _i = 0, _a = obj.questions; _i < _a.length; _i++) {
                    var question = _a[_i];
                    _this.questions.push(new doadorFundoGsQuiz_1.QuestionTemplate(question));
                }
            }
        }
        return _this;
    }
    GsFormModel.prototype.getData = function () {
        var _data = _super.prototype.getData.call(this);
        _data['questions'] = [];
        for (var _i = 0, _a = this.questions; _i < _a.length; _i++) {
            var item = _a[_i];
            _data['questions'].push(item.getData());
        }
        return _data;
    };
    Object.defineProperty(GsFormModel.prototype, "flag", {
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
    GsFormModel.prototype._count_question_flags = function (flag) {
        var _total = 0;
        for (var _i = 0, _a = this.questions.filter(function (q) { return (q.form_type === 'radio' || q.form_type === 'checkbox'); }); _i < _a.length; _i++) {
            var q = _a[_i];
            _total += q.choices.filter(function (c) { return c.flag === flag && c.value === true; }).length;
        }
        return _total;
    };
    return GsFormModel;
}(ts_resource_tastypie_1.Tastypie.Model));
exports.GsFormModel = GsFormModel;
var GsForm = /** @class */ (function (_super) {
    __extends(GsForm, _super);
    function GsForm(obj) {
        return _super.call(this, GsForm.resource, obj) || this;
    }
    GsForm.resource = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo/gs-form', { model: GsForm });
    return GsForm;
}(GsFormModel));
exports.GsForm = GsForm;
var GsFormResponse = /** @class */ (function (_super) {
    __extends(GsFormResponse, _super);
    function GsFormResponse(obj) {
        return _super.call(this, null, obj) || this;
    }
    return GsFormResponse;
}(GsFormModel));
exports.GsFormResponse = GsFormResponse;
//# sourceMappingURL=doadorFundoGsForm.js.map