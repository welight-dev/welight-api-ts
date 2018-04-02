// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>

import * as api from "ts-resource-tastypie";
import * as weauth_models from "./weAuth";

export class Ong extends api.Tastypie.Model<Ong> {
    public static resource = new api.Tastypie.Resource<Ong>('ong/profile', {model: Ong});

    public nome: string;
    public email: string;
    public razao_social: string;
    public cnpj: string;
    public slug: string;
    public ativo: boolean;
    public qtde_pontos: string;
    public qtde_doadores: string;
    private _profile_detail: OngDetail;
    public dt_updated: string;
    public dt_created: string;

    private _user: weauth_models.User;
    private _timeline: api.Tastypie.Resource<OngTimeLine>;
    private _fotos: api.Tastypie.Resource<OngTimeLine>;
    private _videos: api.Tastypie.Resource<OngTimeLine>;

    constructor(obj?:any){
        super(Ong.resource, obj);
        this._user = new weauth_models.User();
        this.initProfile(obj);
    }

    private initProfile(obj:any): void {
        let _self = this;
        if(_self.id){
            _self._timeline = new api.Tastypie.Resource<OngTimeLine>('ong/timeline', {model: OngTimeLine, defaults: {ong_id: _self.id}});
            _self._fotos = new api.Tastypie.Resource<OngTimeLine>('ong/timeline', {model: OngTimeLine, defaults: {ong_id: _self.id, tipo: 'fotos'}});
            _self._videos = new api.Tastypie.Resource<OngTimeLine>('ong/timeline', {model: OngTimeLine, defaults: {ong_id: _self.id, tipo: 'videos'}});
        }
        if(obj.profile_detail) this._profile_detail = new OngDetail(obj.profile_detail);
    }

    public get profile_detail(): OngDetail {
        return this._profile_detail;
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

    public get user(): weauth_models.User {
        return this._user;
    }

    public getEndereco(): Promise<OngEndereco> {
        if(this.id){
            return OngEndereco.resource.objects.findOne({ong_id: this.id});
        }else{
            return api.Tastypie.Tools.generate_exception("[Ong][getEndereco] Ong não identificada");
        }
    }

    public createAccount(nome: string, email: string, razao_social: string, cnpj:string, kwargs?:any): Promise<Ong> {
        let _self = this;
        return this._user.createAccountOng(name, email, razao_social, cnpj, kwargs).then(
            function(user: weauth_models.User){
                let user_app = user.getUserAppAdmin('ong');
                return Ong.resource.objects.get(user_app.app_profile_id).then(
                    function(data: Ong){
                        _self.setData(data);
                        _self.initProfile(data);
                        return _self;
                    }
                );
            }
        );
    }

    public quickLogin(auth?:{username: string, apikey: string}, kwargs?:any): Promise<Ong> {
        let _self = this;
        return this._user.quickLogin(auth, kwargs).then(
            function(user: weauth_models.User){
                let user_app = user.current_user_app;

                if(!user_app){
                    user_app = user.getUserAppAdmin('ong');
                }

                if(!user_app){
                    _self._user = new weauth_models.User();
                    return api.Tastypie.Tools.generate_exception("[Ong][quickLogin] Usuario não identificado");
                }

                _self._user.current_user_app = user_app;

                return Ong.resource.objects.get(user_app.app_profile_id).then(
                    function(data: Ong){
                        _self.setData(data);
                        _self.initProfile(data);
                        return _self;
                    }
                );
            }
        );
    }
}

export class OngDetail extends api.Tastypie.Model<OngDetail> {

    public static resource = new api.Tastypie.Resource<OngDetail>('ong/profile/<id>/detail', {model: OngDetail});

    public contato_fone: string;

    public missao: string;
    public missao_resumo: string;

    public realizacao: string;
    public realizacao_resumo: string;

    public img_avatar: string;
    public img_fundo: string;
    public cor_filtro: string;

    public video_institucional: string;
    public estatuto_social: string;
    public ultima_assembleia: string;
    public website: string;
    public youtube: string;
    public facebook: string;
    public instagram: string;

    public dt_fundacao: string;
    public dt_updated: string;
    public dt_created: string;

    constructor(obj?:any){
      super(OngDetail.resource, obj);
    }
}

export class OngEndereco extends api.Tastypie.Model<OngEndereco> {

    public static resource = new api.Tastypie.Resource<OngEndereco>('ong/endereco', {model: OngEndereco});

    public cep: string;
    public rua: string;
    public numero: string;
    public complemento: string;
    public bairro: string;
    public cidade: string;
    public estado: string;
    public pais: string;

    constructor(obj?:any){
      super(OngEndereco.resource, obj);
    }
}

export class OngTimeLine extends api.Tastypie.Model<OngTimeLine> {
    public static resource = new api.Tastypie.Resource<OngTimeLine>('ong/timeline', {model: OngTimeLine});

    public ong: Ong;
    public descricao: string;
    public fotos: Array<string>;
    public site_scraped: any;
    public dt_updated: string;
    public dt_created: string;

    constructor(obj?:any){
        super(OngTimeLine.resource, obj);
        let _self = this;
        if(_self.ong) _self.ong = new Ong(_self.ong);
    }
}
