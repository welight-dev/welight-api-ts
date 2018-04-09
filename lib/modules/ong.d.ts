import * as api from "ts-resource-tastypie";
import * as weauth_models from "./weAuth";
import { Ods } from "./onu";
export declare class Ong extends api.Tastypie.Model<Ong> {
    static resource: api.Tastypie.Resource<Ong>;
    nome: string;
    email: string;
    razao_social: string;
    cnpj: string;
    slug: string;
    private _ativo;
    private _qtde_pontos;
    private _qtde_doadores;
    private _profile_detail;
    private _dt_updated;
    private _dt_created;
    private _user;
    private _timeline;
    private _fotos;
    private _videos;
    private _projetos;
    private _bancos;
    constructor(obj?: any);
    save(): Promise<Ong>;
    private initProfile(obj);
    readonly ativo: boolean;
    readonly qtde_pontos: number;
    readonly qtde_doadores: number;
    readonly profile_detail: OngDetail;
    readonly dt_updated: string;
    readonly dt_created: string;
    readonly timeline: api.Tastypie.Resource<OngTimeLine>;
    readonly fotos: api.Tastypie.Resource<OngTimeLine>;
    readonly videos: api.Tastypie.Resource<OngTimeLine>;
    readonly user: weauth_models.User;
    readonly projetos: api.Tastypie.Resource<OngProjeto>;
    readonly bancos: api.Tastypie.Resource<OngBanco>;
    getEndereco(): Promise<OngEndereco>;
    createAccount(nome: string, email: string, razao_social: string, cnpj: string, kwargs?: any): Promise<Ong>;
    quickLogin(auth?: {
        username: string;
        apikey: string;
    }, kwargs?: any): Promise<Ong>;
}
export declare class OngDetail extends api.Tastypie.Model<OngDetail> {
    static resource: api.Tastypie.Resource<OngDetail>;
    contato_fone: string;
    missao: string;
    missao_resumo: string;
    realizacao: string;
    realizacao_resumo: string;
    img_avatar: string;
    img_fundo: string;
    cor_filtro: string;
    video_institucional: string;
    estatuto_social: string;
    ultima_assembleia: string;
    website: string;
    youtube: string;
    facebook: string;
    instagram: string;
    dt_fundacao: string;
    dt_updated: string;
    dt_created: string;
    constructor(obj?: any);
}
export declare class OngEndereco extends api.Tastypie.Model<OngEndereco> {
    static resource: api.Tastypie.Resource<OngEndereco>;
    ong_id: number;
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
export declare class OngBanco extends api.Tastypie.Model<OngBanco> {
    static resource: api.Tastypie.Resource<OngBanco>;
    ong_id: number;
    codigo: string;
    banco: string;
    conta_corrente: string;
    conta_corrente_digito: string;
    agencia: string;
    agencia_digito: string;
    pessoa_fisica: boolean;
    titular: string;
    cpf_cnpj: string;
    constructor(obj?: any);
}
export declare class OngTimeLine extends api.Tastypie.Model<OngTimeLine> {
    static resource: api.Tastypie.Resource<OngTimeLine>;
    ong: Ong;
    descricao: string;
    fotos: Array<string>;
    site_scraped: any;
    dt_updated: string;
    dt_created: string;
    constructor(obj?: any);
}
export declare class OngProjeto extends api.Tastypie.Model<OngProjeto> {
    static resource: api.Tastypie.Resource<OngProjeto>;
    nome: string;
    descricao: string;
    img_capa: string;
    periodo_continuo: boolean;
    dt_inicio: string;
    dt_fim: string;
    sem_local: boolean;
    sem_local_obs: string;
    ativo: boolean;
    inicializado: boolean;
    dt_updated: string;
    dt_created: string;
    private _endereco;
    private _ods;
    private _indicadores;
    getSobre(): Promise<OngProjetoSobre>;
    constructor(obj?: any);
    readonly endereco: api.Tastypie.Resource<OngProjetoEndereco>;
    readonly ods: api.Tastypie.Resource<OngProjetoOds>;
    readonly indicadores: api.Tastypie.Resource<OngProjetoIndicador>;
}
export declare class OngProjetoSobre extends api.Tastypie.Model<OngProjetoSobre> {
    static resource: api.Tastypie.Resource<OngProjetoSobre>;
    problema: string;
    impacto: string;
    meta: string;
    como_alcacar_meta: string;
    como_medir_impacto: string;
    dt_updated: string;
    dt_created: string;
    constructor(obj?: any);
}
export declare class OngProjetoEndereco extends api.Tastypie.Model<OngProjetoEndereco> {
    static resource: api.Tastypie.Resource<OngProjetoEndereco>;
    cep: string;
    rua: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
    pais: string;
    coordenadas: string;
    dt_updated: string;
    dt_created: string;
    constructor(obj?: any);
}
export declare class OngProjetoOds extends api.Tastypie.Model<OngProjetoOds> {
    static resource: api.Tastypie.Resource<OngProjetoOds>;
    ong_projeto_id: number;
    ods_id: number;
    ods: Ods;
    dt_created: string;
    constructor(obj?: any);
}
export declare class Indicador extends api.Tastypie.Model<Indicador> {
    static resource: api.Tastypie.Resource<Indicador>;
    nome: string;
    ativo: boolean;
    aprovado: boolean;
    dt_updated: string;
    dt_created: string;
    constructor(obj?: any);
}
export declare class IndicadorUnidade extends api.Tastypie.Model<IndicadorUnidade> {
    static resource: api.Tastypie.Resource<IndicadorUnidade>;
    unidade: string;
    descricao: string;
    texto: string;
    dt_updated: string;
    dt_created: string;
    constructor(obj?: any);
}
export declare class OngProjetoIndicador extends api.Tastypie.Model<OngProjetoIndicador> {
    static resource: api.Tastypie.Resource<OngProjetoIndicador>;
    ong_projeto_id: number;
    indicador_unidade_id: number;
    indicador_unidade: IndicadorUnidade;
    indicador: string;
    ponto_zero: string;
    dt_ponto_zero: string;
    dt_updated: string;
    dt_created: string;
    constructor(obj?: any);
}
