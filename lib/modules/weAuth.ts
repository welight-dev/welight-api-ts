// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>

import { Tastypie } from "ts-resource-tastypie";
import { Environment } from './config';
import { Tools, PluginNavegador, Address } from "./utils";
import * as crypto from 'crypto-js';


export class Auth {
    private _username: string;
    private _api_key: string;

    constructor(username: string, api_key: string){
        this._username = username;
        this._api_key = api_key;
    }

    public get username(): string {
        return this._username;
    }

    public get api_key(): string {
        return this._api_key;
    }
}

export class App extends Tastypie.Model<App> {
    public static resource = new Tastypie.Resource<App>('we-auth/app', {model: App});

    public name: string;
    public token: string;
    public permissions: Array<AppPermission>;
    public dt_created: string;
    public dt_updated: string;

    constructor(obj?:any){
        super(App.resource, obj);

        this.permissions = [];
        if(obj && obj.permissions){
            for(let perm of obj.permissions){
                this.permissions.push(new AppPermission(perm));
            }
        }
    }
}

export class AppPermission {
    private _id: number;
    private _name: string;
    private _token: string;

    constructor(obj?: {id: number, name: string, token: string}){
        this._id = obj.id;
        this._name = obj.name;
        this._token = obj.token;
    }

    public get id(): number {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get token(): string {
        return this._token;
    }
}

export class UserApp {
    private _id: number;
    private _app_name: string;
    private _app_token: string;
    private _app_profile_id: number;
    private _display_name: string;
    private _avatar: string;
    private _admin: boolean;
    private _permissions: Array<AppPermission>;

    constructor(
      id: number,
      app_name: string,
      app_token: string,
      app_profile_id: number,
      display_name: string,
      avatar: string,
      admin: boolean,
      permissions: Array<any>
    ){
        this._id = id;
        this._app_name = app_name;
        this._app_token = app_token;
        this._app_profile_id = app_profile_id;
        this._display_name = display_name;
        this._avatar = avatar;
        this._admin = admin;
        this._permissions = [];

        for(let perm of permissions){
            this._permissions.push(perm);
        }
    }

    public get id(): number {
        return this._id;
    }

    public get app_name(): string {
        return this._app_name;
    }

    public get app_token(): string {
        return this._app_token;
    }

    public get app_profile_id(): number {
        return this._app_profile_id;
    }

    public get display_name(): string {
        return this._display_name;
    }

    public get avatar(): string {
        return this._avatar;
    }

    public get admin(): boolean {
        return this._admin;
    }

    public has_perm(perm_token_list: Array<string>): boolean {
        if(this._admin){
            return true;
        }else{
            let resp_return: boolean = false;
            for(let token of perm_token_list){
                for(let perm of this._permissions){
                    if(perm.name == token){
                        resp_return = true;
                        break;
                    }
                }
                if(resp_return){
                    break;
                }
            }
            return resp_return;
        }
    }
}

export class UserBar {
    private _app_admin: Array<UserApp>;
    private _app_shared: Array<UserApp>;
    private _app_available: Array<UserApp>;

    constructor(){
        this._app_admin = [];
        this._app_shared = [];
        this._app_available = [];
        this._set_available();
    }

    private _set_available(): void {
        this._app_available.push(
            new UserApp(0, 'NGO', 'ong', 0, 'NGO', '', false, [])
        );
        this._app_available.push(
            new UserApp(0, 'Company', 'doador_empresa', 0, 'Company', '', false, [])
        );
        this._app_available.push(
            new UserApp(0, 'ORG Funds', 'doador_fundo', 0, 'ORG Funds', '', false, [])
        );
    }

    public add_app(obj: UserApp): void {
        if(obj.admin){
          for(let i = 0; i < this._app_available.length; i++){
             if(this._app_available[i].app_token === obj.app_token) {
                this._app_available.splice(i, 1);
             }
          }
          this._app_admin.push(obj);
        }else{
            this._app_shared.push(obj);
        }
    }

