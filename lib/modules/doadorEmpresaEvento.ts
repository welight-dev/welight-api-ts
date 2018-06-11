// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>

import * as api from "ts-resource-tastypie";

import { Empresa } from "./doadorEmpresa";

export class ClienteVip {
    public ingresso_id: number;
    public nome: string;
    public cpf: string;
    public qtde_ingresso: number;
    public dt_updated: string;
    public dt_created: string;

    constructor(obj?:any){
        this.ingresso_id = obj.ingresso_id;
        this.nome = obj.nome;
        this.cpf = obj.cpf;
        this.qtde_ingresso = obj.qtde_ingresso;
        this.dt_updated = obj.dt_updated;
        this.dt_created = obj.dt_created;
    }
}

export class IngressoFatura {
    public ingresso_id: number;
    public nome: string;
    public cpf: string;
    public qtde: number;
    public moeda: string;
    public total: number;
    public pago: boolean;
    public vencimento: string;
    public dt_updated: string;
    public dt_created: string;

    public pagamento: IngressoFaturaPagamento;
    public convidados: Array<IngressoFaturaCliente>;

    constructor(obj?:any){
        this.ingresso_id = obj.ingresso_id;
        this.nome = obj.nome;
        this.cpf = obj.cpf;
        this.qtde = obj.qtde;
        this.moeda = obj.moeda;
        this.total = obj.total;
        this.pago = obj.pago;
        this.vencimento = obj.vencimento;
        this.dt_updated = obj.dt_updated;
        this.dt_created = obj.dt_created;

        let _self = this;
        if(obj.pagamento) _self.pagamento = new IngressoFaturaPagamento(obj.pagamento);

        if(obj.convidados){
            _self.convidados = [];
            for(let convidado of obj.convidados){
                _self.convidados.push(new IngressoFaturaCliente(convidado));
            }
        }
    }
}

export class IngressoFaturaCliente {
    public ingresso_fatura_id: number;
    public nome: string;
    public cpf: string;
    public entrada_confirmada: boolean;
    public dt_entrada: string;

    constructor(obj?:any){
        this.ingresso_fatura_id = obj.ingresso_fatura_id;
        this.nome = obj.nome;
        this.cpf = obj.cpf;
        this.entrada_confirmada = obj.entrada_confirmada;
        this.dt_entrada = obj.dt_entrada;
    }
}

export class IngressoFaturaPagamento {
    public ingresso_fatura_id: number;
    public invoice_id: string;
    public tipo: string;
    public status: string;
    public secure_url: string;
    public dt_updated: string;
    public dt_created: string;

    constructor(obj?:any){
        this.ingresso_fatura_id = obj.ingresso_fatura_id;
        this.invoice_id = obj.invoice_id;
        this.tipo = obj.tipo;
        this.status = obj.status;
        this.secure_url = obj.secure_url;
        this.dt_updated = obj.dt_updated;
        this.dt_created = obj.dt_created;
    }
}

export class FaturaVip {
    public vip: ClienteVip;
    public faturas: Array<IngressoFatura>;

    constructor(obj?:any){
        let _self = this;
        if(obj.vip) _self.vip = new ClienteVip(obj.vip);
        if(obj.faturas){
            _self.faturas = [];
            for(let fatura of obj.faturas){
                _self.faturas.push(new IngressoFatura(fatura));
            }
        }
    }
}

export class Evento extends api.Tastypie.Model<Evento> {
    public static resource = new api.Tastypie.Resource<Evento>('doador-empresa-evento/evento', {model: Evento});

    public empresa: Empresa;
    public nome: string;
    public local: boolean;
    public descricao: string;
    public logo: string;
    public website: string;
    public dt_evento: string;
    public dt_updated: string;
    public dt_created: string;

    constructor(obj?:any, _resource?:api.Tastypie.Resource<Evento>){
        super(_resource || Evento.resource, obj);
        let _self = this;
        if(_self.empresa) _self.empresa = new Empresa(_self.empresa);
    }
}

export class IngressoPublic extends api.Tastypie.Model<IngressoPublic> {
    public static resource = new api.Tastypie.Resource<IngressoPublic>('doador-empresa-evento/ingresso-public', {model: IngressoPublic});

    public evento_id: number;
    public nome: string;
    public vip: boolean;
    public moeda: string;
    public valor: number;
    public taxa: number;
    public total: number;
    public slug: string;
    public dt_updated: string;
    public dt_created: string;
    public evento: Evento;
    private _check_fatura_vip: api.Tastypie.Resource<any>;
    private _gerar_fatura_vip: api.Tastypie.Resource<any>;
    private _check_entrada: api.Tastypie.Resource<any>;
    private _confirmar_entrada: api.Tastypie.Resource<any>;

    constructor(obj?:any, _resource?:api.Tastypie.Resource<IngressoPublic>){
        super(_resource || IngressoPublic.resource, obj);
        this._check_fatura_vip = new api.Tastypie.Resource<any>('doador-empresa-evento/ingresso-public/check-fatura-vip');
        this._gerar_fatura_vip = new api.Tastypie.Resource<any>('doador-empresa-evento/ingresso-public/gerar-fatura-vip');
        this._check_entrada = new api.Tastypie.Resource<any>('doador-empresa-evento/ingresso-public/check-entrada');
        this._confirmar_entrada = new api.Tastypie.Resource<any>('doador-empresa-evento/ingresso-public/confirmar-entrada');

        let _self = this;
        if(_self.evento) _self.evento = new Evento(_self.evento);
    }

    public check_fatura_vip(ingresso_id: number, cpf: string): Promise<FaturaVip> {
        let _self = this;
        return _self._check_fatura_vip.objects.findOne({ingresso_id: ingresso_id, cpf: cpf}).then(
            function(data: any){
                return new FaturaVip(data);
            }
        )
    }

    public gerar_fatura_vip(ingresso_id: number, cpf: string, qtde: number, convidados: Array<{nome:string, cpf:string}>, ongs: Array<number>): Promise<IngressoFatura> {
        let _self = this;
        return _self._gerar_fatura_vip.objects.create({ingresso_id: ingresso_id, cpf: cpf, qtde: qtde, convidados:convidados, ongs:ongs}).then(
            function(data: any){
                return new IngressoFatura(data);
            }
        )
    }

    public check_entrada(ingresso_id: number, cpf: string): Promise<IngressoFatura> {
        let _self = this;
        return _self._check_entrada.objects.findOne({ingresso_id: ingresso_id, cpf: cpf}).then(
            function(data: any){
                return new IngressoFatura(data);
            }
        )
    }

    public confirmar_entrada(ingresso_id: number, cpf: string): Promise<IngressoFatura> {
        let _self = this;
        return _self._confirmar_entrada.objects.create({ingresso_id: ingresso_id, cpf: cpf}).then(
            function(data: any){
                return new IngressoFatura(data);
            }
        )
    }
}
