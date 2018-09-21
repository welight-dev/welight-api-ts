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
    invite: string;
    acesso_ativo: boolean;
    tela_resposta: EmpresaTelaResposta;
    profile_detail: EmpresaDetail;
    endereco: EmpresaEndereco;
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
    getEndereco(): Promise<EmpresaEndereco>;
    getVtexConf(): Promise<EmpresaVtex>;
    createAccount(nome: string, email: string, cpf_cnpj: string, kwargs?: any): Promise<Empresa>;
    login(username: string, password: string, kwargs?: any): Promise<Empresa>;
    quickLogin(auth?: {
        username: string;
        apikey: string;
    }, kwargs?: any): Promise<Empresa>;
}
export declare class EmpresaDetail extends api.Tastypie.Model<EmpresaDetail> {
    static resource: api.Tastypie.Resource<EmpresaDetail>;
    empresa_id: number;
    telefone: string;
    qtde_venda_mes: number;
    ticket_medio: number;
    dt_updated: string;
    dt_created: string;
    constructor(obj?: any);
}
export declare class EmpresaEndereco extends api.Tastypie.Model<EmpresaEndereco> {
    static resource: api.Tastypie.Resource<EmpresaEndereco>;
    empresa_id: number;
    cep: string;
    rua: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
    pais: string;
    constructor(obj?: any);
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
    status_venda: string;
    status_doacao: string;
    teste_ab: string;
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
export declare class VendaAnalytics extends api.Tastypie.Model<VendaAnalytics> {
    static resource: api.Tastypie.Resource<VendaAnalytics>;
    teste: {
        "a": number;
        "b": number;
    };
    audiencia: {
        "sucesso": {
            "a": number;
            "b": number;
        };
        "abandono": {
            "a": number;
            "b": number;
        };
        "ticket_medio": {
            "a": number;
            "b": number;
        };
    };
    timeline: Array<{
        "title": string;
        "content": {
            "a": number;
            "b": number;
        };
    }>;
    ongs: Array<{
        "ong_id": number;
        "ong_nome": string;
        "porcentagem": number;
        "qtde": number;
    }>;
    constructor(obj?: any);
}
export declare class VtexIconChoices extends api.Tastypie.Model<VtexIconChoices> {
    static resource: api.Tastypie.Resource<VtexIconChoices>;
    icon: string;
    token: string;
    dt_updated: string;
    dt_created: string;
    constructor(obj?: any);
}
export declare class EmpresaVtex extends api.Tastypie.Model<EmpresaVtex> {
    static resource: api.Tastypie.Resource<EmpresaVtex>;
    empresa_id: number;
    icon_choices_id: number;
    icon_choices: VtexIconChoices;
    titulo: string;
    doacao_porcent: boolean;
    doacao_valor: number;
    alinhamento: string;
    cor_icone: string;
    cor_fundo: string;
    ativo: boolean;
    dt_updated: string;
    dt_created: string;
    constructor(obj?: any);
}
