// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>

import * as api from "ts-resource-tastypie";

export class Produto extends api.Tastypie.Model<Produto> {
    public static resource = new api.Tastypie.Resource<Produto>('comparador/products/search', {model: Produto});

    public nome: string;
    public ean: string;
    public imagem: string;
    public moeda: string;
    public maior_preco: number;
    public menor_preco: number;
    public qtde_lojas: number;
    public porcentagem_doacao: number;
    public categoria_id: number;
    public categoria_nome: string;
    public descricao_curta: string;
    public descricao_longa: string;
    public cat_tree: any;
    public lojas: any;

    constructor(obj?:any){
        super(Produto.resource, obj);
    }
}

export class Categoria extends api.Tastypie.Model<Categoria> {
    public static resource = new api.Tastypie.Resource<Categoria>('comparador/products-categories/search', {model: Categoria});

    public name: string;
    public doc_count: number;
    public cat_tree: Array<CategorySumary>;
    public filters: Array<Filter>;
    public level: number;

    constructor(obj?:any){
        super(Categoria.resource, obj);
        let _self = this;

        if(_self.cat_tree){
            let cat_tree = _self.cat_tree;
            _self.cat_tree = [];
            for(let obj of cat_tree){
                _self.cat_tree.push(new CategorySumary(obj));
            }
        }

        if(_self.filters){
            let filters = _self.filters;
            _self.filters = [];
            for(let obj of filters){
                let filter = new Filter(obj.name);
                filter.setOptions(obj.options);
                _self.filters.push(filter);
            }
        }
    }
}

export class CategoryFilters {
    public id: number;
    public name: string;
    public doc_count: number;
    public cat_tree: Array<CategorySumary>;
    public filters: Array<Filter>;

    constructor(id: number, name: string, doc_count: number){
        this.id = id;
        this.name = name;
        this.doc_count = doc_count;
        this.cat_tree = [];
        this.filters = [];
    }

    public setCatTree(data: Array<any>): void {
        let _self = this;
        for(let obj of data){
            _self.cat_tree.push(new CategorySumary(obj));
        }
    }

    public setFilters(data: Array<any>): void {
        let _self = this;
        for(let obj of data){
            let filter = new Filter(obj.name);
            filter.setOptions(obj.options);
            _self.filters.push(filter);
        }
    }
}

export class CategorySumary {
    public id: number;
    public nome: string;

    constructor(p: {id:number, nome:string}){
        this.id = p.id;
        this.nome = p.nome;
    }
}

export class Filter {
    public name: string;
    public options: Array<FilterOption>;

    constructor(name: string){
        this.name = name;
        this.options = [];
    }

    public setOptions(data: Array<any>): void {
        let _self = this;
        for(let obj of data){
            _self.options.push(new FilterOption(obj));
        }
    }
}

export class FilterOption {
    public id: number;
    public name: string;
    public doc_count: number;

    constructor(p: {id:number, name:string, doc_count:number}){
        this.id = p.id;
        this.name = p.name;
        this.doc_count = p.doc_count;
    }
}

export class Comparador {
    public products: api.Tastypie.Resource<Produto>;
    public categories: Array<CategoryFilters>;
    public category_selected: number;
    private _filters_selected: any;
    public order_by: string;
    public query_string: string;
    private products_categories: api.Tastypie.Resource<any>;

    constructor(defaults?:any){
        this.categories = [];
        this.category_selected = null;
        this._filters_selected = {};
        this.order_by = '';
        this.query_string = "";
        this.products = new api.Tastypie.Resource<Produto>('comparador/products/search', {model: Produto, defaults: defaults});
        this.products_categories = new api.Tastypie.Resource<any>('comparador/products-categories/search');
    }

