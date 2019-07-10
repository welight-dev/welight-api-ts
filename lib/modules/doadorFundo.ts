// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>

import { Tastypie } from "ts-resource-tastypie";
import { Doador } from "./doador"
import { Address } from "./utils";

export class Org extends Tastypie.Model<Org> {
    public static resource = new Tastypie.Resource<Org>('doador-fundo/profile', {model: Org});

    public activity_id: number;
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

    private _adm: Tastypie.Resource<OrgAdm>;
    private _rs_activity : Tastypie.Resource<OrgActivity>;
    private _activity: OrgActivity;

    constructor(obj?:any){
        super(Org.resource, obj);

        if(!obj){
            obj = {};
        }

        if(obj.activity){
            this._activity = new OrgActivity(obj.activity);
        }else{
            this._activity = new OrgActivity();
        }

        if(obj.id){
            this._adm = new Tastypie.Resource<OrgAdm>(
                OrgAdm.resource.endpoint,
                {model: OrgAdm, defaults: {org_id: obj.id}}
            );
        }

        this._rs_activity = new Tastypie.Resource<OrgActivity>(
            OrgActivity.resource.endpoint,
            {model: OrgActivity, defaults: {org_id: obj.id || 0}}
        );
    }

    public get rs_adm(): Tastypie.Resource<OrgAdm> {
        return this._adm;
    }

    public get rs_activity(): Tastypie.Resource<OrgActivity> {
        return this._rs_activity;
    }

    public get md_activity(): OrgActivity {
        return this._activity;
    }

    public send_invite_adm(name: string, email: string, passw: string): Promise<OrgAdm> {
        if(this.id){
            return OrgAdm.add({org_id: this.id, name: name, email: email, passw: passw}).then(resp_adm =>{
                if(this._adm.page.initialized){
                    return this._adm.page.refresh().then(() => {
                        return resp_adm;
                    }).catch(() => {
                        return resp_adm;
                    });
                }else{
                    return resp_adm;
                }
            });
        }else{
            return Promise.reject('Org not found.');
        }
    }

    public getAddress(): Promise<OrgAddress> {
        if(this.id){
            return OrgAddress.resource.objects.findOne({org_id: this.id}).then((data) => {
                if(data && data.id){
                    return data;
                }else{
                    return new OrgAddress({org_id: this.id});
                }
            });
        }else{
            return Promise.resolve(new OrgAddress());
        }
    }
}

export class OrgActivity extends Tastypie.Model<OrgActivity> {
    public static resource = new Tastypie.Resource<OrgActivity>('doador-fundo/activity', {model: OrgActivity});

    public name: string;
    public dt_created: string;
    public dt_updated: string;

    constructor(obj?:any){
        super(OrgActivity.resource, obj);
    }
}

export class OrgAddress extends Address {

    public static resource = new Tastypie.Resource<OrgAddress>('doador-fundo/address', {model: OrgAddress});
    public org_id: number;

    constructor(obj?:any){
        super(OrgAddress.resource, obj);
    }
}

export class OrgAdm extends Tastypie.Model<OrgAdm> {
    public static resource = new Tastypie.Resource<OrgAdm>('doador-fundo/adm', {model: OrgAdm});
    public static resource_add = new Tastypie.Resource<OrgAdm>('doador-fundo/adm/add', {model: OrgAdm});

    public org_id: number;
    public parent_id: number;
    public doador: Doador;
    public status: string;
    public status_display: string;
    public invite_name: string;
    public invite_email: string;
    public dt_created: string;
    public dt_updated: string;

    constructor(obj?:any){
        super(OrgAdm.resource, obj);

        if(obj){
            if(obj.doador) this.doador = new Doador(obj.doador);
        }
    }

    public static add(obj: {name: string, email: string, org_id: number, passw: string}): Promise<OrgAdm> {
        return OrgAdm.resource_add.objects.create(obj);
    }
}


export class OrgCategoryFund extends Tastypie.Model<OrgCategoryFund> {
    public static resource = new Tastypie.Resource<OrgCategoryFund>('doador-fundo/category-fund', {model: OrgCategoryFund});

    public name: string;
    public org_id: number;
    public dt_created: string;
    public dt_updated: string;

    constructor(obj?:any){
        super(OrgCategoryFund.resource, obj);
    }
}


export class OrgFund extends Tastypie.Model<OrgFund> {
    public static resource = new Tastypie.Resource<OrgFund>('doador-fundo/fund', {model: OrgFund});

    public name: string;
    public logo: string;
    public slug: string;
    public description: string;
    public country: string;
    public currency: string;
    public dt_created: string;
    public dt_updated: string;

    constructor(obj?:any){
        super(OrgFund.resource, obj);
    }
}
