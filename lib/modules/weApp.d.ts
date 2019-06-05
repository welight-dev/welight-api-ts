import { Doador } from "./doador";
import { Empresa } from "./doadorEmpresa";
import { Org } from "./doadorFundo";
import { Ong } from "./ong";
export declare class AppManager {
    private _user;
    private _app_profile;
    private _app_token;
    private _route_account_new;
    private _route_landing_page;
    constructor(app_token: string, route_account_new?: string, route_landing_page?: string);
    init(app_id?: number): void;
    readonly profile: Doador | Empresa | Org | Ong;
    readonly token: string;
    readonly route_account_new: string;
    readonly route_landing_page: string;
    private initProfile;
    quickLogin(auth?: {
        username: string;
        apikey: string;
    }, kwargs?: any): Promise<AppManager>;
}
