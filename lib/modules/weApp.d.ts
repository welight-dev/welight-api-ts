import { Tastypie } from "ts-resource-tastypie";
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
export declare class AppManager {
    private _user;
    private _app_profile;
    private _app_token;
    private _route_app_home;
    private _route_account_new;
    private _route_account_list;
    private _route_landing_page;
    private _route_access_denied;
    private _route_page_not_found;
    private _fnc_change_route;
    private _device;
    private _auth_loading;
    private _create_account_loading;
    constructor(setup: {
        env: string;
        app_token: string;
        device: AppDevice;
        fnc_change_route: any;
        route_app_home: string;
        route_account_new: string;
        route_access_denied: string;
        route_page_not_found: string;
        route_account_list?: string;
        route_landing_page?: string;
    });
    readonly token: string;
    readonly device: AppDevice;
    readonly route_app_home: string;
    readonly route_account_new: string;
    readonly route_access_denied: string;
    readonly route_account_list: string;
    readonly route_landing_page: string;
    readonly route_page_not_found: string;
    readonly profile: AppProfile;
    readonly auth_loading: boolean;
    concatDomainSite(app_token: string, uri?: string): string;
    concatDomainApi(uri?: string): string;
    changeRoute(app_route: string, app_token?: string, kwargs?: any): void;
    createAccountDoadorFundo(name: string, email: string, activity_id: number, kwargs?: any): Promise<boolean>;
    login(username: string, password: string, kwargs?: any): Promise<boolean>;
    quickLogin(auth: {
        username: string;
        apikey: string;
    }, kwargs?: any): Promise<boolean>;
    authGuardPublic(): Promise<boolean>;
    authGuardUser(current_app_route: string): Promise<boolean>;
    authGuardMember(current_app_route: string): Promise<boolean>;
    user_has_perm(perm_token_list: Array<string>): boolean;
    private _get_source_login;
    private _loading_app_profile_member;
}
