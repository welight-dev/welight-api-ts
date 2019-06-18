import { Tastypie } from "ts-resource-tastypie";
import { User } from "./weAuth";
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
    readonly doador: Doador;
    readonly empresa: Empresa;
    readonly org: Org;
    readonly ong: Ong;
    readonly app_token: string;
    readonly app_profile_id: number;
    readonly initialized: boolean;
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
    readonly uri: {
        home: string;
        landing_page: string;
        account: string;
        account_new: string;
        account_list: string;
        access_denied: string;
        not_found: string;
    };
    concatDomainSite(app_token: string, uri?: string): string;
    concatDomainApi(uri?: string): string;
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
    readonly user: User;
    readonly profile: AppProfile;
    readonly app_token: string;
    readonly device: AppDevice;
    readonly route: AppRoute;
    readonly auth_loading: boolean;
    readonly create_account_loading: boolean;
    createAccountDoadorFundo(name: string, email: string, activity_id: number, kwargs?: any): Promise<boolean>;
    login(username: string, password: string, kwargs?: any): Promise<boolean>;
    quickLogin(auth: {
        username: string;
        apikey: string;
    }, kwargs?: any): Promise<boolean>;
    authGuardPublic(): Promise<boolean>;
    authGuardUser(current_app_route: string): Promise<boolean>;
    authGuardMember(current_app_route: string): Promise<boolean>;
    unselect_profile(): void;
    user_has_perm(perm_token_list: Array<string>): boolean;
    global_loading: boolean;
}
