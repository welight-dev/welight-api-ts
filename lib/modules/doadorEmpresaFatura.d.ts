import * as api from "ts-resource-tastypie";
import { Ong } from "./ong";
import { Empresa, EmpresaProduto, EmpresaModulo, EmpresaModuloPlataforma, Cliente } from "./doadorEmpresa";
export declare class Fatura extends api.Tastypie.Model<Fatura> {
    static resource: api.Tastypie.Resource<Fatura>;
    empresa_id: number;
    empresa: Empresa;
    produto: EmpresaProduto;
    mes: number;
    ano: number;
    dt_fechamento: string;
    qtde_vendas: number;
    moeda: string;
    total_vendas: number;
    total_doacao: number;
    total_taxa_adm: number;
    total_fatura: number;
    total_doacao_ong_distribuido: number;
    pago: boolean;
    dt_updated: string;
    dt_created: string;
    taxas: Array<FaturaTaxa>;
    pagamentos: Array<FaturaPagamento>;
    private _venda;
    private _distribuicao;
    private _ong_distribuicao;
    constructor(obj?: any);
    get venda(): api.Tastypie.Resource<FaturaVenda>;
    get distribuicao(): api.Tastypie.Resource<FaturaDistribuicao>;
    get ong_distribuicao(): api.Tastypie.Resource<FaturaOngDistribuicao>;
}
export declare class FaturaTaxa {
    id: number;
    nome: string;
    tipo: string;
    taxa: number;
    porcentagem: boolean;
    total_taxa: string;
    constructor(obj?: any);
}
export declare class FaturaVenda extends api.Tastypie.Model<FaturaVenda> {
    static resource: api.Tastypie.Resource<FaturaVenda>;
    fatura_id: number;
    venda_id: number;
    cliente_id: number;
    produto_id: number;
    modulo_id: number;
    plataforma_id: number;
    cliente: Cliente;
    modulo: EmpresaModulo;
    plataforma: EmpresaModuloPlataforma;
    uid: string;
    venda_moeda: string;
    venda_valor: number;
    porcentagem: boolean;
    doacao_porcent: number;
    doacao_valor: number;
    cotacao_brl: number;
    doacao_ong: number;
    dt_venda: string;
    constructor(obj?: any);
}
export declare class FaturaDistribuicao extends api.Tastypie.Model<FaturaDistribuicao> {
    static resource: api.Tastypie.Resource<FaturaDistribuicao>;
    fatura_id: number;
    cliente_id: number;
    ong_id: number;
    cliente: Cliente;
    ong: Ong;
    moeda: string;
    doacao_ong: number;
    constructor(obj?: any);
}
export declare class FaturaOngDistribuicao extends api.Tastypie.Model<FaturaOngDistribuicao> {
    static resource: api.Tastypie.Resource<FaturaOngDistribuicao>;
    fatura_id: number;
    ong_id: number;
    ong: Ong;
    moeda: string;
    doacao_ong: number;
    constructor(obj?: any);
}
export declare class FaturaPagamento {
    id: number;
    fatura_id: number;
    total: number;
    vencimento: string;
    invoice_id: string;
    tipo: string;
    status: string;
    target: string;
    secure_url: string;
    dt_updated: string;
    dt_created: string;
    constructor(obj?: any);
}
