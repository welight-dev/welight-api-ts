import * as api from "ts-resource-tastypie";
import { Empresa } from "./doadorEmpresa";
export declare class ClienteVip {
    ingresso_id: number;
    nome: string;
    cpf: string;
    qtde_ingresso: number;
    dt_updated: string;
    dt_created: string;
    constructor(obj?: any);
}
export declare class IngressoCupom {
    id: number;
    ingresso_id: number;
    nome_parceiro: string;
    desconto: number;
    qtde: number;
    codigo: string;
    dt_updated: string;
    dt_created: string;
    constructor(obj?: any);
}
export declare class IngressoCupomFatura {
    id: number;
    ingresso_fatura_id: number;
    qtde: number;
    dt_updated: string;
    dt_created: string;
    private _ingresso_cupom;
    constructor(obj?: any);
    readonly ingresso_cupom: IngressoCupom;
}
export declare class IngressoFatura {
    id: number;
    ingresso_id: number;
    nome: string;
    cpf: string;
    email: string;
    qtde: number;
    moeda: string;
    total_ingresso: number;
    total_desconto: number;
    total_taxa_adm: number;
    total: number;
    pago: boolean;
    vencimento: string;
    token: string;
    dt_updated: string;
    dt_created: string;
    pagamento: IngressoFaturaPagamento;
    convidados: Array<IngressoFaturaCliente>;
    ingresso: IngressoPublic;
    constructor(obj?: any);
}
export declare class IngressoFaturaCliente {
    ingresso_fatura_id: number;
    nome: string;
    cpf: string;
    email: string;
    sexo: string;
    entrada_confirmada: boolean;
    dt_entrada: string;
    constructor(obj?: any);
}
export declare class IngressoFaturaPagamento {
    ingresso_fatura_id: number;
    invoice_id: string;
    tipo: string;
    status: string;
    secure_url: string;
    dt_updated: string;
    dt_created: string;
    constructor(obj?: any);
}
export declare class FaturaVip {
    vip: ClienteVip;
    faturas: Array<IngressoFatura>;
    constructor(obj?: any);
}
export declare class Evento extends api.Tastypie.Model<Evento> {
    static resource: api.Tastypie.Resource<Evento>;
    empresa: Empresa;
    nome: string;
    local: boolean;
    descricao: string;
    logo: string;
    website: string;
    dt_evento: string;
    dt_updated: string;
    dt_created: string;
    constructor(obj?: any, _resource?: api.Tastypie.Resource<Evento>);
}
export declare class IngressoPublic extends api.Tastypie.Model<IngressoPublic> {
    static resource: api.Tastypie.Resource<IngressoPublic>;
    evento_id: number;
    nome: string;
    vip: boolean;
    moeda: string;
    valor: number;
    taxa: number;
    total: number;
    doacao_taxa: number;
    doacao_total: number;
    slug: string;
    dt_updated: string;
    dt_created: string;
    evento: Evento;
    private _check_fatura_vip;
    private _gerar_fatura_vip;
    private _gerar_fatura;
    private _check_fatura;
    private _check_entrada;
    private _check_cupom;
    private _confirmar_entrada;
    constructor(obj?: any, _resource?: api.Tastypie.Resource<IngressoPublic>);
    check_fatura_vip(ingresso_id: number, cpf: string): Promise<FaturaVip>;
    gerar_fatura_vip(ingresso_id: number, cpf: string, qtde: number, convidados: Array<{
        nome: string;
        cpf: string;
    }>, ongs: Array<number>): Promise<IngressoFatura>;
    gerar_fatura(nome: string, cpf: string, email: string, qtde: number, tipo_pagamento: string, convidados: Array<{
        nome: string;
        cpf: string;
        email: string;
        sexo: string;
    }>, ongs?: Array<number>, desconto_id?: number): Promise<IngressoFatura>;
    check_fatura(token: string): Promise<IngressoFatura>;
    check_entrada(ingresso_id: number, cpf: string): Promise<IngressoFatura>;
    check_cupom(ingresso_id: number, codigo: string, qtde: number): Promise<IngressoCupomFatura>;
    confirmar_entrada(ingresso_id: number, cpf: string): Promise<IngressoFatura>;
}
