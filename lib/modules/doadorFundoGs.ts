// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>

import { Tastypie } from "ts-resource-tastypie";
import { OrgFund, OrgAuthGroup } from "./doadorFundo";

export class OrgFundGs extends Tastypie.Model<OrgFundGs> {
    public static resource = new Tastypie.Resource<OrgFundGs>('doador-fundo-gs/gs', {model: OrgFundGs});
    public static resource_get_member = new Tastypie.Resource<any>('doador-fundo-gs/gs/<id>/get-member');
    public static resource_add_member = new Tastypie.Resource<any>('doador-fundo-gs/gs/add-member');
    public static resource_delete_member = new Tastypie.Resource<any>('doador-fundo-gs/gs/<id>/delete-member');
    public static resource_check_step = new Tastypie.Resource<any>('doador-fundo-gs/gs/<id>/check-step');

    public org_fund_id: number;
    public name: string;
    public slug: string;
    public description: string;
    public logo: string;
    public credit_type: string;
    public currency: string;
    public budget_limit: number;
    public contact_email: string;
    public verified: boolean;
    public private: boolean;
    public published: boolean;
    public dt_created: string;
    public dt_updated: string;

    public org_fund: OrgFund;
    public product: OrgGsProduct;
    public categories_id: Array<number>;
    private _categories: Array<OrgGsCategory>;

    constructor(obj?:any){
        super(OrgFundGs.resource, obj);
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
        }
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

    public check_step(): Promise<any> {
        if(this.id){
            return OrgFundGs.resource_check_step.objects.get(this.id);
        }else{
            return Promise.reject('Giving stream not found');
        }
    }
}

export class OrgGsCategory extends Tastypie.Model<OrgGsCategory> {
    public static resource = new Tastypie.Resource<OrgGsCategory>('doador-fundo-gs/category', {model: OrgGsCategory});

    public org_id: number;
    public name: string;
    public slug: string;
    public dt_created: string;

    constructor(obj?:any){
        super(OrgGsCategory.resource, obj);
    }
}

export class OrgGsProduct extends Tastypie.Model<OrgGsProduct> {
    public static resource = new Tastypie.Resource<OrgGsProduct>('doador-fundo-gs/product', {model: OrgGsProduct});

    public org_id: number;
    public name: string;
    public slug: string;
    public amount: number;
    public dt_created: string;

    constructor(obj?:any){
        super(OrgGsProduct.resource, obj);
    }
}

export class OrgMember {
    public id: number;
    public name: string;
    public auth_group: Array<OrgAuthGroup>;
    public auth_group_display: string;
    public admin: boolean;
    public token: string;

    constructor(obj?:any){
        this.auth_group = [];
        if(obj && obj.auth_group){
            for(let group of obj.auth_group){
                this.auth_group.push(new OrgAuthGroup(group));
            }
        }
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
