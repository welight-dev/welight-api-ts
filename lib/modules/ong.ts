// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>

import * as api from "ts-resource-tastypie";
import * as weauth_models from "./weAuth";
import { Ods, MetricCategory, MetricUnit, Metric } from "./onu";
import { Address } from "./utils";


export class OngActivity extends api.Tastypie.Model<OngActivity> {
    public static resource = new api.Tastypie.Resource<OngActivity>('ong/activity', {model: OngActivity});

    public name: string;
    public dt_created: string;
    public dt_updated: string;

    constructor(obj?:any){
        super(OngActivity.resource, obj);
    }
}


export class Ong extends api.Tastypie.Model<Ong> {
    public static resource = new api.Tastypie.Resource<Ong>('ong/profile', {model: Ong});

    public nome: string;
    public email: string;
    public razao_social: string;
    public cnpj: string;
    public slug: string;
    public activity_id: number;
    public publish_mode: string;

    public checked: Boolean;
    public children_id: number;

    private _status: OngStatus;
    private _ativo: boolean;
    private _parceira: boolean;
    private _invite: string;
    private _qtde_pontos: number;
    private _qtde_doadores: number;
    private _profile_detail: OngDetail;
    private _site_custom: OngSiteCustom;
    private _address: OngAddress;    
    private _ods: Array<Ods>;
    private _dt_updated: string;
    private _dt_created: string;

    private _user: weauth_models.User;
    private _timeline: api.Tastypie.Resource<OngTimeLine>;
    private _fotos: api.Tastypie.Resource<OngTimeLine>;
    private _videos: api.Tastypie.Resource<OngTimeLine>;
    private _projetos: api.Tastypie.Resource<OngProjeto>;
    private _bancos: api.Tastypie.Resource<OngBanco>;
    private _recursos: api.Tastypie.Resource<OngRecurso>;
    private _status_carteira: api.Tastypie.Resource<OngStatusCarteira>;
    private _projeto_entrega: api.Tastypie.Resource<OngProjetoEntrega>;
    private _carteira: api.Tastypie.Resource<OngCarteira>;

    constructor(obj?:any){
        super(Ong.resource);
        this._user = new weauth_models.User();
        this._profile_detail = new OngDetail();
        this._address = new OngAddress();
        this._site_custom = new OngSiteCustom();
        this._status = new OngStatus();
        this.initProfile(obj);
    }

    public save(): Promise<Ong> {
        let _self = this;
        return Ong.resource.objects.update(_self.id, {
          nome: _self.nome,
          email: _self.email,
          razao_social: _self.razao_social,
          cnpj: _self.cnpj,
          slug: _self.slug,
          activity_id: _self.activity_id,
          publish_mode: _self.publish_mode
        }).then(
            function(data: Ong){
                _self.initProfile(data);
                return _self;
            }
        )
    }

