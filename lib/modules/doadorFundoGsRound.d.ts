import { Tastypie } from "ts-resource-tastypie";
import { OrgMember } from "./doadorFundo";
import { StageMemberQuestionTemplate } from "./doadorFundoGsQuiz";
export declare class OrgFundGsRound extends Tastypie.Model<OrgFundGsRound> {
    static resource: Tastypie.Resource<OrgFundGsRound>;
    static resource_add_round: Tastypie.Resource<any>;
    gs_id: number;
    total_amount: number;
    qty_disbursement: number;
    dt_application_start: string;
    set_application_end: boolean;
    dt_application_end: string;
    dt_evaluation_start: string;
    set_evaluation_end: boolean;
    dt_evaluation_end: string;
    dt_implementation_start: string;
    dt_implementation_end: string;
    min_invested: number;
    max_invested: number;
    set_winners: boolean;
    qty_winners: number;
    order: number;
    dt_created: string;
    dt_updated: string;
    constructor(obj?: any);
}
export declare class OfgsStage extends Tastypie.Model<OfgsStage> {
    static resource: Tastypie.Resource<OfgsStage>;
    static resource_add_stage: Tastypie.Resource<any>;
    round_id: number;
    name: string;
    evaluation_standard: string;
    dt_start: string;
    dt_end: string;
    has_referral: boolean;
    use_standard_questions: string;
    dt_updated: string;
    dt_created: string;
    private _evaluators;
    private _questions;
    private _member_manager;
    constructor(obj?: any);
    save(obj?: any): Promise<OfgsStage>;
    readonly evaluators: Array<OfgsStageEvaluator>;
    readonly questions: Array<StageMemberQuestionTemplate>;
    readonly member_manager: OfgsStageMemberManager;
    select_members(tokens: Array<string>): void;
    unselect_member(token: string): void;
}
export declare class OfgsStageEvaluator extends Tastypie.Model<OfgsStageEvaluator> {
    static resource: Tastypie.Resource<OfgsStageEvaluator>;
    stage_id: number;
    member: OrgMember;
    permission: string;
    dt_updated: string;
    dt_created: string;
    constructor(obj?: any);
}
export declare class OfgsStageMemberManager {
    added_members: Array<OrgMember>;
    avaliable_members: Array<OrgMember>;
    constructor(obj?: any);
    unselect_member(token: string): void;
    select_members(tokens: Array<string>): void;
}
