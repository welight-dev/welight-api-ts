// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>

import { Tastypie } from "ts-resource-tastypie";
import { Doador } from "./doador"
import { Address } from "./utils";

export class Org extends Tastypie.Model<Org> {
    public static resource = new Tastypie.Resource<Org>('doador-fundo/profile', {model: Org});

    public activity_id: number;
    public name: string;
    public email: string;
    public registry: string;
    public website: string;
    public phone: string;
    public logo: string;
    public slug: string;
    public currency: string;
    public dt_created: string;
    public dt_updated: string;

    private _adm: Tastypie.Resource<OrgAdm>;
    private _rs_category_fund: Tastypie.Resource<OrgCategoryFund>;
    private _rs_activity : Tastypie.Resource<OrgActivity>;
    private _rs_fund: Tastypie.Resource<OrgFund>;
    private _rs_fund_balance_source: Tastypie.Resource<OrgFundBalanceSource>;
    private _rs_auth_group: Tastypie.Resource<OrgAuthGroup>;
    private _activity: OrgActivity;

    constructor(obj?:any){
        super(Org.resource, obj);

        if(!obj){
            obj = {};
        }

        if(obj.activity){
            this._activity = new OrgActivity(obj.activity);
        }else{
            this._activity = new OrgActivity();
        }

        if(obj.id){
            this._adm = new Tastypie.Resource<OrgAdm>(
                OrgAdm.resource.endpoint,
                {model: OrgAdm, defaults: {org_id: obj.id}}
            );
            this._rs_fund = new Tastypie.Resource<OrgFund>(
                OrgFund.resource.endpoint,
                {model: OrgFund, defaults: {org_id: obj.id}}
            );
            this._rs_fund_balance_source = new Tastypie.Resource<OrgFundBalanceSource>(
                OrgFundBalanceSource.resource.endpoint,
                {model: OrgFundBalanceSource, defaults: {org_id: obj.id}}
            );
            this._rs_auth_group = new Tastypie.Resource<OrgAuthGroup>(
                OrgAuthGroup.resource.endpoint,
                {model: OrgAuthGroup, defaults: {org_id: obj.id}}
            );
        }

        this._rs_activity = new Tastypie.Resource<OrgActivity>(
            OrgActivity.resource.endpoint,
            {model: OrgActivity, defaults: {org_id: obj.id || 0}}
        );

        this._rs_category_fund = new Tastypie.Resource<OrgCategoryFund>(
            OrgCategoryFund.resource.endpoint,
            {model: OrgCategoryFund, defaults: {org_id: obj.id || 0}}
        );
    }

    public get rs_adm(): Tastypie.Resource<OrgAdm> {
        return this._adm;
    }

    public get rs_fund(): Tastypie.Resource<OrgFund> {
        return this._rs_fund;
    }

    public get rs_fund_balance_source(): Tastypie.Resource<OrgFundBalanceSource> {
        return this._rs_fund_balance_source;
    }

    public get rs_auth_group(): Tastypie.Resource<OrgAuthGroup> {
        return this._rs_auth_group;
    }

    public get rs_category_fund(): Tastypie.Resource<OrgCategoryFund> {
        return this._rs_category_fund;
    }

    public get rs_activity(): Tastypie.Resource<OrgActivity> {
        return this._rs_activity;
    }

    public get md_activity(): OrgActivity {
        return this._activity;
    }

    public send_invite_adm(name: string, email: string, passw: string): Promise<OrgAdm> {
        if(this.id){
            return OrgAdm.add({org_id: this.id, name: name, email: email, passw: passw}).then(resp_adm =>{
                if(this._adm.page.initialized){
                    return this._adm.page.refresh().then(() => {
                        return resp_adm;
                    }).catch(() => {
                        return resp_adm;
                    });
                }else{
                    return resp_adm;
                }
            });
        }else{
            return Promise.reject('Org not found.');
        }
    }

