// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>

import * as api from "ts-resource-tastypie";
import * as weauth_models from "./weAuth";
import * as ong_models from "./ong";
import * as onu_models from "./onu";
import * as we_notify_models from "./weNotify";
import * as utils from "./utils";

export class Doador extends api.Tastypie.Model<Doador> {
    public static resource = new api.Tastypie.Resource<Doador>('doador/profile', {model: Doador});

    public nome: string;
    public slug: string;
    public avaliador: boolean;
    public empresa: boolean;
    private _email: string;
    private _dt_updated: string;
    private _dt_created: string;

    private _we_notify: api.Tastypie.Resource<we_notify_models.WeNotifyDoador>;
    private _rede: DoadorRede;
    private _ong_timeline: api.Tastypie.Resource<ong_models.OngTimeLine>;
    private _doacao_mes: api.Tastypie.Resource<DoadorDoacaoMes>;
    private _user: weauth_models.User;
    private _check_slug_resource: api.Tastypie.Resource<{available: boolean}>;
    private _doador_logado: api.Tastypie.Resource<Doador>;

    constructor(obj?: any){
        super(Doador.resource);
        this._user = new weauth_models.User();
        this._doador_logado = new api.Tastypie.Resource<Doador>('doador/profile/me', {model: Doador});
        this._check_slug_resource = new api.Tastypie.Resource<{available: boolean}>('doador/profile/check-slug');
        this.initProfile(obj);
    }

    public save(): Promise<Doador> {
        let _self = this;
        return Doador.resource.objects.update(_self.id, {nome: _self.nome, slug: _self.slug}).then(
            function(data: Doador){
                _self.nome = data.nome;
                _self.slug = data.slug;
                return _self;
            }
        )
    }

    private initProfile(obj?: any): void {
        let _self = this;
        if(obj){
            _self.id = obj.id;
            _self.nome = obj.nome;
            _self.slug = obj.slug;
            _self.avaliador = obj.avaliador;
            _self.empresa = obj.empresa;
            _self._email = obj.email;
            _self._dt_updated = obj.dt_updated;
            _self._dt_created = obj.dt_created;
            _self._rede = new DoadorRede(obj.id);
            _self._ong_timeline = new api.Tastypie.Resource<ong_models.OngTimeLine>('ong/timeline', {model: ong_models.OngTimeLine, defaults: {doador_id: obj.id}});
            _self._doacao_mes = new api.Tastypie.Resource<DoadorDoacaoMes>('doador/doacao-mes', {model: DoadorDoacaoMes, defaults: {doador_id: obj.id}});
            _self._we_notify = new api.Tastypie.Resource<we_notify_models.WeNotifyDoador>('we-notify/doador', {model: we_notify_models.WeNotifyDoador, defaults: {doador_id: obj.id}});
        }
    }

    public check_slug(slug: string): Promise<{available: boolean}> {
        return this._check_slug_resource.objects.findOne({slug: slug});
    }

    public instalarPluginNavegador(navegador:string): Promise<any> {
        return this._user.instalarPluginNavegador(navegador);
    }

    public get email(): string {
        return this._email;
    }

    public get dt_created(): string {
        return this._dt_created;
    }

    public get dt_updated(): string {
        return this._dt_updated;
    }

    public get rede(): DoadorRede {
        return this._rede;
    }

    public get ong_timeline(): api.Tastypie.Resource<ong_models.OngTimeLine> {
        return this._ong_timeline;
    }

    public get doacao_mes(): api.Tastypie.Resource<DoadorDoacaoMes> {
        return this._doacao_mes;
    }

    public get we_notify(): api.Tastypie.Resource<we_notify_models.WeNotifyDoador> {
        return this._we_notify;
    }

    public get user(): weauth_models.User {
        return this._user;
    }

    public get plugin_navegador(): utils.PluginNavegador {
        return this._user.plugin_navegador;
    }

    public notificarPlugin(): Promise<any> {
        let _self = this;
        return new Promise<any>(function(resolve, reject){
              _self._user.notificarPlugin()
              resolve(true);
        });
    }

    public getPontos(): Promise<DoadorPontos> {
        if(this.id){
            return DoadorPontos.resource.objects.get(this.id);
        }else{
            return api.Tastypie.Tools.generate_exception("[Doador][getPontos] Doador não identificado");
        }
    }

