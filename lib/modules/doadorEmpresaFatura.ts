// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>

import * as api from "ts-resource-tastypie";

import { Ong } from "./ong";
import { Empresa, Cliente } from "./doadorEmpresa";


export class Fatura extends api.Tastypie.Model<Fatura> {
    public static resource = new api.Tastypie.Resource<Fatura>('doador-empresa-fatura/fatura', {model: Fatura});

    public empresa_id: number;

    public empresa: Empresa;
    public mes: number;
    public ano: number;
    public dt_fechamento: string;
    public tipo: string;
    public qtde_vendas: number;
    public moeda: string;
    public total_fatura: number;
    public total_taxa_adm: number;
    public total_doacao_ong: number;
    public total_doacao_ong_distribuido: number;
    public pagamento_confirmado: boolean;
    public ativa: boolean;
    public doador_cached: boolean;
    public dt_updated: string;
    public dt_created: string;

    private _venda: api.Tastypie.Resource<FaturaVenda>;
    private _distribuicao: api.Tastypie.Resource<FaturaDistribuicao>;

    constructor(obj?:any){
        super(Fatura.resource, obj);
        if(obj){
            if(obj.empresa) this.empresa = new Empresa(obj.empresa);
            if(obj.id){
                this._venda = new api.Tastypie.Resource<FaturaVenda>('doador-empresa-fatura/fatura-venda', {model: FaturaVenda, defaults: {fatura_id: obj.id}});
                this._distribuicao = new api.Tastypie.Resource<FaturaDistribuicao>('doador-empresa-fatura/fatura-distribuicao', {model: FaturaDistribuicao, defaults: {fatura_id: obj.id}});
            }
        }
    }

    public get venda_detalhes(): api.Tastypie.Resource<FaturaVenda> {
        return this._venda;
    }

    public get distribuicao_detalhes(): api.Tastypie.Resource<FaturaDistribuicao> {
        return this._distribuicao;
    }
}

export class FaturaVenda extends api.Tastypie.Model<FaturaVenda> {
    public static resource = new api.Tastypie.Resource<FaturaVenda>('doador-empresa-fatura/fatura-venda', {model: FaturaVenda});

    public fatura_id: number;
    public venda_id: number;
    public cliente_id: number;

    public cliente: Cliente;
    public uid: string;
    public origem: string;
    public venda_moeda: string;
    public venda_valor: number;
    public porcentagem: boolean;
    public doacao_porcent: number;
    public doacao_valor: number;
    public cotacao_brl: number;
    public doacao_valor_brl: number;
    public total_taxa_adm: number;
    public doacao_ong: number;
    public dt_venda: string;

    constructor(obj?:any){
        super(FaturaVenda.resource, obj);
        if(obj){
            if(obj.cliente) this.cliente = new Cliente(obj.cliente);
        }
    }
}

export class FaturaDistribuicao extends api.Tastypie.Model<FaturaDistribuicao> {
    public static resource = new api.Tastypie.Resource<FaturaDistribuicao>('doador-empresa-fatura/fatura-distribuicao', {model: FaturaDistribuicao});

    public fatura_id: number;
    public cliente_id: number;
    public ong_id: number;

    public cliente: Cliente;
    public ong: Ong;
    public moeda: string;
    public total_doacao: number;
    public total_taxa_adm: number;
    public total_doacao_ong: number;

    constructor(obj?:any){
        super(FaturaDistribuicao.resource, obj);
        if(obj){
            if(obj.ong) this.ong = new Ong(obj.ong);
            if(obj.cliente) this.cliente = new Cliente(obj.cliente);
        }
    }
}
