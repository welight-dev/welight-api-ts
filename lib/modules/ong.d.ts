import * as api from "ts-resource-tastypie";
export declare class Ong extends api.Tastypie.Model<Ong> {
    static resource: api.Tastypie.Resource<Ong>;
    nome: string;
    email: string;
    ativo: boolean;
    qtde_pontos: string;
    qtde_doadores: string;
    profile_detail: OngDetail;
    dt_updated: string;
    dt_created: string;
    private _timeline;
    private _fotos;
    private _videos;
    constructor(obj?: any);
    readonly timeline: api.Tastypie.Resource<OngTimeLine>;
    readonly fotos: api.Tastypie.Resource<OngTimeLine>;
    readonly videos: api.Tastypie.Resource<OngTimeLine>;
}
export declare class OngDetail extends api.Tastypie.Model<OngDetail> {
    static resource: api.Tastypie.Resource<OngDetail>;
    missao: string;
    missao_resumo: string;
    realizacao: string;
    realizacao_resumo: string;
    video_institucional: string;
    site: string;
    img_avatar: string;
    img_fundo: string;
    cor_filtro: string;
    dt_fundacao: string;
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