    public getDoacao(): Promise<DoadorDoacao> {
        if(this.id){
            return DoadorDoacao.resource.objects.get(this.id);
        }else{
            return api.Tastypie.Tools.generate_exception("[Doador][getDoacao] Doador não identificado");
        }
    }

    public getCompraAfiliadora(): Promise<DoadorCompraAfiliadoraStatus> {
        if(this.id){
            return DoadorCompraAfiliadoraStatus.resource.objects.get(this.id);
        }else{
            return api.Tastypie.Tools.generate_exception("[Doador][getCompraAfiliadora] Doador não identificado");
        }
    }

    public getAvaliador(): Promise<DoadorAvaliador> {
        if(this.id){
            return DoadorAvaliador.resource.objects.findOne({doador_id:this.id})
        }else{
            return api.Tastypie.Tools.generate_exception("[Doador][getAvaliador] Avaliador não identificado");
        }
    }

    public getPluginNavegadorLog(): Promise<DoadorPluginNavegador> {
        if(this.id){
            return DoadorPluginNavegador.resource.objects.findOne({doador_id:this.id})
        }else{
            return api.Tastypie.Tools.generate_exception("[Doador][getPluginNavegadorStatus] Plugin não identificado");
        }
    }

    public getPreferencia(): Promise<DoadorPreferencia> {
        if(this.id){
            return DoadorPreferencia.resource.objects.findOne({doador_id:this.id})
        }else{
            return api.Tastypie.Tools.generate_exception("[Doador][getPreferencia] Preferencia não identificado");
        }
    }

    public createAccount(name: string, email: string, password: string, kwargs?:any): Promise<Doador> {
        let _self = this;
        return this._user.createAccount(name, email, password, kwargs).then(
            function(user: weauth_models.User){
                return _self._doador_logado.objects.findOne().then(
                    function(data: Doador){
                        _self.initProfile(data);
                        return _self;
                    }
                );
            }
        );
    }

    public login(username: string, password: string, kwargs?:any): Promise<Doador> {
        let _self = this;
        return this._user.login(username, password, kwargs).then(
            function(user: weauth_models.User){
                return _self._doador_logado.objects.findOne().then(
                    function(data: Doador){
                        _self.initProfile(data);
                        return _self;
                    }
                );
            }
        );
    }

    public loginFacebook(username: string, facebook_uid: string, facebook_access_token: string, kwargs?:any): Promise<Doador> {
        let _self = this;
        return this._user.loginFacebook(username, facebook_uid, facebook_access_token, kwargs).then(
            function(user: weauth_models.User){
                return _self._doador_logado.objects.findOne().then(
                    function(data: Doador){
                        _self.initProfile(data);
                        return _self;
                    }
                );
            }
        );
    }

    public quickLogin(auth?:{username: string, apikey: string}, kwargs?:any): Promise<Doador> {
        let _self = this;
        return this._user.quickLogin(auth, kwargs).then(
            function(user: weauth_models.User){

                let user_app = user.current_user_app;

                if(!user_app){
                    user_app = user.getUserAppAdmin('doador');
                }

                if(!user_app){
                    _self._user = new weauth_models.User();
                    return api.Tastypie.Tools.generate_exception("[Doador][quickLogin] Usuario não identificado");
                }

                _self._user.current_user_app = user_app;

                return _self._doador_logado.objects.findOne().then(
                    function(data: Doador){
                        _self.initProfile(data);
                        return _self;
                    }
                );
            }
        );
    }

    public reset_password_request(email: string, kwargs?:any): Promise<any> {
        return this._user.reset_password_request(email, kwargs);
    }

    public reset_password_execute(token: string, password: string, kwargs?:any): Promise<Doador> {
        let _self = this;
        return this._user.reset_password_execute(token, password, kwargs).then(
            function(user: weauth_models.User){
                return _self._doador_logado.objects.findOne().then(
                    function(data: Doador){
                        _self.initProfile(data);
                        return _self;
                    }
                );
            }
        );
    }

