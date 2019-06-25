import { Tastypie } from "ts-resource-tastypie";
export interface Auth {
    username: string;
    apikey: string;
}
export interface Cliente {
    id?: number;
    nome: string;
    email: string;
    dt_updated?: string;
    dt_created?: string;
}
export interface Venda {
    id?: number;
    uid: string;
    moeda: string;
    valor: number;
    descricao: string;
    status: string;
    dt_updated?: string;
    dt_created?: string;
}
export interface Doacao {
    doacao_porcent: number;
    doacao_total: number;
    porcentagem: boolean;
    fatura_id?: number;
    status?: string;
    url_select_ong?: string;
}
export declare class EcommerceVenda extends Tastypie.Model<EcommerceVenda> {
    static resource: Tastypie.Resource<EcommerceVenda>;
    auth: Auth;
    cliente: Cliente;
    venda: Venda;
    doacao: Doacao;
    ongs: Array<number>;
    test_ab: string;
    plataforma: string;
    constructor(obj?: any);
}
