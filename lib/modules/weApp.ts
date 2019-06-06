// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>
import { User } from "./weAuth";
import { Doador } from "./doador";
import { Empresa } from "./doadorEmpresa";
import { Org } from "./doadorFundo";
import { Ong } from "./ong";

export class AppManager {
    private _user: User;
    private _app_profile: Doador | Empresa | Org | Ong;
    private _app_token: string;
    private _route_account_new: string;
    private _route_landing_page: string;

    constructor(
        app_token: string,
        route_account_new?: string,
        route_landing_page?: string
    ){
        this._app_token = app_token;
        this._route_account_new = route_account_new;
        this._route_landing_page = route_landing_page;
    }

    private _init_app(app_id?: number): Promise<AppManager> {
        let param: any = {};
        if(app_id){
            param = {id: app_id};
        }

        if(this._app_token == 'doador'){
            this._app_profile = new Doador(param);
        }else if(this._app_token == 'doador_empresa'){
            this._app_profile = new Empresa(param);
        }else if(this._app_token == 'doador_fundo'){
            this._app_profile = new Org(param);
        }else if(this._app_token == 'ong'){
            this._app_profile = new Ong(param);
        }

        return;
    }

    public get profile(): Doador | Empresa | Org | Ong {
        return this._app_profile;
    }

    public get token(): string {
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

    public quickLogin(auth?:{username: string, apikey: string}, kwargs?:any): Promise<AppManager> {
        return this._user.quickLogin(auth, kwargs).then((user: User) => {
            return this;
        });
    }
}