    public change_password(username: string, pass_old: string, pass_new: string, kwargs?:any): Promise<Doador> {
        let _self = this;
        return this._user.change_password(username, pass_old, pass_new, kwargs).then(
            function(user: weauth_models.User){
                return _self._doador_logado.objects.findOne().then(
                    function(data: Doador){
                        _self.initProfile(data);
                        return _self;
                    }
                );
            }
        );
    }
}

export class DoadorAvaliador extends api.Tastypie.Model<DoadorAvaliador> {
    public static resource = new api.Tastypie.Resource<DoadorAvaliador>('doador/avaliador', {model: DoadorAvaliador});

    public doador_id: number;
    public acesso_ativo: boolean;
    public cpf: string;
    public rg: string;
    public facebook: string;
    public linkedin: string;
    public cep: string;
    public dt_updated: string;
    public dt_created: string;

    constructor(obj?:any){
      super(DoadorAvaliador.resource, obj);
    }
}

export class DoadorPluginNavegador extends api.Tastypie.Model<DoadorPluginNavegador> {
    public static resource = new api.Tastypie.Resource<DoadorPluginNavegador>('doador/plugin-navegador', {model: DoadorPluginNavegador});

    public doador_id: number;
    public navegador: string;
    public dt_ultima_ativacao: string;
    public dt_updated: string;
    public dt_created: string;

    constructor(obj?:any){
      super(DoadorPluginNavegador.resource, obj);
    }
}

export class DoadorPreferencia extends api.Tastypie.Model<DoadorPreferencia> {
    public static resource = new api.Tastypie.Resource<DoadorPreferencia>('doador/preferencia', {model: DoadorPreferencia});

    public doador_id: number;
    public email_ao_ganhar_ponto: boolean;
    public email_postagens_ong_pontuada: boolean;
    public email_newsletter_welight: boolean;
    public ong_pode_acessar_meu_email: boolean;

    constructor(obj?:any){
      super(DoadorPreferencia.resource, obj);
    }
}

export class DoadorPontos extends api.Tastypie.Model<DoadorPontos> {
    public static resource = new api.Tastypie.Resource<DoadorPontos>('doador/profile/<id>/pontos-status', {model: DoadorPontos});

    private _doador_id: number;
    private _recebidos: number;
    private _distribuidos: number;
    private _disponiveis: number;
    private _recebidos_cadastro: number;
    private _recebidos_convite: number;
    private _recebidos_compra: number;

    private _ong: api.Tastypie.Resource<DoadorDoacaoOng>;
    private _distribuicao_resource: api.Tastypie.Resource<any>;

    constructor(obj?:any){
        super(DoadorPontos.resource);

        if(obj) {
            this._doador_id = obj.doador_id;
            this._recebidos = obj.recebidos;
            this._distribuidos = obj.distribuidos;
            this._disponiveis = obj.disponiveis;
            this._recebidos_cadastro = obj.recebidos_cadastro;
            this._recebidos_convite = obj.recebidos_convite;
            this._recebidos_compra = obj.recebidos_compra;

            this._ong = new api.Tastypie.Resource<DoadorDoacaoOng>('doador/doacao-ong', {model: DoadorDoacaoOng, defaults: {doador_id: obj.doador_id}});
            this._distribuicao_resource = new api.Tastypie.Resource<any>('doador/profile/'+obj.doador_id+'/distribuir-pontos');
        } else {
            this._recebidos = 0;
            this._distribuidos = 0;
            this._disponiveis = 0;
            this._recebidos_cadastro = 0;
            this._recebidos_convite = 0;
            this._recebidos_compra = 0;
        }
    }

    public distribuir(ong_id: number, pontos: number): Promise<DoadorPontos> {
        let _self = this;
        return _self._distribuicao_resource.objects.create({ong_id: ong_id, pontos: pontos}).then(
            function(data: any){
                if(_self._ong.page.initialized){
                  return _self._ong.page.refresh().then(() => {
                    _self._recebidos = data.recebidos;
                    _self._distribuidos = data.distribuidos;
                    _self._disponiveis = data.disponiveis;
                    return _self;
                  });
                } else {
                  _self._recebidos = data.recebidos;
                  _self._distribuidos = data.distribuidos;
                  _self._disponiveis = data.disponiveis;
                  return _self;
                }
            }
        )
    }

    public get doador_id(): number {
        return this._doador_id;
    }

    public get recebidos(): number {
        return this._recebidos;
    }

