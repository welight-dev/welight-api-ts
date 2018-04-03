// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>

import * as api from "ts-resource-tastypie";
import * as weauth_models from "./weAuth";
import { Ods } from "./onu";

export class Ong extends api.Tastypie.Model<Ong> {
    public static resource = new api.Tastypie.Resource<Ong>('ong/profile', {model: Ong});

    public nome: string;
    public email: string;
    public razao_social: string;
    public cnpj: string;
    public slug: string;

    private _ativo: boolean;
    private _qtde_pontos: number;
    private _qtde_doadores: number;
    private _profile_detail: OngDetail;
    private _dt_updated: string;
    private _dt_created: string;

    private _user: weauth_models.User;
    private _timeline: api.Tastypie.Resource<OngTimeLine>;
    private _fotos: api.Tastypie.Resource<OngTimeLine>;
    private _videos: api.Tastypie.Resource<OngTimeLine>;
    private _projetos: api.Tastypie.Resource<OngProjeto>;

    constructor(obj?:any){
        super(Ong.resource);
        this._user = new weauth_models.User();
        this.initProfile(obj);
    }

    public save(): Promise<Ong> {
        let _self = this;
        return Ong.resource.objects.update(_self.id, {
          nome: _self.nome,
          email: _self.email,
          razao_social: _self.razao_social,
          cnpj: _self.cnpj,
          slug: _self.slug
        }).then(
            function(data: Ong){
                _self.initProfile(data);
                return _self;
            }
        )
    }

    private initProfile(obj:any): void {
        let _self = this;
        if(obj){
            _self.id = obj.id;
            _self.nome = obj.nome;
            _self.email = obj.email;
            _self.razao_social = obj.razao_social;
            _self.cnpj = obj.cnpj;
            _self.slug = obj.slug;

            _self._ativo = obj.ativo;
            _self._qtde_pontos = obj.qtde_pontos;
            _self._qtde_doadores = obj.qtde_doadores;
            _self._dt_updated = obj.dt_updated;
            _self._dt_created = obj.dt_created;

            if(obj.profile_detail) _self._profile_detail = new OngDetail(obj.profile_detail);

            if(_self.id){
                _self._timeline = new api.Tastypie.Resource<OngTimeLine>('ong/timeline', {model: OngTimeLine, defaults: {ong_id: _self.id}});
                _self._fotos = new api.Tastypie.Resource<OngTimeLine>('ong/timeline', {model: OngTimeLine, defaults: {ong_id: _self.id, tipo: 'fotos'}});
                _self._videos = new api.Tastypie.Resource<OngTimeLine>('ong/timeline', {model: OngTimeLine, defaults: {ong_id: _self.id, tipo: 'videos'}});
                _self._projetos = new api.Tastypie.Resource<OngProjeto>('ong/projeto', {model: OngProjeto, defaults: {ong_id: _self.id}});
            }
        }else{
            _self._profile_detail = new OngDetail();
        }
    }

    public get ativo(): boolean {
        return this._ativo;
    }

    public get qtde_pontos(): number {
        return this._qtde_pontos;
    }

    public get qtde_doadores(): number {
        return this._qtde_doadores;
    }

    public get profile_detail(): OngDetail {
        return this._profile_detail;
    }

    public get dt_updated(): string {
        return this._dt_updated;
    }

    public get dt_created(): string {
        return this._dt_created;
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

    public get projetos(): api.Tastypie.Resource<OngProjeto> {
        return this._projetos;
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

    public ong_id: number;
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


export class OngProjeto extends api.Tastypie.Model<OngProjeto> {
    public static resource = new api.Tastypie.Resource<OngProjeto>('ong/projeto', {model: OngProjeto});

    public nome: string;
    public descricao: string;
    public img_capa: string;
    public periodo_continuo: boolean;
    public dt_inicio: string;
    public dt_fim: string;
    public sem_local: boolean;
    public sem_local_obs: string;

    private _endereco: api.Tastypie.Resource<OngProjetoEndereco>;
    private _ods: api.Tastypie.Resource<OngProjetoOds>;

    public getSobre(): Promise<OngProjetoSobre> {
        return OngProjetoSobre.resource.objects.findOne({ong_projeto_id: this.id});
    }

    constructor(obj?:any){
        super(OngProjeto.resource, obj);
        if(this.id){
            this._endereco = new api.Tastypie.Resource<OngProjetoEndereco>('ong/projeto-endereco', {model: OngProjetoEndereco, defaults: {ong_projeto_id: this.id}});
            this._ods = new api.Tastypie.Resource<OngProjetoOds>('ong/projeto-ods', {model: OngProjetoOds, defaults: {ong_projeto_id: this.id}});
        }
    }

    public get endereco(): api.Tastypie.Resource<OngProjetoEndereco> {
        return this._endereco;
    }

    public get ods(): api.Tastypie.Resource<OngProjetoOds> {
        return this._ods;
    }
}

export class OngProjetoSobre extends api.Tastypie.Model<OngProjetoSobre> {
    public static resource = new api.Tastypie.Resource<OngProjetoSobre>('ong/projeto-sobre', {model: OngProjetoSobre});

    public problema: string;
    public impacto: string;
    public meta: string;
    public como_alcacar_meta: string;
    public como_medir_impacto: string;

    constructor(obj?:any){
        super(OngProjetoSobre.resource, obj);
    }
}

export class OngProjetoEndereco extends api.Tastypie.Model<OngProjetoEndereco> {
    public static resource = new api.Tastypie.Resource<OngProjetoEndereco>('ong/projeto-endereco', {model: OngProjetoEndereco});

    public cep: string;
    public rua: string;
    public numero: string;
    public complemento: string;
    public bairro: string;
    public cidade: string;
    public estado: string;
    public pais: string;
    public coordenadas: string;

    constructor(obj?:any){
        super(OngProjetoEndereco.resource, obj);
    }
}

export class OngProjetoOds extends api.Tastypie.Model<OngProjetoOds> {
    public static resource = new api.Tastypie.Resource<OngProjetoOds>('ong/projeto-ods', {model: OngProjetoOds});

    public ong_projeto_id: number;
    public ods_id: number;
    public ods: Ods;

    constructor(obj?:any){
        super(OngProjetoOds.resource, obj);
        if(obj){
            if(obj.ods) this.ods = new Ods(obj.ods);
        }
    }
}