    public remove_app(obj: UserApp): void {
        if(obj.admin){
            for(let i = 0; i < this._app_admin.length; i++){
               if(this._app_admin[i].id === obj.id) {
                  this._app_admin.splice(i, 1);
               }
            }
        }else{
            for(let i = 0; i < this._app_shared.length; i++){
               if(this._app_shared[i].id === obj.id) {
                  this._app_shared.splice(i, 1);
               }
            }
        }
    }

    public get app_admin(): Array<UserApp> {
        return this._app_admin;
    }

    public get app_shared(): Array<UserApp> {
        return this._app_shared;
    }

    public get app_available(): Array<UserApp> {
        return this._app_available;
    }
}

export class User {
    private _id: number;
    public name: string;
    private _email: string;
    private _auth: Auth;
    private _apps: Array<UserApp>;
    private _account: UserAccount;
    private _address: UserAddress;
    private _encrypt_key: string;
    private _current_user_app: UserApp;
    private _plugin_navegador: PluginNavegador;
    private _bar: UserBar;
    private _is_authenticated: boolean;

    private _we_auth_user_create_account_resource: Tastypie.Resource<any>;
    private _we_auth_user_create_account_ong_resource: Tastypie.Resource<any>;
    private _we_auth_user_create_account_doador_empresa_resource: Tastypie.Resource<any>;
    private _we_auth_user_create_account_doador_fundo_resource: Tastypie.Resource<any>;
    private _we_auth_user_login_resource: Tastypie.Resource<any>;
    private _we_auth_user_logout_resource: Tastypie.Resource<any>;
    private _we_auth_user_profile_resource: Tastypie.Resource<any>;
    private _we_auth_user_reset_pass_request_resource: Tastypie.Resource<any>;
    private _we_auth_user_reset_pass_execute_resource: Tastypie.Resource<any>;
    private _we_auth_user_change_pass_resource: Tastypie.Resource<any>;

    constructor(){
        this.reset();
        this._encrypt_key = 's7hsj2d12easd63ksye598sdhw312ed8';
        this._plugin_navegador = new PluginNavegador();
        this._we_auth_user_create_account_resource = new Tastypie.Resource('we-auth/user/create-account');
        this._we_auth_user_create_account_ong_resource = new Tastypie.Resource('we-auth/user/create-account-ong');
        this._we_auth_user_create_account_doador_empresa_resource = new Tastypie.Resource('we-auth/user/create-account-doador-empresa');
        this._we_auth_user_create_account_doador_fundo_resource = new Tastypie.Resource('we-auth/user/create-account-doador-fundo');
        this._we_auth_user_login_resource = new Tastypie.Resource('we-auth/user/login');
        this._we_auth_user_logout_resource = new Tastypie.Resource('we-auth/user/logout');
        this._we_auth_user_profile_resource = new Tastypie.Resource('we-auth/user/profile');
        this._we_auth_user_reset_pass_request_resource = new Tastypie.Resource('we-auth/user/reset-password-request');
        this._we_auth_user_reset_pass_execute_resource = new Tastypie.Resource('we-auth/user/reset-password-execute');
        this._we_auth_user_change_pass_resource = new Tastypie.Resource('we-auth/user/change-password');

        let _self = this;
        document.addEventListener("$wl_msg_checkSite", function(data){
            _self._plugin_navegador.instalado = true;
            _self.notificarPlugin()
        });
    }

    public reset(): void {
        this.name = ''
        this._email = ''
        this._auth = new Auth('','');
        this._account = new UserAccount();
        this._address = new UserAddress();
        this._current_user_app = null;
        this._apps = [];
        this._bar = new UserBar();
        this._is_authenticated = false;
    }

    public save(): Promise<User> {
        let _self = this;
        return _self._we_auth_user_profile_resource.objects.update(_self._id, {name: _self.name}).then(
            function(){
                _self.notificarPlugin();
                return _self;
            }
        )
    }