    public get distribuidos(): number {
        return this._distribuidos;
    }

    public get disponiveis(): number {
        return this._disponiveis;
    }

    public get recebidos_cadastro(): number {
        return this._recebidos_cadastro;
    }

    public get recebidos_convite(): number {
        return this._recebidos_convite;
    }

    public get recebidos_compra(): number {
        return this._recebidos_compra;
    }

    public get ong(): api.Tastypie.Resource<DoadorDoacaoOng> {
        return this._ong;
    }
}

export class DoadorDoacaoMes extends api.Tastypie.Model<DoadorDoacaoMes> {
    public static resource = new api.Tastypie.Resource<DoadorDoacaoMes>('doador/doacao-mes', {model: DoadorDoacaoMes});

    public doador_id: number;
    public mes: number;
    public ano: number;
    public moeda: string;

    public doador_doacao_pendente: number;
    public doador_doacao_direta: number;
    public doador_doacao_pool: number;
    public doador_doacao_total: number;
    public doador_doacao_impacto: number;

    public rede_acima_doacao_pendente: number;
    public rede_acima_doacao_direta: number;
    public rede_acima_doacao_pool: number;
    public rede_acima_doacao_total: number;

    public rede_abaixo_doacao_pendente: number;
    public rede_abaixo_doacao_direta: number;
    public rede_abaixo_doacao_pool: number;
    public rede_abaixo_doacao_total: number;

    public rede_direta_doacao_pendente: number;
    public rede_direta_doacao_direta: number;
    public rede_direta_doacao_pool: number;
    public rede_direta_doacao_total: number;

    public rede_indireta_doacao_pendente: number;
    public rede_indireta_doacao_direta: number;
    public rede_indireta_doacao_pool: number;
    public rede_indireta_doacao_total: number;

    public dt_created: string;

    constructor(obj?:any){
      super(DoadorDoacaoMes.resource, obj);
    }
}

export class DoadorDoacao extends api.Tastypie.Model<DoadorDoacao> {

    public static resource = new api.Tastypie.Resource<DoadorDoacao>('doador/profile/<id>/doacao-status', {model: DoadorDoacao});

    private _doador_id: number;
    private _moeda: string;

    private _doador_doacao_pendente: number;
    private _doador_doacao_direta: number;
    private _doador_doacao_pool: number;
    private _doador_doacao_total: number;
    private _doador_doacao_impacto: number;

    private _rede_acima_doacao_pendente: number;
    private _rede_acima_doacao_direta: number;
    private _rede_acima_doacao_pool: number;
    private _rede_acima_doacao_total: number;

    private _rede_abaixo_doacao_pendente: number;
    private _rede_abaixo_doacao_direta: number;
    private _rede_abaixo_doacao_pool: number;
    private _rede_abaixo_doacao_total: number;

    private _rede_direta_doacao_pendente: number;
    private _rede_direta_doacao_direta: number;
    private _rede_direta_doacao_pool: number;
    private _rede_direta_doacao_total: number;

    private _rede_indireta_doacao_pendente: number;
    private _rede_indireta_doacao_direta: number;
    private _rede_indireta_doacao_pool: number;
    private _rede_indireta_doacao_total: number;

    private _doacao_ong: api.Tastypie.Resource<DoadorDoacaoOng>;
    private _doacao_ods: api.Tastypie.Resource<DoadorDoacaoOds>;

    private _dt_updated: string;

