import { Tastypie } from "ts-resource-tastypie";
import { Doador } from "./doador";
import { Address } from "./utils";
export declare class Org extends Tastypie.Model<Org> {
    static resource: Tastypie.Resource<Org>;
    activity: OrgActivity;
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
    constructor(obj?: any);
    readonly adm: Tastypie.Resource<OrgAdm>;
    send_invite_adm(name: string, email: string): Promise<OrgAdm>;
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
    invite_name: string;
    invite_email: string;
    dt_created: string;
    dt_updated: string;
    constructor(obj?: any);
    static add(obj: {
        name: string;
        email: string;
        org_id: number;
    }): Promise<OrgAdm>;
}
