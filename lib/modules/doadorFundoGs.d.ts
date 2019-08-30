import { Tastypie } from "ts-resource-tastypie";
import { OrgFund, OrgAuthGroup } from "./doadorFundo";
import { OrgFundGsRound } from "./doadorFundoGsRound";
export declare class OrgFundGs extends Tastypie.Model<OrgFundGs> {
    static resource: Tastypie.Resource<OrgFundGs>;
    static resource_get_member: Tastypie.Resource<any>;
    static resource_add_member: Tastypie.Resource<any>;
    static resource_delete_member: Tastypie.Resource<any>;
    static resource_check_step: Tastypie.Resource<any>;
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
    categories_id: Array<number>;
    private _categories;
    private _rs_round;
    constructor(obj?: any);
    save(obj?: any): Promise<OrgFundGs>;
    private _init;
    readonly rs_round: Tastypie.Resource<OrgFundGsRound>;
    readonly categories: Array<OrgGsCategory>;
    get_member(): Promise<OrgGsMember>;
    add_member(tokens_member: Array<string>, passw: string): Promise<OrgGsMember>;
    delete_member(token: string, passw: string): Promise<OrgGsMember>;
    check_step(): Promise<any>;
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
export declare class OrgMember {
    id: number;
    name: string;
    auth_group: Array<OrgAuthGroup>;
    auth_group_display: string;
    admin: boolean;
    token: string;
    constructor(obj?: any);
}
export declare class OrgGsMember {
    added_members: Array<OrgMember>;
    avaliable_members: Array<OrgMember>;
    constructor(obj?: any);
}
