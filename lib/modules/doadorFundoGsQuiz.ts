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
    {token: 'milestone_project_conclusion', name: 'Project conclusion'},
    {token: 'frequency_every_month', name: 'Every month'},
    {token: 'frequency_every_2_months', name: 'Every 2 months'},
    {token: 'frequency_every_3_months', name: 'Every 3 months'},
    {token: 'frequency_every_4_months', name: 'Every 4 months'},
    {token: 'frequency_every_5_months', name: 'Every 5 months'},
    {token: 'frequency_every_6_months', name: 'Every 6 months'},
    {token: 'exact_months', name: 'Months separated with commas', custom_value: ''}
];

export const REPORTING_TYPES: Array<ReportingType> = [
    {token: 'invoices_receipts', name: 'Invoices and receipts'},
    {token: 'financial_spreadsheets', name: 'Financial spreadsheets'},
    {token: 'outcome_measurement_evidences', name: 'Outcome measurement and evidences'},
    {token: 'output_measurement_evidences', name: 'Output measurement and evidences'},
    {token: 'stories', name: 'Stories'}
];

export const QUESTION_TYPES: Array<string> = [
    'text',
    'number',
    'datetime',
    'radio',
    'checkbox',
    'currency',
    'file'
];

export class QuestionTemplate {
    public name: string;
    public choices: Array<QuestionChoice>;
    public resp_text: string;
    public resp_number: number
    public resp_date: string;
    public resp_metrics: Array<number>;
    public resp_currency: number;
    public resp_file: string;
    public form_type: string;
    public evaluation_flag: string;
    public token: string;
    public checked: boolean;
    public order: number;
    public required: boolean;
    public dt_created: string;
    public dt_updated: string;

    constructor(obj?:any) {
        this.choices = [];
        if(obj){
            for(let attr in obj){
                this[attr] = obj[attr];
            }
        }

        if(!this.resp_currency) this.resp_currency = 0.00;
        if(!this.resp_number) this.resp_number = 0;
    }
}
