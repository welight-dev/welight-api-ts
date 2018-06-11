import * as api from "ts-resource-tastypie";
import { Ong } from "./ong";
import { Empresa, Cliente } from "./doadorEmpresa";
export declare class Fatura extends api.Tastypie.Model<Fatura> {
    static resource: api.Tastypie.Resource<Fatura>;
    empresa_id: number;
    empresa: Empresa;
    mes: number;
    ano: number;
    dt_fechamento: string;
    tipo: string;
    qtde_vendas: number;
    moeda: string;
    total_fatura: number;
    total_taxa_adm: number;
    total_doacao_ong: number;
    total_doacao_ong_distribuido: number;
    pagamento_confirmado: boolean;
    ativa: boolean;
    doador_cached: boolean;
    dt_updated: string;
    dt_created: string;
    private _venda;
    private _distribuicao;
    constructor(obj?: any);
    readonly venda_detalhes: api.Tastypie.Resource<FaturaVenda>;
    readonly distribuicao_detalhes: api.Tastypie.Resource<FaturaDistribuicao>;
}
export declare class FaturaVenda extends api.Tastypie.Model<FaturaVenda> {
    static resource: api.Tastypie.Resource<FaturaVenda>;
    fatura_id: number;
    venda_id: number;
    cliente_id: number;
    cliente: Cliente;
    uid: string;
    origem: string;
    venda_moeda: string;
    venda_valor: number;
    porcentagem: boolean;
    doacao_porcent: number;
    doacao_valor: number;
    cotacao_brl: number;
    doacao_valor_brl: number;
    total_taxa_adm: number;
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
    total_doacao: number;
    total_taxa_adm: number;
    total_doacao_ong: number;
    constructor(obj?: any);
}
