import { Tastypie } from "ts-resource-tastypie";
import { QuestionTemplate, IProjectsFlags } from "./doadorFundoGsQuiz";
export declare class GsFormModel extends Tastypie.Model<GsFormModel> {
    gs_id: number;
    gs_project_id: number;
    type: string;
    topic: string;
    content: any;
    document: string;
    dt_updated: string;
    dt_created: string;
    questions: Array<QuestionTemplate>;
    constructor(resource: Tastypie.Resource<GsFormModel>, obj?: any);
    getData(): any;
    get flag(): IProjectsFlags;
    private _count_question_flags;
}
export declare class GsForm extends GsFormModel {
    static resource: Tastypie.Resource<GsForm>;
    constructor(obj?: any);
}
export declare class GsFormResponse extends GsFormModel {
    constructor(obj?: any);
}
