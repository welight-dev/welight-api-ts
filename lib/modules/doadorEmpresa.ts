// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>

import * as api from "ts-resource-tastypie";
import { Doador } from "./doador";
import { Ong } from "./ong";
import { Fatura, FaturaDistribuicao } from "./doadorEmpresaFatura";

export class Empresa extends api.Tastypie.Model<Empresa> {
    public static resource = new api.Tastypie.Resource<Empresa>('doador-empresa/profile', {model: Empresa});

    public nome: string;
    public email: string;
    public cpf_cnpj: string;
    public slug: string;
    public logo: string;
    public website: string;
    public token: string;
    public invite: string;
    public acesso_ativo: boolean;
    public tela_resposta: EmpresaTelaResposta;
    private _doador: Doador;
    private _vendas: api.Tastypie.Resource<Venda>;
    private _ongs: api.Tastypie.Resource<EmpresaOng>;
    private _cliente: api.Tastypie.Resource<Cliente>;
    private _faturas: api.Tastypie.Resource<Fatura>;

    constructor(obj?:any){
        super(Empresa.resource, obj);
        this._doador = new Doador();
        this.initProfile(obj);
    }

    public save(): Promise<Empresa> {
        let _self = this;
        return super.save().then(
            function(response: Empresa){
                _self.initProfile(response);
                return _self;
            }
        );
    }

    private initProfile(obj?: any): void {
        if(obj){
            if(obj.id){
                this._vendas = new api.Tastypie.Resource<Venda>('doador-empresa/venda', {model: Venda, defaults: {empresa_id: obj.id}});
                this._ongs = new api.Tastypie.Resource<EmpresaOng>('doador-empresa/empresa-ong', {model: EmpresaOng, defaults: {empresa_id: obj.id}});
                this._cliente = new api.Tastypie.Resource<Cliente>('doador-empresa/cliente', {model: Cliente, defaults: {empresa_id: obj.id}});
                this._faturas = new api.Tastypie.Resource<Fatura>('doador-empresa-fatura/fatura', {model: Fatura, defaults: {empresa_id: obj.id}});
            }
            if(obj.tela_resposta) this.tela_resposta = new EmpresaTelaResposta(obj.tela_resposta);
        }
    }

    public get doador(): Doador {
        return this._doador;
    }

    public get vendas(): api.Tastypie.Resource<Venda> {
        return this._vendas;
    }

    public get ongs(): api.Tastypie.Resource<EmpresaOng> {
        return this._ongs;
    }

    public get clientes(): api.Tastypie.Resource<Cliente> {
        return this._cliente;
    }

    public get faturas(): api.Tastypie.Resource<Fatura> {
        return this._faturas;
    }

    public getEndereco(): Promise<EmpresaEndereco> {
        if(this.id){
            return EmpresaEndereco.resource.objects.findOne({empresa_id: this.id});
        }else{
            return api.Tastypie.Tools.generate_exception("[Empresa][getEndereco] Empresa não identificada.");
        }
    }

    public getVtexConf(): Promise<EmpresaVtex> {
        if(this.id){
            return EmpresaVtex.resource.objects.findOne({empresa_id: this.id});
        }else{
            return api.Tastypie.Tools.generate_exception("[Empresa][getVtexConf] Empresa não identificada.");
        }
    }

    public createAccount(nome: string, email: string, cpf_cnpj:string, kwargs?:any): Promise<Empresa> {
        let _self = this;
        return this._doador.createAccountDoadorEmpresa(nome, email, cpf_cnpj, kwargs).then(
            function(doador_response: Doador){
                return Empresa.resource.objects.findOne({doador_id:doador_response.id}).then(
                    function(empresa_resp: Empresa){
                        if(empresa_resp.id){
                            _self.setData(empresa_resp);
                            _self.initProfile(empresa_resp);
                        }
                        return _self;
                    }
                ).catch(function(){
                    return _self;
                });
            }
        );
    }

    public login(username: string, password: string, kwargs?:any): Promise<Empresa> {
        let _self = this;
        return this._doador.login(username, password, kwargs).then(
            function(doador_response: Doador){
                return Empresa.resource.objects.findOne({doador_id:doador_response.id}).then(
                    function(empresa_resp: Empresa){
                        if(empresa_resp.id){
                            _self.setData(empresa_resp);
                            _self.initProfile(empresa_resp);
                        }
                        return _self;
                    }
                ).catch(function(){
                    return _self;
                });
            }
        );
    }

    public quickLogin(auth?:{username: string, apikey: string}, kwargs?:any): Promise<Empresa> {
        let _self = this;
        return this._doador.quickLogin(auth, kwargs).then(
            function(doador_response: Doador){
                return Empresa.resource.objects.findOne({doador_id:doador_response.id}).then(
                    function(empresa_resp: Empresa){
                        if(empresa_resp.id){
                            _self.setData(empresa_resp);
                            _self.initProfile(empresa_resp);
                        }
                        return _self;
                    }
                ).catch(function(){
                    return _self;
                });
            }
        );
    }
}

