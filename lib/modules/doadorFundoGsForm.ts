// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>

import { Tastypie } from "ts-resource-tastypie";
import { QuestionTemplate } from "./doadorFundoGsQuiz";


export class GsFormModel extends Tastypie.Model<GsFormModel> {

    public gs_id: number;
    public gs_project_id: number;
    public type: string;
    public topic: string;
    public content: any;
    public document: string;
    public dt_updated: string;
    public dt_created: string;
    public questions: Array<QuestionTemplate>;

    constructor(resource: Tastypie.Resource<GsFormModel>, obj?: any){
        super(resource, obj);
        this.questions = [];
        if(obj){
            if(obj.questions){
                for(let question of obj.questions){
                    this.questions.push(new QuestionTemplate(question));
                }
            }
        }
    }
}

export class GsForm extends GsFormModel {
    public static resource = new Tastypie.Resource<GsForm>('doador-fundo/gs-form', {model: GsForm});
    constructor(obj?:any){
        super(GsForm.resource, obj);
    }
}

export class GsFormResponse extends GsFormModel {
    constructor(obj?:any){
        super(null, obj);
    }
}
