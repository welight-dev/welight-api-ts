import { Tastypie } from "ts-resource-tastypie";
import { OrgFund, OrgMember } from "./doadorFundo";
import { OrgFundGsRound } from "./doadorFundoGsRound";
import { GsForm, GsFormResponse } from "./doadorFundoGsForm";
import { Ong, OngProjeto } from "./ong";
import { Doador } from "./doador";
import { DisbursementRules, QuestionTemplate, IProjectsFlags } from "./doadorFundoGsQuiz";
export declare class OrgFundGs extends Tastypie.Model<OrgFundGs> {
    static resource: Tastypie.Resource<OrgFundGs>;
    static resource_get_member: Tastypie.Resource<any>;
    static resource_add_member: Tastypie.Resource<any>;
    static resource_delete_member: Tastypie.Resource<any>;
    static resource_check_step: Tastypie.Resource<any>;
    static resource_get_permissions: Tastypie.Resource<string[]>;
    org_fund_id: number;
    name: string;
    slug: string;
    description: string;
    logo: string;
    credit_type: string;
    currency: string;
    currency_quote: number;
    budget_limit: number;
    in_kind_qty: number;
    contact_email: string;
    verified: boolean;
    private: boolean;
    published: boolean;
    access_url: string;
    dt_created: string;
    dt_updated: string;
    org_fund: OrgFund;
    product: OrgGsProduct;
    categories_id: Array<number>;
    private _categories;
    private _rs_round;
    private _rs_form;
    private _rs_invite_ong;
    private _rs_project;
    constructor(obj?: any, resource?: Tastypie.Resource<OrgFundGs>);
    save(obj?: any): Promise<OrgFundGs>;
    private _init;
    get rs_round(): Tastypie.Resource<OrgFundGsRound>;
    get rs_form(): Tastypie.Resource<GsForm>;
    get rs_invite_ong(): Tastypie.Resource<OfgsInvitationOng>;
    get rs_project(): Tastypie.Resource<OfgsProject>;
    get categories(): Array<OrgGsCategory>;
    get_member(): Promise<OrgGsMember>;
    add_member(tokens_member: Array<string>, passw: string): Promise<OrgGsMember>;
    delete_member(token: string, passw: string): Promise<OrgGsMember>;
    add_round(rounds: Array<OrgFundGsRound>): Promise<Array<OrgFundGsRound>>;
    check_step(): Promise<any>;
    get_permissions(): Promise<Array<string>>;
}
export declare class OrgGsCategory extends Tastypie.Model<OrgGsCategory> {
    static resource: Tastypie.Resource<OrgGsCategory>;
    org_id: number;
    name: string;
    slug: string;
    dt_created: string;
    constructor(obj?: any);
}
export declare class OrgGsProduct extends Tastypie.Model<OrgGsProduct> {
    static resource: Tastypie.Resource<OrgGsProduct>;
    org_id: number;
    name: string;
    slug: string;
    amount: number;
    dt_created: string;
    constructor(obj?: any);
}
export declare class OrgGsMember {
    added_members: Array<OrgMember>;
    avaliable_members: Array<OrgMember>;
    constructor(obj?: any);
}
export declare class OfgsInvitationOng extends Tastypie.Model<OfgsInvitationOng> {
    static resource: Tastypie.Resource<OfgsInvitationOng>;
    gs_id: number;
    md_gs: OrgFundGs;
    md_ong: Ong;
    invite_name: string;
    invite_email: string;
    invite_token: string;
    status: string;
    dt_updated: string;
    dt_created: string;
    constructor(obj?: any);
}
export declare class OrgFundGsFormSubscribe extends OrgFundGs {
    static resource: Tastypie.Resource<OrgFundGsFormSubscribe>;
    forms: Array<GsForm>;
    invite: OfgsInvitationOng;
    constructor(obj?: any);
}
export interface IDealItem {
    id: number;
    amount: number;
    rule: DisbursementRules;
}
export interface IScheduleItem {
    amount: number;
    dt_amount: string;
    deal_id?: number;
}
export interface IProjectDealSchedule {
    total_requested: number;
    total_approved: number;
    deal: Array<IDealItem>;
    schedule: Array<IScheduleItem>;
}
export declare class EvaluatorsData {
    doador_id: number;
    stage_id: number;
    score: string;
    questions: Array<QuestionTemplate>;
    constructor(obj?: any);
}
export declare class ProjectSummary {
    views: number;
    comments: number;
    private _evaluators;
    private _evaluators_data;
    private _forms;
    private _form_flags;
    constructor(forms: Array<GsFormResponse>, obj?: any);
    get evaluators(): Array<Doador>;
    get evaluators_data(): Array<EvaluatorsData>;
    get_evaluators_questions(doador_id: number, stage_id: number): Array<QuestionTemplate>;
    get_evaluators_data(doador_id: number, stage_id: number): EvaluatorsData;
    get_evaluators_flag(doador_id: number): IProjectsFlags;
    get score(): IProjectsFlags;
    get flag(): IProjectsFlags;
    private _count_score;
    private _count_score_evaluator;
    private _count_question_flags;
    private _count_form_flags;
}
export declare class OfgsProject extends Tastypie.Model<OfgsProject> {
    static resource: Tastypie.Resource<OfgsProject>;
    static resource_approve_stage: Tastypie.Resource<{
        approved: boolean;
    }>;
    static resource_check_approve: Tastypie.Resource<IProjectDealSchedule>;
    static resource_approve: Tastypie.Resource<IProjectDealSchedule>;
    static resource_set_member_resp: Tastypie.Resource<EvaluatorsData>;
    gs_id: number;
    md_project: OngProjeto;
    md_ong: Ong;
    round_id: number;
    stage_id: number;
    approved: boolean;
    total_requested: number;
    total_approved: number;
    accept_partial: boolean;
    forms: Array<GsFormResponse>;
    private _rs_views;
    private _rs_comments;
    private _rs_finance_schedule;
    private _summary;
    dt_updated: string;
    dt_created: string;
    constructor(obj?: any);
    get rs_views(): Tastypie.Resource<OfgsProjectView>;
    get rs_comments(): Tastypie.Resource<OfgsProjectComment>;
    get rs_finance_schedule(): Tastypie.Resource<OfgsProjectFinanceSchedule>;
    get summary(): ProjectSummary;
    setStageMemberResponse(data: EvaluatorsData): Promise<EvaluatorsData>;
    setView(): Promise<OfgsProjectView>;
    checkApprove(total_approved?: number): Promise<IProjectDealSchedule>;
    approve(data: IProjectDealSchedule, passw: string): Promise<IProjectDealSchedule>;
    approveCurrentStage(passw: string): Promise<{
        approved: boolean;
    }>;
}
export declare class OfgsProjectView extends Tastypie.Model<OfgsProjectView> {
    static resource: Tastypie.Resource<OfgsProjectView>;
    gs_project_id: number;
    md_doador: Doador;
    dt_created: string;
    constructor(obj?: any);
}
export declare class OfgsProjectComment extends Tastypie.Model<OfgsProjectComment> {
    static resource: Tastypie.Resource<OfgsProjectComment>;
    gs_project_id: number;
    md_doador: Doador;
    comment: string;
    dt_updated: string;
    dt_created: string;
    constructor(obj?: any);
}
export declare class OfgsProjectFinanceSchedule extends Tastypie.Model<OfgsProjectFinanceSchedule> {
    static resource: Tastypie.Resource<OfgsProjectFinanceSchedule>;
    gs_project_id: number;
    amount: number;
    status: string;
    invoice_id: string;
    dt_due_transfer: string;
    dt_transfer: string;
    dt_created: string;
    constructor(obj?: any);
}