    constructor(obj?:any){
        super(DoadorDoacao.resource);

        if(obj){
            this.id = obj.id,
            this._doador_id = obj.doador_id;
            this._moeda = obj.moeda;

            this._doador_doacao_pendente = obj.doador_doacao_pendente;
            this._doador_doacao_direta = obj.doador_doacao_direta;
            this._doador_doacao_pool = obj.doador_doacao_pool;
            this._doador_doacao_total = obj.doador_doacao_total;
            this._doador_doacao_impacto = obj.doador_doacao_impacto;

            this._rede_acima_doacao_pendente = obj.rede_acima_doacao_pendente;
            this._rede_acima_doacao_direta = obj.rede_acima_doacao_direta;
            this._rede_acima_doacao_pool = obj.rede_acima_doacao_pool;
            this._rede_acima_doacao_total = obj.rede_acima_doacao_total;

            this._rede_abaixo_doacao_pendente = obj.rede_abaixo_doacao_pendente;
            this._rede_abaixo_doacao_direta = obj.rede_abaixo_doacao_direta;
            this._rede_abaixo_doacao_pool = obj.rede_abaixo_doacao_pool;
            this._rede_abaixo_doacao_total = obj.rede_abaixo_doacao_total;

            this._rede_direta_doacao_pendente = obj.rede_direta_doacao_pendente;
            this._rede_direta_doacao_direta = obj.rede_direta_doacao_direta;
            this._rede_direta_doacao_pool = obj.rede_direta_doacao_pool;
            this._rede_direta_doacao_total = obj.rede_direta_doacao_total;

            this._rede_indireta_doacao_pendente = obj.rede_indireta_doacao_pendente;
            this._rede_indireta_doacao_direta = obj.rede_indireta_doacao_direta;
            this._rede_indireta_doacao_pool = obj.rede_indireta_doacao_pool;
            this._rede_indireta_doacao_total = obj.rede_indireta_doacao_total;

            this._doacao_ong = new api.Tastypie.Resource<DoadorDoacaoOng>('doador/doacao-ong', {model: DoadorDoacaoOng, defaults: {doador_id: obj.doador_id}});
            this._doacao_ods = new api.Tastypie.Resource<DoadorDoacaoOds>('doador/doacao-ods', {model: DoadorDoacaoOds, defaults: {doador_id: obj.doador_id}});
        }else{
            this._moeda = 'BRL';

            this._doador_doacao_pendente = 0;
            this._doador_doacao_direta = 0;
            this._doador_doacao_pool = 0;
            this._doador_doacao_total = 0;
            this._doador_doacao_impacto = 0;

            this._rede_acima_doacao_pendente = 0;
            this._rede_acima_doacao_direta = 0;
            this._rede_acima_doacao_pool = 0;
            this._rede_acima_doacao_total = 0;

            this._rede_abaixo_doacao_pendente = 0;
            this._rede_abaixo_doacao_direta = 0;
            this._rede_abaixo_doacao_pool = 0;
            this._rede_abaixo_doacao_total = 0;

            this._rede_direta_doacao_pendente = 0;
            this._rede_direta_doacao_direta = 0;
            this._rede_direta_doacao_pool = 0;
            this._rede_direta_doacao_total = 0;

            this._rede_indireta_doacao_pendente = 0;
            this._rede_indireta_doacao_direta = 0;
            this._rede_indireta_doacao_pool = 0;
            this._rede_indireta_doacao_total = 0;
        }
    }

    public get moeda(): string {
        return this._moeda;
    }

    public get doador_doacao_pendente(): number {
      return this._doador_doacao_pendente;
    }
    public get doador_doacao_direta(): number {
      return this._doador_doacao_direta;
    }
    public get doador_doacao_pool(): number {
      return this._doador_doacao_pool;
    }
    public get doador_doacao_total(): number {
      return this._doador_doacao_total;
    }
    public get doador_doacao_impacto(): number {
      return this._doador_doacao_impacto;
    }

    public get rede_acima_doacao_pendente(): number {
      return this._rede_acima_doacao_pendente;
    }
    public get rede_acima_doacao_direta(): number {
      return this._rede_acima_doacao_direta;
    }
    public get rede_acima_doacao_pool(): number {
      return this._rede_acima_doacao_pool;
    }
    public get rede_acima_doacao_total(): number {
      return this._rede_acima_doacao_total;
    }

    public get rede_abaixo_doacao_pendente(): number {
      return this._rede_abaixo_doacao_pendente;
    }
    public get rede_abaixo_doacao_direta(): number {
      return this._rede_abaixo_doacao_direta;
    }
    public get rede_abaixo_doacao_pool(): number {
      return this._rede_abaixo_doacao_pool;
    }
    public get rede_abaixo_doacao_total(): number {
      return this._rede_abaixo_doacao_total;
    }

    public get rede_direta_doacao_pendente(): number {
      return this._rede_direta_doacao_pendente;
    }
    public get rede_direta_doacao_direta(): number {
      return this._rede_direta_doacao_direta;
    }
    public get rede_direta_doacao_pool(): number {
      return this._rede_direta_doacao_pool;
    }
    public get rede_direta_doacao_total(): number {
      return this._rede_direta_doacao_total;
    }

