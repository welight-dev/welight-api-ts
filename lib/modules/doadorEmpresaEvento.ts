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
        if(obj){
            this.ingresso_id = obj.ingresso_id;
            this.nome = obj.nome;
            this.cpf = obj.cpf;
            this.qtde_ingresso = obj.qtde_ingresso;
            this.dt_updated = obj.dt_updated;
            this.dt_created = obj.dt_created;
        }
    }
}

export class IngressoCupom {
    public id: number;
    public ingresso_id: number;
    public nome_parceiro: string;
    public desconto: number;
    public qtde: number;
    public codigo: string;
    public dt_updated: string;
    public dt_created: string;

    constructor(obj?:any){
        if(obj){
            this.id = obj.id;
            this.ingresso_id = obj.ingresso_id;
            this.nome_parceiro = obj.nome_parceiro;
            this.desconto = obj.desconto;
            this.qtde = obj.qtde;
            this.codigo = obj.codigo;
            this.dt_updated = obj.dt_updated;
            this.dt_created = obj.dt_created;
        }
    }
}

export class IngressoCupomFatura {
    public id: number;
    public ingresso_fatura_id: number;
    public qtde: number;
    public dt_updated: string;
    public dt_created: string;

    private _ingresso_cupom: IngressoCupom;

    constructor(obj?:any){
        if(obj){
            this.id = obj.id;
            this.ingresso_fatura_id = obj.ingresso_fatura_id;
            this.qtde = obj.qtde;
            this.dt_updated = obj.dt_updated;
            this.dt_created = obj.dt_created;

            if(obj.ingresso_cupom) this._ingresso_cupom = new IngressoCupom(obj.ingresso_cupom);
        }
    }

    public get ingresso_cupom(): IngressoCupom {
        return this._ingresso_cupom;
    }
}

export class IngressoFatura {
    public id: number;
    public ingresso_id: number;
    public nome: string;
    public cpf: string;
    public email: string;
    public qtde: number;
    public moeda: string;
    public total_ingresso: number;
    public total_desconto: number;
    public total_taxa_adm: number;
    public total: number;
    public pago: boolean;
    public vencimento: string;
    public token: string;
    public dt_updated: string;
    public dt_created: string;

    public pagamento: IngressoFaturaPagamento;
    public convidados: Array<IngressoFaturaCliente>;
    public ingresso: IngressoPublic;

    constructor(obj?:any){
        if(obj){
            this.id = obj.id;
            this.ingresso_id = obj.ingresso_id;
            this.nome = obj.nome;
            this.cpf = obj.cpf;
            this.email = obj.email;
            this.qtde = obj.qtde;
            this.moeda = obj.moeda;
            this.total = obj.total;
            this.pago = obj.pago;
            this.vencimento = obj.vencimento;
            this.token = obj.token;
            this.dt_updated = obj.dt_updated;
            this.dt_created = obj.dt_created;

            if(obj.pagamento) this.pagamento = new IngressoFaturaPagamento(obj.pagamento);

            if(obj.convidados){
                this.convidados = [];
                for(let convidado of obj.convidados){
                    this.convidados.push(new IngressoFaturaCliente(convidado));
                }
            }

            if(obj.ingresso) this.ingresso = new IngressoPublic(obj.ingresso);
        }
    }
}

export class IngressoFaturaCliente {
    public ingresso_fatura_id: number;
    public nome: string;
    public cpf: string;
    public email: string;
    public sexo: string;
    public entrada_confirmada: boolean;
    public dt_entrada: string;

    constructor(obj?:any){
        if(obj){
            this.ingresso_fatura_id = obj.ingresso_fatura_id;
            this.nome = obj.nome;
            this.cpf = obj.cpf;
            this.email = obj.email;
            this.sexo = obj.sexo;
            this.entrada_confirmada = obj.entrada_confirmada;
            this.dt_entrada = obj.dt_entrada;
        }
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
        if(obj){
            this.ingresso_fatura_id = obj.ingresso_fatura_id;
            this.invoice_id = obj.invoice_id;
            this.tipo = obj.tipo;
            this.status = obj.status;
            this.secure_url = obj.secure_url;
            this.dt_updated = obj.dt_updated;
            this.dt_created = obj.dt_created;
        }
    }
}

export class FaturaVip {
    public vip: ClienteVip;
    public faturas: Array<IngressoFatura>;

