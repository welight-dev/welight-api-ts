import * as api from "ts-resource-tastypie";
import { Doador } from "./doador";
import { Ong } from "./ong";
import { Fatura, FaturaDistribuicao } from "./doadorEmpresaFatura";
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
    createAccount(nome: string, email: string, cpf_cnpj: string, kwargs?: any): Promise<Empresa>;
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
    cliente_key: string;
    status_compras: {
        qtde: number;
        total_compra: number;
        total_doacao: number;
    };
    private _compras;
    private _ongs;
    private _doacoes;
    constructor(obj?: any, _resource?: api.Tastypie.Resource<Cliente>);
    private initProfile(obj?);
    save(): Promise<Cliente>;
    readonly ongs: api.Tastypie.Resource<ClienteOng>;
    readonly compras: api.Tastypie.Resource<Venda>;
    readonly doacoes: api.Tastypie.Resource<FaturaDistribuicao>;
}
export declare class Venda extends api.Tastypie.Model<Venda> {
    static resource: api.Tastypie.Resource<Venda>;
    empresa_id: number;
    cliente_id: number;
    empresa: Empresa;
    cliente: Cliente;
    uid: string;
    venda_moeda: string;
    venda_valor: number;
    porcentagem: boolean;
    doacao_porcent: number;
    doacao_valor: number;
    cotacao_brl: number;
    doacao_valor_brl: number;
    total_taxa_adm: number;
    doacao_ong: number;
    origem: string;
    status: string;
    fatura_id: number;
    descricao: number;
    dt_updated: string;
    dt_created: string;
    private _ongs;
    constructor(obj?: any, _resource?: api.Tastypie.Resource<Venda>);
    readonly ongs: api.Tastypie.Resource<ClienteVendaOng>;
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