    public get rede_indireta_doacao_pendente(): number {
      return this._rede_indireta_doacao_pendente;
    }
    public get rede_indireta_doacao_direta(): number {
      return this._rede_indireta_doacao_direta;
    }
    public get rede_indireta_doacao_pool(): number {
      return this._rede_indireta_doacao_pool;
    }
    public get rede_indireta_doacao_total(): number {
      return this._rede_indireta_doacao_total;
    }

    public get doacao_ong(): api.Tastypie.Resource<DoadorDoacaoOng> {
        return this._doacao_ong;
    }
    public get doacao_ods(): api.Tastypie.Resource<DoadorDoacaoOds> {
        return this._doacao_ods;
    }
}

export class DoadorRede {
    private _doador_id: number;
    private _acima_resource: api.Tastypie.Resource<DoadorRedeAmigos>;
    private _abaixo_resource: api.Tastypie.Resource<DoadorRedeAmigos>;
    private _direta_resource: api.Tastypie.Resource<DoadorRedeAmigos>;
    private _indireta_resource: api.Tastypie.Resource<DoadorRedeAmigos>;

    constructor(doador_id: number) {
        this._doador_id = doador_id;
        this._acima_resource = new api.Tastypie.Resource<DoadorRedeAmigos>('doador/rede', {model: DoadorRedeAmigos, defaults: {rede: 'acima'}});
        this._abaixo_resource = new api.Tastypie.Resource<DoadorRedeAmigos>('doador/rede', {model: DoadorRedeAmigos, defaults: {rede: 'abaixo'}});
        this._direta_resource = new api.Tastypie.Resource<DoadorRedeAmigos>('doador/rede', {model: DoadorRedeAmigos, defaults: {rede: 'direta'}});
        this._indireta_resource = new api.Tastypie.Resource<DoadorRedeAmigos>('doador/rede', {model: DoadorRedeAmigos, defaults: {rede: 'indireta'}});
    }

    public get acima(): api.Tastypie.Resource<DoadorRedeAmigos> {
        return this._acima_resource;
    }

    public get abaixo(): api.Tastypie.Resource<DoadorRedeAmigos> {
        return this._abaixo_resource;
    }

    public get direta(): api.Tastypie.Resource<DoadorRedeAmigos> {
        return this._direta_resource;
    }

    public get indireta(): api.Tastypie.Resource<DoadorRedeAmigos> {
        return this._indireta_resource;
    }
}

export class DoadorRedeAmigos extends api.Tastypie.Model<DoadorRedeAmigos> {
    public static resource = new api.Tastypie.Resource<DoadorRedeAmigos>('doador/rede', {model: DoadorRedeAmigos});

    public doador_id: number;
    public doador_nome: number;
    public doador_email: number;
    public parent_id: number;
    public parent_nome: number;
    public parent_email: number;
    public parent_ativo: boolean;
    public parent_dt_created: string;

    constructor(obj?:any){
        super(DoadorRedeAmigos.resource, obj);
    }
}

export class DoadorDoacaoOng extends api.Tastypie.Model<DoadorDoacaoOng> {
    public static resource = new api.Tastypie.Resource<DoadorDoacaoOng>('doador/doacao-ong', {model: DoadorDoacaoOng});

    public ong: ong_models.Ong;
    public doador_id: number;
    public moeda: string;
    public doacao_direta: number;
    public doacao_pool: number;
    public doacao_total: number;
    public pontos: number;
    public dt_updated: string;
    private _doacao_ods: api.Tastypie.Resource<DoadorDoacaoOds>;

    constructor(obj?:any){
        super(DoadorDoacaoOng.resource, obj);
        let _self = this;
        if(_self.ong){
            _self.ong = new ong_models.Ong(_self.ong);
            _self._doacao_ods = new api.Tastypie.Resource<DoadorDoacaoOds>('doador/doacao-ods', {model: DoadorDoacaoOds, defaults: {doador_id: _self.doador_id, ong_id: _self.ong.id}});
        }
    }

    public get doacao_ods(): api.Tastypie.Resource<DoadorDoacaoOds> {
        return this._doacao_ods;
    }
}

