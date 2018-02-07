import * as api from "ts-resource-tastypie";
import * as weauth_models from "./weAuth";
import * as ong_models from "./ong";
import * as onu_models from "./onu";
import * as we_notify_models from "./weNotify";
export declare class Doador extends api.Tastypie.Model<Doador> {
    static resource: api.Tastypie.Resource<Doador>;
    nome: string;
    private _email;
    private _dt_created;
    private _we_notify;
    private _rede;
    private _ong_timeline;
    private _user;
    private _doador_logado;
    constructor(obj?: any);
    private initProfile(obj?);
    readonly email: string;
    readonly dt_created: string;
    readonly rede: DoadorRede;
    readonly ong_timeline: api.Tastypie.Resource<ong_models.OngTimeLine>;
    readonly we_notify: api.Tastypie.Resource<we_notify_models.WeNotifyDoador>;
    readonly user: weauth_models.User;
    getPontos(): Promise<DoadorPontos>;
    getDoacao(): Promise<DoadorDoacao>;
    getCompraAfiliadora(): Promise<DoadorCompraAfiliadoraStatus>;
    create_account(name: string, email: string, password: string, kargs?: any): Promise<Doador>;
    login(username: string, password: string, kargs?: any): Promise<Doador>;
    login_facebook(username: string, facebook_uid: string, facebook_access_token: string, kargs?: any): Promise<Doador>;
    quickLogin(auth?: {
        username: string;
        apikey: string;
    }, kargs?: any): Promise<Doador>;
}
export declare class DoadorPontos extends api.Tastypie.Model<DoadorPontos> {
    static resource: api.Tastypie.Resource<DoadorPontos>;
    private _doador_id;
    private _recebidos;
    private _distribuidos;
    private _disponiveis;
    private _recebidos_cadastro;
    private _recebidos_convite;
    private _recebidos_compra;
    private _ong;
    private _distribuicao_resource;
    constructor(obj?: any);
    distribuir(ong_id: number, pontos: number): Promise<DoadorPontos>;
    readonly doador_id: number;
    readonly recebidos: number;
    readonly distribuidos: number;
    readonly disponiveis: number;
    readonly recebidos_cadastro: number;
    readonly recebidos_convite: number;
    readonly recebidos_compra: number;
    readonly ong: api.Tastypie.Resource<DoadorOngPontos>;
}
export declare class DoadorOngPontos extends api.Tastypie.Model<DoadorOngPontos> {
    static resource: api.Tastypie.Resource<DoadorOngPontos>;
    ong: ong_models.Ong;
    pontos: number;
    constructor(obj?: any);
}
export declare class DoadorDoacao extends api.Tastypie.Model<DoadorDoacao> {
    static resource: api.Tastypie.Resource<DoadorDoacao>;
    private _doador_id;
    private _moeda;
    private _doador_doacao_pendente;
    private _doador_doacao_direta;
    private _doador_doacao_pool;
    private _doador_doacao_total;
    private _doador_doacao_impacto;
    private _rede_acima_doacao_pendente;
    private _rede_acima_doacao_direta;
    private _rede_acima_doacao_pool;
    private _rede_acima_doacao_total;
    private _rede_abaixo_doacao_pendente;
    private _rede_abaixo_doacao_direta;
    private _rede_abaixo_doacao_pool;
    private _rede_abaixo_doacao_total;
    private _rede_direta_doacao_pendente;
    private _rede_direta_doacao_direta;
    private _rede_direta_doacao_pool;
    private _rede_direta_doacao_total;
    private _rede_indireta_doacao_pendente;
    private _rede_indireta_doacao_direta;
    private _rede_indireta_doacao_pool;
    private _rede_indireta_doacao_total;
    private _doacao_ong;
    private _doacao_ods;
    private _dt_updated;
    constructor(obj?: any);
    readonly moeda: string;
    readonly doador_doacao_pendente: number;
    readonly doador_doacao_direta: number;
    readonly doador_doacao_pool: number;
    readonly doador_doacao_total: number;
    readonly doador_doacao_impacto: number;
    readonly rede_acima_doacao_pendente: number;
    readonly rede_acima_doacao_direta: number;
    readonly rede_acima_doacao_pool: number;
    readonly rede_acima_doacao_total: number;
    readonly rede_abaixo_doacao_pendente: number;
    readonly rede_abaixo_doacao_direta: number;
    readonly rede_abaixo_doacao_pool: number;
    readonly rede_abaixo_doacao_total: number;
    readonly rede_direta_doacao_pendente: number;
    readonly rede_direta_doacao_direta: number;
    readonly rede_direta_doacao_pool: number;
    readonly rede_direta_doacao_total: number;
    readonly rede_indireta_doacao_pendente: number;
    readonly rede_indireta_doacao_direta: number;
    readonly rede_indireta_doacao_pool: number;
    readonly rede_indireta_doacao_total: number;
    readonly doacao_ong: api.Tastypie.Resource<DoadorDoacaoOng>;
    readonly doacao_ods: api.Tastypie.Resource<DoadorDoacaoOds>;
}
export declare class DoadorRede {
    private _doador_id;
    private _acima_resource;
    private _abaixo_resource;
    private _direta_resource;
    private _indireta_resource;
    constructor(doador_id: number);
    readonly acima: api.Tastypie.Resource<DoadorRedeAmigos>;
    readonly abaixo: api.Tastypie.Resource<DoadorRedeAmigos>;
    readonly direta: api.Tastypie.Resource<DoadorRedeAmigos>;
    readonly indireta: api.Tastypie.Resource<DoadorRedeAmigos>;
}
export declare class DoadorRedeAmigos extends api.Tastypie.Model<DoadorRedeAmigos> {
    static resource: api.Tastypie.Resource<DoadorRedeAmigos>;
    doador_id: number;
    doador_nome: number;
    doador_email: number;
    parent_id: number;
    parent_nome: number;
    parent_email: number;
    parent_ativo: boolean;
    constructor(obj?: any);
}
export declare class DoadorDoacaoOng extends api.Tastypie.Model<DoadorDoacaoOng> {
    static resource: api.Tastypie.Resource<DoadorDoacaoOng>;
    ong: ong_models.Ong;
    doador_id: number;
    moeda: string;
    doacao_direta: number;
    doacao_pool: number;
    doacao_total: number;
    dt_updated: string;
    private _doacao_ods;
    constructor(obj?: any);
    readonly doacao_ods: api.Tastypie.Resource<DoadorDoacaoOds>;
}
export declare class DoadorDoacaoOds extends api.Tastypie.Model<DoadorDoacaoOds> {
    static resource: api.Tastypie.Resource<DoadorDoacaoOds>;
    ods: onu_models.Ods;
    doador_id: number;
    moeda: string;
    doacao_direta: number;
    doacao_pool: number;
    doacao_total: number;
    nivel: number;
    dt_updated: string;
    private _doacao_ong;
    constructor(obj?: any);
    readonly doacao_ong: api.Tastypie.Resource<DoadorDoacaoOng>;
}
export declare class DoadorCompraAfiliadoraStatus extends api.Tastypie.Model<DoadorCompraAfiliadoraStatus> {
    static resource: api.Tastypie.Resource<DoadorCompraAfiliadoraStatus>;
    private _doador_id;
    private _ativo;
    private _compra_qtde;
    private _doacao_total;
    private _doacao_porcentagem;
    private _dt_updated;
    private _compra;
    constructor(obj?: any);
    readonly doador_id: number;
    readonly ativo: boolean;
    readonly compra_qtde: number;
    readonly doacao_total: number;
    readonly doacao_porcentagem: number;
    readonly dt_updated: string;
    readonly compra: api.Tastypie.Resource<DoadorCompraAfiliadora>;
}
export declare class DoadorCompraAfiliadora extends api.Tastypie.Model<DoadorCompraAfiliadora> {
    static resource: api.Tastypie.Resource<DoadorCompraAfiliadora>;
    uid: string;
    doador_id: number;
    doador_email: string;
    afiliadora_id: number;
    afiliadora_nome: string;
    loja_id: number;
    loja_nome: string;
    compra_moeda: string;
    compra_valor: number;
    comissao_moeda: string;
    comissao_valor: number;
    cotacao_brl: number;
    comissao_valor_brl: number;
    doacao_porcentagem: number;
    taxas_afiliadora: number;
    total_taxa_adm: number;
    doacao_moeda: string;
    doacao_valor: number;
    status_compra: string;
    status_doacao: string;
    fatura_id: number;
    dt_compra: string;
    dt_aprovacao: string;
    dt_updated: string;
    dt_created: string;
    constructor(obj?: any);
}
