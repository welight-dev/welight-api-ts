"use strict";
// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>
Object.defineProperty(exports, "__esModule", { value: true });
exports.MEASUREMENT_TYPES = [
    { token: 'milestone_project_approval', name: 'Project approval' },
    { token: 'milestone_half_project', name: 'Half project' },
    { token: 'milestone_after_approval_mid_term_report', name: 'After approval of mid-term report' },
    { token: 'milestone_interin_report', name: 'Interin report' },
    { token: 'milestone_final_report', name: 'Final report' },
    { token: 'frequency_every_month', name: 'Every month' },
    { token: 'frequency_every_2_months', name: 'Every 2 months' },
    { token: 'frequency_every_3_months', name: 'Every 3 months' },
    { token: 'frequency_every_4_months', name: 'Every 4 months' },
    { token: 'exact_months', name: 'Months separated with commas', custom_value: '' }
];
exports.REPORTING_TYPES = [
    { token: 'financial_spreadsheets', name: 'Financial spreadsheets' },
    { token: 'outcome_measurement_evidences', name: 'Outcome measurement and evidences' }
];
var QuestionTemplate = /** @class */ (function () {
    function QuestionTemplate(obj) {
        this.choices = [];
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