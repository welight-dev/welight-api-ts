import * as api from "ts-resource-tastypie";
import { Doador } from "./doador";
export declare class Org extends api.Tastypie.Model<Org> {
    static resource: api.Tastypie.Resource<Org>;
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
    constructor(obj?: any);
}
export declare class OrgActivity extends api.Tastypie.Model<OrgActivity> {
    static resource: api.Tastypie.Resource<OrgActivity>;
    name: string;
    dt_created: string;
    dt_updated: string;
    constructor(obj?: any);
}
export declare class OrgAddress extends api.Tastypie.Model<OrgAddress> {
    static resource: api.Tastypie.Resource<OrgAddress>;
    org_id: number;
    region: string;
    number: string;
    street: string;
    complement: string;
    district: string;
    postcode: string;
    city: string;
    state: string;
    country: string;
    dt_created: string;
    dt_updated: string;
    constructor(obj?: any);
}
export declare class OrgAdm extends api.Tastypie.Model<OrgAdm> {
    static resource: api.Tastypie.Resource<OrgAdm>;
    org_id: number;
    parent_id: number;
    doador: Doador;
    status: string;
    invite_name: string;
    invite_email: string;
    dt_created: string;
    dt_updated: string;
    constructor(obj?: any);
}
