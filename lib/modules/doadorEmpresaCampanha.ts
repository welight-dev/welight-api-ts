// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>

import { Tastypie } from "ts-resource-tastypie";
import { Tools } from "./utils";
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
    private _rs_ong: Tastypie.Resource<CampanhaOng>;

    constructor(obj?:any){
        super(Campanha.resource, obj);
        this._md_empresa = new Empresa();

        if(obj){
            if(obj.empresa) this._md_empresa = new Empresa(obj.empresa);
            if(obj.id){
                this._rs_ong = new Tastypie.Resource<CampanhaOng>(
                    CampanhaOng.resource.endpoint,
                    {model: CampanhaOng, defaults: {campanha_id: obj.id}}
                );
            }
        }
    }

    public get md_empresa(): Empresa {
        return this._md_empresa;
    }

    public get rs_ong(): Tastypie.Resource<CampanhaOng> {
        return this._rs_ong;
    }

    public gerar_fatura(
        metodo_pgto: string,
        valor_doacao: number,
        recorrente: boolean,
        anonimo: boolean,
        ongs: Array<number>,
        cpf?: string
      ): Promise<DoacaoFatura> {
        if(this.id){
            return DoacaoFatura.gerar_fatura({
                campanha_id: this.id,
                metodo_pgto: metodo_pgto,
                valor_doacao: valor_doacao,
                recorrente: recorrente,
                anonimo: anonimo,
                ongs: ongs,
                cpf:cpf
            });
        }
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

        this._md_campanha = new Campanha();
        this._md_ong = new Ong();

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

        this._md_campanha = new Campanha();
        this._md_doador = new Doador();

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

    public static rs_fatura_add = new Tastypie.Resource<DoacaoFatura>('doador-empresa-campanha/campanha/gerar-fatura', {model: DoacaoFatura});
    public static rs_fatura_check = new Tastypie.Resource<DoacaoFatura>('doador-empresa-campanha/campanha/check-fatura', {model: DoacaoFatura});

    public id: number;
    public token: string;
    public nome: string;
    public email: string;
    public cpf: string;
    public moeda: string;
    public total: number;
    public pago: boolean;
    public dt_vencimento: string;
    public dt_updated: string;
    public dt_created: string;

    private _md_campanha_doacao: CampanhaDoacao;
    private _md_pagamento: DoacaoFaturaPagamento;
    private _md_ongs: Array<Ong>;

    constructor(obj?: any){
        this._md_campanha_doacao = new CampanhaDoacao();
        this._md_pagamento = new DoacaoFaturaPagamento();
        this._md_ongs = [];

        if(obj){
            Tools.setData(obj, this);

            if(obj.campanha_doacao)
              this._md_campanha_doacao = new CampanhaDoacao(obj.campanha_doacao);

            if(obj.pagamento)
              this._md_pagamento = new DoacaoFaturaPagamento(obj.pagamento);

            if(obj.ongs){
                for(let ong of obj.ongs){
                    this._md_ongs.push(new Ong(ong));
                }
            }
        }
    }

    public get md_campanha_doacao(): CampanhaDoacao {
        return this._md_campanha_doacao;
    }

    public get md_pagamento(): DoacaoFaturaPagamento {
        return this._md_pagamento;
    }

    public get md_ongs(): Array<Ong> {
        return this._md_ongs;
    }

    public static gerar_fatura(obj: {
        campanha_id: number,
        metodo_pgto: string,
        valor_doacao: number,
        recorrente: boolean,
        anonimo: boolean,
        ongs: Array<number>,
        cpf?: string
      }
    ): Promise<DoacaoFatura> {
        return DoacaoFatura.rs_fatura_add.objects.create(obj);
    }

    public static check_fatura(token: string): Promise<DoacaoFatura> {
        return DoacaoFatura.rs_fatura_check.objects.findOne({token:token});
    }
}

export class DoacaoFaturaPagamento {
    public id: number;
    public invoice_id: number;
    public tipo: string;
    public status: string;
    public secure_url: string;
    public dt_updated: string;
    public dt_created: string;

    constructor(obj?: any){
        if(obj){
            Tools.setData(obj, this);
        }
    }
}