    private initProfile(obj:any): void {
        let _self = this;
        _self._ods = [];
        if(obj){
            _self.id = obj.id;
            _self.nome = obj.nome;
            _self.email = obj.email;
            _self.razao_social = obj.razao_social;
            _self.cnpj = obj.cnpj;
            _self.slug = obj.slug;
            _self.activity_id = obj.activity_id;
            _self.publish_mode = obj.publish_mode;

            _self._ativo = obj.ativo;
            _self._parceira = obj.parceira;
            _self._invite = obj.invite;
            _self._qtde_pontos = obj.qtde_pontos;
            _self._qtde_doadores = obj.qtde_doadores;
            _self._dt_updated = obj.dt_updated;
            _self._dt_created = obj.dt_created;

            if(obj.profile_detail) _self._profile_detail = new OngDetail(obj.profile_detail);
            if(obj.site_custom) _self._site_custom = new OngSiteCustom(obj.site_custom);
            if(obj.address) _self._address = new OngAddress(obj.address);
            if(obj.status) _self._status = new OngStatus(obj.status);

            if(obj.ods){
                for(let o of obj.ods){
                    _self._ods.push(new Ods(o));
                }
            }

            if(_self.id){
                _self._timeline = new api.Tastypie.Resource<OngTimeLine>('ong/timeline', {model: OngTimeLine, defaults: {ong_id: _self.id}});
                _self._fotos = new api.Tastypie.Resource<OngTimeLine>('ong/timeline', {model: OngTimeLine, defaults: {ong_id: _self.id, tipo_conteudo: 'fotos'}});
                _self._videos = new api.Tastypie.Resource<OngTimeLine>('ong/timeline', {model: OngTimeLine, defaults: {ong_id: _self.id, tipo_conteudo: 'videos'}});
                _self._projetos = new api.Tastypie.Resource<OngProjeto>('ong/projeto', {model: OngProjeto, defaults: {ong_id: _self.id}});
                _self._bancos = new api.Tastypie.Resource<OngBanco>('ong/banco', {model: OngBanco, defaults: {ong_id: _self.id}});
                _self._status_carteira = new api.Tastypie.Resource<OngStatusCarteira>('ong/status-carteira', {model: OngStatusCarteira, defaults: {ong_id: _self.id}});
                _self._recursos = new api.Tastypie.Resource<OngRecurso>('ong/recurso', {model: OngRecurso, defaults: {ong_id: _self.id}});
                _self._projeto_entrega = new api.Tastypie.Resource<OngProjetoEntrega>('ong/projeto-entrega', {model: OngProjetoEntrega, defaults: {ong_id: _self.id}});
                _self._carteira = new api.Tastypie.Resource<OngCarteira>('ong/carteira', {model: OngCarteira, defaults: {ong_id: _self.id}});
            }
        }
    }

    public get status(): OngStatus {
        return this._status;
    }

    public get ativo(): boolean {
        return this._ativo;
    }

    public get parceira(): boolean {
        return this._parceira;
    }

