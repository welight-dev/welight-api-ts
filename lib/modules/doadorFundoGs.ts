// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>

import { Tastypie } from "ts-resource-tastypie";
import { OrgFund, OrgMember } from "./doadorFundo";
import { OrgFundGsRound } from "./doadorFundoGsRound";
import { GsForm, GsFormResponse } from "./doadorFundoGsForm";
import { Ong, OngProjeto } from "./ong";
import { Doador } from "./doador";
import { DisbursementRules, QuestionTemplate, IProjectsFlags } from "./doadorFundoGsQuiz";

export class OrgFundGs extends Tastypie.Model<OrgFundGs> {
    public static resource = new Tastypie.Resource<OrgFundGs>('doador-fundo/gs', {model: OrgFundGs});
    public static resource_get_member = new Tastypie.Resource<any>('doador-fundo/gs/<id>/get-member');
    public static resource_add_member = new Tastypie.Resource<any>('doador-fundo/gs/add-member');
    public static resource_delete_member = new Tastypie.Resource<any>('doador-fundo/gs/<id>/delete-member');
    public static resource_check_step = new Tastypie.Resource<any>('doador-fundo/gs/<id>/check-step');
    public static resource_get_permissions = new Tastypie.Resource<Array<string>>('doador-fundo/gs/<id>/get-permissions');

    public org_fund_id: number;
    public name: string;
    public slug: string;
    public description: string;
    public logo: string;
    public credit_type: string;
    public currency: string;
    public currency_quote: number;
    public budget_limit: number;
    public in_kind_qty: number;
    public contact_email: string;
    public verified: boolean;
    public private: boolean;
    public published: boolean;
    public access_url: string;
    public dt_created: string;
    public dt_updated: string;

    public org_fund: OrgFund;
    public product: OrgGsProduct;
    public categories_id: Array<number>;
    private _categories: Array<OrgGsCategory>;
    private _rs_round: Tastypie.Resource<OrgFundGsRound>;
    private _rs_form: Tastypie.Resource<GsForm>;
    private _rs_invite_ong: Tastypie.Resource<OfgsInvitationOng>;
    private _rs_project: Tastypie.Resource<OfgsProject>;

    constructor(obj?:any, resource?:Tastypie.Resource<OrgFundGs>){
        super(resource || OrgFundGs.resource, obj);
        this._init(obj);
    }

    public save(obj?:any): Promise<OrgFundGs> {
        return super.save(obj).then((response) => {
            this._init(response);
            return this;
        });
    }

    private _init(obj?: any): void {
        this._categories = [];

        if(!this.categories_id){
            this.categories_id = [];
        }

        this.org_fund = new OrgFund();
        this.product = new OrgGsProduct();

        if(obj){
            if(obj.org_fund) this.org_fund = new OrgFund(obj.org_fund);
            if(obj.product) this.product = new OrgGsProduct(obj.product);
            if(obj.categories){
              for(let category of obj.categories){
                  this._categories.push(new OrgGsCategory(category));
              }
            }

            if(obj.id){
                this._rs_round = new Tastypie.Resource<OrgFundGsRound>(
                    OrgFundGsRound.resource.endpoint,
                    {model: OrgFundGsRound, defaults: {gs_id: obj.id}}
                );
                this._rs_form = new Tastypie.Resource<GsForm>(
                    GsForm.resource.endpoint,
                    {model: GsForm, defaults: {gs_id: obj.id}}
                );
                this._rs_invite_ong = new Tastypie.Resource<OfgsInvitationOng>(
                    OfgsInvitationOng.resource.endpoint,
                    {model: OfgsInvitationOng, defaults: {gs_id: obj.id}}
                );
                this._rs_project = new Tastypie.Resource<OfgsProject>(
                    OfgsProject.resource.endpoint,
                    {model: OfgsProject, defaults: {gs_id: obj.id}}
                );
            }
        }
    }

    public get rs_round(): Tastypie.Resource<OrgFundGsRound> {
        return this._rs_round;
    }

    public get rs_form(): Tastypie.Resource<GsForm> {
        return this._rs_form;
    }

    public get rs_invite_ong(): Tastypie.Resource<OfgsInvitationOng> {
        return this._rs_invite_ong;
    }

    public get rs_project(): Tastypie.Resource<OfgsProject> {
        return this._rs_project;
    }

    public get categories(): Array<OrgGsCategory> {
        return this._categories;
    }

    public get_member(): Promise<OrgGsMember> {
        if(this.id){
            return OrgFundGs.resource_get_member.objects.get(this.id).then((data) => {
                return new OrgGsMember(data);
            });
        }else{
            return Promise.reject('Giving stream not found');
        }
    }

