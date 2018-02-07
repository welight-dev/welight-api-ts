// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>

import * as api from "ts-resource-tastypie";

export class Ong extends api.Tastypie.Model<Ong> {
    public static resource = new api.Tastypie.Resource<Ong>('ong/profile', {model: Ong});

    public nome: string;
    public email: string;
    public ativo: boolean;
    public qtde_pontos: string;
    public qtde_doadores: string;
    public profile_detail: OngDetail;
    public dt_updated: string;
    public dt_created: string;

    private _timeline: api.Tastypie.Resource<OngTimeLine>;
    private _fotos: api.Tastypie.Resource<OngTimeLine>;
    private _videos: api.Tastypie.Resource<OngTimeLine>;

    constructor(obj?:any){
        super(Ong.resource, obj);
        let _self = this;
        if(_self.id){
            _self._timeline = new api.Tastypie.Resource<OngTimeLine>('ong/timeline', {model: OngTimeLine, defaults: {ong_id: _self.id}});
            _self._fotos = new api.Tastypie.Resource<OngTimeLine>('ong/timeline', {model: OngTimeLine, defaults: {ong_id: _self.id, tipo: 'fotos'}});
            _self._videos = new api.Tastypie.Resource<OngTimeLine>('ong/timeline', {model: OngTimeLine, defaults: {ong_id: _self.id, tipo: 'videos'}});
        }

        if(_self.profile_detail) _self.profile_detail = new OngDetail(_self.profile_detail);
    }

    public get timeline(): api.Tastypie.Resource<OngTimeLine> {
        return this._timeline;
    }

    public get fotos(): api.Tastypie.Resource<OngTimeLine> {
        return this._fotos;
    }

    public get videos(): api.Tastypie.Resource<OngTimeLine> {
        return this._videos;
    }
}

export class OngDetail extends api.Tastypie.Model<OngDetail> {

    public static resource = new api.Tastypie.Resource<OngDetail>('ong/profile/<id>/detail', {model: OngDetail});

    public missao: string;
    public missao_resumo: string;

    public realizacao: string;
    public realizacao_resumo: string;

    public video_institucional: string;
    public site: string;

    public img_avatar: string;
    public img_fundo: string;
    public cor_filtro: string;

    public dt_fundacao: string;

    constructor(obj?:any){
      super(OngDetail.resource, obj);
    }
}

export class OngTimeLine extends api.Tastypie.Model<OngTimeLine> {
    public static resource = new api.Tastypie.Resource<OngTimeLine>('ong/timeline', {model: OngTimeLine});

    public ong: Ong;
    public descricao: string;
    public fotos: Array<string>;
    public site_scraped: any;
    public instituicao: any;
    public criado_em: string;
    public atualizado_em: string;


    constructor(obj?:any){
        super(OngTimeLine.resource, obj);
        let _self = this;
        if(_self.ong) _self.ong = new Ong(_self.ong);
    }
}
