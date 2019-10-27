import { Tastypie } from "ts-resource-tastypie";
import { QuestionTemplate } from "./doadorFundoGsQuiz";
export declare class GsForm extends Tastypie.Model<GsForm> {
    static resource: Tastypie.Resource<GsForm>;
    gs_id: number;
    type: string;
    topic: string;
    content: any;
    document: string;
    dt_updated: string;
    dt_created: string;
    questions: Array<QuestionTemplate>;
    constructor(obj?: any);
}
export declare class GsFormResponse extends Tastypie.Model<GsFormResponse> {
    gs_project_id: number;
    type: string;
    topic: string;
    content: any;
    document: string;
    dt_updated: string;
    dt_created: string;
    questions: Array<QuestionTemplate>;
    constructor(obj?: any);
}
