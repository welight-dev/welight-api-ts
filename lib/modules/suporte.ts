// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>

import * as api from "ts-resource-tastypie";

export class Pagina extends api.Tastypie.Model<Pagina> {
    public static resource = new api.Tastypie.Resource<Pagina>('suporte/documento', {model: Pagina});

    public nome: string;
    public descricao: string;
    public dt_created: string;
    public dt_updated: string;

    constructor(obj?:any){
        super(Pagina.resource, obj);
    }
}

export class Faq extends api.Tastypie.Model<Faq> {
    public static resource = new api.Tastypie.Resource<Faq>('suporte/faq', {model: Faq});

    public pergunta: string;
    public resposta: string;
    public para_ong: boolean;
    public ordem: string;
    public dt_created: string;
    public dt_updated: string;

    constructor(obj?:any){
        super(Faq.resource, obj);
    }
}

export class Depoimento extends api.Tastypie.Model<Depoimento> {
    public static resource = new api.Tastypie.Resource<Depoimento>('suporte/depoimento', {model: Depoimento});

    public foto: string;
    public assinatura: string;
    public descricao: boolean;
    public mostrar_home: boolean;
    public dt_created: string;
    public dt_updated: string;

    constructor(obj?:any){
        super(Depoimento.resource, obj);
    }
}

export class Contato extends api.Tastypie.Model<Contato> {
    public static resource = new api.Tastypie.Resource<Contato>('suporte/contato', {model: Contato});

    public nome: string;
    public email: string;
    public mensagem: string;

    constructor(obj?:any){
        super(Contato.resource, obj);
    }
}
