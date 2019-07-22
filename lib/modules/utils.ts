// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>

import { Tastypie } from "ts-resource-tastypie";
import { Environment } from "./config";
declare const InstallTrigger: any;
declare const chrome: any;

export class Tools {
    public static get localStorageSuported(): boolean {
          let test = 'test';
          try {
              localStorage.setItem(test, test);
              localStorage.removeItem(test);
              return true;
          } catch(e) {
              return false;
          }
    }

    public static setData(obj_from: any, obj_to: any): void {
        let properties: Array<string> = Tastypie.Tools.getProperties(obj_from);
        for(let propertie of properties){
            try {
                obj_to[propertie] = obj_from[propertie];
            }
            catch (e) {}
        }
    }
}

export class Banco extends Tastypie.Model<Banco> {

    public static resource = new Tastypie.Resource<Banco>('utils/banco', {model: Banco});

    public codigo: string;
    public nome: string;
    public sigla: string;
    public competencia: string;
    public website: string;
    public dt_updated: string;
    public dt_created: boolean;

    constructor(obj?:any){
      super(Banco.resource, obj);
    }
}

export class PluginNavegador {

    public instalado: boolean;

    constructor(obj?:any){
        this.instalado = false;
    }

    public instalarExtensaoChrome(): Promise<any> {
        let _self = this;
        return new Promise<any>(function(resolve, reject) {
            if(chrome){
                window.open('https://chrome.google.com/webstore/detail/welight/ghkiiifahcdlbeieldikdjheaokhajdi', '_blank');
                setTimeout(function() {
                    _self.instalado = true;
                    resolve(true);
                }, 5000);
                // chrome.webstore.install(
                //     'https://chrome.google.com/webstore/detail/ghkiiifahcdlbeieldikdjheaokhajdi',
                //     function(){
                //         clearTimeout(limitTimeInstall);
                //         _self.instalado = true;
                //         resolve(true);
                //     },
                //     function(error: any){
                //         clearTimeout(limitTimeInstall);
                //         _self.instalado = true;
                //         resolve(true);
                //     }
                // );
            }else{
                reject('chrome.webstore not found.');
            }

        });
    }

    public instalarExtensaoFirefox(): Promise<any> {
        let _self = this;
        return new Promise<any>(function(resolve, reject) {
            let limitTimeInstall = setTimeout(function() {
                resolve(true);
            }, 10000);
            let xpi = {'XPInstall Dialog Display Name': 'https://addons.mozilla.org/firefox/downloads/latest/welight/'};
            InstallTrigger.install(xpi, function(url:string, status:any){
                clearTimeout(limitTimeInstall);
                _self.instalado = true;
                resolve(true);
            });
        });
    }

    public notificarPlugin(user:{username:string, api_key:string}, doador:{nome:string, email:string, impacto_total:number}): void {
        let $wl_msg_profile = {user:user, doador:doador};
        let $wl_msg_event = new CustomEvent('$wl_msg_sendUserProfile', { 'detail': $wl_msg_profile });
        document.dispatchEvent($wl_msg_event);
    }
}

export class StyleUi {
    public font_family: string;
    public font_family_custom: string;
    public font_color: string;
    public font_size: number;
    public font_weight: string;
    public background_color: string;
    public border_width: number;
    public border_color: string;
    public border_type: string;
    public height: string;
    public width: string;
    public extra: any;

    constructor(obj?:any){
        if(obj){
            let _self = this;
            let properties: Array<string> = Tastypie.Tools.getProperties(obj);
            for(let propertie of properties){
                try {
                    _self[propertie] = obj[propertie];
                }
                catch (e) {}
            }
        }
    }
}

export class Address extends Tastypie.Model<Address> {

    public region: string;
    public number: string;
    public street: string;
    public complement: string;
    public district: string;
    public city: string;
    public state: string;
    public state_code: string;
    public country: string;
    public country_code: string;
    public postal_code: string;
    public geocode: string;
    public place_id: string;
    public dt_created: string;
    public dt_updated: string;

    private _geocode: Tastypie.Resource<any>;
    private _searching: boolean;

    constructor(resource: Tastypie.Resource<Address>, obj?: any) {
        super(resource, obj);

        this._geocode = new Tastypie.Resource<any>('geocode/json', {
            defaults: {key: Environment.getGoogleApiKey('geocode')},
            provider: "google-maps"
        });

        this._searching = false;
    }

    private _get_geocode_result(data: any): Array<Address> {
        let address_list:Array<Address> = [];

        if(data.status == "OK"){

            for(let add_temp of data.results){

                let obj_address = {
                    street_number: {},
                    route: {},
                    locality: {},
                    sublocality_level_1: {},
                    administrative_area_level_2: {},
                    administrative_area_level_1: {},
                    country: {},
                    postal_code: {}
                };

                for(let type in obj_address){
                    for(let component of add_temp.address_components){
                        let result = component.types.find((_obj: string) => _obj === type);

                        if(result){
                            obj_address[type] = component;
                            break;
                        }
                    }
                }

                address_list.push(new Address(this.resource, {
                    region: add_temp.formatted_address,
                    place_id: add_temp.place_id,
                    number: obj_address.street_number['long_name'],
                    street: obj_address.route['long_name'],
                    district: obj_address.sublocality_level_1['long_name'] || obj_address.locality['long_name'],
                    city: obj_address.administrative_area_level_2['long_name'],
                    state: obj_address.administrative_area_level_1['long_name'],
                    state_code: obj_address.administrative_area_level_1['short_name'],
                    country: obj_address.country['long_name'],
                    country_code: obj_address.country['short_name'],
                    postal_code: obj_address.postal_code['long_name']
                }));
            }

            if(address_list.length === 1){
                this.setData(address_list[0]);
            }
        }

        return address_list;
    }

    public search(obj:{address?: string, latlng?: string}): Promise<Array<Address>> {
        this._searching = true;
        return this._geocode.objects.findOne(obj, true).then((resp) => {
            let geocode_result = this._get_geocode_result(resp);
            this._searching = false;
            return geocode_result;
        }).catch(() => {
            this._searching = false;
            return [];
        });
    }

    public get searching(): boolean {
        return this._searching;
    }
}


export class Country extends Tastypie.Model<Country> {
    public static resource = new Tastypie.Resource<Country>('utils/l10n/country', {model: Country});

    public name: string;
    public code: string;

    constructor(obj?:any){
        super(Country.resource, obj);
    }
}

export class Currency extends Tastypie.Model<Currency> {
    public static resource = new Tastypie.Resource<Currency>('utils/l10n/currency', {model: Currency});

    public name: string;
    public code: string;

    constructor(obj?:any){
        super(Currency.resource, obj);
    }
}

export class CheckBoxManager {
    private _list: Array<number>;
    public onNgModel: any;

    constructor(){
        this.reset();
    }

    public reset(): void {
        this._list = [];
        this.onNgModel = {};
    }

    public check(p:Array<number>, checked: boolean): void {
        this.reset();
        for(let id of p){
            this.onNgModel[id] = checked;
        }
        this.onCheck();
    }

    public onCheck(): void {
        this._list = [];
        for(let id in this.onNgModel){
            if(this.onNgModel[id]) this._list.push(+id);
        }
    }

    public get checked(): Array<number> {
        return this._list;
    }
}
