// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>

import { Tastypie } from "ts-resource-tastypie";
import { OrgFund, OrgFundMember } from "./doadorFundo";

export class OrgFundGs extends Tastypie.Model<OrgFundGs> {
    public static resource = new Tastypie.Resource<OrgFundGs>('doador-fundo-gs/gs', {model: OrgFundGs});

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
    public categories: Array<OrgGsCategory>;
    public categories_id: Array<number>;

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
        this.categories = [];

        if(!this.categories_id){
            this.categories_id = [];
        }

        if(obj){
            if(obj.org_fund) this.org_fund = new OrgFund(obj.org_fund);
            if(obj.product) this.product = new OrgGsProduct(obj.product);
            if(obj.categories){
              for(let category of obj.categories){
                  this.categories.push(new OrgGsCategory(category));
              }
            }
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
