import * as api from "ts-resource-tastypie";
export declare class Pagina extends api.Tastypie.Model<Pagina> {
    static resource: api.Tastypie.Resource<Pagina>;
    nome: string;
    descricao: string;
    dt_created: string;
    dt_updated: string;
    constructor(obj?: any);
}
export declare class Faq extends api.Tastypie.Model<Faq> {
    static resource: api.Tastypie.Resource<Faq>;
    pergunta: string;
    resposta: string;
    para_ong: boolean;
    ordem: string;
    dt_created: string;
    dt_updated: string;
    constructor(obj?: any);
}
export declare class Depoimento extends api.Tastypie.Model<Depoimento> {
    static resource: api.Tastypie.Resource<Depoimento>;
    foto: string;
    assinatura: string;
    descricao: boolean;
    mostrar_home: boolean;
    dt_created: string;
    dt_updated: string;
    constructor(obj?: any);
}
export declare class Contato extends api.Tastypie.Model<Contato> {
    static resource: api.Tastypie.Resource<Contato>;
    nome: string;
    email: string;
    mensagem: string;
    constructor(obj?: any);
}