    public unselect_profile(): void {
        this._current_user_app = null;
        if(Tools.localStorageSuported){
            let weUser: string = localStorage.getItem('weUserX');
            if(weUser){
                let auth_user = JSON.parse(crypto.AES.decrypt(weUser, this._encrypt_key).toString(crypto.enc.Utf8));
                let kwargs = auth_user.kwargs || {};

                let removed = false;
                if(kwargs.hasOwnProperty('source')){
                    if(kwargs.source.detail.hasOwnProperty('user_app_id')){
                        delete kwargs.source.detail['user_app_id'];
                        removed = true;
                    }
                }

                if(removed){
                    auth_user.kwargs = kwargs;
                    let encrypted_user = crypto.AES.encrypt(
                        JSON.stringify(auth_user),
                        this._encrypt_key
                    ).toString();
                    localStorage.setItem('weUserX', encrypted_user);
                }
            }
        }
    }

    public get id(): number {
      return this._id;
    }

    public get email(): string {
      return this._email;
    }

    public get auth(): Auth {
        return this._auth;
    }

    public get apps(): Array<UserApp> {
        return this._apps;
    }

    public get bar(): UserBar {
        return this._bar;
    }

    public get account(): UserAccount {
        return this._account;
    }

    public get address(): UserAddress {
        return this._address;
    }

    public get is_authenticated(): any {
        return this._is_authenticated;
    }

    public get current_user_app(): UserApp {
        return this._current_user_app;
    }

    public set current_user_app(userapp:UserApp) {
        this._current_user_app = userapp;
    }

    public get plugin_navegador(): PluginNavegador {
        return this._plugin_navegador;
    }

    public getUserAppAdmin(app_token: string): UserApp {
        let userapp_return: UserApp = null;
        for(let userapp of this.apps){
          if(userapp.app_token == app_token && userapp.admin){
              userapp_return = userapp;
              break;
          }
        }
        return userapp_return;
    }

    public getUserAppById(id: number): UserApp {
        let userapp_return: UserApp = null;
        for(let userapp of this.apps){
          if(userapp.id == id){
              userapp_return = userapp;
              break;
          }
        }
        return userapp_return;
    }

    public getUserAppByProfile(token: string, profile_id: number): UserApp {
        let userapp_return: UserApp = null;
        for(let userapp of this.apps){
          if(userapp.app_token == token && userapp.app_profile_id == profile_id){
              userapp_return = userapp;
              break;
          }
        }
        return userapp_return;
    }

    public has_perm(obj_perm: {
      app_token: string,
      app_profile_id: number,
      perm_token_list: Array<string>
    }): boolean {

        let obj_userapp: UserApp = null;

        if(this._current_user_app.app_token == obj_perm.app_token
          && this._current_user_app.app_profile_id == obj_perm.app_profile_id){
              obj_userapp = this._current_user_app;
        }else{
            obj_userapp = this.getUserAppByProfile(obj_perm.app_token, obj_perm.app_profile_id);
        }

        if(!obj_userapp){
            return false;
        }

        let obj_member = {
            admin: false,
            member: false
        }

        for(let token of obj_perm.perm_token_list){
            if(token == 'admin'){
                obj_member.admin = true;
                break;
            }

            if(token == 'member'){
                obj_member.member = true;
            }
        }

        if(obj_member.admin){
            return obj_userapp.admin;
        }

        if(obj_member.member){
            return true;
        }

        return obj_userapp.has_perm(obj_perm.perm_token_list);
    }