    constructor(obj?:any){
        if(obj){
            if(obj.vip) this.vip = new ClienteVip(obj.vip);
            if(obj.faturas){
                this.faturas = [];
                for(let fatura of obj.faturas){
                    this.faturas.push(new IngressoFatura(fatura));
                }
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
        if(obj){
            if(obj.empresa) this.empresa = new Empresa(obj.empresa);
        }
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
    public doacao_taxa: number;
    public doacao_total: number;
    public slug: string;
    public dt_updated: string;
    public dt_created: string;
    public evento: Evento;
    private _check_fatura_vip: api.Tastypie.Resource<FaturaVip>;
    private _gerar_fatura_vip: api.Tastypie.Resource<IngressoFatura>;
    private _gerar_fatura: api.Tastypie.Resource<IngressoFatura>;
    private _check_fatura: api.Tastypie.Resource<IngressoFatura>;
    private _check_entrada: api.Tastypie.Resource<IngressoFatura>;
    private _check_cupom: api.Tastypie.Resource<IngressoCupomFatura>;
    private _confirmar_entrada: api.Tastypie.Resource<IngressoFatura>;

    constructor(obj?:any, _resource?:api.Tastypie.Resource<IngressoPublic>){
        super(_resource || IngressoPublic.resource, obj);
        this._check_fatura_vip = new api.Tastypie.Resource<FaturaVip>('doador-empresa-evento/ingresso-public/check-fatura-vip');
        this._gerar_fatura_vip = new api.Tastypie.Resource<IngressoFatura>('doador-empresa-evento/ingresso-public/gerar-fatura-vip');
        this._gerar_fatura = new api.Tastypie.Resource<IngressoFatura>('doador-empresa-evento/ingresso-public/gerar-fatura');
        this._check_fatura = new api.Tastypie.Resource<IngressoFatura>('doador-empresa-evento/ingresso-public/check-fatura');
        this._check_entrada = new api.Tastypie.Resource<IngressoFatura>('doador-empresa-evento/ingresso-public/check-entrada');
        this._check_cupom = new api.Tastypie.Resource<IngressoCupomFatura>('doador-empresa-evento/ingresso-public/check_cupom');
        this._confirmar_entrada = new api.Tastypie.Resource<IngressoFatura>('doador-empresa-evento/ingresso-public/confirmar-entrada');

        if(obj){
          if(obj.evento) this.evento = new Evento(obj.evento);
        }
    }

    public check_fatura_vip(ingresso_id: number, cpf: string): Promise<FaturaVip> {
        return this._check_fatura_vip.objects.findOne({ingresso_id: ingresso_id, cpf: cpf}).then(
            function(data: any){
                return new FaturaVip(data);
            }
        )
    }

    public gerar_fatura_vip(ingresso_id: number, cpf: string, qtde: number, convidados: Array<{nome:string, cpf:string}>, ongs: Array<number>): Promise<IngressoFatura> {
        return this._gerar_fatura_vip.objects.create({ingresso_id: ingresso_id, cpf: cpf, qtde: qtde, convidados:convidados, ongs:ongs}).then(
            function(data: any){
                return new IngressoFatura(data);
            }
        )
    }

    public gerar_fatura(nome: string, cpf: string, email: string, qtde: number, tipo_pagamento: string, convidados: Array<{nome:string, cpf:string, email:string, sexo:string}>, ongs?: Array<number>, desconto_id?: number): Promise<IngressoFatura> {
        return this._gerar_fatura.objects.create({ingresso_id: this.id, nome: nome, cpf: cpf, email: email, qtde: qtde, tipo_pagamento: tipo_pagamento, convidados:convidados, ongs:ongs, desconto_id:desconto_id}).then(
            function(data: any){
                return new IngressoFatura(data);
            }
        )
    }

    public check_fatura(token: string): Promise<IngressoFatura> {
        return this._check_fatura.objects.findOne({token: token}).then(
            function(data: any){
                return new IngressoFatura(data);
            }
        )
    }

    public check_entrada(ingresso_id: number, cpf: string): Promise<IngressoFatura> {
        return this._check_entrada.objects.findOne({ingresso_id: ingresso_id, cpf: cpf}).then(
            function(data: any){
                return new IngressoFatura(data);
            }
        )
    }

    public check_cupom(ingresso_id: number, codigo: string, qtde: number): Promise<IngressoCupomFatura> {
        return this._check_cupom.objects.findOne({ingresso_id: ingresso_id, codigo: codigo, qtde: qtde}).then(
            function(data: any){
                return new IngressoCupomFatura(data);
            }
        )
    }

    public confirmar_entrada(ingresso_id: number, cpf: string): Promise<IngressoFatura> {
        return this._confirmar_entrada.objects.create({ingresso_id: ingresso_id, cpf: cpf}).then(
            function(data: any){
                return new IngressoFatura(data);
            }
        )
    }
}
