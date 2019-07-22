import { Tastypie } from "ts-resource-tastypie";
export declare class Tools {
    static readonly localStorageSuported: boolean;
    static setData(obj_from: any, obj_to: any): void;
}
export declare class Banco extends Tastypie.Model<Banco> {
    static resource: Tastypie.Resource<Banco>;
    codigo: string;
    nome: string;
    sigla: string;
    competencia: string;
    website: string;
    dt_updated: string;
    dt_created: boolean;
    constructor(obj?: any);
}
export declare class PluginNavegador {
    instalado: boolean;
    constructor(obj?: any);
    instalarExtensaoChrome(): Promise<any>;
    instalarExtensaoFirefox(): Promise<any>;
    notificarPlugin(user: {
        username: string;
        api_key: string;
    }, doador: {
        nome: string;
        email: string;
        impacto_total: number;
    }): void;
}
export declare class StyleUi {
    font_family: string;
    font_family_custom: string;
    font_color: string;
    font_size: number;
    font_weight: string;
    background_color: string;
    border_width: number;
    border_color: string;
    border_type: string;
    height: string;
    width: string;
    extra: any;
    constructor(obj?: any);
}
export declare class Address extends Tastypie.Model<Address> {
    region: string;
    number: string;
    street: string;
    complement: string;
    district: string;
    city: string;
    state: string;
    state_code: string;
    country: string;
    country_code: string;
    postal_code: string;
    geocode: string;
    place_id: string;
    dt_created: string;
    dt_updated: string;
    private _geocode;
    private _searching;
    constructor(resource: Tastypie.Resource<Address>, obj?: any);
    private _get_geocode_result;
    search(obj: {
        address?: string;
        latlng?: string;
    }): Promise<Array<Address>>;
    readonly searching: boolean;
}
export declare class Country extends Tastypie.Model<Country> {
    static resource: Tastypie.Resource<Country>;
    name: string;
    code: string;
    constructor(obj?: any);
}
export declare class Currency extends Tastypie.Model<Currency> {
    static resource: Tastypie.Resource<Currency>;
    name: string;
    code: string;
    constructor(obj?: any);
}
export declare class CheckBoxManager {
    private _list;
    onNgModel: any;
    constructor();
    reset(): void;
    check(p: Array<number>, checked: boolean): void;
    onCheck(): void;
    readonly checked: Array<number>;
}