    public getAddress(): Promise<OrgAddress> {
        if(this.id){
            return OrgAddress.resource.objects.findOne({org_id: this.id}).then((data) => {
                if(data && data.id){
                    return data;
                }else{
                    return new OrgAddress({org_id: this.id});
                }
            });
        }else{
            return Promise.resolve(new OrgAddress());
        }
    }
}

export class OrgActivity extends Tastypie.Model<OrgActivity> {
    public static resource = new Tastypie.Resource<OrgActivity>('doador-fundo/activity', {model: OrgActivity});

    public name: string;
    public dt_created: string;
    public dt_updated: string;

    constructor(obj?:any){
        super(OrgActivity.resource, obj);
    }
}

export class OrgAddress extends Address {

    public static resource = new Tastypie.Resource<OrgAddress>('doador-fundo/address', {model: OrgAddress});
    public org_id: number;

    constructor(obj?:any){
        super(OrgAddress.resource, obj);
    }
}


export class OrgAdmInvited extends Tastypie.Model<OrgAdmInvited> {

    public static resource = new Tastypie.Resource<OrgAdmInvited>('doador-fundo/adm/accept', {model: OrgAdmInvited});
    public org: Org;
    public moderator: OrgAdm;
    public invited: OrgAdm;
    public has_user: boolean;
    public username: string;
    public apikey: string;
    public user_app_id: number;

    constructor(obj?:any){
        super(OrgAdmInvited.resource, obj);

        if(obj){
            if(obj.org) this.org = new Org(obj.org);
            if(obj.moderator) this.moderator = new OrgAdm(obj.moderator);
            if(obj.invited) this.invited = new OrgAdm(obj.invited);
        }
    }
}


export class OrgAdmVote extends Tastypie.Model<OrgAdmVote> {

    public static resource = new Tastypie.Resource<OrgAdmVote>('doador-fundo/adm/vote', {model: OrgAdmVote});
    public invited: OrgAdm;
    public status: string;

    constructor(obj?:any){
        super(OrgAdmVote.resource, obj);

        if(obj){
            if(obj.invited) this.invited = new OrgAdm(obj.invited);
        }
    }
}


export class OrgAdm extends Tastypie.Model<OrgAdm> {
    public static resource = new Tastypie.Resource<OrgAdm>('doador-fundo/adm', {model: OrgAdm});
    public static resource_add = new Tastypie.Resource<OrgAdm>('doador-fundo/adm/add', {model: OrgAdm});

    public org_id: number;
    public parent_id: number;
    public doador: Doador;
    public status: string;
    public status_display: string;
    public invite_name: string;
    public invite_email: string;
    public dt_created: string;
    public dt_updated: string;

    constructor(obj?:any){
        super(OrgAdm.resource, obj);

        if(obj){
            if(obj.doador) this.doador = new Doador(obj.doador);
        }
    }

    public static add(obj: {name: string, email: string, org_id: number, passw: string}): Promise<OrgAdm> {
        return OrgAdm.resource_add.objects.create(obj);
    }

    public static accept(obj: {name: string, email: string, org_id: number, passw: string}): Promise<any> {
        return OrgAdm.resource_add.objects.create(obj);
    }
}


export class OrgCategoryFund extends Tastypie.Model<OrgCategoryFund> {
    public static resource = new Tastypie.Resource<OrgCategoryFund>('doador-fundo/category-fund', {model: OrgCategoryFund});

    public name: string;
    public org_id: number;
    public dt_created: string;
    public dt_updated: string;

    constructor(obj?:any){
        super(OrgCategoryFund.resource, obj);
    }
}

export interface OrgFundSummary {
    current_balance: number,
    qty_projects_pending: number,
    qty_projects_accepted: number,
    qty_projects_total: number,
    qty_giving_stream: number
}

export class OrgFund extends Tastypie.Model<OrgFund> {
    public static resource = new Tastypie.Resource<OrgFund>('doador-fundo/fund', {model: OrgFund});
    public static resource_check_step = new Tastypie.Resource<any>('doador-fundo/fund/<id>/check-step');

