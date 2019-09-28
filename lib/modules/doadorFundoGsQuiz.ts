// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>

export interface QuestionChoice {
    name: string;
    value: any;
    flag: string;
}

export interface MeasurementType {
    token: string;
    name: string;
    custom_value?: any
}

export interface DisbursementRules {
    percent: number;
    measurement: MeasurementType;
}

export interface ReportingType {
    token: string;
    name: string;
}

export interface ReportingRules {
    report: ReportingType;
    measurement: MeasurementType;
}

export const MEASUREMENT_TYPES: Array<MeasurementType> = [
    {token: 'milestone_project_approval', name: 'Project approval'},
    {token: 'milestone_half_project', name: 'Half project'},
    {token: 'milestone_after_approval_mid_term_report', name: 'After approval of mid-term report'},
    {token: 'milestone_interin_report', name: 'Interin report'},
    {token: 'milestone_final_report', name: 'Final report'},
    {token: 'frequency_every_month', name: 'Every month'},
    {token: 'frequency_every_2_months', name: 'Every 2 months'},
    {token: 'frequency_every_3_months', name: 'Every 3 months'},
    {token: 'frequency_every_4_months', name: 'Every 4 months'},
    {token: 'exact_months', name: 'Months separated with commas', custom_value: ''}
];

export const REPORTING_TYPES: Array<ReportingType> = [
    {token: 'financial_spreadsheets', name: 'Financial spreadsheets'},
    {token: 'outcome_measurement_evidences', name: 'Outcome measurement and evidences'}
];

export const QUESTION_TYPES: Array<string> = [
    'radio',
    'checkbox',
    'text',
    'number'
];

export class QuestionTemplate {
    public name: string;
    public choices: Array<QuestionChoice>;
    public form_type: string;
    public evaluation_flag: string;
    public token: string;
    public dt_created: string;
    public dt_updated: string;

    constructor(obj?:any) {
        this.choices = [];
        if(obj){
            for(let attr in obj){
                this[attr] = obj[attr];
            }
        }
    }
}
