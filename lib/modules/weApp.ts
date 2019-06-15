// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>

import { Tastypie } from "ts-resource-tastypie";
import { Environment } from "./config";
import { Tools } from "./utils";
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

export class AppDevice {
    public is_mobile: boolean;

    public app_site: {
        os: string,
        os_version: string,
        browser: string,
        browser_version: string,
        invite?: {source: string, slug: string}
    };

    public app_mobile: {
        registration_id: string,
        device_id: string,
        device_name: string,
        device_type: string,
        invite?: {source: string, slug: string}
    };

    constructor(device: {
        is_mobile: boolean,
        app_site?: {
            os: string,
            os_version: string,
            browser: string,
            browser_version: string,
            invite?: {source: string, slug: string}
        },
        app_mobile?: {
            registration_id: string,
            device_id: string,
            device_name: string,
            device_type: string,
            invite?: {source: string, slug: string}
        }
    }){
      this.is_mobile = device.is_mobile;
      if(device.app_site) this.app_site = device.app_site;
      if(device.app_mobile) this.app_mobile = device.app_mobile;
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
    private _device: AppDevice;

    constructor(
        setup: {
            env: string,
            app_token: string,
            device: AppDevice,
            fnc_change_route: any,
            route_app_home: string,
            route_account_new: string,
            route_access_denied: string,
            route_page_not_found: string,
            route_account_list?: string,
            route_landing_page?: string
        }
    ){
        Environment.set(setup.env);
        this._app_token = setup.app_token;
        this._device = setup.device;
        this._fnc_change_route = setup.fnc_change_route;
        this._route_app_home = setup.route_app_home;
        this._route_account_new = setup.route_account_new;
        this._route_access_denied = setup.route_access_denied;
        this._route_account_list = setup.route_account_list;
        this._route_landing_page = setup.route_landing_page;
        this._route_page_not_found = setup.route_page_not_found;
        this._app_profile = new AppProfile(setup.app_token);
    }

    public get token(): string {
        return this._app_token;
    }

    public get device(): AppDevice {
        return this._device;
    }

    public get route_app_home(): string {
        return this._route_app_home;
    }

    public get route_account_new(): string {
        return this._route_account_new;
    }

    public get route_access_denied(): string {
        return this._route_access_denied;
    }

    public get route_account_list(): string {
        return this._route_account_list;
    }

    public get route_landing_page(): string {
        return this._route_landing_page;
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

    public changeRoute(app_route: string, app_token?: string, kwargs?: any): void {

        if(!app_route.startsWith("/")){
            app_route = `/${app_route}`;
        }

        if(!app_token || (app_token == this._app_token)){
            if(this._fnc_change_route){
                if(kwargs.hasOwnProperty('next')){
                    app_route = `${app_route}/?nextd=${kwargs.next.app_token}/next=${kwargs.next.app_route}`;
                }
                this._fnc_change_route([app_route]);
            }
        }else{
            if(this._user.is_authenticated && app_token != 'home'){
                if(kwargs.hasOwnProperty('user_app_id')){
                    app_route = `/quick-login/${this._user.auth.username}/${this._user.auth.api_key}/${kwargs.user_app_id}?next=${app_route.substring(1)}`;
                }else{
                    app_route = `/quick-login/${this._user.auth.username}/${this._user.auth.api_key}?next=${app_route.substring(1)}`;
                }
            }else if(app_route == 'login' && app_token == 'home'){
                if(kwargs.hasOwnProperty('next')){
                    app_route = `/login/?nextd=${kwargs.next.app_token}/next=${kwargs.next.app_route}`;
                }else{
                    app_route = `/login/?nextd=${this._app_token}/next=/`;
                }
            }
            window.location.href = this.concatDomainSite(app_token, app_route);
        }
    }

    public changeApp(app_route: string, app_token: string, user_app_id: string){
        this.changeRoute(app_route=app_route, app_token=app_token, {user_app_id: user_app_id});
    }

    public quickLogin(auth: {username: string, apikey: string}, kwargs?: any): Promise<boolean> {
        return this._user.quickLogin(auth, this._get_source_login(kwargs)).then(() => {
            if(kwargs.hasOwnProperty('app_route')){
                this.changeRoute(kwargs.app_route);
            }else{
                this.changeRoute('/');
            }
            return true;
        }).catch(() => {
            if(kwargs.hasOwnProperty('app_route')){
                this.changeRoute('login', 'home', {next:{app_route: kwargs.app_route, app_token: this._app_token}});
            }else{
                this.changeRoute('login', 'home');
            }
            return false;
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

    public authGuardUser(current_app_route: string): Promise<boolean> {
        if(this._user.is_authenticated){
            return Promise.resolve(true);
        }else{
            return this._user.quickLogin().then(() => {
                return true;
            }).catch(() => {
                this.changeRoute('login', 'home', {next:{app_route: current_app_route, app_token: this._app_token}});
                return false;
            });
        }
    }

    public authGuardMember(current_app_route: string): Promise<boolean> {
        return this.authGuardUser(current_app_route).then((auth: boolean) => {
            if(auth){
                if(this._app_profile.initialized){
                    if(this.user_has_perm(['member'])){
                        return true;
                    }else{
                        this.changeRoute(this._route_access_denied);
                        return false;
                    }
                }else{
                    this._loading_app_profile_member().then((auth) => {
                        if(auth){
                            return true;
                        }else{
                            this.changeRoute(this._route_access_denied);
                            return false;
                        }
                    });
                }
            }else{
                return false;
            }
        });
    }

    public user_has_perm(perm_token_list: Array<string>): boolean {
        return this._user.has_perm({
            app_token: this._app_token,
            app_profile_id: this._app_profile.app_profile_id,
            perm_token_list: perm_token_list
        });
    }

    private _get_source_login(kwargs: any): any {
        let obj = {
            source: {
                app_name: Environment.getAppName(this._app_token),
                detail: (this._device.app_site || this._device.app_mobile || {})
            }
        }

        if(kwargs.hasOwnProperty('user_app_id')){
            obj['source']['detail']['user_app_id'] = kwargs.user_app_id;
        }

        if(Tools.localStorageSuported){
            let invite_string = localStorage.getItem('WelightInvite');
            if (invite_string) {
                let invite = JSON.parse(invite_string);
                if (invite.hasOwnProperty('source') && ['donator', 'ong', 'company'].indexOf(invite['source']) >= 0) {
                    kwargs.source.detail['invite'] = invite;
                    obj['source']['detail']['invite'] = invite;
                }
            }
        }

        return obj;
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
