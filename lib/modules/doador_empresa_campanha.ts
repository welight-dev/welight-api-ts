// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>

import { Tastypie } from "ts-resource-tastypie";
import { Ong } from "./ong";
import { Doador } from "./doador";
import { Empresa } from "./doadorEmpresa";

export class Campanha extends Tastypie.Model<Campanha> {
    public static resource = new Tastypie.Resource<Campanha>('doador-empresa-campanha/campanha', {model: Campanha});

    public empresa_id: number;
    public nome: string;
    public slug: string;
    public moeda: string;
    public page_img_fundo: string;
    public page_img_logo: string;
    public titulo_banner_msg: string;
    public subtitulo_banner_msg: string;
    public titulo_doacao_msg: string;
    public subtitulo_doacao_msg: string;
    public titulo_sucesso_msg: string;
    public subtitulo_sucesso_msg: string;
    public style_ui: any;
    public dt_updated: string;
    public dt_created: string;

    private _md_empresa: Empresa;

    constructor(obj?:any){
        super(Campanha.resource, obj);

        if(obj && obj.empresa){
            this._md_empresa = new Empresa(obj.empresa);
        }
    }

    public get md_empresa(): Empresa {
        return this._md_empresa;
    }
}

export class CampanhaOng extends Tastypie.Model<CampanhaOng> {
    public static resource = new Tastypie.Resource<CampanhaOng>('doador-empresa-campanha/ong', {model: CampanhaOng});

    public campanha_id: number;
    public ong_id: number;
    public dt_created: string;

    private _md_campanha: Campanha;
    private _md_ong: Ong;

    constructor(obj?:any){
        super(CampanhaOng.resource, obj);

        if(obj){
            if(obj.campanha) this._md_campanha = new Campanha(obj.campanha);
            if(obj.ong) this._md_ong = new Ong(obj.ong);
        }
    }

    public get md_campanha(): Campanha {
        return this._md_campanha;
    }

    public get md_ong(): Ong {
        return this._md_ong;
    }
}

export class CampanhaDoacao extends Tastypie.Model<CampanhaDoacao> {
    public static resource = new Tastypie.Resource<CampanhaDoacao>('doador-empresa-campanha/doacao', {model: CampanhaDoacao});

    public campanha_id: number;
    public doador_id: number;
    public cpf: string;
    public valor_doacao: number;
    public metodo_pgto: string;
    public recorrente: boolean;
    public anonimo: boolean;
    public ativa: boolean;
    public dt_updated: string;
    public dt_created: string;

    private _md_campanha: Campanha;
    private _md_doador: Doador;

    constructor(obj?:any){
        super(CampanhaDoacao.resource, obj);

        if(obj){
            if(obj.campanha) this._md_campanha = new Campanha(obj.campanha);
            if(obj.doador) this._md_doador = new Doador(obj.doador);
        }
    }

    public get md_campanha(): Campanha {
        return this._md_campanha;
    }

    public get md_doador(): Doador {
        return this._md_doador;
    }
}

export class DoacaoFatura {

}
