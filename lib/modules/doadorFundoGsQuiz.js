"use strict";
// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionTemplate = exports.QUESTION_TYPES = exports.REPORTING_TYPES = exports.MEASUREMENT_TYPES = void 0;
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
var QuestionTemplate = /** @class */ (function () {
    function QuestionTemplate(obj) {
        this.choices = [];
        this.resp_currency = 0.00;
        this.resp_number = 0;
        this.resp_metrics = [];
        this.resp_geolocation_list = [];
        if (obj) {
            for (var attr in obj) {
                this[attr] = obj[attr];
            }
        }
    }
    return QuestionTemplate;
}());
exports.QuestionTemplate = QuestionTemplate;
//# sourceMappingURL=doadorFundoGsQuiz.js.map