export class DoadorDoacaoOds extends api.Tastypie.Model<DoadorDoacaoOds> {
    public static resource = new api.Tastypie.Resource<DoadorDoacaoOds>('doador/doacao-ods', {model: DoadorDoacaoOds});

    public ods: onu_models.Ods;
    public doador_id: number;
    public moeda: string;
    public doacao_direta: number;
    public doacao_pool: number;
    public doacao_total: number;
    public nivel: number;
    public dt_updated: string;
    private _doacao_ong: api.Tastypie.Resource<DoadorDoacaoOng>;

    constructor(obj?:any){
        super(DoadorDoacaoOds.resource, obj);
        let _self = this;
        if(_self.ods){
            _self.ods = new onu_models.Ods(_self.ods);
            _self._doacao_ong = new api.Tastypie.Resource<DoadorDoacaoOng>('doador/doacao-ong', {model: DoadorDoacaoOng, defaults: {doador_id: _self.doador_id, ods_id: _self.ods.id}});
        }
    }

    public get doacao_ong(): api.Tastypie.Resource<DoadorDoacaoOng> {
        return this._doacao_ong;
    }
}

export class DoadorCompraAfiliadoraStatus extends api.Tastypie.Model<DoadorCompraAfiliadoraStatus> {

    public static resource = new api.Tastypie.Resource<DoadorCompraAfiliadoraStatus>('doador/profile/<id>/compra-afiliadora-status', {model: DoadorCompraAfiliadoraStatus});

    private _doador_id: number;
    private _ativo: boolean;
    private _compra_qtde: number;
    private _doacao_total: number;
    private _doacao_porcentagem: number;
    private _dt_updated: string;
    private _compra: api.Tastypie.Resource<DoadorCompraAfiliadora>;

    constructor(obj?:any){
        super(DoadorCompraAfiliadoraStatus.resource);

        if(obj){
            this.id = obj.id,
            this._doador_id = obj.doador_id;
            this._ativo = obj.ativo;
            this._compra_qtde = obj.compra_qtde;
            this._doacao_total = obj.doacao_total;
            this._doacao_porcentagem = obj.doacao_porcentagem;
            this._dt_updated = obj.dt_updated;
            this._compra = new api.Tastypie.Resource<DoadorCompraAfiliadora>('doador/compra-afiliadora', {model: DoadorCompraAfiliadora, defaults: {doador_id: obj.doador_id}});
        }else{
            this._ativo = false;
            this._compra_qtde = 0;
            this._doacao_total = 0.00;
            this._doacao_porcentagem = 85.00;
        }
    }

    public get doador_id(): number {
        return this._doador_id;
    }

    public get ativo(): boolean {
        return this._ativo;
    }

    public get compra_qtde(): number {
        return this._compra_qtde;
    }

    public get doacao_total(): number {
        return this._doacao_total;
    }

    public get doacao_porcentagem(): number {
        return this._doacao_porcentagem;
    }

    public get dt_updated(): string {
        return this._dt_updated;
    }

    public get compra(): api.Tastypie.Resource<DoadorCompraAfiliadora> {
        return this._compra;
    }
}

export class DoadorCompraAfiliadora extends api.Tastypie.Model<DoadorCompraAfiliadora> {
    public static resource = new api.Tastypie.Resource<DoadorCompraAfiliadora>('doador-compra-afiliadora', {model: DoadorCompraAfiliadora});

    public uid: string;
    public doador_id: number;
    public doador_email: string;

    public afiliadora_id: number;
    public afiliadora_nome: string;

    public loja_id: number;
    public loja_nome: string;

    public compra_moeda: string;
    public compra_valor: number;
    public comissao_moeda: string;
    public comissao_valor: number;

    public cotacao_brl: number;
    public comissao_valor_brl: number;

    public doacao_porcentagem: number;
    public taxas_afiliadora: number;
    public total_taxa_adm: number;

    public doacao_moeda: string;
    public doacao_valor: number;

    public status_compra: string;
    public status_doacao: string;

    public fatura_id: number;

    public dt_compra: string;
    public dt_aprovacao: string;
    public dt_updated: string;
    public dt_created: string;

    constructor(obj?:any){
        super(DoadorCompraAfiliadora.resource, obj);

    }
}
