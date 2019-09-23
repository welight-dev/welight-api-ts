export interface QuestionChoice {
    name: string;
    value: any;
    flag: string;
}
export interface MeasurementType {
    token: string;
    name: string;
}
export interface DisbursementRules {
    percent: number;
    measurement: MeasurementType;
    custom_value?: any;
}
export declare const MEASUREMENT_TYPES: Array<MeasurementType>;
export declare class QuestionTemplate {
    name: string;
    choices: Array<QuestionChoice>;
    form_type: string;
    evaluation_flag: string;
    dt_created: string;
    dt_updated: string;
    constructor(obj?: any);
}
