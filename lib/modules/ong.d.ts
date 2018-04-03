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
    private _ods;
    getSobre(): Promise<OngProjetoSobre>;
    constructor(obj?: any);
    readonly endereco: api.Tastypie.Resource<OngProjetoEndereco>;
    readonly ods: api.Tastypie.Resource<OngProjetoOds>;
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
export declare class OngProjetoOds extends api.Tastypie.Model<OngProjetoOds> {
    static resource: api.Tastypie.Resource<OngProjetoOds>;
    ong_projeto_id: number;
    ods_id: number;
    ods: Ods;
    constructor(obj?: any);
}