    public add_member(tokens_member: Array<string>, passw: string): Promise<OrgGsMember> {
        if(this.id){
            return OrgFundGs.resource_add_member.objects.create({gs_id:this.id, tokens_member:tokens_member, passw:passw}).then((data) => {
                return new OrgGsMember(data);
            });
        }else{
            return Promise.reject('Giving stream not found');
        }
    }

    public delete_member(token: string, passw: string): Promise<OrgGsMember> {
        if(this.id){
            return OrgFundGs.resource_delete_member.objects.delete(this.id, {token:token, passw:passw}).then((data) => {
                return new OrgGsMember(data);
            });
        }else{
            return Promise.reject('Giving stream not found');
        }
    }

    public add_round(rounds: Array<OrgFundGsRound>): Promise<Array<OrgFundGsRound>> {
        if(this.id){
            let params = [];
            for(let round of rounds){
                round.gs_id = this.id;
                params.push(round.getData());
            }
            return OrgFundGsRound.resource_add_round.objects.create({gs_id: this.id, rounds: params}).then((data) => {
                let rounds: Array<OrgFundGsRound> = [];
                for(let round of data){
                    rounds.push(new OrgFundGsRound(round));
                }
                if(this._rs_round.page.initialized){
                    return this._rs_round.page.refresh().then(() => {
                        return rounds;
                    }).catch(() => {
                        return rounds;
                    });
                }else{
                    return rounds;
                }
            });
        }else{
            return Promise.reject('Giving stream not found');
        }
    }

    public check_step(): Promise<any> {
        if(this.id){
            return OrgFundGs.resource_check_step.objects.get(this.id);
        }else{
            return Promise.reject('Giving stream not found');
        }
    }

    public get_permissions(): Promise<Array<string>> {
        if(this.id){
            return OrgFundGs.resource_get_permissions.objects.get(this.id);
        }else{
            return Promise.reject('Giving stream not found');
        }
    }
}

export class OrgGsCategory extends Tastypie.Model<OrgGsCategory> {
    public static resource = new Tastypie.Resource<OrgGsCategory>('doador-fundo/org-gs-category', {model: OrgGsCategory});

    public org_id: number;
    public name: string;
    public slug: string;
    public dt_created: string;

    constructor(obj?:any){
        super(OrgGsCategory.resource, obj);
    }
}

export class OrgGsProduct extends Tastypie.Model<OrgGsProduct> {
    public static resource = new Tastypie.Resource<OrgGsProduct>('doador-fundo/org-gs-product', {model: OrgGsProduct});

    public org_id: number;
    public name: string;
    public slug: string;
    public amount: number;
    public dt_created: string;

    constructor(obj?:any){
        super(OrgGsProduct.resource, obj);
    }
}

export class OrgGsMember {
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
}

export class OfgsInvitationOng extends Tastypie.Model<OfgsInvitationOng> {
    public static resource = new Tastypie.Resource<OfgsInvitationOng>('doador-fundo/gs-invitation', {model: OfgsInvitationOng});

    public gs_id: number;
    public md_gs: OrgFundGs;
    public md_ong: Ong;

    public invite_name: string;
    public invite_email: string;
    public invite_token: string;
    public status: string;
    public dt_updated: string;
    public dt_created: string;

    constructor(obj?:any){
        super(OfgsInvitationOng.resource, obj);

        if(obj){
            if(obj.gs) this.md_gs = new OrgFundGs(obj.gs);
            if(obj.ong) this.md_ong = new Ong(obj.ong);
        }
    }
}

export class OrgFundGsFormSubscribe extends OrgFundGs {
    public static resource = new Tastypie.Resource<OrgFundGsFormSubscribe>('doador-fundo/gs-form-subscribe', {model: OrgFundGsFormSubscribe});
    public forms: Array<GsForm>;
    public invite: OfgsInvitationOng;

    constructor(obj?:any){
        super(obj, OrgFundGsFormSubscribe.resource);
        this.forms = [];
        if(obj){
            if(obj.forms){
                for(let form of obj.forms){
                    this.forms.push(new GsForm(form));
                }
            }

            if(obj.invite) this.invite = new OfgsInvitationOng(obj.invite);
        }
    }
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

export class EvaluatorsData {
    public doador_id: number;
    public stage_id: number;
    public score: string;
    public questions: Array <QuestionTemplate>;

    constructor(obj?:any){
        this.doador_id = null;
        this.stage_id = null;
        this.score = 'yellow';
        this.questions = [];        

        if(obj){
            if(obj.doador_id) this.doador_id = obj.doador_id;
            if(obj.stage_id) this.stage_id = obj.stage_id;
            if(obj.score) this.score = obj.score;
            if(obj.questions){
                for(let q of obj.questions){
                    this.questions.push(new QuestionTemplate(q));
                }
            }
        }
    }
}

export class ProjectSummary {
    public views: number;
    public comments: number;
    private _evaluators: Array<Doador>;
    private _evaluators_data: Array<EvaluatorsData>;
    private _forms: Array<GsFormResponse>;
    private _form_flags: IProjectsFlags;

