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
export declare class IngressoFatura {
    ingresso_id: number;
    nome: string;
    cpf: string;
    qtde: number;
    moeda: string;
    total: number;
    pago: boolean;
    vencimento: string;
    dt_updated: string;
    dt_created: string;
    pagamento: IngressoFaturaPagamento;
    convidados: Array<IngressoFaturaCliente>;
    constructor(obj?: any);
}
export declare class IngressoFaturaCliente {
    ingresso_fatura_id: number;
    nome: string;
    cpf: string;
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
    slug: string;
    dt_updated: string;
    dt_created: string;
    evento: Evento;
    private _check_fatura_vip;
    private _gerar_fatura_vip;
    private _check_entrada;
    private _confirmar_entrada;
    constructor(obj?: any, _resource?: api.Tastypie.Resource<IngressoPublic>);
    check_fatura_vip(ingresso_id: number, cpf: string): Promise<FaturaVip>;
    gerar_fatura_vip(ingresso_id: number, cpf: string, qtde: number, convidados: Array<{
        nome: string;
        cpf: string;
    }>, ongs: Array<number>): Promise<IngressoFatura>;
    check_entrada(ingresso_id: number, cpf: string): Promise<IngressoFatura>;
    confirmar_entrada(ingresso_id: number, cpf: string): Promise<IngressoFatura>;
}
