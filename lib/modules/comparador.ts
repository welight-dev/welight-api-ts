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
    public cat_tree: Array<CategorySumary>;
    public lojas: Array<any>;
    public afiliadora_id: number;
    public fabricante: string;

    constructor(obj?:any){
        super(Produto.resource, obj);
        if(obj){
            if(obj.cat_tree){
                this.cat_tree = [];
                for(let cat of obj.cat_tree){
                    this.cat_tree.push(new CategorySumary(cat));
                }
            }
        }
    }
}

export class Categoria extends api.Tastypie.Model<Categoria> {
    public static resource = new api.Tastypie.Resource<Categoria>('comparador/products-categories/search', {model: Categoria});

    public name: string;
    public doc_count: number;
    public cat_tree: Array<CategorySumary>;
    public filters: Array<Filter>;
    public level: number;
    public leaf: boolean;
    public parent_id: number;

    constructor(obj?:any){
        super(Categoria.resource, obj);

        if(obj){
            if(obj.cat_tree){
                this.cat_tree = [];
                for(let cat of obj.cat_tree){
                    this.cat_tree.push(new CategorySumary(cat));
                }
            }

            if(obj.filters){
                this.filters = [];
                for(let fil of obj.filters){
                    let filter = new Filter(fil.name);
                    filter.setOptions(fil.options);
                    this.filters.push(filter);
                }
            }
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
        for(let obj of data){
            if(obj.doc_count > 0){
              this.options.push(new FilterOption(obj));
            }
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
    public categories: Array<Categoria>;
    public category_selected: Categoria;
    private _filters_selected: any;
    public order_by: string;
    public query_string: string;
    private _prefiltred: boolean;
    public home: boolean;
    public search_loading: boolean;
    public filter_loading: boolean;

    constructor(defaults?:any){
        this.categories = [];
        this.category_selected = null;
        this._filters_selected = {};
        this.order_by = '';
        this.query_string = "";
        this._prefiltred = false;
        this.home = true;
        this.search_loading = false;
        this.filter_loading = false;
        this.products = new api.Tastypie.Resource<Produto>('comparador/products/search', {model: Produto, defaults: defaults});
    }

    public search(q:string, params?:{category?:Categoria, order_by?:string, filters?:Array<{filter_name: string, option_id: number}>}): Promise<Comparador> {
        let _self = this;
        _self.search_loading = true;
        _self.categories = [];
        _self.category_selected = null;
        _self._filters_selected = {};
        _self.order_by = '';
        _self.query_string = q;

        if(params){
            if(params.category){
                _self.category_selected = params.category;
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

                if(page.meta.kwargs.hasOwnProperty('home')){
                    _self.home = page.meta.kwargs.home;
                }

                if(page.meta.kwargs.hasOwnProperty('prefilter') && page.meta.kwargs.prefilter.categories.length > 0){
                    for(let cat of page.meta.kwargs.prefilter.categories || []){
                        if(cat.doc_count > 0){
                            _self.categories.push(new Categoria(cat));
                        }
                    }

                    if(_self.categories.length === 1){
                        let cat_sel = _self.categories[0];
                        _self.category_selected = cat_sel;

                        for(let filtered of page.meta.kwargs.prefilter.filtered || []){
                            _self.addFilter(filtered.filter_name, filtered.option_id);
                        }
                        _self._prefiltred = true;
                    }
                }else if(page.meta.kwargs.hasOwnProperty('categories') && page.meta.kwargs.categories.length > 0){
                    for(let cat of page.meta.kwargs.categories || []){
                        if(cat.doc_count > 0){
                            _self.categories.push(new Categoria(cat));
                        }
                    }

                    if(_self.categories.length === 1){
                        _self.category_selected = _self.categories[0];
                    }
                }
                _self.search_loading = false;
                return _self;
            }
        ).catch(
            function(error: any){
                _self.search_loading = false;
                throw error;
            }
        );
    }

    public selectCategoryById(category_id: number): Promise<Comparador> {
        let _self = this;
        _self.search_loading = true;
        return Categoria.resource.objects.get(category_id).then(function(cat: Categoria){
            return _self.selectCategory(cat);
        }).catch(
            function(error: any){
                _self.search_loading = false;
                throw error;
            }
        );
    }

    public selectCategory(category: Categoria): Promise<Comparador> {
        let _self = this;
        _self.search_loading = true;
        return _self.products.objects.find({q:_self.query_string, category_id: category.id}).then(
            function(page){
                _self.categories = [];
                _self._filters_selected = {};
                _self.order_by = '';
                if(page.meta.kwargs.hasOwnProperty('categories') && page.meta.kwargs.categories.length > 0){
                    for(let cat of page.meta.kwargs.categories || []){
                        if(cat.doc_count > 0){
                            _self.categories.push(new Categoria(cat));
                        }
                    }
                }
                if(page.meta.kwargs.hasOwnProperty('home')){
                    _self.home = page.meta.kwargs.home;
                }
                if(_self.categories.length === 1){
                    _self.category_selected = _self.categories[0];
                }else{
                    _self.category_selected = category;
                }
                _self.search_loading = false;
                return _self;
            }
        ).catch(
            function(error: any){
                _self.search_loading = false;
                throw error;
            }
        );
    }

    public reset(): Promise<Comparador> {
        return this.search('');
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
            data.category_id = _self.category_selected.id;
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
        _self.filter_loading = true;

        let params = _self.getParams();

        if(_self._prefiltred){
            params.q = "";
        }
        return _self.products.objects.find(params).then(
            function(page){
                if(page.meta.kwargs.hasOwnProperty('home')){
                    _self.home = page.meta.kwargs.home;
                }
                _self.filter_loading = false;
                return _self;
            }
        ).catch(
            function(error: any){
                _self.filter_loading = false;
                throw error;
            }
        );
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