    constructor(forms: Array<GsFormResponse>, obj?: any){
        this.views = 0;
        this.comments = 0;
        this._evaluators = [];
        this._evaluators_data = [];
        this._forms = forms;

        if(obj){
            if(obj.views) this.views = obj.views;
            if(obj.comments) this.comments = obj.comments;

            if(obj.evaluators){
                for(let item of obj.evaluators){
                    this._evaluators.push(new Doador(item));
                }  
            }

            if(obj.evaluators_data){
                for(let item of obj.evaluators_data){
                    this._evaluators_data.push(new EvaluatorsData(item));
                }                
            }
        }
        this._count_form_flags();
    }

    public get evaluators(): Array<Doador> {
        return this._evaluators;
    }

    public get evaluators_data(): Array<EvaluatorsData> {
        return this._evaluators_data;
    }

    public get_evaluators_questions(doador_id: number, stage_id: number): Array<QuestionTemplate> {
        return (this._evaluators_data.find(
            m => m.doador_id === doador_id && m.stage_id === stage_id) || {questions: []}
        ).questions;
    }

    public get_evaluators_data(doador_id: number, stage_id: number): EvaluatorsData {
        return (this._evaluators_data.find(
            m => m.doador_id === doador_id && m.stage_id === stage_id) ||
            new EvaluatorsData({doador_id: doador_id, stage_id: stage_id})
        );
    }

    public get_evaluators_flag(doador_id: number): IProjectsFlags {
        return {
            green: this._count_question_flags_evaluator(doador_id, 'green'),
            yellow: this._count_question_flags_evaluator(doador_id, 'yellow'),
            red: this._count_question_flags_evaluator(doador_id, 'red')
        }
    }

    public get score(): IProjectsFlags {
        return {
            green: this._count_score('green'),
            yellow: this._count_score('yellow'),
            red: this._count_score('red')
        }
    }

    public get flag(): IProjectsFlags {
        return {
            green: this._count_question_flags('green'),
            yellow: this._count_question_flags('yellow'),
            red: this._count_question_flags('red')
        }
    }

    private _count_score(flag: string): number {
        return this._evaluators_data.filter(m => m.score === flag).length;
    }

    private _count_score_evaluator(doador_id: number, flag: string): number {
        return this._evaluators_data.filter(m => m.doador_id === doador_id && m.score === flag).length;
    }

    private _count_question_flags(flag: string): number {
        let _total: number = this._form_flags[flag] || 0;

        for(let item of this._evaluators_data){
            for(let q of item.questions.filter(q => (q.form_type === 'radio' || q.form_type === 'checkbox'))){
                _total += q.choices.filter(c => c.flag === flag && c.value === true).length;
            }
        }

        return _total;
    }

    private _count_question_flags_evaluator(doador_id: number, flag: string): number {
        let _total: number = 0;

        for(let item of this._evaluators_data.filter(e => e.doador_id === doador_id)){
            for(let q of item.questions.filter(q => (q.form_type === 'radio' || q.form_type === 'checkbox'))){
                _total += q.choices.filter(c => c.flag === flag && c.value === true).length;
            }
        }

        return _total;
    }

    private _count_form_flags(): void {
        this._form_flags = {
            green: 0,
            yellow: 0,
            red: 0
        }

        for(let f of this._forms){
            this._form_flags.green += f.flag.green;
            this._form_flags.yellow += f.flag.yellow;
            this._form_flags.red += f.flag.red;
        }
    }
}

export class OfgsProject extends Tastypie.Model<OfgsProject> {
    public static resource = new Tastypie.Resource<OfgsProject>('doador-fundo/gs-project', {model: OfgsProject});
    public static resource_approve_stage = new Tastypie.Resource<{approved: boolean}>('doador-fundo/gs-project/<id>/approve-stage');
    public static resource_check_approve = new Tastypie.Resource<IProjectDealSchedule>('doador-fundo/gs-project/<id>/check-approve');
    public static resource_approve = new Tastypie.Resource<IProjectDealSchedule>('doador-fundo/gs-project/<id>/approve');

    public static resource_set_member_resp = new Tastypie.Resource<EvaluatorsData>(
        'doador-fundo/gs-project/<id>/set-stage-member-response', {model: EvaluatorsData}
    );

    public gs_id: number;
    public md_project: OngProjeto;
    public md_ong: Ong;
    public round_id: number;
    public stage_id: number;
    public approved: boolean;    
    public total_requested: number;
    public total_approved: number;
    public accept_partial: boolean;
    public forms: Array<GsFormResponse>;
    private _rs_views: Tastypie.Resource<OfgsProjectView>;
    private _rs_comments: Tastypie.Resource<OfgsProjectComment>;
    private _rs_finance_schedule: Tastypie.Resource<OfgsProjectFinanceSchedule>;
    private _summary: ProjectSummary;
    public dt_updated: string;
    public dt_created: string;

