import { Tastypie } from "ts-resource-tastypie";
import { OrgFund, OrgMember } from "./doadorFundo";
import { OrgFundGsRound } from "./doadorFundoGsRound";
import { GsForm, GsFormResponse } from "./doadorFundoGsForm";
import { Ong, OngProjeto } from "./ong";
import { Doador } from "./doador";
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
export declare class OfgsProject extends Tastypie.Model<OfgsProject> {
    static resource: Tastypie.Resource<OfgsProject>;
    gs_id: number;
    md_project: OngProjeto;
    md_ong: Ong;
    total_requested: number;
    total_approved: number;
    accept_partial: boolean;
    forms: Array<GsFormResponse>;
    private _rs_comments;
    dt_updated: string;
    dt_created: string;
    constructor(obj?: any);
    get rs_comments(): Tastypie.Resource<OfgsProjectComment>;
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
