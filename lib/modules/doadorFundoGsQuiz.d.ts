import { Tastypie } from "ts-resource-tastypie";
export interface QuestionChoice {
    name: string;
    value: any;
    flag: string;
}
export interface MeasurementType {
    token: string;
    name: string;
    custom_value?: any;
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
export declare const MEASUREMENT_TYPES: Array<MeasurementType>;
export declare const REPORTING_TYPES: Array<ReportingType>;
export declare const QUESTION_TYPES: Array<string>;
export interface IProjectsFlags {
    green: number;
    yellow: number;
    red: number;
}
export declare class QuestionTemplate extends Tastypie.Model<QuestionTemplate> {
    static resource: Tastypie.Resource<QuestionTemplate>;
    name: string;
    choices: Array<QuestionChoice>;
    resp_text: string;
    resp_number: number;
    resp_date: string;
    resp_metrics: Array<number>;
    resp_geolocation: any;
    resp_geolocation_list: Array<any>;
    resp_currency: number;
    resp_file: string;
    form_type: string;
    evaluation_flag: string;
    token: string;
    checked: boolean;
    order: number;
    required: boolean;
    dt_created: string;
    dt_updated: string;
    constructor(obj?: any);
}
