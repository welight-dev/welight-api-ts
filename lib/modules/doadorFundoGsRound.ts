// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>

import { Tastypie } from "ts-resource-tastypie";
import { OrgMember } from "./doadorFundo";
import { StageMemberQuestionTemplate } from "./doadorFundoGsQuiz";


export class OrgFundGsRound extends Tastypie.Model<OrgFundGsRound> {
    public static resource = new Tastypie.Resource<OrgFundGsRound>('doador-fundo/gs-round', {model: OrgFundGsRound});
    public static resource_add_round = new Tastypie.Resource<any>('doador-fundo/gs-round/add-list');

    public gs_id: number;
    public total_amount: number;
    public qty_disbursement: number;
    public dt_application_start: string;
    public set_application_end: boolean;
    public dt_application_end: string;
    public dt_evaluation_start: string;
    public set_evaluation_end: boolean;
    public dt_evaluation_end: string;
    public dt_implementation_start: string;
    public dt_implementation_end: string;
    public min_invested: number;
    public max_invested: number;
    public set_winners: boolean;
    public qty_winners: number;
    public order: number;
    public dt_created: string;
    public dt_updated: string;

    private _rs_stage: Tastypie.Resource<OfgsStage>;

    constructor(obj?:any){
        super(OrgFundGsRound.resource, obj);

        if(obj){
            if(obj.id){
                this._rs_stage = new Tastypie.Resource<OfgsStage>(
                    OfgsStage.resource.endpoint,
                    {model: OfgsStage, defaults: {round_id: obj.id}}
                );
            }
        }
    }

    public get rs_stage(): Tastypie.Resource<OfgsStage> {
        return this._rs_stage;
    }

    public add_stage(stages: Array<OfgsStage>): Promise<Array<OfgsStage>> {
        let stage_list = [];
        for(let stage of stages){
            stage_list.push(stage.getData());
        }
        return OfgsStage.resource_add_stage.objects.create({round_id:this.id, stages:stage_list}).then((data)=>{
              let stages_saved:Array<OfgsStage> = [];
              for(let obj of data){
                  stages_saved.push(new OfgsStage(obj));
              }
              return stages_saved;
        });
    }
}

export class OfgsStage extends Tastypie.Model<OfgsStage> {
    public static resource = new Tastypie.Resource<OfgsStage>('doador-fundo/gs-round-stage', {model: OfgsStage});
    public static resource_add_stage = new Tastypie.Resource<any>('doador-fundo/gs-round-stage/add-list');

    public round_id: number;
    public name: string;
    public evaluation_standard: string;
    public dt_start: string;
    public dt_end: string;
    public has_referral: boolean;
    public use_standard_questions: string;
    public order: number;
    public dt_updated: string;
    public dt_created: string;

    private _evaluators: Array<OfgsStageEvaluator>;
    private _questions: Array<StageMemberQuestionTemplate>;
    private _member_manager: OfgsStageMemberManager;

    constructor(obj?:any){
        super(OfgsStage.resource, obj);
        this._evaluators = [];
        this._questions = [];
        this._member_manager = new OfgsStageMemberManager();
        if(obj){
            if(obj.evaluators){
                for(let ev of obj.evaluators){
                    this._evaluators.push(new OfgsStageEvaluator(ev));
                }
            }
            if(obj.questions){
                for(let qt of obj.questions){
                    this._questions.push(new StageMemberQuestionTemplate(qt));
                }
            }
        }
    }

    public getData(): any {
        let obj = super.getData();
        obj['evaluators'] = [];
        for(let ev of this._evaluators){
            obj['evaluators'].push(ev.getData());
        }

        obj['questions'] = this._questions;
        return obj;
    }

    public get evaluators(): Array<OfgsStageEvaluator> {
        return this._evaluators;
    }

    public get questions(): Array<StageMemberQuestionTemplate> {
        return this._questions;
    }

    public get member_manager(): OfgsStageMemberManager {
        return this._member_manager;
    }

    public select_members(tokens: Array<string>): void {
        for(let token of tokens){
            let member = this._member_manager.avaliable_members.find(m => m.token === token);

            if(!this._evaluators.find(m => m.member.token === member.token)){
                this._evaluators.push(new OfgsStageEvaluator({member:member, permission:'evaluate'}));
            }
        }
        this._member_manager.select_members(tokens);
    }

    public unselect_member(token: string): void {
        if(this._evaluators.find(m => m.member.token === token)){
            for(let i=0; i<this._evaluators.length; i++){
                if(this._evaluators[i].member.token === token){
                    this._evaluators.splice(i, 1);
                    break;
                }
            }
        }
        this._member_manager.unselect_member(token);
    }
}

export class OfgsStageEvaluator extends Tastypie.Model<OfgsStageEvaluator> {
    public static resource = new Tastypie.Resource<OfgsStageEvaluator>('doador-fundo/gs-round-stage-evaluator', {model: OfgsStageEvaluator});

    public stage_id: number;
    public member: OrgMember;
    public permission: string;
    public dt_updated: string;
    public dt_created: string;

    constructor(obj?:any){
        super(OfgsStageEvaluator.resource, obj);

        if(obj){
            if(obj.member) this.member = new OrgMember(obj.member);
        }
    }
}

export class OfgsStageMemberManager {
    public added_members: Array<OrgMember>;
    public avaliable_members: Array<OrgMember>;

    constructor(obj?:any){
        this.added_members = [];
        this.avaliable_members = [];
        if(obj){
            if(obj.added_members){
              for(let member of obj.added_members){
                  this.added_members.push(new OrgMember(member));
              }
            }
            if(obj.avaliable_members){
              for(let member of obj.avaliable_members){
                  this.avaliable_members.push(new OrgMember(member));
              }
            }
        }
    }

    public unselect_member(token: string): void {
        for(let i=0; i<this.added_members.length; i++){
            if(token === this.added_members[i].token){
                if(!this.avaliable_members.find(member => member.token === token)){
                    this.avaliable_members.push(this.added_members[i]);
                }
                this.added_members.splice(i, 1);
                break;
            }
        }
    }

    public select_members(tokens: Array<string>): void {
        for(let token of tokens){
            if(!this.added_members.find(member => member.token === token)){
                for(let i=0; i<this.avaliable_members.length; i++){
                    if(token === this.avaliable_members[i].token){
                        this.added_members.push(this.avaliable_members[i]);
                        this.avaliable_members.splice(i, 1);
                        break;
                    }
                }
            }
        }
    }
}