    constructor(obj?:any){
        super(OfgsProject.resource, obj);        
        this.forms = [];

        if(obj){
            if(obj.project) this.md_project = new OngProjeto(obj.project);
            if(obj.ong) this.md_ong = new Ong(obj.ong);            
            if(obj.forms){
                for(let form of obj.forms){
                    this.forms.push(new GsFormResponse(form));
                }
            }
            if(obj.summary) this._summary = new ProjectSummary(this.forms, obj.summary);
            if(obj.id){
                this._rs_views = new Tastypie.Resource<OfgsProjectView>(
                    OfgsProjectView.resource.endpoint,
                    {model: OfgsProjectView, defaults: {gs_project_id: obj.id}}
                );
                this._rs_comments = new Tastypie.Resource<OfgsProjectComment>(
                    OfgsProjectComment.resource.endpoint,
                    {model: OfgsProjectComment, defaults: {gs_project_id: obj.id}}
                );
                this._rs_finance_schedule = new Tastypie.Resource<OfgsProjectFinanceSchedule>(
                    OfgsProjectFinanceSchedule.resource.endpoint,
                    {model: OfgsProjectFinanceSchedule, defaults: {gs_project_id: obj.id}}
                );
            }
        }else{
            this.md_project = new OngProjeto();
            this.md_ong = new Ong();
            this._summary = new ProjectSummary(this.forms);
        }
    }

    public get rs_views(): Tastypie.Resource<OfgsProjectView> {
        return this._rs_views;
    }

    public get rs_comments(): Tastypie.Resource<OfgsProjectComment> {
        return this._rs_comments;
    }

    public get rs_finance_schedule(): Tastypie.Resource<OfgsProjectFinanceSchedule> {
        return this._rs_finance_schedule;
    }

    public get summary(): ProjectSummary {
        return this._summary;
    }

    public setStageMemberResponse(data: EvaluatorsData): Promise<EvaluatorsData> {
        return OfgsProject.resource_set_member_resp.objects.update(this.id, data);
    }

    public setView(): Promise<OfgsProjectView> {
        return this.rs_views.objects.create({gs_project_id: this.id});
    }

    public checkApprove(total_approved?: number): Promise<IProjectDealSchedule> {
        return OfgsProject.resource_check_approve.objects.get(this.id, {total_approved: total_approved || null});
    }

    public approve(data: IProjectDealSchedule, passw: string): Promise<IProjectDealSchedule> {
        data['passw'] = passw;
        return OfgsProject.resource_approve.objects.update(this.id, data);
    }

    public approveCurrentStage(passw: string): Promise<{approved: boolean}> {
        if(this.id){
            return OfgsProject.resource_approve_stage.objects.get(this.id, {passw: passw}).then((data) => {
                if(data.approved){
                    return this.refresh().then(() => {
                        return data;
                    });
                }else{
                    return data;
                }          
            });
        }else{
            return Promise.reject('GsProject not found');
        }
    }
}

export class OfgsProjectView extends Tastypie.Model<OfgsProjectView> {
    public static resource = new Tastypie.Resource<OfgsProjectView>('doador-fundo/gs-project-view', {model: OfgsProjectView});

    public gs_project_id: number;
    public md_doador: Doador;
    public dt_created: string;

    constructor(obj?:any){
        super(OfgsProjectView.resource, obj);
        if(obj){
            if(obj.doador) this.md_doador = new Doador(obj.doador);
        }
    }
}


export class OfgsProjectComment extends Tastypie.Model<OfgsProjectComment> {
    public static resource = new Tastypie.Resource<OfgsProjectComment>('doador-fundo/gs-project-comment', {model: OfgsProjectComment});

    public gs_project_id: number;
    public md_doador: Doador;
    public comment: string;
    public dt_updated: string;
    public dt_created: string;

    constructor(obj?:any){
        super(OfgsProjectComment.resource, obj);
        if(obj){
            if(obj.doador) this.md_doador = new Doador(obj.doador);
        }
    }
}


export class OfgsProjectFinanceSchedule extends Tastypie.Model<OfgsProjectFinanceSchedule> {
    public static resource = new Tastypie.Resource<OfgsProjectFinanceSchedule>('doador-fundo/gs-project-finance-schedule', {model: OfgsProjectFinanceSchedule});

    public gs_project_id: number;
    public amount: number;
    public status: string;
    public invoice_id: string;
    public dt_due_transfer: string;
    public dt_transfer: string;
    public dt_created: string;

    constructor(obj?:any){
        super(OfgsProjectFinanceSchedule.resource, obj);
    }
}
