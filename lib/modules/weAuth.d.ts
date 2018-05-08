import * as api from "ts-resource-tastypie";
export declare class Auth {
    private _username;
    private _api_key;
    constructor(username: string, api_key: string);
    readonly username: string;
    readonly api_key: string;
}
export declare class UserApp {
    private _id;
    private _app_name;
    private _app_token;
    private _app_profile_id;
    private _display_name;
    private _admin;
    constructor(id: number, app_name: string, app_token: string, app_profile_id: number, display_name: string, admin: boolean);
    readonly id: number;
    readonly app_name: string;
    readonly app_token: string;
    readonly app_profile_id: number;
    readonly display_name: string;
    readonly admin: boolean;
}
export declare class User {
    private _id;
    name: string;
    private _email;
    private _auth;
    private _apps;
    private _account;
    private _is_authenticated;
    private _encrypt_key;
    private _current_user_app;
    private _we_auth_user_create_account_resource;
    private _we_auth_user_create_account_ong_resource;
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
    readonly account: UserAccount;
    readonly is_authenticated: any;
    current_user_app: UserApp;
    getUserAppAdmin(app_token: string): UserApp;
    getUserAppById(id: number): UserApp;
    private setProfile(data, kwargs?);
    createAccount(name: string, email: string, password: string, kwargs?: any): Promise<User>;
    createAccountOng(nome: string, email: string, razao_social: string, cnpj: string, kwargs?: any): Promise<User>;
    login(username: string, password: string, kwargs?: any): Promise<User>;
    loginFacebook(username: string, facebook_uid: string, facebook_access_token: string, kwargs?: any): Promise<User>;
    private _quickLogin(username, apikey, kwargs?);
    quickLogin(auth?: {
        username: string;
        apikey: string;
    }, kwargs?: any): Promise<User>;
    logout(): Promise<any>;
    reset_password_request(email: string, kwargs?: any): Promise<any>;
    reset_password_execute(token: string, password: string, kwargs?: any): Promise<User>;
    change_password(username: string, pass_old: string, pass_new: string, kwargs?: any): Promise<User>;
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
