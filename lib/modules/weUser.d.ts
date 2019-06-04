import { Doador } from "./doador";
import { Empresa } from "./doadorEmpresa";
import { Ong } from "./ong";
export declare class UserManager {
    private _doador;
    private _empresa;
    private _ong;
    private _app_token;
    private _route_account_new;
    private _route_landing_page;
    constructor(app_token: string, route_account_new: string, route_landing_page: string);
    readonly doador: Doador;
    readonly empresa: Empresa;
    readonly ong: Ong;
    readonly app_token: string;
    readonly route_account_new: string;
    readonly route_landing_page: string;
    private initProfile;
    quickLogin(auth?: {
        username: string;
        apikey: string;
    }, kwargs?: any): Promise<UserManager>;
}
