// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>

import { Tastypie } from "ts-resource-tastypie";
import { Environment } from "./config";
import { User } from "./weAuth";
import { Doador } from "./doador";
import { Empresa } from "./doadorEmpresa";
import { Org } from "./doadorFundo";
import { Ong } from "./ong";

export { Tastypie };

export class AppProfile {

    private _doador: Doador;
    private _empresa: Empresa;
    private _org: Org;
    private _ong: Ong;
    private _app_token: string;
    private _initialized: boolean;

    constructor(app_token: string){
        this._doador = new Doador();
        this._empresa = new Empresa();
        this._org = new Org();
        this._ong = new Ong();
        this._app_token = app_token;
        this._initialized = false;
    }

    public init(obj_filter:{id?: number, slug?: string}): Promise<AppProfile> {
        if(this._app_token == 'doador'){
            return Doador.resource.objects.findOne(obj_filter).then(resp => {
                this._doador = resp;
                this._initialized = true;
                return this;
            });
        }else if(this._app_token == 'doador_empresa'){
            return Empresa.resource.objects.findOne(obj_filter).then(resp => {
                this._empresa = resp;
                this._initialized = true;
                return this;
            });
        }else if(this._app_token == 'doador_fundo'){
            return Org.resource.objects.findOne(obj_filter).then(resp => {
                this._org = resp;
                this._initialized = true;
                return this;
            });
        }else if(this._app_token == 'ong'){
            return Ong.resource.objects.findOne(obj_filter).then(resp => {
                this._ong = resp;
                this._initialized = true;
                return this;
            });
        }else{
            Promise.reject('invalid app_token');
        }
    }

    public get doador(): Doador {
        return this._doador;
    }

    public get empresa(): Empresa {
        return this._empresa;
    }

    public get org(): Org {
        return this._org;
    }

    public get ong(): Ong {
        return this._ong;
    }

    public get app_token(): string {
        return this._app_token;
    }

    public get initialized(): boolean {
        return this._initialized;
    }
}

export class AppManager {

    private _user: User;
    private _app_profile: AppProfile;
    private _app_token: string;
    private _route_account_new: string;
    private _route_account_list: string;
    private _route_landing_page: string;

    constructor(
        setup: {
          env: string,
          app_token: string,
          route_account_new?: string,
          route_account_list?: string,
          route_landing_page?: string
        }
    ){
        Environment.set(setup.env);
        this._app_token = setup.app_token;
        this._route_account_new = setup.route_account_new;
        this._route_account_list = setup.route_account_list;
        this._route_landing_page = setup.route_landing_page;
        this._app_profile = new AppProfile(setup.app_token);
    }

    public get token(): string {
        return this._app_token;
    }

    public get route_account_new(): string {
        return this._route_account_new;
    }

    public get route_account_list(): string {
        return this._route_account_list;
    }

    public get route_landing_page(): string {
        return this._route_landing_page;
    }

    public get profile(): AppProfile {
        return this._app_profile;
    }

    public quickLogin(auth?:{username: string, apikey: string}, kwargs?:any): Promise<AppManager> {
        return this._user.quickLogin(auth, kwargs).then((user: User) => {
            return this;
        });
    }

    public authGuardPublic(): Promise<boolean> {
        if(this._user.is_authenticated){
            return Promise.resolve(true);
        }else{
            return this._user.quickLogin().then(() => {
                return true;
            }).catch(() => {
                return true;
            });
        }
    }

    public authGuardUser(): Promise<boolean> {
        if(this._user.is_authenticated){
            return Promise.resolve(true);
        }else{
            return this._user.quickLogin().then(() => {
                return true;
            }).catch(() => {
                return false;
            });
        }
    }
}
