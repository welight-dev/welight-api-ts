// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>


import { Tastypie } from "ts-resource-tastypie";
import { Empresa } from "./doadorEmpresa";

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

export class Venda extends Tastypie.Model<Venda> {

    public static resource = new Tastypie.Resource<Venda>('doador-empresa/ecommerce-venda', {model: Venda});

    public auth: EcommerceAuth;
    public cliente: EcommerceCliente;
    public venda: EcommerceVenda;
    public doacao: EcommerceDoacao;
    public ongs: Array<number>;
    public test_ab: string;
    public plataforma: string;

    constructor(obj?:any){
        super(Venda.resource, obj);
    }
}

export class TesteAb extends Tastypie.Model<TesteAb> {

    public static resource = new Tastypie.Resource<TesteAb>('doador-empresa/venda/current-teste-ab', {model: TesteAb});

    public empresa_invite: string;
    public ativo: boolean;
    public porcentagem_a: number;
    public porcentagem_b: number;
    public current_teste_ab: string;
    public current_status: EcommerceTestAbStatus;

    constructor(obj?:any){
        super(TesteAb.resource, obj);
    }
}