    private setProfile(data: any, kwargs?: any): void{
      let _self = this;
      if(data &&
         data.hasOwnProperty('name') &&
         data.hasOwnProperty('email') &&
         data.hasOwnProperty('auth') &&
         data.hasOwnProperty('apps') &&
         data.hasOwnProperty('account') &&
         data.hasOwnProperty('address')){
            Tastypie.Provider.setAuth('welight', data.auth.username, data.auth.api_key);

            _self._id = data.id;
            _self.name = data.name;
            _self._email = data.email;
            _self._auth = new Auth(data.auth.username, data.auth.api_key);
            _self._account = new UserAccount(data);
            _self._address = new UserAddress(data);
            _self._apps = [];
            _self._bar = new UserBar();

            for(let userapp of data.apps){
              let obj_userapp = new UserApp(
                  userapp.id,
                  userapp.app_name,
                  userapp.app_token,
                  userapp.app_profile_id,
                  userapp.display_name,
                  userapp.avatar,
                  userapp.admin,
                  userapp.permissions
              );
              _self._apps.push(obj_userapp);
              _self._bar.add_app(obj_userapp);
            }

            if(!kwargs){
              kwargs = {};
            }

            if(!kwargs.hasOwnProperty('source')){
               kwargs['source'] = {
                   detail: {}
               }
            }

            if(data.hasOwnProperty('current_user_app')){
              kwargs.source.detail['user_app_id'] = data.current_user_app.id;
            }

            if(kwargs.hasOwnProperty('source')){
               if(kwargs.source.detail.hasOwnProperty('user_app_id')){
                   _self._current_user_app = _self.getUserAppById(kwargs.source.detail.user_app_id);
               }
            }

            if(_self._current_user_app){
                _self._bar.remove_app(_self._current_user_app);
            }

            _self._is_authenticated = true;
            _self.notificarPlugin();
            if(Tools.localStorageSuported){
              let encrypted_user = crypto.AES.encrypt(JSON.stringify({
                  username: data.auth.username,
                  apikey: data.auth.api_key,
                  kwargs: {source: kwargs.source}
              }), _self._encrypt_key).toString();
              localStorage.setItem('weUserX', encrypted_user);
            }
       }else{
           _self.reset();
          if(Tools.localStorageSuported) localStorage.removeItem('weUserX');
       }
    }

    public createAccount(name: string, email: string, password: string, kwargs?:any): Promise<User> {
        return this._we_auth_user_create_account_resource.objects.create({
            name: name,
            email: email,
            password: password,
            kwargs: kwargs
        }).then((data: any) => {
            this.setProfile(data, kwargs);
            if(this._is_authenticated){
                return this;
            }else{
                return Tastypie.Tools.generate_exception("[WeAuth][create_account_ong] Usuario não identificado");
            }
        });
    }

    public createAccountOng(nome: string, email: string, razao_social: string, cnpj:string, kwargs?:any): Promise<User> {
        return this._we_auth_user_create_account_ong_resource.objects.create({
            nome: nome,
            email: email,
            razao_social: razao_social,
            cnpj: cnpj,
            kwargs: kwargs
        }).then((data: any) => {
            this.setProfile(data, kwargs);
            if(this._is_authenticated){
                return this;
            }else{
                return Tastypie.Tools.generate_exception("[WeAuth][create_account_ong] Usuario não identificado");
            }
        });
    }

    public createAccountDoadorEmpresa(nome: string, email: string, cpf_cnpj:string, kwargs?:any): Promise<User> {
        return this._we_auth_user_create_account_doador_empresa_resource.objects.create({
            nome: nome,
            email: email,
            cpf_cnpj: cpf_cnpj,
            kwargs: kwargs
        }).then((data: any) => {
            this.setProfile(data, kwargs);
            if(this._is_authenticated){
                return this;
            }else{
                return Tastypie.Tools.generate_exception("[WeAuth][create_account_doador_empresa] Usuario não identificado");
            }
        });
    }

    public createAccountDoadorFundo(name: string, email: string, activity_id: number, kwargs?:any): Promise<User> {
        return this._we_auth_user_create_account_doador_fundo_resource.objects.create({
            name: name,
            email: email,
            activity_id: activity_id,
            kwargs: kwargs
        }).then((data: any) => {
            this.setProfile(data, kwargs);
            if(this._is_authenticated){
                return this;
            }else{
                return Tastypie.Tools.generate_exception("[WeAuth][create_account_doador_fundo] Usuario não identificado");
            }
        });
    }