    public org_id: number;
    public name: string;
    public logo: string;
    public slug: string;
    public description: string;
    public country: string;
    public currency: string;
    public initial_credit: number;
    public private: boolean;
    public summary: OrgFundSummary;
    public categories_id: Array<number>;
    public dt_created: string;
    public dt_updated: string;

    private _categories: Array<OrgCategoryFund>;
    private _rs_balance: Tastypie.Resource<OrgFundBalance>;
    private _rs_member: Tastypie.Resource<OrgFundMember>;
    private _rs_category: Tastypie.Resource<OrgFundCategory>;

    constructor(obj?:any){
        super(OrgFund.resource, obj);
        this._init(obj);
    }

    public save(): Promise<OrgFund> {
        return super.save().then((obj) => {
            this._init(obj);
            return this;
        })
    }

    private _init(obj?:any): void {
        this._categories = [];

        if(!this.categories_id){
            this.categories_id = [];
        }

        if(!this.summary){
            this.summary = {
                current_balance: 0.00,
                qty_projects_pending: 0,
                qty_projects_accepted: 0,
                qty_projects_total: 0,
                qty_giving_stream: 0
            }
        }

        if(obj){
            if(obj.id){
                this._rs_balance = new Tastypie.Resource<OrgFundBalance>(
                    OrgFundBalance.resource.endpoint,
                    {model: OrgFundBalance, defaults: {org_fund_id: obj.id}}
                );
                this._rs_member = new Tastypie.Resource<OrgFundMember>(
                    OrgFundMember.resource.endpoint,
                    {model: OrgFundMember, defaults: {org_fund_id: obj.id}}
                );
                this._rs_category = new Tastypie.Resource<OrgFundCategory>(
                    OrgFundCategory.resource.endpoint,
                    {model: OrgFundCategory, defaults: {org_fund_id: obj.id}}
                );
            }

            if(obj.categories){
                for(let cat of obj.categories){
                    this._categories.push(new OrgCategoryFund(cat));
                }
            }
        }
    }

    public get rs_balance(): Tastypie.Resource<OrgFundBalance> {
        return this._rs_balance;
    }

    public get rs_member(): Tastypie.Resource<OrgFundMember> {
        return this._rs_member;
    }

    public get rs_category(): Tastypie.Resource<OrgFundCategory> {
        return this._rs_category;
    }

    public get categories(): Array<OrgCategoryFund> {
        return this._categories;
    }

    public add_credit(source_id: number, amount: number, passw: string): Promise<OrgFundBalance> {
        if(this.id){
            return OrgFundBalance.add_credit({
                org_fund_id: this.id,
                source_id: source_id,
                amount: amount,
                passw: passw
            }).then(resp_balance => {
                if(this._rs_balance.page.initialized){
                    return this._rs_balance.page.refresh().then(() => {
                        this.refresh();
                        return resp_balance;
                    }).catch(() => {
                        return resp_balance;
                    });
                }else{
                    return resp_balance;
                }
            });
        }else{
            return Promise.reject('Fund not found.');
        }
    }

    public send_invite_member(name: string, email: string, auth_group_list: Array<number>, passw: string): Promise<OrgFundMember> {
        if(this.id){
            return OrgFundMember.add({
                org_fund_id: this.id,
                name: name,
                email: email,
                auth_group_list: auth_group_list,
                passw: passw
            }).then(resp_member => {
                if(this._rs_member.page.initialized){
                    return this._rs_member.page.refresh().then(() => {
                        return resp_member;
                    }).catch(() => {
                        return resp_member;
                    });
                }else{
                    return resp_member;
                }
            });
        }else{
            return Promise.reject('Fund not found.');
        }
    }

    public check_step(): Promise<any> {
        if(this.id){
            return OrgFund.resource_check_step.objects.get(this.id);
        }else{
            return Promise.reject('Fund not found.');
        }
    }
}

export class OrgFundCategory extends Tastypie.Model<OrgFundCategory> {
    public static resource = new Tastypie.Resource<OrgFundCategory>('doador-fundo/fund-category', {model: OrgFundCategory});

