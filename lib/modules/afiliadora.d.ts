import * as api from "ts-resource-tastypie";
export declare class CategoriaLoja extends api.Tastypie.Model<CategoriaLoja> {
    static resource: api.Tastypie.Resource<CategoriaLoja>;
    nome: string;
    descricao: string;
    token: string;
    tag: string;
    constructor(obj?: any);
}
export declare class Loja extends api.Tastypie.Model<Loja> {
    static resource: api.Tastypie.Resource<Loja>;
    nome: string;
    logomarca: string;
    site: string;
    url_trackeada: string;
    porcentagem_doacao: string;
    total_cupons_ativos: number;
    private _cupons;
    constructor(obj?: any);
    get cupons(): api.Tastypie.Resource<Cupom>;
}
export declare class Cupom extends api.Tastypie.Model<Cupom> {
    static resource: api.Tastypie.Resource<Cupom>;
    nome: string;
    codigo: string;
    descricao: string;
    url: string;
    data_inicio: string;
    data_termino: string;
    restricoes: string;
    regiao: string;
    pais: Array<{
        codigo: number;
        nome: string;
    }>;
    loja: Loja;
    constructor(obj?: any);
}
