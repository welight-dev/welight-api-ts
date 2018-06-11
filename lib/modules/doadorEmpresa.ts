// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>

import * as api from "ts-resource-tastypie";
import { Doador } from "./doador";
import { Ong } from "./ong";
import { Fatura } from "./doadorEmpresaFatura";

export class Empresa extends api.Tastypie.Model<Empresa> {
    public static resource = new api.Tastypie.Resource<Empresa>('doador-empresa/profile', {model: Empresa});

    public nome: string;
    public email: string;
    public cpf_cnpj: string;
    public slug: string;
    public logo: string;
    public website: string;
    public token: string;
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
                );
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
                );
            }
        );
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
    private _cliente_key: string;
    private _status_compras: {qtde: number, total_compra: number, total_doacao: number};
    private _compras: api.Tastypie.Resource<Venda>;
    private _ongs: api.Tastypie.Resource<ClienteOng>;

    constructor(obj?:any, _resource?:api.Tastypie.Resource<Cliente>){
        super(_resource || Cliente.resource, obj);
        this.initProfile(obj);
    }

    private initProfile(obj?: any): void {
        if(obj){
            this._cliente_key = obj.cliente_key;
            this._status_compras = obj.status_compras;
            this._ongs = new api.Tastypie.Resource<ClienteOng>('doador-empresa/cliente-ong', {model: ClienteOng, defaults: {cliente_id: obj.id, cliente_key: obj.cliente_key}});
            this._compras = new api.Tastypie.Resource<Venda>('doador-empresa/venda', {model: Venda, defaults: {cliente_id: obj.id, empresa_id: obj.empresa_id}});
        }
    }

    public save(): Promise<Cliente> {
        let _self = this;
        return super.save().then(
            function(data: Cliente){
                _self.setData(data);
                _self.initProfile(data);
                return _self;
            }
        );
    }

    public get cliente_key(): string {
        return this._cliente_key;
    }

    public get status_compras(): {qtde: number, total_compra: number, total_doacao: number} {
        return this._status_compras;
    }

    public get ongs(): api.Tastypie.Resource<ClienteOng> {
        return this._ongs;
    }

    public get compras(): api.Tastypie.Resource<Venda> {
        return this._compras;
    }
}

export class Venda extends api.Tastypie.Model<Venda> {
    public static resource = new api.Tastypie.Resource<Venda>('doador-empresa/venda', {model: Venda});

    public empresa_id: number;
    public cliente_id: number;
    public empresa: Empresa;
    public cliente: Cliente;
    public moeda: string;
    public valor_venda: number;
    public porcentagem: boolean;
    public doacao_porcent: number;
    public doacao_total: number;
    public status: string;
    public origem: string;
    public fatura_id: number;
    public dt_updated: string;
    public dt_created: string;
    public ongs: api.Tastypie.Resource<ClienteVendaOng>;

    constructor(obj?:any, _resource?:api.Tastypie.Resource<Venda>){
        super(_resource || Venda.resource, obj);
        if(obj){
            if(obj.empresa) this.empresa = new Empresa(obj.empresa);
            if(obj.cliente){
                this.cliente = new Cliente(obj.cliente);
                this.ongs = new api.Tastypie.Resource<ClienteVendaOng>('doador-empresa/cliente-venda-ong', {model: ClienteVendaOng, defaults: {cliente_id: this.cliente.id, cliente_key: this.cliente.cliente_key, venda_id: this.id}});
            }
        }
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
