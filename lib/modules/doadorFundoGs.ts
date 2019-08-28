// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>

import { Tastypie } from "ts-resource-tastypie";
import { OrgFund, OrgFundMember } from "./doadorFundo";

export class OrgFundGs extends Tastypie.Model<OrgFundGs> {
    public static resource = new Tastypie.Resource<OrgFundGs>('doador-fundo-gs/gs', {model: OrgFundGs});
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

    private _rs_member: Tastypie.Resource<OfgsMember>;
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

            if(obj.id){
                this._rs_member = new Tastypie.Resource<OfgsMember>(
                    OfgsMember.resource.endpoint,
                    {model: OfgsMember, defaults: {gs_id: obj.id}}
                );
            }
        }
    }

    public get rs_member(): Tastypie.Resource<OfgsMember> {
        return this._rs_member;
    }

    public get categories(): Array<OrgGsCategory> {
        return this._categories;
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

export class OfgsMember extends Tastypie.Model<OfgsMember> {
    public static resource = new Tastypie.Resource<OfgsMember>('doador-fundo-gs/member', {model: OfgsMember});

    public gs_id: number;
    public member: OrgFundMember;
    public dt_created: string;

    constructor(obj?:any){
        super(OfgsMember.resource, obj);

        if(obj && obj.member){
            this.member = new OrgFundMember(obj.member);
        }
    }
}