    public get invite(): string {
        return this._invite;
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

    public get site_custom(): OngSiteCustom {
        return this._site_custom;
    }

    public get address(): OngAddress {
        return this._address;
    }

    public get ods(): Array<Ods> {
        return this._ods;
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

    public get bancos(): api.Tastypie.Resource<OngBanco> {
        return this._bancos;
    }

    public get recursos(): api.Tastypie.Resource<OngRecurso> {
        return this._recursos;
    }

    public get status_carteira(): api.Tastypie.Resource<OngStatusCarteira> {
        return this._status_carteira;
    }

    public get projeto_entrega(): api.Tastypie.Resource<OngProjetoEntrega> {
        return this._projeto_entrega;
    }

    public get carteira(): api.Tastypie.Resource<OngCarteira> {
        return this._carteira;
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
        return this._user.createAccountOng(nome, email, razao_social, cnpj, kwargs).then(
            function(user: weauth_models.User){
                return Ong.resource.objects.get(user.current_user_app.app_profile_id).then(
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

    public static resource = new api.Tastypie.Resource<OngDetail>('ong/profile-detail', {model: OngDetail});

    public ong_id: number;
    public contato_fone: string;

    public missao: string;
    public missao_resumo: string;

    public realizacao: string;
    public realizacao_resumo: string;

    public publico_alvo: string;

    public img_avatar: string;
    public img_fundo: string;
    public cor_filtro: string;

    public video_institucional: string;
    public estatuto_social: string;
    public estatuto_social_url: string;

    public ultima_assembleia: string;
    public ultima_assembleia_url: string;

    public website: string;
    public youtube: string;
    public facebook: string;
    public instagram: string;
    public twitter: string;

    public oscip: boolean;
    public oscip_number: string;
    public diretor_nome: string;
    public diretor_assinatura: string;
    public diretor_assinatura_url: string;
    public currency: string;

    public dt_fundacao: string;
    public dt_updated: string;
    public dt_created: string;

    constructor(obj?:any){
        super(OngDetail.resource, obj);
    }
}

export class OngSiteCustom {
    public descricao: string;
    public img_avatar: string;
    public img_fundo: string;
    public cor_filtro: string;

    constructor(obj?:any){
      if(obj){
          this.descricao = obj.descricao;
          this.img_avatar = obj.img_avatar;
          this.img_fundo = obj.img_fundo;
          this.cor_filtro = obj.cor_filtro;
      }
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

export class OngAddress extends Address {

    public static resource = new api.Tastypie.Resource<OngAddress>('ong/address', {model: OngAddress});
    public ong_id: number;

    constructor(obj?:any){
        super(OngAddress.resource, obj);
    }
}

export class OngBanco extends api.Tastypie.Model<OngBanco> {

    public static resource = new api.Tastypie.Resource<OngBanco>('ong/banco', {model: OngBanco});

    public ong_id: number;
    public desc: string;
    public banco_codigo: string;
    public banco_nome: string;
    public agencia: string;
    public agencia_digito: string;
    public conta_corrente: string;
    public conta_corrente_digito: string;
    public pessoa_fisica: boolean;
    public titular: string;
    public cpf_cnpj: string;
    public iban: string;
    public bic_swift: string;
    public aba: string;
    public dt_updated: string;
    public dt_created: string;

    constructor(obj?:any){
      super(OngBanco.resource, obj);
    }
}

export class OngPostScrap extends api.Tastypie.Model<OngPostScrap> {
    public static resource = new api.Tastypie.Resource<OngPostScrap>('ong/timeline-post-scraper', {model: OngPostScrap});

    public description: string;
    public image: string;
    public source: string;
    public title: string;
    public url: string;
    public video: string;

    constructor(obj?:any){
        super(OngPostScrap.resource, obj);
    }
}

export class OngPost extends api.Tastypie.Model<OngPost> {
    public static resource = new api.Tastypie.Resource<OngPost>('ong/timeline-post', {model: OngPost});

    public tipo: string;
    public descricao: string;
    public fotos: Array<string>;
    public site_scraped: OngPostScrap;
    public dt_updated: string;
    public dt_created: string;

    private _fotos_resource: api.Tastypie.Resource<any>;

    constructor(obj?:any, _resource?:api.Tastypie.Resource<OngPost>){
        super((_resource || OngPost.resource), obj);
        let _self = this;

        if(!_self.fotos){
            _self.fotos = [];
        }

        _self._fotos_resource = new api.Tastypie.Resource<any>('ong/timeline-post-foto')
        if(obj){
            if(obj.site_scraped) _self.site_scraped = new OngPostScrap(obj.site_scraped);
        }
    }

    public setScraper(url:string): Promise<OngPostScrap> {
        let _self = this;
        return OngPostScrap.resource.objects.create({url:url}).then(
            function(data:OngPostScrap){
                _self.site_scraped = data;
                return _self.site_scraped;
            }
        )
    }

    public addFiles(event: any): Promise<Array<string>> {
        let _self = this;
        let uploading = new Promise<Array<string>>(function(resolve, reject) {
            for (let ix=0; ix<event.target.files.length; ix++) {
                let timeout = setTimeout(function(){ reject('timeout'); }, 15000);
                let reader = new FileReader();
                reader.onload = function(loadEvent: any){
                    let paramFile = loadEvent.target.result;
                    _self._fotos_resource.objects.create({foto:paramFile}).then(function(data:any){
                        clearTimeout(timeout);
                        _self.fotos.push(data.foto);
                        if(ix == (event.target.files.length - 1)){
                            resolve(_self.fotos);
                        }
                    }).catch(function(error:any){
                        clearTimeout(timeout);
                        reject(error);
                    });
                }
                reader.readAsDataURL(event.target.files[ix]);
            }
        });
        return uploading;
    }
}

export class OngTimeLine extends OngPost {
    public static resource = new api.Tastypie.Resource<OngTimeLine>('ong/timeline', {model: OngTimeLine});
    public ong: Ong;
    public projeto: OngProjeto;
    public doacao_credito: OngCarteira;
    public recurso: OngRecurso;
    public entrega: OngProjetoEntrega;
    constructor(obj?:any){
        super(obj, OngTimeLine.resource);
        if(obj){
            if(obj.ong) this.ong = new Ong(obj.ong);
            if(obj.projeto) this.projeto = new OngProjeto(obj.projeto);
            if(obj.doacao_credito) this.doacao_credito = new OngCarteira(obj.doacao_credito);
            if(obj.recurso) this.recurso = new OngRecurso(obj.recurso);
            if(obj.entrega) this.entrega = new OngProjetoEntrega(obj.entrega);
        }
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
    public ativo: boolean;
    public inicializado: boolean;
    public dt_updated: string;
    public dt_created: string;

    private _endereco: api.Tastypie.Resource<OngProjetoEndereco>;
    private _metric: api.Tastypie.Resource<OngProjetoMetric>;

    public getSobre(): Promise<OngProjetoSobre> {
        return OngProjetoSobre.resource.objects.findOne({ong_projeto_id: this.id});
    }

    constructor(obj?:any){
        super(OngProjeto.resource, obj);
        if(this.id){
            this._endereco = new api.Tastypie.Resource<OngProjetoEndereco>('ong/projeto-endereco', {model: OngProjetoEndereco, defaults: {ong_projeto_id: this.id}});
            this._metric = new api.Tastypie.Resource<OngProjetoMetric>('ong/projeto-metric', {model: OngProjetoMetric, defaults: {ong_projeto_id: this.id}});
        }
    }

    public get endereco(): api.Tastypie.Resource<OngProjetoEndereco> {
        return this._endereco;
    }

    public get metric(): api.Tastypie.Resource<OngProjetoMetric> {
        return this._metric;
    }

    public get_metric_summary(): Promise<OngProjetoMetricSummary> {
        return OngProjetoMetricSummary.resource.objects.findOne({ong_projeto_id: this.id});
    }
}

export class OngProjetoSobre extends api.Tastypie.Model<OngProjetoSobre> {
    public static resource = new api.Tastypie.Resource<OngProjetoSobre>('ong/projeto-sobre', {model: OngProjetoSobre});

    public ong_projeto_id: number;
    public problema: string;
    public impacto: string;
    public meta: string;
    public como_alcacar_meta: string;
    public como_medir_impacto: string;
    public website: string;
    public video: string;
    public key_audience: string;
    public outcomes: string;
    public outputs: string;
    public activities: string;
    public inputs: string;
    public dt_updated: string;
    public dt_created: string;

    constructor(obj?:any){
        super(OngProjetoSobre.resource, obj);
    }
}

export class OngProjetoMetricSummary extends api.Tastypie.Model<OngProjetoMetricSummary> {
    public static resource = new api.Tastypie.Resource<OngProjetoMetricSummary>('ong/projeto/metric-summary', {model: OngProjetoMetricSummary});

    public categories: Array<MetricCategory>;
    public ods: Array<Ods>;

    constructor(obj?:any){
        super(OngProjetoMetricSummary.resource, obj);

        this.categories = [];
        this.ods = [];

        if(obj){
            if(obj.categories){
                for(let cat of obj.categories){
                    this.categories.push(new MetricCategory(cat));
                }
            }

            if(obj.ods){
                for(let o of obj.ods){
                    this.ods.push(new Ods(o));
                }
            }
        }
    }
}

export class OngProjetoEndereco extends Address {

    public static resource = new api.Tastypie.Resource<OngProjetoEndereco>('ong/projeto-endereco', {model: OngProjetoEndereco});
    public ong_projeto_id: number;

    constructor(obj?:any){
        super(OngProjetoEndereco.resource, obj);
    }
}

export class OngProjetoOds extends api.Tastypie.Model<OngProjetoOds> {
    public static resource = new api.Tastypie.Resource<OngProjetoOds>('ong/projeto-ods', {model: OngProjetoOds});

    public ong_projeto_id: number;
    public ods_id: number;
    public ods: Ods;
    public dt_created: string;

    constructor(obj?:any){
        super(OngProjetoOds.resource, obj);
        if(obj){
            if(obj.ods) this.ods = new Ods(obj.ods);
        }
    }
}


export class OngProjetoMetricRegisterEvidence extends api.Tastypie.Model<OngProjetoMetricRegisterEvidence> {
    public static resource = new api.Tastypie.Resource<OngProjetoMetricRegisterEvidence>('ong/projeto-metric-register-evidence', {model: OngProjetoMetricRegisterEvidence});

    public ong_projeto_metric_register_id: number;
    public titulo: string;
    public descricao: string;
    public comprovante: string;
    public url_video: string;
    public dt_updated: string;
    public dt_created: string;

    constructor(obj?:any){
        super(OngProjetoMetricRegisterEvidence.resource, obj);
    }
}


export class OngProjetoMetricRegister extends api.Tastypie.Model<OngProjetoMetricRegister> {
    public static resource = new api.Tastypie.Resource<OngProjetoMetricRegister>('ong/projeto-metric-register', {model: OngProjetoMetricRegister});

    public ong_projeto_metric_config_id: number;
    public total: string;
    public type: string;
    public dt_register: string;
    public dt_updated: string;
    public dt_created: string;

    private _evidencies: api.Tastypie.Resource<OngProjetoMetricRegisterEvidence>;

    constructor(obj?:any){
        super(OngProjetoMetricRegister.resource, obj);

        if(obj){
            if(obj.id){
                this._evidencies = new api.Tastypie.Resource<OngProjetoMetricRegisterEvidence>(
                  OngProjetoMetricRegisterEvidence.resource.endpoint,
                  {model: OngProjetoMetricRegisterEvidence, defaults: {ong_projeto_metric_config_id: obj.id}}
                );
            }
        }
    }

    public get evidencies(): api.Tastypie.Resource<OngProjetoMetricRegisterEvidence> {
        return this._evidencies;
    }
}


export class OngProjetoMetricConfig extends api.Tastypie.Model<OngProjetoMetricConfig> {
    public static resource = new api.Tastypie.Resource<OngProjetoMetricConfig>('ong/projeto-metric-config', {model: OngProjetoMetricConfig});

    public ong_projeto_metric_id: number;
    public ong_projeto_endereco_id: number;
    public medicao: string;
    public medicao_meta: string;
    public medicao_frequencia: number;
    public medicao_mes: Array<number>;
    public metric_unit: MetricUnit;
    public base_value: string;
    public base_date: string;
    public meta_value: string;
    public meta_date: string;
    public ong_projeto_endereco: OngProjetoEndereco;
    public dt_updated: string;
    public dt_created: string;

    private _registers: api.Tastypie.Resource<OngProjetoMetricRegister>;

    constructor(obj?:any){
        super(OngProjetoMetricConfig.resource, obj);
        if(obj){
            if(obj.metric_unit) this.metric_unit = new MetricUnit(obj.metric_unit);
            if(obj.ong_projeto_endereco) this.ong_projeto_endereco = new OngProjetoEndereco(obj.ong_projeto_endereco);
            if(obj.id){
                this._registers = new api.Tastypie.Resource<OngProjetoMetricRegister>(
                  OngProjetoMetricRegister.resource.endpoint,
                  {model: OngProjetoMetricRegister, defaults: {ong_projeto_metric_id: obj.id}}
                );
            }
        }
    }

    public get register(): api.Tastypie.Resource<OngProjetoMetricRegister> {
        return this._registers;
    }
}


export class OngProjetoMetric extends api.Tastypie.Model<OngProjetoMetric> {
    public static resource = new api.Tastypie.Resource<OngProjetoMetric>('ong/projeto-metric', {model: OngProjetoMetric});

    public ong_projeto_id: number;
    public metric_id: number;
    public configured: boolean;
    public dt_updated: string;
    public dt_created: string;

    private _ong_projeto: OngProjeto;
    private _metric: Metric;
    private _metric_config: api.Tastypie.Resource<OngProjetoMetricConfig>;

    constructor(obj?:any){
        super(OngProjetoMetric.resource, obj);
        if(obj){
            if(obj.ong_projeto) this._ong_projeto = new OngProjeto(obj.ong_projeto);
            if(obj.metric) this._metric = new Metric(obj.metric);

            if(obj.id){
                this._metric_config = new api.Tastypie.Resource<OngProjetoMetricConfig>(
                  OngProjetoMetricConfig.resource.endpoint,
                  {model: OngProjetoMetricConfig, defaults: {ong_projeto_metric_id: obj.id}}
                );
            }
        }
    }

    public get ong_projeto(): OngProjeto {
        return this._ong_projeto;
    }

    public get metric(): Metric {
        return this._metric;
    }

    public get metric_config(): api.Tastypie.Resource<OngProjetoMetricConfig> {
        return this._metric_config;
    }
}


export class OngStatus {
    public qtde_pontos: number;
    public qtde_doadores: number;
    public qtde_avaliacao_positiva: number;
    public qtde_projetos: number;
    public total_credito: number;
    public total_saldo: number;
    public total_debito_comprovado: number;

    constructor(obj?:any){
        if(obj){
            this.qtde_pontos = obj.qtde_pontos;
            this.qtde_doadores = obj.qtde_doadores;
            this.qtde_avaliacao_positiva = obj.qtde_avaliacao_positiva;
            this.qtde_projetos = obj.qtde_projetos;
            this.total_credito = obj.total_credito;
            this.total_saldo = obj.total_saldo;
            this.total_debito_comprovado = obj.total_debito_comprovado;
        }
    }
}

export class OngOrigemCredito extends api.Tastypie.Model<OngOrigemCredito> {
    public static resource = new api.Tastypie.Resource<OngOrigemCredito>('ong/origem-credito', {model: OngOrigemCredito});

    public id: number;
    public nome: string;
    public token: string;
    public grupo: string;
    public source_id: number;
    public ong_id: number;

    constructor(obj?:any){
        super(OngOrigemCredito.resource, obj);
    }
}

export class OngRecurso extends api.Tastypie.Model<OngRecurso> {
    public static resource = new api.Tastypie.Resource<OngRecurso>('ong/recurso', {model: OngRecurso});

    public ong_id: number;
    public ong_projeto_id: number;
    public destino: string;
    public ativo: boolean;
    public total_doacao: number;
    public dt_aplicacao: string;
    public dt_updated: string;
    public dt_created: string;
    private _doacao: api.Tastypie.Resource<OngRecursoDoacao>;
    private _comprovante: api.Tastypie.Resource<OngRecursoComprovante>;

    constructor(obj?:any){
        super(OngRecurso.resource, obj);
        if(this.id){
            this._doacao = new api.Tastypie.Resource<OngRecursoDoacao>('ong/recurso-doacao', {model: OngRecursoDoacao, defaults: {ong_recurso_id:this.id}});
            this._comprovante = new api.Tastypie.Resource<OngRecursoComprovante>('ong/recurso-comprovante', {model: OngRecursoComprovante, defaults: {ong_recurso_id:this.id}});
        }
    }

    public get doacao(): api.Tastypie.Resource<OngRecursoDoacao> {
        return this._doacao;
    }

    public get comprovante(): api.Tastypie.Resource<OngRecursoComprovante> {
        return this._comprovante;
    }
}

export class OngRecursoDoacao extends api.Tastypie.Model<OngRecursoDoacao> {
    public static resource = new api.Tastypie.Resource<OngRecursoDoacao>('ong/recurso-doacao', {model: OngRecursoDoacao});

    public ong_recurso_id: number;
    public origem_credito_id: number;
    public origem_credito: OngOrigemCredito;
    public moeda: string;
    public valor: number;
    public dt_updated: string;
    public dt_created: string;

    constructor(obj?:any){
        super(OngRecursoDoacao.resource, obj);

        if(obj){
            if(obj.origem_credito) this.origem_credito = new OngOrigemCredito(obj.origem_credito);
        }
    }
}

export class OngRecursoComprovante extends api.Tastypie.Model<OngRecursoComprovante> {
    public static resource = new api.Tastypie.Resource<OngRecursoComprovante>('ong/recurso-comprovante', {model: OngRecursoComprovante});

    public ong_recurso_id: number;
    public titulo: string;
    public descricao: string;
    public comprovante: string;
    public url_video: string;
    public dt_updated: string;
    public dt_created: string;

    constructor(obj?:any){
        super(OngRecursoComprovante.resource, obj);
    }
}

export class OngStatusCarteira extends api.Tastypie.Model<OngStatusCarteira>{

    public static resource = new api.Tastypie.Resource<OngStatusCarteira>('ong/status-carteira', {model: OngStatusCarteira});

    public ong_id: number;
    public origem_credito: OngOrigemCredito;
    public total_credito: number;
    public total_debito: number;
    public total_debito_pendente: number;
    public total_debito_comprovado: number;
    public total_debito_nao_comprovado: number;
    public saldo: number;
    public saldo_pendente: number;

    constructor(obj?:any){
        super(OngStatusCarteira.resource, obj);
        if(obj){
          if(obj.origem_credito) this.origem_credito = new OngOrigemCredito(obj.origem_credito);
        }
    }
}

export class OngCarteiraTransferencia {
    public banco_codigo: string;
    public banco_nome: string;
    public agencia: string;
    public agencia_digito: string;
    public conta_corrente: string;
    public conta_corrente_digito: string;
    public pessoa_fisica: boolean;
    public titular: string;
    public cpf_cnpj: string;
    public dt_created: string;

    constructor(obj?:any){
        if(obj){
          let _self = this;
          for(let property in obj) {
              if (obj.hasOwnProperty(property) && property.charAt(0) != '_') {
                  _self[property] = obj[property];
              }
          }
        }
    }
}

export class OngCarteiraCreditoCustomComprovante extends api.Tastypie.Model<OngCarteiraCreditoCustomComprovante> {
    public static resource = new api.Tastypie.Resource<OngCarteiraCreditoCustomComprovante>('ong/carteira-credito-custom-comprovante', {model: OngCarteiraCreditoCustomComprovante});

    public credito_custom_id: number;
    public titulo: string;
    public descricao: string;
    public comprovante: string;
    public url_video: string;
    public dt_updated: string;
    public dt_created: string;

    constructor(obj?:any){
        super(OngCarteiraCreditoCustomComprovante.resource, obj);
    }
}

export class OngCarteiraCreditoCustom {
    public id: number;
    public ong_carteira_id: number;
    public user_id: number;
    public user_name: string;
    public user_email: string;
    public carteira_debito_id: string;
    public dt_created: string;

    private _comprovante: api.Tastypie.Resource<OngCarteiraCreditoCustomComprovante>;

    constructor(obj?:any){
        if(obj){
          let _self = this;
          for(let property in obj) {
              if (obj.hasOwnProperty(property) && property.charAt(0) != '_') {
                  _self[property] = obj[property];
              }
          }
          if(obj.id){
              this._comprovante = new api.Tastypie.Resource<OngCarteiraCreditoCustomComprovante>('ong/carteira-credito-custom-comprovante', {model: OngCarteiraCreditoCustomComprovante, defaults: {credito_custom_id:obj.id}});
          }
        }
    }

    public get comprovante(): api.Tastypie.Resource<OngCarteiraCreditoCustomComprovante> {
        return this._comprovante;
    }
}

export class OngCarteira extends api.Tastypie.Model<OngCarteira>{

    public static resource = new api.Tastypie.Resource<OngCarteira>('ong/carteira', {model: OngCarteira});
    private static _creditar = new api.Tastypie.Resource<OngCarteira>('ong/carteira/creditar', {model: OngCarteira});
    private static _transferir = new api.Tastypie.Resource<OngCarteira>('ong/carteira/transferir', {model: OngCarteira});

    public ong_id: number;
    public origem_credito_id: number;
    public origem_credito: OngOrigemCredito;
    public credito: boolean;
    public moeda: string;
    public valor: number;
    public status: string;
    public transferencia: OngCarteiraTransferencia;
    public credito_custom: OngCarteiraCreditoCustom;
    public dt_updated: string;
    public dt_created: string;

    constructor(obj?:any){
        super(OngCarteira.resource, obj);
        if(obj){
          if(obj.origem_credito) this.origem_credito = new OngOrigemCredito(obj.origem_credito);
          if(obj.transferencia) this.transferencia = new OngCarteiraTransferencia(obj.transferencia);
          if(obj.credito_custom) this.credito_custom = new OngCarteiraCreditoCustom(obj.credito_custom);
        }
    }

    public static creditar(obj:{ong_id:number, origem_credito_id: number, valor: number, ong_banco_id: number}): Promise<OngCarteira> {
        return OngCarteira._creditar.objects.create(obj);
    }

    public static transferir(obj:{ong_id:number, origem_credito_id: number, ong_banco_id: number, valor: number}): Promise<OngCarteira> {
        return OngCarteira._transferir.objects.create(obj);
    }
}

export class OngTimelineDoacao extends api.Tastypie.Model<OngTimelineDoacao>{

    public static resource = new api.Tastypie.Resource<OngTimelineDoacao>('ong/timeline-doacao', {model: OngTimelineDoacao});

    public ong_id: number;
    public tipo: string;
    public source_model_name: string;
    public source_model_id: number;
    public doacao_credito: OngCarteira;
    public recurso: OngRecurso;
    public projeto: OngProjeto;
    public dt_updated: string;
    public dt_created: string;

    constructor(obj?:any){
        super(OngTimelineDoacao.resource, obj);
        if(obj){
          if(obj.doacao_credito) this.doacao_credito = new OngCarteira(obj.doacao_credito);
          if(obj.recurso) this.recurso = new OngRecurso(obj.recurso);
          if(obj.projeto) this.projeto = new OngProjeto(obj.projeto);
        }
    }
}

export class OngProjetoEntrega extends api.Tastypie.Model<OngProjetoEntrega> {
    public static resource = new api.Tastypie.Resource<OngProjetoEntrega>('ong/projeto-entrega', {model: OngProjetoEntrega});

    public ong_projeto_id: number;
    public titulo: string;
    public descricao: string;
    public ativo: boolean;

    public mt_pessoas: number;
    public mt_animais: number;
    public mt_arvores: number;
    public mt_areas: number;
    public mt_criancas: number;

    public dt_entrega: string;
    public dt_updated: string;
    public dt_created: string;
    public projeto: OngProjeto;
    private _endereco: api.Tastypie.Resource<OngProjetoEntregaEndereco>;
    private _comprovante: api.Tastypie.Resource<OngProjetoEntregaComprovante>;

    constructor(obj?:any){
        super(OngProjetoEntrega.resource, obj);
        if(obj){
            if(obj.id){
                this._endereco = new api.Tastypie.Resource<OngProjetoEntregaEndereco>('ong/projeto-entrega-endereco', {model: OngProjetoEntregaEndereco, defaults: {projeto_entrega_id:obj.id}});
                this._comprovante = new api.Tastypie.Resource<OngProjetoEntregaComprovante>('ong/projeto-entrega-comprovante', {model: OngProjetoEntregaComprovante, defaults: {projeto_entrega_id:obj.id}});
            }
            if(obj.projeto) this.projeto = new OngProjeto(obj.projeto);
        }else{
            this.mt_pessoas = 0;
            this.mt_animais = 0;
            this.mt_arvores = 0;
            this.mt_areas = 0;
            this.mt_criancas = 0;
        }
    }

    public get endereco(): api.Tastypie.Resource<OngProjetoEntregaEndereco> {
        return this._endereco;
    }

    public get comprovante(): api.Tastypie.Resource<OngProjetoEntregaComprovante> {
        return this._comprovante;
    }
}

export class OngProjetoEntregaEndereco extends api.Tastypie.Model<OngProjetoEntregaEndereco> {
    public static resource = new api.Tastypie.Resource<OngProjetoEntregaEndereco>('ong/projeto-entrega-endereco', {model: OngProjetoEntregaEndereco});

    public projeto_entrega_id: number;
    public projeto_endereco_id: number;
    public endereco: OngProjetoEndereco;
    public dt_created: string;

    constructor(obj?:any){
        super(OngProjetoEntregaEndereco.resource, obj);

        if(obj){
            if(obj.endereco) this.endereco = new OngProjetoEndereco(obj.endereco);
        }
    }
}

export class OngProjetoEntregaComprovante extends api.Tastypie.Model<OngProjetoEntregaComprovante> {
    public static resource = new api.Tastypie.Resource<OngProjetoEntregaComprovante>('ong/projeto-entrega-comprovante', {model: OngProjetoEntregaComprovante});

    public projeto_entrega_id: number;
    public titulo: string;
    public descricao: string;
    public comprovante: string;
    public url_video: string;
    public dt_updated: string;
    public dt_created: string;

    constructor(obj?:any){
        super(OngProjetoEntregaComprovante.resource, obj);
    }
}
