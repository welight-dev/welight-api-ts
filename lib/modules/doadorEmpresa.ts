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
    public profile_detail: EmpresaDetail;
    public endereco: EmpresaEndereco;
    private _doador: Doador;
    private _vendas: api.Tastypie.Resource<Venda>;
    private _ongs: api.Tastypie.Resource<EmpresaOng>;
    private _cliente: api.Tastypie.Resource<Cliente>;
    private _faturas: api.Tastypie.Resource<Fatura>;
    private _modulos: api.Tastypie.Resource<EmpresaModuloAtivo>;

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
                this._modulos = new api.Tastypie.Resource<EmpresaModuloAtivo>('doador-empresa/modulo-ativo', {model: EmpresaModuloAtivo, defaults: {empresa_id: obj.id}});
                this._modulos.objects.find();
            }
            if(obj.tela_resposta) this.tela_resposta = new EmpresaTelaResposta(obj.tela_resposta);
            if(obj.profile_detail) {
                this.profile_detail = new EmpresaDetail(obj.profile_detail);
            }else{
                this.profile_detail = new EmpresaDetail();
            }

            if(obj.endereco) {
                this.endereco = new EmpresaEndereco(obj.endereco);
            }else{
                this.endereco = new EmpresaEndereco();
            }
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

    public get modulos(): api.Tastypie.Resource<EmpresaModuloAtivo> {
        return this._modulos;
    }

    public getEndereco(): Promise<EmpresaEndereco> {
        let _self = this;
        if(_self.id){
            return EmpresaEndereco.resource.objects.findOne({empresa_id: _self.id}).then(
                function(data: EmpresaEndereco){
                    _self.endereco = data;
                    return data;
                }
            );
        }else{
            return api.Tastypie.Tools.generate_exception("[Empresa][getEndereco] Empresa não identificada.");
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

export class EmpresaDetail extends api.Tastypie.Model<EmpresaDetail> {
    public static resource = new api.Tastypie.Resource<EmpresaDetail>('doador-empresa/detail', {model: EmpresaDetail});

    public empresa_id: number;
    public telefone: string;
    public qtde_venda_mes: number;
    public ticket_medio: number;
    public dt_updated: string;
    public dt_created: string;

    constructor(obj?:any){
        super(EmpresaDetail.resource, obj);

        if(!obj){
            this.telefone = "";
            this.qtde_venda_mes = 0;
            this.ticket_medio = 0;
        }
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
    public modulo: EmpresaModulo;
    public plataforma: EmpresaModuloPlataforma;
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
            if(obj.modulo) this.modulo = new EmpresaModulo(obj.modulo);
            if(obj.plataforma) this.plataforma = new EmpresaModuloPlataforma(obj.plataforma);
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
    public titulo: string;
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

export class WidgetIconChoices extends api.Tastypie.Model<WidgetIconChoices> {
    public static resource = new api.Tastypie.Resource<WidgetIconChoices>('doador-empresa/widget-icon-choices', {model: WidgetIconChoices});
    public icon: string;
    public token: string;
    public dt_updated: string;
    public dt_created: string;

    constructor(obj?:any){
        super(WidgetIconChoices.resource, obj);
    }
}

export class EmpresaWidget extends api.Tastypie.Model<EmpresaWidget> {
    public empresa_id: number;
    public titulo: string;
    public icon: string;
    public doacao_porcent: boolean;
    public doacao_valor: number;
    public alinhamento: string;
    public cor_fundo: string;
    public position: string;
    public ativo: boolean;
    public dt_updated: string;
    public dt_created: string;

    constructor(obj?:any, resource?:api.Tastypie.Resource<EmpresaWidget>){
        super(resource, obj);
    }
}

export class EmpresaVtex extends EmpresaWidget {
    public static resource = new api.Tastypie.Resource<EmpresaVtex>('doador-empresa/vtex', {model: EmpresaVtex});

    constructor(obj?:any){
        super(obj, EmpresaVtex.resource);
    }
}

export class EmpresaVnda extends EmpresaWidget {
    public static resource = new api.Tastypie.Resource<EmpresaVnda>('doador-empresa/vnda', {model: EmpresaVnda});

    constructor(obj?:any){
        super(obj, EmpresaVnda.resource);
    }
}

export class EmpresaLojaintegrada extends EmpresaWidget {
    public static resource = new api.Tastypie.Resource<EmpresaLojaintegrada>('doador-empresa/loja-integrada', {model: EmpresaLojaintegrada});

    constructor(obj?:any){
        super(obj, EmpresaLojaintegrada.resource);
    }
}

export class EmpresaShopfy extends EmpresaWidget {
    public static resource = new api.Tastypie.Resource<EmpresaShopfy>('doador-empresa/shopfy', {model: EmpresaShopfy});

    constructor(obj?:any){
        super(obj, EmpresaShopfy.resource);
    }
}

export class EmpresaModuloPlataforma {
    public nome: string;
    public token: string;
    public dt_created: string;

    constructor(obj?:any){
        if(obj){
            this.nome = obj.nome;
            this.token = obj.token;
            this.dt_created = obj.dt_created;
        }
    }
}

export class EmpresaModulo extends api.Tastypie.Model<EmpresaModulo> {
    public static resource = new api.Tastypie.Resource<EmpresaModulo>('doador-empresa/modulo', {model: EmpresaModulo});
    public nome: string;
    public token: string;
    public dt_created: string;
    public plataformas: Array<EmpresaModuloPlataforma>;

    constructor(obj?:any){
        super(EmpresaModulo.resource, obj);
        this.plataformas = [];
        if(obj){
            if(obj.plataformas){
                for(let plat of obj.plataformas){
                    this.plataformas.push(new EmpresaModuloPlataforma(plat));
                }
            }
        }
    }
}

export class EmpresaModuloAtivo extends api.Tastypie.Model<EmpresaModuloAtivo> {
    public static resource = new api.Tastypie.Resource<EmpresaModuloAtivo>('doador-empresa/modulo-ativo', {model: EmpresaModuloAtivo});
    public empresa_id: number;
    public modulo_id: number;
    public dt_created: string;
    public modulo: EmpresaModulo;
    public plataforma_config: Array<{'plataforma': EmpresaModuloPlataforma, 'config':any}>;

    constructor(obj?:any){
        super(EmpresaModuloAtivo.resource, obj);
        this.plataforma_config = [];
        if(obj){
            if(obj.modulo){
                this.modulo = new EmpresaModulo(obj.modulo);
            }

            if(obj.plataforma_config){
                for(let conf of obj.plataforma_config){
                    let conf_obj: any;

                    if(this.modulo.token == 'ecommerce'){
                        if(conf.plataforma.token == 'vtex'){
                            conf_obj = new EmpresaVtex(conf.config);
                        }else if(conf.plataforma.token == 'vnda'){
                            conf_obj = new EmpresaVnda(conf.config);
                        }else if(conf.plataforma.token == 'lojaintegrada'){
                            conf_obj = new EmpresaLojaintegrada(conf.config);
                        }else if(conf.plataforma.token == 'shopfy'){
                            conf_obj = new EmpresaShopfy(conf.config);
                        }else{
                            conf_obj = conf.config;
                        }
                    }else if(this.modulo.token == 'pdv'){
                        if(conf.plataforma.token == 'welight'){
                            conf_obj = new EmpresaPdv(conf.config);
                        }
                    }

                    this.plataforma_config.push(
                        {
                          'plataforma': new EmpresaModuloPlataforma(conf.plataforma),
                          'config': conf_obj
                        }
                    );
                }
            }
        }
    }
}


export class EmpresaPdv extends api.Tastypie.Model<EmpresaPdv> {
    public static resource = new api.Tastypie.Resource<EmpresaPdv>('doador-empresa/pdv', {model: EmpresaPdv});
    public empresa_id: number;
    public porcentagem: boolean;
    public doacao_porcent: number;
    public doacao_valor: number;
    public titulo_ui: {
        font_type: string,
        font_color: string,
        font_weight: number,
        font_custom: string
    };
    public formulario_ui: {
        font_type: string,
        font_color: string,
        font_weight: number,
        font_custom: string,
        background_color: string
    };
    public botao_ui: {
        font_type: string,
        font_color: string,
        font_weight: number,
        font_custom: string,
        background_color: string,
        border_weight: number
    };
    public pagina_img_fundo: string;
    public pagina_img_logo: string;
    public pagina_cor_fundo: string;
    public titulo_sucesso: string;
    public mensagem_sucesso: string;
    public dt_updated: string;
    public dt_created: string;

    constructor(obj?:any){
        super(EmpresaPdv.resource, obj);
    }
}
