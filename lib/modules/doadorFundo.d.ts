import { Tastypie } from "ts-resource-tastypie";
import { Doador } from "./doador";
import { Address } from "./utils";
export declare class Org extends Tastypie.Model<Org> {
    static resource: Tastypie.Resource<Org>;
    activity_id: number;
    name: string;
    email: string;
    registry: string;
    website: string;
    phone: string;
    logo: string;
    slug: string;
    currency: string;
    dt_created: string;
    dt_updated: string;
    private _adm;
    private _rs_category_fund;
    private _rs_activity;
    private _rs_fund;
    private _rs_fund_balance_source;
    private _rs_auth_group;
    private _activity;
    constructor(obj?: any);
    readonly rs_adm: Tastypie.Resource<OrgAdm>;
    readonly rs_fund: Tastypie.Resource<OrgFund>;
    readonly rs_fund_balance_source: Tastypie.Resource<OrgFundBalanceSource>;
    readonly rs_auth_group: Tastypie.Resource<OrgAuthGroup>;
    readonly rs_category_fund: Tastypie.Resource<OrgCategoryFund>;
    readonly rs_activity: Tastypie.Resource<OrgActivity>;
    readonly md_activity: OrgActivity;
    send_invite_adm(name: string, email: string, passw: string): Promise<OrgAdm>;
    getAddress(): Promise<OrgAddress>;
}
export declare class OrgActivity extends Tastypie.Model<OrgActivity> {
    static resource: Tastypie.Resource<OrgActivity>;
    name: string;
    dt_created: string;
    dt_updated: string;
    constructor(obj?: any);
}
export declare class OrgAddress extends Address {
    static resource: Tastypie.Resource<OrgAddress>;
    org_id: number;
    constructor(obj?: any);
}
export declare class OrgAdm extends Tastypie.Model<OrgAdm> {
    static resource: Tastypie.Resource<OrgAdm>;
    static resource_add: Tastypie.Resource<OrgAdm>;
    org_id: number;
    parent_id: number;
    doador: Doador;
    status: string;
    status_display: string;
    invite_name: string;
    invite_email: string;
    dt_created: string;
    dt_updated: string;
    constructor(obj?: any);
    static add(obj: {
        name: string;
        email: string;
        org_id: number;
        passw: string;
    }): Promise<OrgAdm>;
}
export declare class OrgCategoryFund extends Tastypie.Model<OrgCategoryFund> {
    static resource: Tastypie.Resource<OrgCategoryFund>;
    name: string;
    org_id: number;
    dt_created: string;
    dt_updated: string;
    constructor(obj?: any);
}
export interface OrgFundSummary {
    current_balance: number;
    qty_projects_pending: number;
    qty_projects_accepted: number;
    qty_projects_total: number;
    qty_giving_stream: number;
}
export declare class OrgFund extends Tastypie.Model<OrgFund> {
    static resource: Tastypie.Resource<OrgFund>;
    static resource_check_step: Tastypie.Resource<any>;
    org_id: number;
    name: string;
    logo: string;
    slug: string;
    description: string;
    country: string;
    currency: string;
    initial_credit: number;
    private: boolean;
    summary: OrgFundSummary;
    categories_id: Array<number>;
    dt_created: string;
    dt_updated: string;
    private _categories;
    private _rs_balance;
    private _rs_member;
    private _rs_category;
    constructor(obj?: any);
    save(): Promise<OrgFund>;
    private _init;
    readonly rs_balance: Tastypie.Resource<OrgFundBalance>;
    readonly rs_member: Tastypie.Resource<OrgFundMember>;
    readonly rs_category: Tastypie.Resource<OrgFundCategory>;
    readonly categories: Array<OrgCategoryFund>;
    add_credit(source_id: number, amount: number, passw: string): Promise<OrgFundBalance>;
    send_invite_member(name: string, email: string, auth_group_list: Array<number>, passw: string): Promise<OrgFundMember>;
    check_step(): Promise<any>;
}
export declare class OrgFundCategory extends Tastypie.Model<OrgFundCategory> {
    static resource: Tastypie.Resource<OrgFundCategory>;
    org_fund_id: number;
    category_id: number;
    constructor(obj?: any);
}
export declare class OrgFundMember extends Tastypie.Model<OrgFundMember> {
    static resource: Tastypie.Resource<OrgFundMember>;
    static resource_add: Tastypie.Resource<OrgFundMember>;
    org_fund_id: number;
    doador: Doador;
    status: string;
    status_display: string;
    invite_name: string;
    invite_email: string;
    dt_created: string;
    dt_updated: string;
    constructor(obj?: any);
    static add(obj: {
        name: string;
        email: string;
        org_fund_id: number;
        auth_group_list: Array<number>;
        passw: string;
    }): Promise<OrgFundMember>;
}
export declare class OrgFundBalanceSource extends Tastypie.Model<OrgFundBalanceSource> {
    static resource: Tastypie.Resource<OrgFundBalanceSource>;
    name: string;
    token: string;
    group: string;
    source_id: number;
    org_id: number;
    dt_created: string;
    dt_updated: string;
    constructor(obj?: any);
}
export declare class OrgFundBalance extends Tastypie.Model<OrgFundBalance> {
    static resource: Tastypie.Resource<OrgFundBalance>;
    static resource_add: Tastypie.Resource<OrgFundBalance>;
    org_fund_id: number;
    source_id: number;
    credit: boolean;
    amount: number;
    status: string;
    dt_created: string;
    dt_updated: string;
    private _md_source;
    private _md_credit_custom;
    constructor(obj?: any);
    static add_credit(obj: {
        org_fund_id: number;
        source_id: number;
        amount: number;
        passw: string;
    }): Promise<OrgFundBalance>;
    readonly md_source: OrgFundBalanceSource;
    readonly md_credit_custom: OrgFundBalanceCreditCustom;
}
export declare class OrgFundBalanceCreditCustom {
    user_id: number;
    user_name: string;
    user_email: string;
    dt_created: string;
    constructor(obj?: any);
}
export declare class OrgAuthGroup extends Tastypie.Model<OrgAuthGroup> {
    static resource: Tastypie.Resource<OrgAuthGroup>;
    org_id: number;
    name: string;
    permissions: Array<string>;
    dt_created: string;
    dt_updated: string;
    constructor(obj?: any);
}
