export interface QuestionChoice {
    name: string;
    value: any;
    flag: string;
}
export declare class QuestionTemplate {
    name: string;
    choices: Array<QuestionChoice>;
    form_type: string;
    evaluation_flag: string;
    dt_created: string;
    dt_updated: string;
    constructor(obj?: any);
}