    public login(username: string, password: string, kwargs?:any): Promise<User> {
        return this._we_auth_user_login_resource.objects.create({
            username: username,
            password: password,
            kwargs: kwargs
        }).then((data: any) => {
            this.setProfile(data, kwargs);
            if(this._is_authenticated){
                return this;
            }else{
                return Tastypie.Tools.generate_exception("[WeAuth][login] Usuario não identificado");
            }
        });
    }

    public loginFacebook(username: string, facebook_uid: string, facebook_access_token: string, kwargs?:any): Promise<User> {
        return this._we_auth_user_login_resource.objects.create({
            username: username,
            facebook_uid: facebook_uid,
            facebook_access_token:  facebook_access_token,
            kwargs: kwargs
        }).then((data: any) => {
            this.setProfile(data, kwargs);
            if(this._is_authenticated){
                return this;
            }else{
                return Tastypie.Tools.generate_exception("[WeAuth][login_facebook] Usuario não identificado");
            }
        });
    }

    private _quickLogin(username: string, apikey: string, kwargs?:any): Promise<User> {
        Tastypie.Provider.setAuth('welight', username, apikey);
        return this._we_auth_user_profile_resource.objects.findOne({kwargs:kwargs}).then((data: any) => {
            this.setProfile(data, kwargs);
            if(this._is_authenticated){
                return this;
            }else{
                return Tastypie.Tools.generate_exception("[WeAuth][quick_login] Usuario não identificado");
            }
        }).catch(function(){
            this._logout();
            return Tastypie.Tools.generate_exception("[WeAuth][quick_login] Usuario não identificado");
        });
    }

    public quickLogin(auth?:{username: string, apikey: string}, kwargs?:any): Promise<User> {
        if(auth){
            return this._quickLogin(auth.username, auth.apikey, kwargs);
        }else{
            if(Tools.localStorageSuported){
                let weUser: string = localStorage.getItem('weUserX')
                if(weUser){
                    let auth_user = JSON.parse(crypto.AES.decrypt(weUser, this._encrypt_key).toString(crypto.enc.Utf8));
                    return this._quickLogin(auth_user.username, auth_user.apikey, auth_user.kwargs);
                }else{
                    return Tastypie.Tools.generate_exception("[WeAuth][quick_login] Usuario não identificado");
                }
            }else{
                return Tastypie.Tools.generate_exception("[WeAuth][quick_login] Usuario não identificado");
            }
        }
    }

    private _logout(): void {
        Tastypie.Provider.removeAuth('welight');
        this.reset();
        if(Tools.localStorageSuported) localStorage.removeItem('weUserX');
        if(Environment.env == 'prod'){
          let wl_msg_event = new CustomEvent('$wl_msg_sendUserProfile', { 'detail': {} });
          document.dispatchEvent(wl_msg_event);
        }
    }

    public logout(): Promise<User> {
        return this._we_auth_user_logout_resource.objects.findOne().then(() => {
            this._logout();
            return this;
        }).catch(() => {
            this._logout();
            return this;
        });
    }

    public reset_password_request(email: string, kwargs?:any): Promise<any> {
        return this._we_auth_user_reset_pass_request_resource.objects.create({
            email: email,
            kwargs: kwargs
        });
    }

    public reset_password_execute(token: string, password: string, kwargs?:any): Promise<User> {
        return this._we_auth_user_reset_pass_execute_resource.objects.create({
            token: token,
            pass: password,
            kwargs: kwargs
        }).then((data: any) => {
            this.setProfile(data, kwargs);
            if(this._is_authenticated){
                return this;
            }else{
                return Tastypie.Tools.generate_exception("[WeAuth][reset_password_execute] Usuario não identificado");
            }
        });
    }

