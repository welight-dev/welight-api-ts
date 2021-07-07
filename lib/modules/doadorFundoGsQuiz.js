"use strict";
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
exports.QuestionTemplate = exports.QUESTION_TYPES = exports.REPORTING_TYPES = exports.MEASUREMENT_TYPES = void 0;
// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>
var ts_resource_tastypie_1 = require("ts-resource-tastypie");
exports.MEASUREMENT_TYPES = [
    { token: 'milestone_project_approval', name: 'Project approval' },
    { token: 'milestone_half_project', name: 'Half project' },
    { token: 'milestone_project_conclusion', name: 'Project conclusion' },
    { token: 'frequency_every_month', name: 'Every month' },
    { token: 'frequency_every_2_months', name: 'Every 2 months' },
    { token: 'frequency_every_3_months', name: 'Every 3 months' },
    { token: 'frequency_every_4_months', name: 'Every 4 months' },
    { token: 'frequency_every_5_months', name: 'Every 5 months' },
    { token: 'frequency_every_6_months', name: 'Every 6 months' },
    { token: 'exact_months', name: 'Months separated with commas', custom_value: '' }
];
exports.REPORTING_TYPES = [
    { token: 'invoices_receipts', name: 'Invoices and receipts' },
    { token: 'financial_spreadsheets', name: 'Financial spreadsheets' },
    { token: 'outcome_measurement_evidences', name: 'Outcome measurement and evidences' },
    { token: 'output_measurement_evidences', name: 'Output measurement and evidences' },
    { token: 'stories', name: 'Stories' }
];
exports.QUESTION_TYPES = [
    'text',
    'number',
    'datetime',
    'radio',
    'checkbox',
    'currency',
    'file',
    'geolocation',
    'geolocation_list'
];
var QuestionTemplate = /** @class */ (function (_super) {
    __extends(QuestionTemplate, _super);
    function QuestionTemplate(obj) {
        var _this = _super.call(this, QuestionTemplate.resource, {}) || this;
        _this.choices = [];
        _this.resp_currency = 0.00;
        _this.resp_number = 0;
        _this.resp_metrics = [];
        _this.resp_geolocation_list = [];
        _this.setData(obj);
        return _this;
    }
    QuestionTemplate.resource = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo/gs-form-response', { model: QuestionTemplate });
    return QuestionTemplate;
}(ts_resource_tastypie_1.Tastypie.Model));
exports.QuestionTemplate = QuestionTemplate;
//# sourceMappingURL=doadorFundoGsQuiz.js.map