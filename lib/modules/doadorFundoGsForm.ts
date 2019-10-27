// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>

import { Tastypie } from "ts-resource-tastypie";
import { QuestionTemplate } from "./doadorFundoGsQuiz";

export class GsForm extends Tastypie.Model<GsForm> {
    public static resource = new Tastypie.Resource<GsForm>('doador-fundo/gs-form', {model: GsForm});

    public gs_id: number;
    public type: string;
    public topic: string;
    public content: any;
    public document: string;
    public dt_updated: string;
    public dt_created: string;
    public questions: Array<QuestionTemplate>;

    constructor(obj?:any){
        super(GsForm.resource, obj);
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

export class GsFormResponse extends Tastypie.Model<GsFormResponse> {

    public gs_project_id: number;
    public type: string;
    public topic: string;
    public content: any;
    public document: string;
    public dt_updated: string;
    public dt_created: string;
    public questions: Array<QuestionTemplate>;

    constructor(obj?:any){
        super(null, obj);
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