export class EmpresaEndereco extends api.Tastypie.Model<EmpresaEndereco> {

    public static resource = new api.Tastypie.Resource<EmpresaEndereco>('doador-empresa/endereco', {model: EmpresaEndereco});

    public empresa_id: number;
    public cep: string;
    public rua: string;
    public numero: string;
    public complemento: string;
    public bairro: string;
    public cidade: string;
    public estado: string;
    public pais: string;

    constructor(obj?:any){
      super(EmpresaEndereco.resource, obj);
    }
}

export class EmpresaOng extends api.Tastypie.Model<EmpresaOng> {
    public static resource = new api.Tastypie.Resource<EmpresaOng>('doador-empresa/empresa-ong', {model: EmpresaOng});

    public empresa_id: number;
    public ong_id: number;
    public ong: Ong;
    public dt_created: string;

    constructor(obj?:any, _resource?:api.Tastypie.Resource<EmpresaOng>){
        super(_resource || EmpresaOng.resource, obj);
        if(obj){
          if(obj.ong) this.ong = new Ong(obj.ong);
        }
    }
}

export class EmpresaOngPublic extends api.Tastypie.Model<EmpresaOng> {
    public static resource = new api.Tastypie.Resource<EmpresaOng>('doador-empresa/empresa-ong-public', {model: EmpresaOng});

    public empresa_id: number;
    public ong_id: number;
    public ong: Ong;
    public dt_created: string;

    constructor(obj?:any, _resource?:api.Tastypie.Resource<EmpresaOng>){
        super(_resource || EmpresaOng.resource, obj);
        if(obj){
          if(obj.ong) this.ong = new Ong(obj.ong);
        }
    }
}

export class ClienteOng extends api.Tastypie.Model<ClienteOng> {
    public static resource = new api.Tastypie.Resource<ClienteOng>('doador-empresa/cliente-ong', {model: ClienteOng});

    public cliente_id: number;
    public ong: Ong;

    constructor(obj?:any){
        super(ClienteOng.resource, obj);
        if(obj){
          if(obj.ong) this.ong = new Ong(obj.ong);
        }
    }
}

export class Cliente extends api.Tastypie.Model<Cliente> {
    public static resource = new api.Tastypie.Resource<Cliente>('doador-empresa/cliente', {model: Cliente});

    public empresa_id: number;
    public nome: string;
    public email: string;
    public cliente_empresa: string;
    public cliente_key: string;
    public status_compras: {qtde: number, total_compra: number, total_doacao: number};
    private _compras: api.Tastypie.Resource<Venda>;
    private _ongs: api.Tastypie.Resource<ClienteOng>;
    private _doacoes: api.Tastypie.Resource<FaturaDistribuicao>;

    constructor(obj?:any, _resource?:api.Tastypie.Resource<Cliente>){
        super(_resource || Cliente.resource, obj);
        this.initProfile(obj);
    }

    private initProfile(obj?: any): void {
        if(obj){
            this._ongs = new api.Tastypie.Resource<ClienteOng>('doador-empresa/cliente-ong', {model: ClienteOng, defaults: {cliente_id: obj.id, cliente_key: obj.cliente_key}});
            this._compras = new api.Tastypie.Resource<Venda>('doador-empresa/venda', {model: Venda, defaults: {cliente_id: obj.id, empresa_id: obj.empresa_id}});
            this._doacoes = new api.Tastypie.Resource<FaturaDistribuicao>('doador-empresa-fatura/fatura-distribuicao', {model: FaturaDistribuicao, defaults: {cliente_id: obj.id}});
        }
    }

    public save(): Promise<Cliente> {
        let _self = this;
        return super.save().then(
            function(data: Cliente){
                _self.initProfile(data);
                return _self;
            }
        );
    }

    public get ongs(): api.Tastypie.Resource<ClienteOng> {
        return this._ongs;
    }

    public get compras(): api.Tastypie.Resource<Venda> {
        return this._compras;
    }

    public get doacoes(): api.Tastypie.Resource<FaturaDistribuicao> {
        return this._doacoes;
    }
}

export class Venda extends api.Tastypie.Model<Venda> {
    public static resource = new api.Tastypie.Resource<Venda>('doador-empresa/venda', {model: Venda});

    public empresa_id: number;
    public cliente_id: number;

    public empresa: Empresa;
    public cliente: Cliente;
    public uid: string;

    public venda_moeda: string;
    public venda_valor: number;

    public porcentagem: boolean;

    public doacao_porcent: number;
    public doacao_valor: number;

