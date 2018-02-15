"use strict";
// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
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
        return _super.call(this, Produto.resource, obj) || this;
    }
    Produto.resource = new api.Tastypie.Resource('comparador/products/search', { model: Produto });
    return Produto;
}(api.Tastypie.Model));
exports.Produto = Produto;
var CategoryFilters = /** @class */ (function () {
    function CategoryFilters(id, name, doc_count) {
        this.id = id;
        this.name = name;
        this.doc_count = doc_count;
        this.cat_tree = [];
        this.filters = [];
    }
    CategoryFilters.prototype.setCatTree = function (data) {
        var _self = this;
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var obj = data_1[_i];
            _self.cat_tree.push(new CategorySumary(obj));
        }
    };
    CategoryFilters.prototype.setFilters = function (data) {
        var _self = this;
        for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
            var obj = data_2[_i];
            var filter = new Filter(obj.name);
            filter.setOptions(obj.options);
            _self.filters.push(filter);
        }
    };
    return CategoryFilters;
}());
exports.CategoryFilters = CategoryFilters;
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
        var _self = this;
        for (var _i = 0, data_3 = data; _i < data_3.length; _i++) {
            var obj = data_3[_i];
            _self.options.push(new FilterOption(obj));
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
        this.products = new api.Tastypie.Resource('comparador/products/search', { model: Produto, defaults: defaults });
    }
    Comparador.prototype.search = function (q, params) {
        var _self = this;
        _self.categories = [];
        _self.category_selected = null;
        _self._filters_selected = [];
        _self.order_by = '';
        _self.query_string = q;
        if (params) {
            if (params.category_id) {
                _self.category_selected = params.category_id;
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
            if (page.meta.kwargs.hasOwnProperty('categories')) {
                for (var _i = 0, _a = page.meta.kwargs.categories || []; _i < _a.length; _i++) {
                    var cat = _a[_i];
                    var cat_filter = new CategoryFilters(cat.id, cat.name, cat.doc_count);
                    cat_filter.setCatTree(cat.cat_tree);
                    cat_filter.setFilters(cat.filters);
                    _self.categories.push(cat_filter);
                }
            }
            return _self;
        });
    };
    Comparador.prototype.selectCategory = function (category_id) {
        var _self = this;
        _self.category_selected = category_id;
        _self.categories = [];
        _self._filters_selected = [];
        _self.order_by = '';
        return _self.products.objects.find({ q: _self.query_string, category_id: category_id }).then(function (page) {
            if (page.meta.kwargs.hasOwnProperty('categories')) {
                for (var _i = 0, _a = page.meta.kwargs.categories || []; _i < _a.length; _i++) {
                    var cat = _a[_i];
                    var cat_filter = new CategoryFilters(cat.id, cat.name, cat.doc_count);
                    cat_filter.setCatTree(cat.cat_tree);
                    cat_filter.setFilters(cat.filters);
                    _self.categories.push(cat_filter);
                }
            }
            return _self;
        });
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
        }
    };
    Comparador.prototype.getParams = function () {
        var _self = this;
        var filters = _self.getQueryFilters();
        var data = {};
        data.q = _self.query_string;
        if (_self.category_selected) {
            data.category_id = _self.category_selected;
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
        var params = _self.getParams();
        return _self.products.objects.find(params).then(function (page) {
            return _self;
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