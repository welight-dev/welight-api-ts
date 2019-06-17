import * as api from "ts-resource-tastypie";
import * as utils from "./utils";
export declare class Auth {
    private _username;
    private _api_key;
    constructor(username: string, api_key: string);
    readonly username: string;
    readonly api_key: string;
}
export declare class AppPermission {
    private _name;
    private _token;
    constructor(obj?: {
        name: string;
        token: string;
    });
    readonly name: string;
    readonly token: string;
}
export declare class UserApp {
    private _id;
    private _app_name;
    private _app_token;
    private _app_profile_id;
    private _display_name;
    private _admin;
    private _permissions;
    constructor(id: number, app_name: string, app_token: string, app_profile_id: number, display_name: string, admin: boolean, permissions: Array<any>);
    readonly id: number;
    readonly app_name: string;
    readonly app_token: string;
    readonly app_profile_id: number;
    readonly display_name: string;
    readonly admin: boolean;
    has_perm(perm_token_list: Array<string>): boolean;
}
export declare class UserBar {
    private _app_admin;
    private _app_shared;
    private _app_available;
    constructor();
    private _set_available;
    add_app(obj: UserApp): void;
}
export declare class User {
    private _id;
    name: string;
    private _email;
    private _auth;
    private _apps;
    private _account;
    private _address;
    private _encrypt_key;
    private _current_user_app;
    private _plugin_navegador;
    private _bar;
    private _is_authenticated;
    private _we_auth_user_create_account_resource;
    private _we_auth_user_create_account_ong_resource;
    private _we_auth_user_create_account_doador_empresa_resource;
    private _we_auth_user_create_account_doador_fundo_resource;
    private _we_auth_user_login_resource;
    private _we_auth_user_logout_resource;
    private _we_auth_user_profile_resource;
    private _we_auth_user_reset_pass_request_resource;
    private _we_auth_user_reset_pass_execute_resource;
    private _we_auth_user_change_pass_resource;
    constructor();
    save(): Promise<User>;
    readonly id: number;
    readonly email: string;
    readonly auth: Auth;
    readonly apps: Array<UserApp>;
    readonly bar: UserBar;
    readonly account: UserAccount;
    readonly address: UserAddress;
    readonly is_authenticated: any;
    current_user_app: UserApp;
    readonly plugin_navegador: utils.PluginNavegador;
    getUserAppAdmin(app_token: string): UserApp;
    getUserAppById(id: number): UserApp;
    getUserAppByProfile(token: string, profile_id: number): UserApp;
    has_perm(obj_perm: {
        app_token: string;
        app_profile_id: number;
        perm_token_list: Array<string>;
    }): boolean;
    private setProfile;
    createAccount(name: string, email: string, password: string, kwargs?: any): Promise<User>;
    createAccountOng(nome: string, email: string, razao_social: string, cnpj: string, kwargs?: any): Promise<User>;
    createAccountDoadorEmpresa(nome: string, email: string, cpf_cnpj: string, kwargs?: any): Promise<User>;
    createAccountDoadorFundo(name: string, email: string, activity_id: number, kwargs?: any): Promise<User>;
    login(username: string, password: string, kwargs?: any): Promise<User>;
    loginFacebook(username: string, facebook_uid: string, facebook_access_token: string, kwargs?: any): Promise<User>;
    private _quickLogin;
    quickLogin(auth?: {
        username: string;
        apikey: string;
    }, kwargs?: any): Promise<User>;
    private _logout;
    logout(): Promise<any>;
    reset_password_request(email: string, kwargs?: any): Promise<any>;
    reset_password_execute(token: string, password: string, kwargs?: any): Promise<User>;
    change_password(username: string, pass_old: string, pass_new: string, kwargs?: any): Promise<User>;
    notificarPlugin(): void;
    instalarPluginNavegador(navegador: string): Promise<any>;
}
export declare class UserAccount extends api.Tastypie.Model<UserAccount> {
    static resource: api.Tastypie.Resource<UserAccount>;
    user_id: number;
    foto: string;
    pais: string;
    idioma: string;
    moeda: string;
    sexo: string;
    cidade: string;
    religiao: string;
    estado_civil: string;
    range_idade: string;
    dt_nascimento: string;
    dt_updated: string;
    dt_created: string;
    constructor(obj?: any);
    save(): Promise<UserAccount>;
    changeFoto(event: any): Promise<UserAccount>;
    changeFotoBase64(dataBase64: any): Promise<UserAccount>;
}
export declare class UserAddress extends api.Tastypie.Model<UserAddress> {
    static resource: api.Tastypie.Resource<UserAddress>;
    user_id: number;
    region: string;
    number: string;
    street: string;
    complement: string;
    district: string;
    postcode: string;
    city: string;
    state: string;
    country: string;
    dt_created: string;
    dt_updated: string;
    constructor(obj?: any);
    save(): Promise<UserAddress>;
}
