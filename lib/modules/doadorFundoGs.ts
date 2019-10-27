// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>

import { Tastypie } from "ts-resource-tastypie";
import { OrgFund, OrgMember } from "./doadorFundo";
import { OrgFundGsRound } from "./doadorFundoGsRound";
import { GsForm, GsFormResponse } from "./doadorFundoGsForm";
import { Ong, OngProjeto } from "./ong";

export class OrgFundGs extends Tastypie.Model<OrgFundGs> {
    public static resource = new Tastypie.Resource<OrgFundGs>('doador-fundo/gs', {model: OrgFundGs});
    public static resource_get_member = new Tastypie.Resource<any>('doador-fundo/gs/<id>/get-member');
    public static resource_add_member = new Tastypie.Resource<any>('doador-fundo/gs/add-member');
    public static resource_delete_member = new Tastypie.Resource<any>('doador-fundo/gs/<id>/delete-member');
    public static resource_check_step = new Tastypie.Resource<any>('doador-fundo/gs/<id>/check-step');

    public org_fund_id: number;
    public name: string;
    public slug: string;
    public description: string;
    public logo: string;
    public credit_type: string;
    public currency: string;
    public currency_quote: number;
    public budget_limit: number;
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

    constructor(obj?:any){
        super(obj, OrgFundGsFormSubscribe.resource);
        this.forms = [];
        if(obj){
            if(obj.forms){
                for(let form of obj.forms){
                    this.forms.push(new GsForm(form));
                }
            }
        }
    }
}

export class OfgsProject extends Tastypie.Model<OfgsProject> {
    public static resource = new Tastypie.Resource<OfgsProject>('doador-fundo/gs-project', {model: OfgsProject});

    public gs_id: number;
    public md_project: OngProjeto;
    public md_ong: Ong;

    public total_requested: number;
    public total_approved: number;
    public accept_partial: boolean;
    public forms: Array<GsFormResponse>;

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
        }
    }
}
