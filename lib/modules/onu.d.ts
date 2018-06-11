import * as api from "ts-resource-tastypie";
export declare class Ods extends api.Tastypie.Model<Ods> {
    static resource: api.Tastypie.Resource<Ods>;
    tipo: string;
    nome: string;
    descricao: string;
    objetivo: string;
    fatos: string;
    metas: string;
    icone: string;
    cor: string;
    dt_created: string;
    dt_updated: string;
    constructor(obj?: any);
}