    public cotacao_brl: number;
    public doacao_valor_brl: number;

    public total_taxa_adm: number;
    public doacao_ong: number;

    public origem: string;
    public status_venda: string;
    public status_doacao: string;

    public teste_ab: string;

    public fatura_id: number;
    public descricao: number;

    public dt_updated: string;
    public dt_created: string;

    private _ongs: api.Tastypie.Resource<ClienteVendaOng>;

    constructor(obj?:any, _resource?:api.Tastypie.Resource<Venda>){
        super(_resource || Venda.resource, obj);
        if(obj){
            if(obj.empresa) this.empresa = new Empresa(obj.empresa);
            if(obj.cliente){
                this.cliente = new Cliente(obj.cliente);
                this._ongs = new api.Tastypie.Resource<ClienteVendaOng>('doador-empresa/cliente-venda-ong', {model: ClienteVendaOng, defaults: {cliente_id: this.cliente.id, cliente_key: this.cliente.cliente_key, venda_id: this.id}});
            }
        }
    }

    public get ongs(): api.Tastypie.Resource<ClienteVendaOng> {
        return this._ongs;
    }
}

export class ClienteVendaOng extends api.Tastypie.Model<ClienteVendaOng> {
    public static resource = new api.Tastypie.Resource<ClienteVendaOng>('doador-empresa/cliente-venda-ong', {model: ClienteVendaOng});

    public venda_id: number;
    public ong_id: number;
    public ong: Ong;
    public dt_created: string;

    constructor(obj?:any){
        super(ClienteVendaOng.resource, obj);
        if(obj){
            if(obj.ong) this.ong = new Ong(obj.ong);
        }
    }
}

export class EmpresaTelaResposta extends api.Tastypie.Model<EmpresaTelaResposta> {
    public static resource = new api.Tastypie.Resource<EmpresaTelaResposta>('doador-empresa/empresa-tela-resposta', {model: EmpresaTelaResposta});

    public empresa_id: number;
    public banner: string;
    public mensagem: string;
    public dt_updated: string;
    public dt_created: string;

    constructor(obj?:any){
        super(EmpresaTelaResposta.resource, obj);
    }
}

export class ClienteTelaResposta extends Venda {
    public static resource = new api.Tastypie.Resource<ClienteTelaResposta>('doador-empresa/cliente-tela-resposta', {model: ClienteTelaResposta});

    constructor(obj?:any){
        super(obj, ClienteTelaResposta.resource);
    }
}

export class EmpresaOngTelaResposta extends EmpresaOng {
    public static resource = new api.Tastypie.Resource<EmpresaOngTelaResposta>('doador-empresa/empresa-ong-tela-resposta', {model: EmpresaOngTelaResposta});
    public checked: Boolean;
    public children_id: number;

    constructor(obj?:any){
        super(obj, EmpresaOngTelaResposta.resource);
    }
}

export class VendaAnalytics extends api.Tastypie.Model<VendaAnalytics> {
    public static resource = new api.Tastypie.Resource<VendaAnalytics>('doador-empresa/venda/analytics', {model: VendaAnalytics});

    public teste: {"a": number, "b": number};
    public audiencia: {
        "sucesso": {"a": number, "b": number},
        "abandono": {"a": number, "b": number},
        "ticket_medio": {"a": number, "b": number}
    };
    public timeline: Array<{"title":string, "content": {"a":number, "b": number}}>;
    public ongs: Array<{"ong_id": number, "ong_nome": string, "porcentagem": number, "qtde": number}>;

    constructor(obj?:any){
        super(VendaAnalytics.resource, obj);
    }
}

export class VtexIconChoices extends api.Tastypie.Model<VtexIconChoices> {
    public static resource = new api.Tastypie.Resource<VtexIconChoices>('doador-empresa/vtex-icon-choices', {model: VtexIconChoices});
    public icon: string;
    public token: string;
    public dt_updated: string;
    public dt_created: string;

    constructor(obj?:any){
        super(obj, VtexIconChoices.resource);
    }
}

export class EmpresaVtex extends api.Tastypie.Model<EmpresaVtex> {
    public static resource = new api.Tastypie.Resource<EmpresaVtex>('doador-empresa/vtex', {model: EmpresaVtex});
    public empresa_id: number;
    public icon_choices_id: number;
    public icon_choices: VtexIconChoices;
    public titulo: string;
    public doacao_porcent: boolean;
    public doacao_valor: number;
    public alinhamento: string;
    public cor_icone: string;
    public cor_fundo: string;
    public ativo: boolean;
    public dt_updated: string;
    public dt_created: string;

    constructor(obj?:any){
        super(obj, EmpresaVtex.resource);
        if(obj){
            if(obj.icon_choices) this.icon_choices = new VtexIconChoices(obj.icon_choices);
        }
    }
}
