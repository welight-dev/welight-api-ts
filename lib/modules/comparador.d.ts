import * as api from "ts-resource-tastypie";
export declare class Produto extends api.Tastypie.Model<Produto> {
    static resource: api.Tastypie.Resource<Produto>;
    nome: string;
    ean: string;
    imagem: string;
    moeda: string;
    maior_preco: number;
    menor_preco: number;
    qtde_lojas: number;
    porcentagem_doacao: number;
    categoria_id: number;
    categoria_nome: string;
    descricao_curta: string;
    descricao_longa: string;
    cat_tree: any;
    lojas: any;
    constructor(obj?: any);
}
export declare class Categoria extends api.Tastypie.Model<Categoria> {
    static resource: api.Tastypie.Resource<Categoria>;
    name: string;
    doc_count: number;
    cat_tree: Array<CategorySumary>;
    filters: Array<Filter>;
    level: number;
    constructor(obj?: any);
}
export declare class CategoryFilters {
    id: number;
    name: string;
    doc_count: number;
    cat_tree: Array<CategorySumary>;
    filters: Array<Filter>;
    constructor(id: number, name: string, doc_count: number);
    setCatTree(data: Array<any>): void;
    setFilters(data: Array<any>): void;
}
export declare class CategorySumary {
    id: number;
    nome: string;
    constructor(p: {
        id: number;
        nome: string;
    });
}
export declare class Filter {
    name: string;
    options: Array<FilterOption>;
    constructor(name: string);
    setOptions(data: Array<any>): void;
}
export declare class FilterOption {
    id: number;
    name: string;
    doc_count: number;
    constructor(p: {
        id: number;
        name: string;
        doc_count: number;
    });
}
export declare class Comparador {
    products: api.Tastypie.Resource<Produto>;
    categories: Array<CategoryFilters>;
    category_selected: number;
    private _filters_selected;
    order_by: string;
    query_string: string;
    private products_categories;
    private _prefiltred;
    constructor(defaults?: any);
    search(q: string, params?: {
        category_id?: number;
        order_by?: string;
        filters?: Array<{
            filter_name: string;
            option_id: number;
        }>;
    }): Promise<Comparador>;
    selectCategory(category_id: number): Promise<Comparador>;
    getFiltersSelected(): Array<number>;
    getGroupName(filter_name: string): string;
    addFilter(filter_name: string, option_id: number): void;
    removeFilter(filter_name: string, option_id: number): void;
    getParams(): {
        q?: string;
        category_id?: number;
        filters_id?: string;
        order_by?: string;
    };
    filter(): Promise<Comparador>;
    getQueryFilters(): string;
    cleanFilters(): void;
}
