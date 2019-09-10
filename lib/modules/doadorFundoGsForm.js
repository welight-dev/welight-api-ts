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
var doadorFundoGsQuiz_1 = require("./doadorFundoGsQuiz");
var GsForm = /** @class */ (function (_super) {
    __extends(GsForm, _super);
    function GsForm(obj) {
        var _this = _super.call(this, GsForm.resource, obj) || this;
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
    GsForm.resource = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo/gs-form', { model: GsForm });
    return GsForm;
}(ts_resource_tastypie_1.Tastypie.Model));
exports.GsForm = GsForm;
//# sourceMappingURL=doadorFundoGsForm.js.map