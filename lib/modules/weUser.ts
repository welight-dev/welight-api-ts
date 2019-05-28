// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>

import { Doador } from "./doador";
import { Empresa } from "./doadorEmpresa";
import { Ong } from "./ong";

export class UserManager {
    private _doador: Doador;
    private _empresa: Empresa;
    private _ong: Ong;

    private _app_token: string;
    private _route_account_new: string;
    private _route_landing_page: string;

    constructor(
        app_token: string,
        route_account_new: string,
        route_landing_page: string
    ){
        this._doador = new Doador();
        this._empresa = new Empresa();
        this._ong = new Ong();
        this._app_token = app_token;
        this._route_account_new = route_account_new;
        this._route_landing_page = route_landing_page;
    }

    public get doador(): Doador {
        return this._doador;
    }

    public get empresa(): Empresa {
        return this._empresa;
    }

    public get ong(): Ong {
        return this._ong;
    }

    public get app_token(): string {
        return this._app_token;
    }

    public get route_account_new(): string {
        return this._route_account_new;
    }

    public get route_landing_page(): string {
        return this._route_landing_page;
    }

    private initProfile(): Promise<any> {      
        return Promise.all([]);
    }

    public quickLogin(auth?:{username: string, apikey: string}, kwargs?:any): Promise<UserManager> {
        return this._doador.quickLogin(auth, kwargs).then((doador: Doador) => {
            return this;
        });
    }
}
