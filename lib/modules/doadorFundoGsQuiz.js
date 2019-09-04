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
var QuestionTemplate = /** @class */ (function () {
    function QuestionTemplate(obj) {
        if (obj) {
            for (var attr in obj) {
                this[attr] = obj[attr];
            }
        }
    }
    return QuestionTemplate;
}());
exports.QuestionTemplate = QuestionTemplate;
var StageMemberQuestionTemplate = /** @class */ (function (_super) {
    __extends(StageMemberQuestionTemplate, _super);
    function StageMemberQuestionTemplate(obj) {
        return _super.call(this, obj) || this;
    }
    return StageMemberQuestionTemplate;
}(QuestionTemplate));
exports.StageMemberQuestionTemplate = StageMemberQuestionTemplate;
var RefQuestionTemplate = /** @class */ (function (_super) {
    __extends(RefQuestionTemplate, _super);
    function RefQuestionTemplate(obj) {
        return _super.call(this, obj) || this;
    }
    return RefQuestionTemplate;
}(QuestionTemplate));
exports.RefQuestionTemplate = RefQuestionTemplate;
var OngQuestionTemplate = /** @class */ (function (_super) {
    __extends(OngQuestionTemplate, _super);
    function OngQuestionTemplate(obj) {
        return _super.call(this, obj) || this;
    }
    return OngQuestionTemplate;
}(QuestionTemplate));
exports.OngQuestionTemplate = OngQuestionTemplate;
//# sourceMappingURL=doadorFundoGsQuiz.js.map