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
export declare class StageMemberQuestionTemplate extends QuestionTemplate {
    stage_id: number;
    constructor(obj?: any);
}
export declare class RefQuestionTemplate extends QuestionTemplate {
    gs_id: number;
    form_topic: number;
    constructor(obj?: any);
}
export declare class OngQuestionTemplate extends QuestionTemplate {
    gs_id: number;
    form_topic: number;
    constructor(obj?: any);
}
