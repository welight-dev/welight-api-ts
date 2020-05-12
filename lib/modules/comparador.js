"use strict";
// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var api = require("ts-resource-tastypie");
var Produto = /** @class */ (function (_super) {
    __extends(Produto, _super);
    function Produto(obj) {
        var _this = _super.call(this, Produto.resource, obj) || this;
        if (obj) {
            if (obj.cat_tree) {
                _this.cat_tree = [];
                for (var _i = 0, _a = obj.cat_tree; _i < _a.length; _i++) {
                    var cat = _a[_i];
                    _this.cat_tree.push(new CategorySumary(cat));
                }
            }
        }
        return _this;
    }
    Produto.resource = new api.Tastypie.Resource('comparador/products/search', { model: Produto });
    return Produto;
}(api.Tastypie.Model));
exports.Produto = Produto;
var Categoria = /** @class */ (function (_super) {
    __extends(Categoria, _super);
    function Categoria(obj) {
        var _this = _super.call(this, Categoria.resource, obj) || this;
        if (obj) {
            if (obj.cat_tree) {
                _this.cat_tree = [];
                for (var _i = 0, _a = obj.cat_tree; _i < _a.length; _i++) {
                    var cat = _a[_i];
                    _this.cat_tree.push(new CategorySumary(cat));
                }
            }
            if (obj.filters) {
                _this.filters = [];
                for (var _b = 0, _c = obj.filters; _b < _c.length; _b++) {
                    var fil = _c[_b];
                    var filter = new Filter(fil.name);
                    filter.setOptions(fil.options);
                    _this.filters.push(filter);
                }
            }
        }
        return _this;
    }
    Categoria.resource = new api.Tastypie.Resource('comparador/products-categories/search', { model: Categoria });
    return Categoria;
}(api.Tastypie.Model));
exports.Categoria = Categoria;
var CategorySumary = /** @class */ (function () {
    function CategorySumary(p) {
        this.id = p.id;
        this.nome = p.nome;
    }
    return CategorySumary;
}());
exports.CategorySumary = CategorySumary;
var Filter = /** @class */ (function () {
    function Filter(name) {
        this.name = name;
        this.options = [];
    }
    Filter.prototype.setOptions = function (data) {
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var obj = data_1[_i];
            if (obj.doc_count > 0) {
                this.options.push(new FilterOption(obj));
            }
        }
    };
    return Filter;
}());
exports.Filter = Filter;
var FilterOption = /** @class */ (function () {
    function FilterOption(p) {
        this.id = p.id;
        this.name = p.name;
        this.doc_count = p.doc_count;
    }
    return FilterOption;
}());
exports.FilterOption = FilterOption;
var Comparador = /** @class */ (function () {
    function Comparador(defaults) {
        this.categories = [];
        this.category_selected = null;
        this._filters_selected = {};
        this.order_by = '';
        this.query_string = "";
        this._prefiltred = false;
        this.home = true;
        this.search_loading = false;
        this.filter_loading = false;
        this.products = new api.Tastypie.Resource('comparador/products/search', { model: Produto, defaults: defaults });
    }
    Comparador.prototype.search = function (q, params) {
        var _self = this;
        _self.search_loading = true;
        _self.categories = [];
        _self.category_selected = null;
        _self._filters_selected = {};
        _self.order_by = '';
        _self.query_string = q;
        if (params) {
            if (params.category) {
                _self.category_selected = params.category;
            }
            if (params.order_by) {
                _self.order_by = params.order_by;
            }
            if (params.filters) {
                for (var _i = 0, _a = params.filters; _i < _a.length; _i++) {
                    var filter = _a[_i];
                    _self.addFilter(filter.filter_name, filter.option_id);
                }
            }
        }
        var data_params = _self.getParams();
        return _self.products.objects.find(data_params).then(function (page) {
            if (page.meta.kwargs.hasOwnProperty('home')) {
                _self.home = page.meta.kwargs.home;
            }
            if (page.meta.kwargs.hasOwnProperty('prefilter') && page.meta.kwargs.prefilter.categories.length > 0) {
                for (var _i = 0, _a = page.meta.kwargs.prefilter.categories || []; _i < _a.length; _i++) {
                    var cat = _a[_i];
                    if (cat.doc_count > 0) {
                        _self.categories.push(new Categoria(cat));
                    }
                }
                if (_self.categories.length === 1) {
                    var cat_sel = _self.categories[0];
                    _self.category_selected = cat_sel;
                    for (var _b = 0, _c = page.meta.kwargs.prefilter.filtered || []; _b < _c.length; _b++) {
                        var filtered = _c[_b];
                        _self.addFilter(filtered.filter_name, filtered.option_id);
                    }
                    _self._prefiltred = true;
                }
            }
            else if (page.meta.kwargs.hasOwnProperty('categories') && page.meta.kwargs.categories.length > 0) {
                for (var _d = 0, _e = page.meta.kwargs.categories || []; _d < _e.length; _d++) {
                    var cat = _e[_d];
                    if (cat.doc_count > 0) {
                        _self.categories.push(new Categoria(cat));
                    }
                }
                if (_self.categories.length === 1) {
                    _self.category_selected = _self.categories[0];
                }
            }
            _self.search_loading = false;
            return _self;
        }).catch(function (error) {
            _self.search_loading = false;
            throw error;
        });
    };
    Comparador.prototype.selectCategoryById = function (category_id) {
        var _self = this;
        _self.search_loading = true;
        return Categoria.resource.objects.get(category_id).then(function (cat) {
            return _self.selectCategory(cat);
        }).catch(function (error) {
            _self.search_loading = false;
            throw error;
        });
    };
    Comparador.prototype.selectCategory = function (category) {
        var _self = this;
        _self.search_loading = true;
        return _self.products.objects.find({ q: _self.query_string, category_id: category.id }).then(function (page) {
            _self.categories = [];
            _self._filters_selected = {};
            _self.order_by = '';
            if (page.meta.kwargs.hasOwnProperty('categories') && page.meta.kwargs.categories.length > 0) {
                for (var _i = 0, _a = page.meta.kwargs.categories || []; _i < _a.length; _i++) {
                    var cat = _a[_i];
                    if (cat.doc_count > 0) {
                        _self.categories.push(new Categoria(cat));
                    }
                }
            }
            if (page.meta.kwargs.hasOwnProperty('home')) {
                _self.home = page.meta.kwargs.home;
            }
            if (_self.categories.length === 1) {
                _self.category_selected = _self.categories[0];
            }
            else {
                _self.category_selected = category;
            }
            _self.search_loading = false;
            return _self;
        }).catch(function (error) {
            _self.search_loading = false;
            throw error;
        });
    };
    Comparador.prototype.reset = function () {
        return this.search('');
    };
    Comparador.prototype.getFiltersSelected = function () {
        var _self = this;
        var options = [];
        for (var grupo in _self._filters_selected) {
            for (var _i = 0, _a = _self._filters_selected[grupo]; _i < _a.length; _i++) {
                var option = _a[_i];
                options.push(option);
            }
        }
        return options;
    };
    Comparador.prototype.getGroupName = function (filter_name) {
        return filter_name.replace(/\s/g, '');
    };
    Comparador.prototype.addFilter = function (filter_name, option_id) {
        var _self = this;
        var grupo = _self.getGroupName(filter_name);
        if (!_self._filters_selected.hasOwnProperty(grupo)) {
            _self._filters_selected[grupo] = [];
        }
        _self._filters_selected[grupo].push(option_id);
    };
    Comparador.prototype.removeFilter = function (filter_name, option_id) {
        var _self = this;
        var grupo = _self.getGroupName(filter_name);
        if (!_self._filters_selected.hasOwnProperty(grupo)) {
            return;
        }
        var index = _self._filters_selected[grupo].indexOf(option_id, 0);
        if (index > -1) {
            _self._filters_selected[grupo].splice(index, 1);
            if (_self._filters_selected[grupo].length == 0) {
                delete _self._filters_selected[grupo];
            }
        }
    };
    Comparador.prototype.getParams = function () {
        var _self = this;
        var filters = _self.getQueryFilters();
        var data = {};
        data.q = _self.query_string;
        if (_self.category_selected) {
            data.category_id = _self.category_selected.id;
        }
        if (filters) {
            data.filters_id = filters;
        }
        if (_self.order_by) {
            data.order_by = _self.order_by;
        }
        return data;
    };
    Comparador.prototype.filter = function () {
        var _self = this;
        _self.filter_loading = true;
        var params = _self.getParams();
        if (_self._prefiltred) {
            params.q = "";
        }
        return _self.products.objects.find(params).then(function (page) {
            if (page.meta.kwargs.hasOwnProperty('home')) {
                _self.home = page.meta.kwargs.home;
            }
            _self.filter_loading = false;
            return _self;
        }).catch(function (error) {
            _self.filter_loading = false;
            throw error;
        });
    };
    Comparador.prototype.getQueryFilters = function () {
        var _self = this;
        var grupos = [];
        for (var grupo in _self._filters_selected) {
            grupos.push("(" + _self._filters_selected[grupo].join('|') + ")");
        }
        return grupos.join('+');
    };
    Comparador.prototype.cleanFilters = function () {
        this._filters_selected = {};
    };
    return Comparador;
}());
exports.Comparador = Comparador;
//# sourceMappingURL=comparador.js.map