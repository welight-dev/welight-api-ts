// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>

export class QuestionTemplate {
    public name: string;
    public choices: any;
    public type: string;
    public dt_created: string;
    public dt_updated: string;

    constructor(obj?:any) {
        if(obj){
            for(let attr in obj){
                this[attr] = obj[attr];
            }
        }
    }
}

export class StageMemberQuestionTemplate extends QuestionTemplate {
    public stage_id: number;

    constructor(obj?:any){
        super(obj);
    }
}

export class RefQuestionTemplate extends QuestionTemplate {
    public gs_id: number;
    public form_topic: number;

    constructor(obj?:any){
        super(obj);
    }
}

export class OngQuestionTemplate extends QuestionTemplate {
    public gs_id: number;
    public form_topic: number;

    constructor(obj?:any){
        super(obj);
    }
}
