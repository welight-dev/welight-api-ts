import * as api from "ts-resource-tastypie";
export declare class Tools {
    static readonly localStorageSuported: boolean;
}
export declare class Banco extends api.Tastypie.Model<Banco> {
    static resource: api.Tastypie.Resource<Banco>;
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