    public org_fund_id: number;
    public category_id: number;

    constructor(obj?:any){
        super(OrgFundCategory.resource, obj);
    }
}

export class OrgFundMember extends Tastypie.Model<OrgFundMember> {
    public static resource = new Tastypie.Resource<OrgFundMember>('doador-fundo/fund-member', {model: OrgFundMember});
    public static resource_add = new Tastypie.Resource<OrgFundMember>('doador-fundo/fund-member/add', {model: OrgFundMember});

    public org_fund_id: number;
    public doador: Doador;
    public status: string;
    public status_display: string;
    public invite_name: string;
    public invite_email: string;
    public dt_created: string;
    public dt_updated: string;
    public permissions: Array<OrgAuthGroup>;

    constructor(obj?:any){
        super(OrgFundMember.resource, obj);
        this.permissions = [];

        if(obj){
            if(obj.doador) this.doador = new Doador(obj.doador);

            if(obj.permissions){
                for(let perm of obj.permissions){
                    this.permissions.push(new OrgAuthGroup(perm));
                }
            }
        }
    }

    public static add(obj: {name: string, email: string, org_fund_id: number, auth_group_list: Array<number>, passw: string}): Promise<OrgFundMember> {
        return OrgFundMember.resource_add.objects.create(obj);
    }
}

export class OrgFundBalanceSource extends Tastypie.Model<OrgFundBalanceSource> {
    public static resource = new Tastypie.Resource<OrgFundBalanceSource>('doador-fundo/balance-source', {model: OrgFundBalanceSource});

    public name: string;
    public token: string;
    public group: string;
    public source_id: number;
    public org_id: number;
    public dt_created: string;
    public dt_updated: string;

    constructor(obj?:any){
        super(OrgFundBalanceSource.resource, obj);
    }
}

export class OrgFundBalance extends Tastypie.Model<OrgFundBalance> {
    public static resource = new Tastypie.Resource<OrgFundBalance>(
      'doador-fundo/balance', {model: OrgFundBalance}
    );

    public static resource_add = new Tastypie.Resource<OrgFundBalance>(
      'doador-fundo/balance/add-credit', {model: OrgFundBalance}
    );

    public org_fund_id: number;
    public source_id: number;
    public credit: boolean;
    public amount: number;
    public status: string;
    public dt_created: string;
    public dt_updated: string;

    private _md_source: OrgFundBalanceSource;
    private _md_credit_custom: OrgFundBalanceCreditCustom;

    constructor(obj?:any){
        super(OrgFundBalance.resource, obj);

        if(obj){
            if(obj.source)
                this._md_source = new OrgFundBalanceSource(obj.source);
            if(obj.credit_custom)
                this._md_credit_custom = new OrgFundBalanceCreditCustom(obj.credit_custom);
        }
    }

    public static add_credit(obj: {
        org_fund_id: number,
        source_id: number,
        amount: number,
        passw: string
    }): Promise<OrgFundBalance> {
        return OrgFundBalance.resource_add.objects.create(obj);
    }

    public get md_source(): OrgFundBalanceSource {
        return this._md_source;
    }

    public get md_credit_custom(): OrgFundBalanceCreditCustom {
        return this._md_credit_custom;
    }
}

export class OrgFundBalanceCreditCustom {

    public user_id: number;
    public user_name: string;
    public user_email: string;
    public dt_created: string;

    constructor(obj?:any){
        if(obj){
            this.user_id = obj.user_id;
            this.user_name = obj.user_name;
            this.user_email = obj.user_email;
            this.dt_created = obj.dt_created;
        }
    }
}

export class OrgAuthGroup extends Tastypie.Model<OrgAuthGroup> {
    public static resource = new Tastypie.Resource<OrgAuthGroup>('doador-fundo/auth-group', {model: OrgAuthGroup});

    public org_id: number;
    public name: string;
    public permissions: Array<string>;
    public dt_created: string;
    public dt_updated: string;

    constructor(obj?:any){
        super(OrgAuthGroup.resource, obj);
    }
}
