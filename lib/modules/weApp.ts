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
    private _app_profile_id: number;
    private _initialized: boolean;

    constructor(app_token: string){
        this._doador = new Doador();
        this._empresa = new Empresa();
        this._org = new Org();
        this._ong = new Ong();
        this._app_token = app_token;
        this._app_profile_id = null;
        this._initialized = false;
    }

    public init(obj_filter:{id?: number, slug?: string}): Promise<AppProfile> {
        if(this._app_token == 'home'){
            return Doador.resource.objects.findOne(obj_filter).then(resp => {
                this._doador = resp;
                this._app_profile_id = resp.id;
                this._initialized = true;
                return this;
            });
        }else if(this._app_token == 'doador'){
            return Doador.resource.objects.findOne(obj_filter).then(resp => {
                this._doador = resp;
                this._app_profile_id = resp.id;
                this._initialized = true;
                return this;
            });
        }else if(this._app_token == 'doador_empresa'){
            return Empresa.resource.objects.findOne(obj_filter).then(resp => {
                this._empresa = resp;
                this._app_profile_id = resp.id;
                this._initialized = true;
                return this;
            });
        }else if(this._app_token == 'doador_fundo'){
            return Org.resource.objects.findOne(obj_filter).then(resp => {
                this._org = resp;
                this._app_profile_id = resp.id;
                this._initialized = true;
                return this;
            });
        }else if(this._app_token == 'ong'){
            return Ong.resource.objects.findOne(obj_filter).then(resp => {
                this._ong = resp;
                this._app_profile_id = resp.id;
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

    public get app_profile_id(): number {
        return this._app_profile_id;
    }

    public get initialized(): boolean {
        return this._initialized;
    }
}

export class AppManager {

    private _user: User;
    private _app_profile: AppProfile;
    private _app_token: string;
    private _route_app_home: string;
    private _route_account_new: string;
    private _route_account_list: string;
    private _route_landing_page: string;
    private _route_access_denied: string;
    private _route_page_not_found: string;
    private _fnc_change_route: any;

    constructor(
        setup: {
            env: string,
            app_token: string,
            fnc_change_route?: any,
            route_app_home?: string,
            route_account_new?: string,
            route_account_list?: string,
            route_landing_page?: string,
            route_access_denied?: string,
            route_page_not_found?: string
        }
    ){
        Environment.set(setup.env);
        this._app_token = setup.app_token;
        this._fnc_change_route = setup.fnc_change_route;
        this._route_app_home = (setup.route_app_home || "/");
        this._route_account_new = setup.route_account_new;
        this._route_account_list = setup.route_account_list;
        this._route_landing_page = setup.route_landing_page;
        this._route_access_denied = setup.route_access_denied;
        this._route_page_not_found = setup.route_page_not_found;
        this._app_profile = new AppProfile(setup.app_token);
    }

    public get token(): string {
        return this._app_token;
    }

    public get route_app_home(): string {
        return this._route_app_home;
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

    public get route_access_denied(): string {
        return this._route_access_denied;
    }

    public get route_page_not_found(): string {
        return this._route_page_not_found;
    }

    public get profile(): AppProfile {
        return this._app_profile;
    }

    public concatDomainSite(app_token: string, uri?: string): string {
        if(uri && !uri.startsWith("/")){
            uri = `/${uri}`;
        }
        return Environment.getDomainSite(app_token, uri);
    }

    public concatDomainApi(uri?: string): string {
        if(uri && !uri.startsWith("/")){
            uri = `/${uri}`;
        }
        return Tastypie.Provider.getDefault().concatDomain(uri);
    }

    public changeRoute(app_route: string, app_token?: string, next?:{app_route: string, app_token: string}): void {
        if(!app_route.startsWith("/")){
            app_route = `/${app_route}`;
        }

        if(!app_token || (app_token == this._app_token)){
            if(this._fnc_change_route){
              this._fnc_change_route([app_route]);
            }
        }else{

            if(next){
                app_route = `${app_route}?nextd=${next.app_token}&next=${next.app_route}`;
            }

            window.location.href = this.concatDomainSite(app_token, app_route);
        }
    }

    public quickLogin(auth?: {username: string, apikey: string}, kwargs?: any): Promise<boolean> {
        return this._user.quickLogin(auth, kwargs).then((user: User) => {
            return true;
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

    public authGuardMember(current_route: string): Promise<boolean> {
        if(this._user.is_authenticated && this._app_profile.initialized){
            return Promise.resolve(this.user_has_perm(['member']));
        }else{
            if(this._user.is_authenticated){
                return this._loading_app_profile_member();
            }else{
                return this._user.quickLogin().then(() => {
                    return this._loading_app_profile_member().then(resp => {
                        return resp;
                    })
                }).catch(() => {
                    return false;
                });
            }
        }
    }

    public user_has_perm(perm_token_list: Array<string>): boolean {
        return this._user.has_perm({
          app_token: this._app_token,
          app_profile_id: this._app_profile.app_profile_id,
          perm_token_list: perm_token_list
        });
    }

    private _loading_app_profile_member(): Promise<boolean> {
        if(!this._user.current_user_app){
            return Promise.resolve(false);
        }

        if(this._user.current_user_app.app_token != this._app_token){
            return Promise.resolve(false);
        }

        return this._app_profile.init({id: this._user.current_user_app.app_profile_id}).then((resp) => {
            return resp.initialized;
        }).catch(() => { return false;});
    }
}
