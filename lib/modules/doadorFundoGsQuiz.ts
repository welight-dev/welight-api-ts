// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>

export interface QuestionChoice {
    name: string,
    value: any,
    flag: string
}

export class QuestionTemplate {
    public name: string;
    public choices: Array<QuestionChoice>;
    public form_type: string;
    public evaluation_flag: string;
    public dt_created: string;
    public dt_updated: string;

    constructor(obj?:any) {
        this.choices = [];
        if(obj){
            for(let attr in obj){
                this[attr] = obj[attr];
            }
        }
    }
}
