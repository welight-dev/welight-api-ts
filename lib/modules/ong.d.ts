import * as api from "ts-resource-tastypie";
import * as weauth_models from "./weAuth";
export declare class Ong extends api.Tastypie.Model<Ong> {
    static resource: api.Tastypie.Resource<Ong>;
    nome: string;
    email: string;
    razao_social: string;
    cnpj: string;
    slug: string;
    ativo: boolean;
    qtde_pontos: string;
    qtde_doadores: string;
    private _profile_detail;
    dt_updated: string;
    dt_created: string;
    private _user;
    private _timeline;
    private _fotos;
    private _videos;
    constructor(obj?: any);
    private initProfile(obj);
    profile_detail: OngDetail;
    readonly timeline: api.Tastypie.Resource<OngTimeLine>;
    readonly fotos: api.Tastypie.Resource<OngTimeLine>;
    readonly videos: api.Tastypie.Resource<OngTimeLine>;
    readonly user: weauth_models.User;
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
    private _endereco;
    getSobre(): Promise<OngProjetoSobre>;
    constructor(obj?: any);
    readonly endereco: api.Tastypie.Resource<OngProjetoEndereco>;
}
export declare class OngProjetoSobre extends api.Tastypie.Model<OngProjetoSobre> {
    static resource: api.Tastypie.Resource<OngProjetoSobre>;
    problema: string;
    impacto: string;
    meta: string;
    como_alcacar_meta: string;
    como_medir_impacto: string;
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
    constructor(obj?: any);
}
