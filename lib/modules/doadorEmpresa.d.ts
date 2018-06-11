import * as api from "ts-resource-tastypie";
import { Doador } from "./doador";
import { Ong } from "./ong";
import { Fatura } from "./doadorEmpresaFatura";
export declare class Empresa extends api.Tastypie.Model<Empresa> {
    static resource: api.Tastypie.Resource<Empresa>;
    nome: string;
    email: string;
    cpf_cnpj: string;
    slug: string;
    logo: string;
    website: string;
    token: string;
    acesso_ativo: boolean;
    tela_resposta: EmpresaTelaResposta;
    private _doador;
    private _vendas;
    private _ongs;
    private _cliente;
    private _faturas;
    constructor(obj?: any);
    save(): Promise<Empresa>;
    private initProfile(obj?);
    readonly doador: Doador;
    readonly vendas: api.Tastypie.Resource<Venda>;
    readonly ongs: api.Tastypie.Resource<EmpresaOng>;
    readonly clientes: api.Tastypie.Resource<Cliente>;
    readonly faturas: api.Tastypie.Resource<Fatura>;
    login(username: string, password: string, kwargs?: any): Promise<Empresa>;
    quickLogin(auth?: {
        username: string;
        apikey: string;
    }, kwargs?: any): Promise<Empresa>;
}
export declare class EmpresaOng extends api.Tastypie.Model<EmpresaOng> {
    static resource: api.Tastypie.Resource<EmpresaOng>;
    empresa_id: number;
    ong_id: number;
    ong: Ong;
    dt_created: string;
    constructor(obj?: any, _resource?: api.Tastypie.Resource<EmpresaOng>);
}
export declare class EmpresaOngPublic extends api.Tastypie.Model<EmpresaOng> {
    static resource: api.Tastypie.Resource<EmpresaOng>;
    empresa_id: number;
    ong_id: number;
    ong: Ong;
    dt_created: string;
    constructor(obj?: any, _resource?: api.Tastypie.Resource<EmpresaOng>);
}
export declare class ClienteOng extends api.Tastypie.Model<ClienteOng> {
    static resource: api.Tastypie.Resource<ClienteOng>;
    cliente_id: number;
    ong: Ong;
    constructor(obj?: any);
}
export declare class Cliente extends api.Tastypie.Model<Cliente> {
    static resource: api.Tastypie.Resource<Cliente>;
    empresa_id: number;
    nome: string;
    email: string;
    cliente_empresa: string;
    private _cliente_key;
    private _status_compras;
    private _compras;
    private _ongs;
    constructor(obj?: any, _resource?: api.Tastypie.Resource<Cliente>);
    private initProfile(obj?);
    save(): Promise<Cliente>;
    readonly cliente_key: string;
    readonly status_compras: {
        qtde: number;
        total_compra: number;
        total_doacao: number;
    };
    readonly ongs: api.Tastypie.Resource<ClienteOng>;
    readonly compras: api.Tastypie.Resource<Venda>;
}
export declare class Venda extends api.Tastypie.Model<Venda> {
    static resource: api.Tastypie.Resource<Venda>;
    empresa_id: number;
    cliente_id: number;
    empresa: Empresa;
    cliente: Cliente;
    moeda: string;
    valor_venda: number;
    porcentagem: boolean;
    doacao_porcent: number;
    doacao_total: number;
    status: string;
    origem: string;
    fatura_id: number;
    dt_updated: string;
    dt_created: string;
    ongs: api.Tastypie.Resource<ClienteVendaOng>;
    constructor(obj?: any, _resource?: api.Tastypie.Resource<Venda>);
}
export declare class ClienteVendaOng extends api.Tastypie.Model<ClienteVendaOng> {
    static resource: api.Tastypie.Resource<ClienteVendaOng>;
    venda_id: number;
    ong_id: number;
    ong: Ong;
    dt_created: string;
    constructor(obj?: any);
}
export declare class EmpresaTelaResposta extends api.Tastypie.Model<EmpresaTelaResposta> {
    static resource: api.Tastypie.Resource<EmpresaTelaResposta>;
    empresa_id: number;
    banner: string;
    mensagem: string;
    dt_updated: string;
    dt_created: string;
    constructor(obj?: any);
}
export declare class ClienteTelaResposta extends Venda {
    static resource: api.Tastypie.Resource<ClienteTelaResposta>;
    constructor(obj?: any);
}
export declare class EmpresaOngTelaResposta extends EmpresaOng {
    static resource: api.Tastypie.Resource<EmpresaOngTelaResposta>;
    checked: Boolean;
    children_id: number;
    constructor(obj?: any);
}
