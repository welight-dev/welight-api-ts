import { Tastypie } from "ts-resource-tastypie";
import { User, UserApp } from "./weAuth";
import { Doador } from "./doador";
import { Empresa } from "./doadorEmpresa";
import { Org } from "./doadorFundo";
import { Ong } from "./ong";
export { Tastypie };
export declare class AppProfile {
    private _doador;
    private _empresa;
    private _org;
    private _ong;
    private _app_token;
    private _app_profile_id;
    private _initialized;
    constructor(app_token: string);
    reset(): void;
    init(obj_filter: {
        id?: number;
        slug?: string;
    }): Promise<AppProfile>;
    get doador(): Doador;
    get empresa(): Empresa;
    get org(): Org;
    get ong(): Ong;
    get app_token(): string;
    get app_profile_id(): number;
    get initialized(): boolean;
}
export declare class AppDevice {
    is_mobile: boolean;
    app_site: {
        os: string;
        os_version: string;
        browser: string;
        browser_version: string;
        invite?: {
            source: string;
            slug: string;
        };
    };
    app_mobile: {
        registration_id: string;
        device_id: string;
        device_name: string;
        device_type: string;
        invite?: {
            source: string;
            slug: string;
        };
    };
    constructor(device: {
        is_mobile: boolean;
        app_site?: {
            os: string;
            os_version: string;
            browser: string;
            browser_version: string;
            invite?: {
                source: string;
                slug: string;
            };
        };
        app_mobile?: {
            registration_id: string;
            device_id: string;
            device_name: string;
            device_type: string;
            invite?: {
                source: string;
                slug: string;
            };
        };
    });
}
export declare class AppRoute {
    private _app_manager;
    private _fnc_change_route;
    private _uri;
    constructor(app_manager: AppManager, fnc_change_route: any, uri: {
        home: string;
        landing_page: string;
        account: string;
        account_new: string;
        account_list: string;
        access_denied: string;
        not_found: string;
    });
    private _check_uri_slash;
    get uri(): {
        home: string;
        landing_page: string;
        account: string;
        account_new: string;
        account_list: string;
        access_denied: string;
        not_found: string;
    };
    concatDomainSite(app_token: string, uri?: string): string;
    concatDomainApi(uri: string): string;
    change(app_route: string, app_token?: string, kwargs?: any): void;
}
export declare class AppManager {
    private _user;
    private _app_profile;
    private _app_token;
    private _device;
    private _route;
    private _auth_loading;
    private _create_account_loading;
    private _auth_guard_user_checked;
    private _auth_guard_member_checked;
    constructor(setup: {
        env: string;
        app_token: string;
        device: AppDevice;
        fnc_change_route: any;
        route: {
            home: string;
            landing_page: string;
            account: string;
            account_new: string;
            account_list: string;
            access_denied: string;
            not_found: string;
        };
    });
    private _get_source_login;
    private _init_app_profile_member;
    private _check_member_auth;
    get user(): User;
    get profile(): AppProfile;
    get app_token(): string;
    get device(): AppDevice;
    get route(): AppRoute;
    get auth_loading(): boolean;
    get create_account_loading(): boolean;
    get auth_guard_user_checked(): boolean;
    get auth_guard_member_checked(): boolean;
    createAccount(name: string, email: string, password: string, kwargs?: any): Promise<boolean>;
    createAccountDoadorFundo(obj: Org): Promise<boolean>;
    createAccountOng(obj: Ong): Promise<boolean>;
    logout(redirect?: boolean): Promise<boolean>;
    login(username: string, password: string, kwargs?: any): Promise<boolean>;
    loginFacebook(username: string, facebook_uid: string, facebook_access_token: string, kwargs?: any): Promise<boolean>;
    quickLogin(auth: {
        username: string;
        apikey: string;
    }, kwargs?: any): Promise<boolean>;
    authGuardPublic(): Promise<boolean>;
    authGuardUser(current_app_route: string, on_error_route?: {
        app_route: string;
        app_token: string;
    }): Promise<boolean>;
    authGuardMember(current_app_route: string, permissions?: Array<string>, on_error_route?: {
        app_route: string;
        app_token: string;
    }): Promise<boolean>;
    authGuardMemberOrPublic(profile_id: number, permissions?: Array<string>, on_error_route?: {
        app_route: string;
        app_token: string;
    }): Promise<boolean>;
    unselect_profile(): void;
    select_profile(app_token: string, user_app_id: number, app_route?: string): void;
    list_profile(): Array<UserApp>;
    check_list_profile(app_route?: string): Array<UserApp>;
    user_has_perm(perm_token_list: Array<string>): boolean;
    get global_loading(): boolean;
    set global_loading(p: boolean);
}
