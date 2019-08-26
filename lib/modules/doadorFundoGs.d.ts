import { Tastypie } from "ts-resource-tastypie";
import { OrgFund, OrgFundMember } from "./doadorFundo";
export declare class OrgFundGs extends Tastypie.Model<OrgFundGs> {
    static resource: Tastypie.Resource<OrgFundGs>;
    org_fund_id: number;
    name: string;
    slug: string;
    description: string;
    logo: string;
    credit_type: string;
    currency: string;
    budget_limit: number;
    contact_email: string;
    verified: boolean;
    private: boolean;
    published: boolean;
    dt_created: string;
    dt_updated: string;
    org_fund: OrgFund;
    product: OrgGsProduct;
    categories: Array<OrgGsCategory>;
    categories_id: Array<number>;
    constructor(obj?: any);
    save(obj?: any): Promise<OrgFundGs>;
    private _init;
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
export declare class OfgsMember extends Tastypie.Model<OfgsMember> {
    static resource: Tastypie.Resource<OfgsMember>;
    gs_id: number;
    member: OrgFundMember;
    dt_created: string;
    constructor(obj?: any);
}