    public change_password(username: string, pass_old: string, pass_new: string, kwargs?:any): Promise<User> {
        return this._we_auth_user_change_pass_resource.objects.create({
            username: username,
            pass_old: pass_old,
            pass_new: pass_new,
            kwargs: kwargs
        }).then((data: any) => {
            this.setProfile(data, kwargs);
            if(this._is_authenticated){
                return this;
            }else{
                return Tastypie.Tools.generate_exception("[WeAuth][change_password] Usuario não identificado");
            }
        });
    }

    public notificarPlugin(): void{
        if(Environment.env == 'prod' && this._is_authenticated){
            let _self = this;
            let wl_msg_profile = {
                user: {username: _self._auth.username, api_key: _self._auth.api_key}
            };
            let wl_msg_event = new CustomEvent('$wl_msg_sendUserProfile', { 'detail': wl_msg_profile });
            document.dispatchEvent(wl_msg_event);
        }
    }

    public instalarPluginNavegador(navegador:string): Promise<any> {
        let _self = this;
        return new Promise<any>(function(resolve, reject) {
            if(navegador == "chrome"){
                _self._plugin_navegador.instalarExtensaoChrome().then(
                    function(success: any){
                        _self.notificarPlugin();
                        resolve(true);
                    }
                );
            }else if(navegador == "firefox"){
                _self._plugin_navegador.instalarExtensaoFirefox().then(
                    function(success: any){
                        _self.notificarPlugin();
                        resolve(true);
                    }
                );
            }else if(navegador == "safari"){
                window.open('https://safari-extensions.apple.com/details/?id=co.welight.safari.welight-AR7RY2A3BF', '_blank');
                resolve(true);
            }else{
                reject('Browser not supported.');
            }
        });
    }
}

export class UserAccount extends Tastypie.Model<UserAccount> {

    public static resource = new Tastypie.Resource<UserAccount>('we-auth/user/profile', {model: UserAccount});

    public user_id: number;
    public foto: string;

    public pais: string;
    public idioma: string;

    public moeda: string;
    public sexo: string;
    public cidade: string;

    public religiao: string;
    public estado_civil: string;
    public range_idade: string;

    public dt_nascimento: string;
    public phone_mobile: string;
    public dt_updated: string;
    public dt_created: string;

    constructor(obj?:any){
        super(UserAccount.resource);
        if(obj){
            this.setData(obj.account);
            this.user_id = obj.id
        }
    }

    public save(): Promise<UserAccount> {
        let _self = this;
        return UserAccount.resource.objects.update(_self.user_id, {account: _self.getData()}).then(
            function(data){
                _self.setData(data);
                return _self;
            }
        )
    }

    public changeFoto(event: any): Promise<UserAccount> {
        let _self = this;
        let uploading = new Promise<UserAccount>(function(resolve, reject) {
            let timeout = setTimeout(function(){ reject('timeout'); }, 15000);
            let reader = new FileReader();
            reader.onload = function(loadEvent: any){
                let paramFile = loadEvent.target.result;
                UserAccount.resource.objects.update(_self.user_id, {account:{foto:paramFile}}).then(function(data){
                    clearTimeout(timeout);
                    _self.setData(data);
                    resolve(data);
                }).catch(function(error){
                    clearTimeout(timeout);
                    reject(error);
                });
            }
            reader.readAsDataURL(event.target.files[0]);
        });
        return uploading;
    }

    public changeFotoBase64(dataBase64: any): Promise<UserAccount> {
        let _self = this;
        return UserAccount.resource.objects.update(_self.user_id, {account:{foto:dataBase64}}).then(function(data){
            _self.setData(data);
            return _self;
        });
    }
}

export class UserAddress extends Address {

    public static resource = new Tastypie.Resource<UserAddress>('we-auth/user/profile', {model: UserAddress});
    public user_id: number;

    constructor(obj?:any){
        super(UserAddress.resource);
        if(obj){
            this.setData(obj.address);
            this.user_id = obj.id
        }
    }

    public save(): Promise<UserAddress> {
        return UserAddress.resource.objects.update(this.user_id, {address: this.getData()}).then((data) => {
            this.setData(data);
            return this;
        });
    }
}
