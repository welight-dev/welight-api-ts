import { Tastypie } from "ts-resource-tastypie";
export interface EcommerceAuth {
    username: string;
    apikey: string;
}
export interface EcommerceCliente {
    id?: number;
    nome: string;
    email: string;
    dt_updated?: string;
    dt_created?: string;
}
export interface EcommerceVenda {
    id?: number;
    uid: string;
    moeda: string;
    valor: number;
    descricao: string;
    status: string;
    dt_updated?: string;
    dt_created?: string;
}
export interface EcommerceDoacao {
    doacao_porcent: number;
    doacao_total: number;
    porcentagem: boolean;
    fatura_id?: number;
    status?: string;
    url_select_ong?: string;
}
export interface EcommerceTestAbStatus {
    porcentagem_a: number;
    porcentagem_b: number;
    dt_start: string;
}
export declare class Venda extends Tastypie.Model<Venda> {
    static resource: Tastypie.Resource<Venda>;
    auth: EcommerceAuth;
    cliente: EcommerceCliente;
    venda: EcommerceVenda;
    doacao: EcommerceDoacao;
    ongs: Array<number>;
    test_ab: string;
    plataforma: string;
    constructor(obj?: any);
}
export declare class TesteAb extends Tastypie.Model<TesteAb> {
    static resource: Tastypie.Resource<TesteAb>;
    empresa_invite: string;
    ativo: boolean;
    porcentagem_a: number;
    porcentagem_b: number;
    current_teste_ab: string;
    current_status: EcommerceTestAbStatus;
    constructor(obj?: any);
}
