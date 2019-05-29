// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>

import * as api from "ts-resource-tastypie";
import { Doador } from "./doador"

export class Org extends api.Tastypie.Model<Org> {
    public static resource = new api.Tastypie.Resource<Org>('doador-fundo/profile', {model: Org});

    public activity: OrgActivity;
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

    constructor(obj?:any){
        super(Org.resource, obj);
    }
}

export class OrgActivity extends api.Tastypie.Model<OrgActivity> {
    public static resource = new api.Tastypie.Resource<OrgActivity>('doador-fundo/activity', {model: OrgActivity});

    public name: string;
    public dt_created: string;
    public dt_updated: string;

    constructor(obj?:any){
        super(OrgActivity.resource, obj);
    }
}

export class OrgAddress extends api.Tastypie.Model<OrgAddress> {
    public static resource = new api.Tastypie.Resource<OrgAddress>('doador-fundo/address', {model: OrgAddress});

    public org_id: number;
    public region: string;
    public number: string;
    public street: string;
    public complement: string;
    public district: string;
    public postcode: string;
    public city: string;
    public state: string;
    public country: string;
    public dt_created: string;
    public dt_updated: string;

    constructor(obj?:any){
        super(OrgAddress.resource, obj);
    }
}

export class OrgAdm extends api.Tastypie.Model<OrgAdm> {
    public static resource = new api.Tastypie.Resource<OrgAdm>('doador-fundo/adm', {model: OrgAdm});

    public org_id: number;
    public parent_id: number;
    public doador: Doador;
    public status: string;
    public invite_name: string;
    public invite_email: string;
    public dt_created: string;
    public dt_updated: string;

    constructor(obj?:any){
        super(OrgAdm.resource, obj);
    }
}
