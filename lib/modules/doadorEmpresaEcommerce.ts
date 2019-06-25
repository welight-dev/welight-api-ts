// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>


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

export class EcommerceVenda extends Tastypie.Model<EcommerceVenda> {

    public static resource = new Tastypie.Resource<EcommerceVenda>('doador-empresa/ecommerce-venda', {model: EcommerceVenda});

    public auth: Auth;
    public cliente: Cliente;
    public venda: Venda;
    public doacao: Doacao;
    public ongs: Array<number>;
    public test_ab: string;
    public plataforma: string;

    constructor(obj?:any){
        super(EcommerceVenda.resource, obj);
    }
}