    public search(q:string, params?:{category_id?:number, order_by?:string, filters?:Array<{filter_name: string, option_id: number}>}): Promise<Comparador> {
        let _self = this;
        _self.categories = [];
        _self.category_selected = null;
        _self._filters_selected = {};
        _self.order_by = '';
        _self.query_string = q;

        if(params){
            if(params.category_id){
                _self.category_selected = params.category_id;
            }

            if(params.order_by){
                _self.order_by = params.order_by;
            }

            if(params.filters){
                for(let filter of params.filters){
                    _self.addFilter(filter.filter_name, filter.option_id);
                }
            }
        }

        let data_params = _self.getParams();

        return _self.products.objects.find(data_params).then(
            function(page){
                if(page.meta.kwargs.hasOwnProperty('categories')){
                    for(let cat of page.meta.kwargs.categories || []){
                        let cat_filter = new CategoryFilters(cat.id, cat.name, cat.doc_count);
                        cat_filter.setCatTree(cat.cat_tree);
                        cat_filter.setFilters(cat.filters);
                        _self.categories.push(cat_filter);
                    }
                }

                if(!_self.categories.length){
                    if(!data_params.q && !params){
                        _self.products_categories.objects.find({level:0, limit:0}).then(
                            function(page_categories){
                                for(let cat of page_categories.objects || []){
                                    let cat_filter = new CategoryFilters(cat.id, cat.name, cat.doc_count);
                                    cat_filter.setCatTree(cat.cat_tree);
                                    cat_filter.setFilters(cat.filters);
                                    _self.categories.push(cat_filter);
                                }
                                return _self;
                            }
                        )
                    }else{
                        return _self;
                    }
                }else{
                    return _self;
                }
            }
        )
    }

    public selectCategory(category_id: number): Promise<Comparador> {
        let _self = this;
        _self.category_selected = category_id;
        _self.categories = [];
        _self._filters_selected = {};
        _self.order_by = '';
        return _self.products.objects.find({q:_self.query_string, category_id: category_id}).then(
            function(page){
                if(page.meta.kwargs.hasOwnProperty('categories')){
                    for(let cat of page.meta.kwargs.categories || []){
                        let cat_filter = new CategoryFilters(cat.id, cat.name, cat.doc_count);
                        cat_filter.setCatTree(cat.cat_tree);
                        cat_filter.setFilters(cat.filters);
                        _self.categories.push(cat_filter);
                    }
                }


                return _self;
            }
        )
    }

    public getFiltersSelected(): Array<number> {
        let _self = this;
        let options: Array<number> = [];
        for (let grupo in _self._filters_selected){
            for(let option of _self._filters_selected[grupo]){
                options.push(option);
            }
        }
        return options;
    }

    public getGroupName(filter_name: string): string{
        return filter_name.replace(/\s/g, '');
    }

    public addFilter(filter_name: string, option_id: number): void{
        let _self = this;
        let grupo = _self.getGroupName(filter_name);
        if(!_self._filters_selected.hasOwnProperty(grupo)){
            _self._filters_selected[grupo] = [];
        }
        _self._filters_selected[grupo].push(option_id);
    }

    public removeFilter(filter_name: string, option_id: number): void{
        let _self = this;
        let grupo = _self.getGroupName(filter_name);
        if(!_self._filters_selected.hasOwnProperty(grupo)){
            return;
        }
        let index = _self._filters_selected[grupo].indexOf(option_id, 0);
        if (index > -1) {
            _self._filters_selected[grupo].splice(index, 1);

            if(_self._filters_selected[grupo].length == 0){
                delete _self._filters_selected[grupo];
            }
        }
    }

    public getParams(): {q?:string, category_id?:number, filters_id?:string, order_by?:string} {
        let _self = this;
        let filters: string = _self.getQueryFilters();

        let data: {q?:string, category_id?:number, filters_id?:string, order_by?:string} = {};

        data.q = _self.query_string;

        if(_self.category_selected){
          data.category_id = _self.category_selected;
        }

        if(filters){
            data.filters_id = filters;
        }

        if(_self.order_by){
            data.order_by = _self.order_by;
        }

        return data;
    }

    public filter(): Promise<Comparador> {
        let _self = this;
        let params = _self.getParams();
        return _self.products.objects.find(params).then(
            function(page){
                return _self;
            }
        )
    }

    public getQueryFilters(): string {
        let _self = this;
        let grupos = [];

        for(let grupo in _self._filters_selected){
            grupos.push("("+_self._filters_selected[grupo].join('|')+")");
        }

        return grupos.join('+');
    }

    public cleanFilters(): void {
        this._filters_selected = {};
    }
}
