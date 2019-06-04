// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>

import * as api from "ts-resource-tastypie";

import { Ong } from "./ong";
import { Empresa, EmpresaProduto, EmpresaModulo, EmpresaModuloPlataforma, Cliente } from "./doadorEmpresa";


export class Fatura extends api.Tastypie.Model<Fatura> {
    public static resource = new api.Tastypie.Resource<Fatura>('doador-empresa-fatura/fatura', {model: Fatura});

    public empresa_id: number;

    public empresa: Empresa;
    public produto: EmpresaProduto;
    public mes: number;
    public ano: number;
    public dt_fechamento: string;
    public qtde_vendas: number;
    public moeda: string;
    public total_vendas: number;
    public total_doacao: number;
    public total_taxa_adm: number;
    public total_fatura: number;
    public total_doacao_ong_distribuido: number;
    public pago: boolean;
    public dt_updated: string;
    public dt_created: string;

    public taxas: Array<FaturaTaxa>;
    public pagamentos: Array<FaturaPagamento>;

    private _venda: api.Tastypie.Resource<FaturaVenda>;
    private _distribuicao: api.Tastypie.Resource<FaturaDistribuicao>;
    private _ong_distribuicao: api.Tastypie.Resource<FaturaOngDistribuicao>;

    constructor(obj?:any){
        super(Fatura.resource, obj);
        this.taxas = [];
        this.pagamentos = [];

        if(obj){
            if(obj.empresa) this.empresa = new Empresa(obj.empresa);

            if(obj.id){
                this._venda = new api.Tastypie.Resource<FaturaVenda>('doador-empresa-fatura/venda', {model: FaturaVenda, defaults: {fatura_id: obj.id}});
                this._distribuicao = new api.Tastypie.Resource<FaturaDistribuicao>('doador-empresa-fatura/distribuicao', {model: FaturaDistribuicao, defaults: {fatura_id: obj.id}});
                this._ong_distribuicao = new api.Tastypie.Resource<FaturaOngDistribuicao>('doador-empresa-fatura/ong-distribuicao', {model: FaturaOngDistribuicao, defaults: {fatura_id: obj.id}});
            }

            if(obj.taxas){
                for(let taxa of obj.taxas){
                    this.taxas.push(new FaturaTaxa(taxa));
                }
            }

            if(obj.pagamentos){
                for(let pag of obj.pagamentos){
                    this.pagamentos.push(new FaturaPagamento(pag));
                }
            }
        }
    }

    public get venda(): api.Tastypie.Resource<FaturaVenda> {
        return this._venda;
    }

    public get distribuicao(): api.Tastypie.Resource<FaturaDistribuicao> {
        return this._distribuicao;
    }

    public get ong_distribuicao(): api.Tastypie.Resource<FaturaOngDistribuicao> {
        return this._ong_distribuicao;
    }
}

export class FaturaTaxa {
    public id: number;
    public nome: string;
    public tipo: string;
    public taxa: number;
    public porcentagem: boolean;
    public total_taxa: string;

    constructor(obj?:any){
        if(obj){
            this.id = obj.id;
            this.nome = obj.nome;
            this.tipo = obj.tipo;
            this.taxa = obj.taxa;
            this.porcentagem = obj.porcentagem;
            this.total_taxa = obj.total_taxa;
        }
    }
}

export class FaturaVenda extends api.Tastypie.Model<FaturaVenda> {
    public static resource = new api.Tastypie.Resource<FaturaVenda>('doador-empresa-fatura/venda', {model: FaturaVenda});

    public fatura_id: number;
    public venda_id: number;
    public cliente_id: number;
    public produto_id: number;
    public modulo_id: number;
    public plataforma_id: number;

    public cliente: Cliente;
    public modulo: EmpresaModulo;
    public plataforma: EmpresaModuloPlataforma;

    public uid: string;
    public venda_moeda: string;
    public venda_valor: number;
    public porcentagem: boolean;
    public doacao_porcent: number;
    public doacao_valor: number;
    public cotacao_brl: number;
    public doacao_ong: number;
    public dt_venda: string;

    constructor(obj?:any){
        super(FaturaVenda.resource, obj);
        if(obj){
            if(obj.cliente) this.cliente = new Cliente(obj.cliente);
            if(obj.modulo) this.modulo = new EmpresaModulo(obj.modulo);
            if(obj.plataforma) this.plataforma = new EmpresaModuloPlataforma(obj.plataforma);
        }
    }
}

export class FaturaDistribuicao extends api.Tastypie.Model<FaturaDistribuicao> {
    public static resource = new api.Tastypie.Resource<FaturaDistribuicao>('doador-empresa-fatura/distribuicao', {model: FaturaDistribuicao});

    public fatura_id: number;
    public cliente_id: number;
    public ong_id: number;

    public cliente: Cliente;
    public ong: Ong;
    public moeda: string;
    public doacao_ong: number;

    constructor(obj?:any){
        super(FaturaDistribuicao.resource, obj);
        if(obj){
            if(obj.ong) this.ong = new Ong(obj.ong);
            if(obj.cliente) this.cliente = new Cliente(obj.cliente);
        }
    }
}


export class FaturaOngDistribuicao extends api.Tastypie.Model<FaturaOngDistribuicao> {
    public static resource = new api.Tastypie.Resource<FaturaOngDistribuicao>('doador-empresa-fatura/ong-distribuicao', {model: FaturaOngDistribuicao});

    public fatura_id: number;
    public ong_id: number;
    public ong: Ong;
    public moeda: string;
    public doacao_ong: number;

    constructor(obj?:any){
        super(FaturaOngDistribuicao.resource, obj);
        if(obj){
            if(obj.ong) this.ong = new Ong(obj.ong);
        }
    }
}


export class FaturaPagamento {
    public id: number;
    public fatura_id: number;
    public total: number;
    public vencimento: string;
    public invoice_id: string;
    public tipo: string;
    public status: string;
    public target: string;
    public secure_url: string;
    public dt_updated: string;
    public dt_created: string;

    constructor(obj?:any){
        if(obj){
            this.id = obj.id;
            this.fatura_id = obj.fatura_id;
            this.total = obj.total;
            this.vencimento = obj.vencimento;
            this.invoice_id = obj.invoice_id;
            this.tipo = obj.tipo;
            this.status = obj.status;
            this.target = obj.target;
            this.secure_url = obj.secure_url;
            this.dt_updated = obj.dt_updated;
            this.dt_created = obj.dt_created;
        }
    }
}
