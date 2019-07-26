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
        this._app_token = app_token;
        this.reset();
    }

    public reset(): void {
        this._doador = new Doador();
        this._empresa = new Empresa();
        this._org = new Org();
        this._ong = new Ong();
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

export class AppRoute {
    private _app_manager: AppManager;
    private _fnc_change_route: any;
    private _uri: {
        home: string,
        landing_page: string,
        account: string,
        account_new: string,
        account_list: string,
        access_denied: string,
        not_found: string
    }

    constructor(
        app_manager: AppManager,
        fnc_change_route: any,
        uri:{
          home: string,
          landing_page: string,
          account: string,
          account_new: string,
          account_list: string,
          access_denied: string,
          not_found: string
        }
    ){
        this._app_manager = app_manager;
        this._fnc_change_route = fnc_change_route;
        this._uri = uri;
        for(let key in this._uri){
            this._uri[key] = this._check_uri_slash(this._uri[key]);
        }
    }

    private _check_uri_slash(uri: string): string {
        if(!uri.startsWith("/")){
            return `/${uri}`;
        }
        return uri;
    }

    public get uri(): {
        home: string,
        landing_page: string,
        account: string,
        account_new: string,
        account_list: string,
        access_denied: string,
        not_found: string
    } {
      return this._uri;
    }

    public concatDomainSite(app_token: string, uri?: string): string {
        return Environment.getDomainSite(app_token, this._check_uri_slash(uri));
    }

    public concatDomainApi(uri: string): string {
        if(!uri){
            return "";
        }

        return Tastypie.Provider.getDefault().concatDomain(this._check_uri_slash(uri));
    }

    public change(app_route: string, app_token?: string, kwargs?: any): void {

        app_route = this._check_uri_slash(app_route);

        if(!kwargs){
            kwargs = {};
        }

        if(kwargs.hasOwnProperty('next')){
            if(kwargs.next.app_route.startsWith("/")){
                kwargs.next.app_route = kwargs.next.app_route.substring(1);
            }
        }

        if((!app_token || (app_token == this._app_manager.app_token)) && !kwargs.hasOwnProperty('user_app_id')){
            if(this._fnc_change_route){
                if(kwargs.hasOwnProperty('next')){
                    app_route = `${app_route}/?nextd=${kwargs.next.app_token}&next=${kwargs.next.app_route}`;
                }
                this._fnc_change_route(app_route);
            }
        }else{
            if(this._app_manager.user.is_authenticated && app_token != 'home'){
                if(kwargs.hasOwnProperty('user_app_id')){
                    app_route = `/quick-login/${this._app_manager.user.auth.username}/${this._app_manager.user.auth.api_key}/${kwargs.user_app_id}?next=${app_route.substring(1)}`;
                }else{
                    app_route = `/quick-login/${this._app_manager.user.auth.username}/${this._app_manager.user.auth.api_key}?next=${app_route.substring(1)}`;
                }
            }else if(app_route == '/login' && app_token == 'home'){
                if(kwargs.hasOwnProperty('next')){
                    if(kwargs.hasOwnProperty('user_app_id')){
                        app_route = `/login/?nextd=${kwargs.next.app_token}&next=${kwargs.next.app_route}&nextp=${kwargs.user_app_id}`;
                    }else{
                        app_route = `/login/?nextd=${kwargs.next.app_token}&next=${kwargs.next.app_route}`;
                    }
                }else{
                    if(kwargs.hasOwnProperty('user_app_id')){
                        app_route = `/login/?nextd=${this._app_manager.app_token}&nextp=${kwargs.user_app_id}`;
                    }else{
                        app_route = `/login/?nextd=${this._app_manager.app_token}`;
                    }
                }
            }
            window.location.href = this.concatDomainSite(app_token, app_route);
        }
    }
}

export class AppManager {

    private _user: User;
    private _app_profile: AppProfile;
    private _app_token: string;
    private _device: AppDevice;
    private _route: AppRoute;
    private _auth_loading: boolean;
    private _create_account_loading: boolean;
    private _auth_guard_user_checked: boolean;
    private _auth_guard_member_checked: boolean;

    constructor(
        setup: {
            env: string,
            app_token: string,
            device: AppDevice,
            fnc_change_route: any,
            route: {
                home: string,
                landing_page: string,
                account: string,
                account_new: string,
                account_list: string,
                access_denied: string,
                not_found: string
            }
        }
    ){
        Environment.set(setup.env);
        this._auth_loading = false;
        this._create_account_loading = false;
        this._app_token = setup.app_token;
        this._device = setup.device;
        this._user = new User();
        this._app_profile = new AppProfile(setup.app_token);
        this._route = new AppRoute(this, setup.fnc_change_route, setup.route);
        this._auth_guard_user_checked = false;
        this._auth_guard_member_checked = false;
    }

    private _get_source_login(kwargs: any): any {
        if(!kwargs){
            kwargs = {};
        }

        kwargs['source'] = {
            app_name: Environment.getAppName(this._app_token),
            detail: (this._device.app_site || this._device.app_mobile || {})
        }

        if(kwargs.hasOwnProperty('user_app_id')){
            kwargs['source']['detail']['user_app_id'] = kwargs.user_app_id;
            delete kwargs["user_app_id"];
        }

        if(Tools.localStorageSuported){
            let invite_string = localStorage.getItem('WelightInvite');
            if (invite_string) {
                let invite = JSON.parse(invite_string);
                if (invite.hasOwnProperty('source') && ['donator', 'ong', 'company'].indexOf(invite['source']) >= 0) {
                    kwargs.source.detail['invite'] = invite;
                }
            }
        }

        return kwargs;
    }

    private _init_app_profile_member(): Promise<boolean> {
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

    public get user(): User {
        return this._user;
    }

    public get profile(): AppProfile {
        return this._app_profile;
    }

    public get app_token(): string {
        return this._app_token;
    }

    public get device(): AppDevice {
        return this._device;
    }

    public get route(): AppRoute {
        return this._route;
    }

    public get auth_loading(): boolean {
        return this._auth_loading;
    }

    public get create_account_loading(): boolean {
        return this._create_account_loading;
    }

    public get auth_guard_user_checked(): boolean {
        return this._auth_guard_user_checked;
    }

    public get auth_guard_member_checked(): boolean {
        return this._auth_guard_member_checked;
    }

    public createAccountDoadorFundo(obj: Org): Promise<boolean> {
        if(this._app_token != 'doador_fundo'){
            return Promise.resolve(false);
        }

        this._create_account_loading = true;

        let kwargs = {};
        kwargs['data'] = obj.getData();

        return this._user.createAccountDoadorFundo(obj.name, obj.email, obj.activity_id, this._get_source_login(kwargs)).then(() => {
            return this._init_app_profile_member().then((auth: boolean) => {
                this._create_account_loading = false;
                return auth;
            });
        }).catch(() => {
            this._create_account_loading = false;
            return false;
        });
    }

    public logout(): void {
        this._user.logout().then(() => {
            this._route.change('/', 'home');
        });
    }

    public login(username: string, password: string, kwargs?:any): Promise<boolean> {
        this._auth_loading = true;
        if(!kwargs){
            kwargs = {};
        }
        return this._user.login(username, password, this._get_source_login(kwargs)).then(() => {
            if(kwargs.hasOwnProperty('next')){
                this._auth_loading = false;
                this._route.change(kwargs.next.app_route, kwargs.next.app_token);
            }else{
                if(this._app_token == 'home'){
                    let user_app_selected = this._user.getUserAppAdmin('doador_empresa');

                    if(!user_app_selected){
                        user_app_selected = this._user.getUserAppAdmin('ong');
                    }

                    if(!user_app_selected){
                        user_app_selected = this._user.getUserAppAdmin('doador');
                    }

                    this._auth_loading = false;
                    this._route.change("/", user_app_selected.app_token, {user_app_id: user_app_selected.id});
                }else{
                    this._auth_loading = false;
                    this._route.change('/');
                }
            }
            return true;
        }).catch(() => {
            if(kwargs.hasOwnProperty('next')){
                this._auth_loading = false;
                this._route.change('login', 'home', {next:{app_route: kwargs.next.app_route, app_token: kwargs.next.app_token}});
            }else{
                this._auth_loading = false;
                this._route.change('login', 'home');
            }
            return false;
        });
    }

    public quickLogin(auth: {username: string, apikey: string}, kwargs?: any): Promise<boolean> {
        this._auth_loading = true;
        if(!kwargs){
            kwargs = {};
        }
        return this._user.quickLogin(auth, this._get_source_login(kwargs)).then(() => {
            if(kwargs.hasOwnProperty('app_route')){
                this._auth_loading = false;
                this._route.change(kwargs.app_route);
            }else{
                this._auth_loading = false;
                this._route.change(this._route.uri.home);
            }
            return true;
        }).catch(() => {
            if(kwargs.hasOwnProperty('app_route')){
                this._auth_loading = false;
                this._route.change('login', 'home', {next:{app_route: kwargs.app_route, app_token: this._app_token}});
            }else{
                this._auth_loading = false;
                this._route.change('login', 'home');
            }
            return false;
        });
    }

    public authGuardPublic(): Promise<boolean> {
        if(this._user.is_authenticated){
            return Promise.resolve(true);
        }else{
            this._auth_loading = true;
            return this._user.quickLogin().then(() => {
                this._auth_loading = false;
                return true;
            }).catch(() => {
                this._auth_loading = false;
                return true;
            });
        }
    }

    public authGuardUser(current_app_route: string): Promise<boolean> {
        if(this._user.is_authenticated){
            this._auth_guard_user_checked = true;
            return Promise.resolve(true);
        }else{
            this._auth_loading = true;
            return this._user.quickLogin().then(() => {
                this._auth_guard_user_checked = true;
                this._auth_loading = false;
                return true;
            }).catch(() => {
                this._auth_guard_user_checked = false;
                this._auth_loading = false;
                this._user.logout().then(() => {
                    this._route.change('login', 'home', {next:{app_route: current_app_route, app_token: this._app_token}});
                });
                return false;
            });
        }
    }

    public authGuardMember(current_app_route: string, permissions?: Array<string>): Promise<boolean> {
        return this.authGuardUser(current_app_route).then((auth: boolean) => {
            if(auth){
                this._auth_loading = true;
                if(!permissions){
                    permissions = ['member'];
                }
                if(this._app_profile.initialized){
                    if(this.user_has_perm(permissions)){
                        this._auth_guard_member_checked = true;
                        this._auth_loading = false;
                        return true;
                    }else{
                        this._auth_guard_member_checked = false;
                        this._auth_loading = false;
                        this._route.change(this._route.uri.access_denied);
                        return false;
                    }
                }else{
                    this._auth_loading = true;
                    return this._init_app_profile_member().then((auth: boolean) => {
                        if(auth){
                            this._auth_guard_member_checked = true;
                            this._auth_loading = false;
                            return true;
                        }else{
                            this._auth_guard_member_checked = false;
                            this._auth_loading = false;
                            this._route.change(this._route.uri.access_denied);
                            return false;
                        }
                    });
                }
            }else{
                this._auth_guard_member_checked = false;
                return false;
            }
        });
    }

    public unselect_profile(): void {
        this._user.unselect_profile();
        this._app_profile.reset();
    }

    public select_profile(app_token: string, user_app_id: number, app_route?:string): void {
        this._route.change(app_route || '/', app_token, {user_app_id: user_app_id});
    }

    public user_has_perm(perm_token_list: Array<string>): boolean {
        return this._user.has_perm({
            app_token: this._app_token,
            app_profile_id: this._app_profile.app_profile_id,
            perm_token_list: perm_token_list
        });
    }

    public get global_loading(): boolean {
        return Tastypie.Working.status;
    }

    public set global_loading(p: boolean) {
        Tastypie.Working.status = p;
    }
}
