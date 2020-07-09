// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>

import { Tastypie } from "ts-resource-tastypie";
import { QuestionTemplate, IProjectsFlags } from "./doadorFundoGsQuiz";


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

    public get flag(): IProjectsFlags {
        return {
            green: this._count_question_flags('green'),
            yellow: this._count_question_flags('yellow'),
            red: this._count_question_flags('red')
        }
    }

    private _count_question_flags(flag: string): number {
        let _total: number = 0;

        for(let q of this.questions.filter(q => (q.form_type === 'radio' || q.form_type === 'checkbox'))){
            _total += q.choices.filter(c => c.flag === flag && c.value === true).length;
        }

        return _total;
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
