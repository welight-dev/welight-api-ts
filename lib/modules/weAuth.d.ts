export declare class Auth {
    private _username;
    private _api_key;
    constructor(username: string, api_key: string);
    readonly username: string;
    readonly api_key: string;
}
export declare class UserApp {
    private _app_name;
    private _app_token;
    private _app_profile_id;
    private _admin;
    constructor(app_name: string, app_token: string, app_profile_id: string, admin: boolean);
    readonly app_name: string;
    readonly app_token: string;
    readonly app_profile_id: string;
    readonly admin: boolean;
}
export declare class User {
    private _name;
    private _email;
    private _auth;
    private _apps;
    private _is_authenticated;
    private _encrypt_key;
    private _we_auth_user_create_account_resource;
    private _we_auth_user_login_resource;
    private _we_auth_user_logout_resource;
    private _we_auth_user_profile_resource;
    constructor();
    readonly is_authenticated: any;
    readonly auth: Auth;
    readonly apps: Array<UserApp>;
    private setProfile(data);
    create_account(name: string, email: string, password: string, kwargs?: any): Promise<User>;
    login(username: string, password: string, kwargs?: any): Promise<User>;
    login_facebook(username: string, facebook_uid: string, facebook_access_token: string, kwargs?: any): Promise<User>;
    private _quickLogin(username, apikey, kwargs?);
    quickLogin(auth?: {
        username: string;
        apikey: string;
    }, kwargs?: any): Promise<User>;
    logout(): Promise<any>;
}
