import * as api from "ts-resource-tastypie";
import { Doador } from "./doador";
import { Ong } from "./ong";
import { Fatura, FaturaDistribuicao } from "./doadorEmpresaFatura";
import { StyleUi } from "./utils";
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
    private _doador;
    private _vendas;
    private _ongs;
    private _cliente;
    private _faturas;
    private _modulos;
    constructor(obj?: any);
    save(): Promise<Empresa>;
    private initProfile;
    readonly doador: Doador;
    readonly vendas: api.Tastypie.Resource<Venda>;
    readonly ongs: api.Tastypie.Resource<EmpresaOng>;
    readonly clientes: api.Tastypie.Resource<Cliente>;
    readonly faturas: api.Tastypie.Resource<Fatura>;
    readonly modulos: api.Tastypie.Resource<EmpresaModuloAtivo>;
    getEndereco(): Promise<EmpresaEndereco>;
    createAccount(nome: string, email: string, cpf_cnpj: string, kwargs?: any): Promise<Empresa>;
    login(username: string, password: string, kwargs?: any): Promise<Empresa>;
    quickLogin(auth?: {
        username: string;
        apikey: string;
    }, kwargs?: any): Promise<Empresa>;
}
export declare class EmpresaProduto extends api.Tastypie.Model<EmpresaProduto> {
    static resource: api.Tastypie.Resource<EmpresaProduto>;
    id: number;
    nome: string;
    token: string;
    dt_created: string;
    modulos: Array<EmpresaModulo>;
    constructor(obj?: any);
}
export declare class EmpresaModulo extends api.Tastypie.Model<EmpresaModulo> {
    static resource: api.Tastypie.Resource<EmpresaModulo>;
    nome: string;
    token: string;
    dt_created: string;
    produto: EmpresaProduto;
    plataformas: Array<EmpresaModuloPlataforma>;
    constructor(obj?: any);
}
export declare class EmpresaModuloPlataforma {
    nome: string;
    logo: string;
    token: string;
    dt_created: string;
    constructor(obj?: any);
}
export declare class EmpresaModuloAtivo extends api.Tastypie.Model<EmpresaModuloAtivo> {
    static resource: api.Tastypie.Resource<EmpresaModuloAtivo>;
    empresa_id: number;
    modulo_id: number;
    dt_created: string;
    modulo: EmpresaModulo;
    plataforma_config: Array<{
        'plataforma': EmpresaModuloPlataforma;
        'config': any;
    }>;
    constructor(obj?: any);
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
    private initProfile;
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
    modulo: EmpresaModulo;
    plataforma: EmpresaModuloPlataforma;
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
    titulo: string;
    mensagem: string;
    pagina_ui: StyleUi;
    titulo_pagina_ui: StyleUi;
    subtitulo_pagina_ui: StyleUi;
    titulo_doacao_ui: StyleUi;
    subtitulo_doacao_ui: StyleUi;
    botao_ui: StyleUi;
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
export declare class WidgetIconChoices extends api.Tastypie.Model<WidgetIconChoices> {
    static resource: api.Tastypie.Resource<WidgetIconChoices>;
    icon: string;
    token: string;
    dt_updated: string;
    dt_created: string;
    constructor(obj?: any);
}
export declare class EmpresaWidget extends api.Tastypie.Model<EmpresaWidget> {
    static resource: api.Tastypie.Resource<EmpresaWidget>;
    empresa: Empresa;
    empresa_id: number;
    titulo: string;
    subtitulo: string;
    icon: string;
    doacao_porcent: boolean;
    doacao_valor: number;
    alinhamento: string;
    cor_fundo: string;
    position: string;
    form_ui: StyleUi;
    botao_ui: StyleUi;
    pagina_conf: {
        "principal": {
            "ativo": boolean;
            "alinhamento": string;
            "abertura": string;
            "url_dinamica": boolean;
            "url": Array<string>;
            "url_selecionada": string;
            "url_posicao": string;
            "integracao": {
                "tipo": string;
                "index": string;
                "metodo": string;
                "visualizacao": string;
            };
        };
        "carrinho": {
            "ativo": boolean;
            "alinhamento": string;
            "abertura": string;
            "url_dinamica": boolean;
            "url": Array<string>;
            "url_selecionada": string;
            "url_posicao": string;
            "integracao": {
                "tipo": string;
                "index": string;
                "metodo": string;
                "visualizacao": string;
            };
        };
        "confirmacao": {
            "ativo": boolean;
            "alinhamento": string;
            "abertura": string;
            "url_dinamica": boolean;
            "url": Array<string>;
            "url_selecionada": string;
            "url_posicao": string;
            "integracao": {
                "tipo": string;
                "index": string;
                "metodo": string;
                "visualizacao": string;
            };
        };
        "sucesso": {
            "ativo": boolean;
            "alinhamento": string;
            "abertura": string;
            "url_dinamica": boolean;
            "url": Array<string>;
            "url_selecionada": string;
            "url_posicao": string;
            "integracao": {
                "tipo": string;
                "index": string;
                "metodo": string;
                "visualizacao": string;
            };
        };
    };
    ativo: boolean;
    dt_updated: string;
    dt_created: string;
    constructor(obj?: any, resource?: api.Tastypie.Resource<EmpresaWidget>);
}
export declare class EmpresaVtex extends EmpresaWidget {
    static resource: api.Tastypie.Resource<EmpresaVtex>;
    constructor(obj?: any);
}
export declare class EmpresaVnda extends EmpresaWidget {
    static resource: api.Tastypie.Resource<EmpresaVnda>;
    constructor(obj?: any);
}
export declare class EmpresaLojaintegrada extends EmpresaWidget {
    static resource: api.Tastypie.Resource<EmpresaLojaintegrada>;
    constructor(obj?: any);
}
export declare class EmpresaShopify extends EmpresaWidget {
    static resource: api.Tastypie.Resource<EmpresaShopify>;
    constructor(obj?: any);
}
export declare class EmpresaBigcommerce extends EmpresaWidget {
    static resource: api.Tastypie.Resource<EmpresaBigcommerce>;
    constructor(obj?: any);
}
export declare class EmpresaVolusion extends EmpresaWidget {
    static resource: api.Tastypie.Resource<EmpresaVolusion>;
    constructor(obj?: any);
}
export declare class Empresa3dCart extends EmpresaWidget {
    static resource: api.Tastypie.Resource<Empresa3dCart>;
    constructor(obj?: any);
}
export declare class EmpresaXtech extends EmpresaWidget {
    static resource: api.Tastypie.Resource<EmpresaXtech>;
    constructor(obj?: any);
}
export declare class EmpresaNuvemShop extends EmpresaWidget {
    static resource: api.Tastypie.Resource<EmpresaNuvemShop>;
    constructor(obj?: any);
}
export declare class EmpresaMercadoShops extends EmpresaWidget {
    static resource: api.Tastypie.Resource<EmpresaMercadoShops>;
    constructor(obj?: any);
}
export declare class EmpresaIluria extends EmpresaWidget {
    static resource: api.Tastypie.Resource<EmpresaIluria>;
    constructor(obj?: any);
}
export declare class EmpresaPrestaShop extends EmpresaWidget {
    static resource: api.Tastypie.Resource<EmpresaPrestaShop>;
    constructor(obj?: any);
}
export declare class EmpresaMagento extends EmpresaWidget {
    static resource: api.Tastypie.Resource<EmpresaMagento>;
    constructor(obj?: any);
}
export declare class EmpresaVirtueMart extends EmpresaWidget {
    static resource: api.Tastypie.Resource<EmpresaVirtueMart>;
    constructor(obj?: any);
}
export declare class EmpresaOpenCart extends EmpresaWidget {
    static resource: api.Tastypie.Resource<EmpresaOpenCart>;
    constructor(obj?: any);
}
export declare class EmpresaSignaShop extends EmpresaWidget {
    static resource: api.Tastypie.Resource<EmpresaSignaShop>;
    constructor(obj?: any);
}
export declare class EmpresaHotmart extends EmpresaWidget {
    static resource: api.Tastypie.Resource<EmpresaHotmart>;
    constructor(obj?: any);
}
export declare class EmpresaPdv extends api.Tastypie.Model<EmpresaPdv> {
    static resource: api.Tastypie.Resource<EmpresaPdv>;
    empresa_id: number;
    porcentagem: boolean;
    doacao_porcent: number;
    doacao_valor: number;
    titulo_ui: StyleUi;
    formulario_ui: StyleUi;
    botao_ui: StyleUi;
    subtitulo_ui: StyleUi;
    pagina_img_logo_ui: StyleUi;
    pagina_img_fundo: string;
    pagina_img_logo: string;
    pagina_cor_fundo: string;
    titulo_sucesso: string;
    mensagem_sucesso: string;
    mensagem_select_ong: string;
    dt_updated: string;
    dt_created: string;
    constructor(obj?: any);
}
