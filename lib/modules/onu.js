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
var Ods = /** @class */ (function (_super) {
    __extends(Ods, _super);
    function Ods(obj) {
        return _super.call(this, Ods.resource, obj) || this;
    }
    Ods.resource = new api.Tastypie.Resource('onu/ods', { model: Ods });
    return Ods;
}(api.Tastypie.Model));
exports.Ods = Ods;
var MetricStandard = /** @class */ (function (_super) {
    __extends(MetricStandard, _super);
    function MetricStandard(obj) {
        return _super.call(this, MetricStandard.resource, obj) || this;
    }
    MetricStandard.resource = new api.Tastypie.Resource('onu/metric-standard', { model: MetricStandard });
    return MetricStandard;
}(api.Tastypie.Model));
exports.MetricStandard = MetricStandard;
var MetricSubcategory = /** @class */ (function () {
    function MetricSubcategory(obj) {
        if (obj) {
            this.id = obj.id;
            this.name = obj.name;
            this.slug = obj.slug;
            this.dt_created = obj.dt_created;
            this.dt_updated = obj.dt_updated;
            this.metric_category_id = obj.metric_category_id;
        }
    }
    return MetricSubcategory;
}());
exports.MetricSubcategory = MetricSubcategory;
var MetricCategory = /** @class */ (function (_super) {
    __extends(MetricCategory, _super);
    function MetricCategory(obj) {
        var _this = _super.call(this, MetricCategory.resource, obj) || this;
        _this.subcategories = [];
        if (obj) {
            if (obj.subcategories) {
                for (var _i = 0, _a = obj.subcategories; _i < _a.length; _i++) {
                    var subcat = _a[_i];
                    _this.subcategories.push(new MetricSubcategory(subcat));
                }
            }
        }
        return _this;
    }
    MetricCategory.resource = new api.Tastypie.Resource('onu/metric-category', { model: MetricCategory });
    return MetricCategory;
}(api.Tastypie.Model));
exports.MetricCategory = MetricCategory;
var MetricUnit = /** @class */ (function () {
    function MetricUnit(obj) {
        if (obj) {
            this.id = obj.id;
            this.name = obj.name;
            this.unit = obj.unit;
            this.slug = obj.slug;
            this.dt_created = obj.dt_created;
            this.dt_updated = obj.dt_updated;
            this.metric_unit_group_id = obj.metric_unit_group_id;
        }
    }
    return MetricUnit;
}());
exports.MetricUnit = MetricUnit;
var MetricUnitGroup = /** @class */ (function (_super) {
    __extends(MetricUnitGroup, _super);
    function MetricUnitGroup(obj) {
        var _this = _super.call(this, MetricUnitGroup.resource, obj) || this;
        _this.units = [];
        if (obj) {
            if (obj.units) {
                for (var _i = 0, _a = obj.units; _i < _a.length; _i++) {
                    var unit = _a[_i];
                    _this.units.push(new MetricUnit(unit));
                }
            }
        }
        return _this;
    }
    MetricUnitGroup.resource = new api.Tastypie.Resource('onu/metric-unit-group', { model: MetricUnitGroup });
    return MetricUnitGroup;
}(api.Tastypie.Model));
exports.MetricUnitGroup = MetricUnitGroup;
var Metric = /** @class */ (function (_super) {
    __extends(Metric, _super);
    function Metric(obj) {
        var _this = _super.call(this, Metric.resource, obj) || this;
        if (obj) {
            if (obj.metric_standard)
                _this._metric_standard = new MetricStandard(obj.metric_standard);
            if (obj.metric_category)
                _this._metric_category = new MetricCategory(obj.metric_category);
            if (obj.metric_subcategory)
                _this._metric_subcategory = new MetricSubcategory(obj.metric_subcategory);
            if (obj.metric_unit_group)
                _this._metric_unit_group = new MetricUnitGroup(obj.metric_unit_group);
            if (obj.metric_unit)
                _this._metric_unit = new MetricUnit(obj.metric_unit);
        }
        return _this;
    }
    Object.defineProperty(Metric.prototype, "metric_standard", {
        get: function () {
            return this._metric_standard;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Metric.prototype, "metric_category", {
        get: function () {
            return this._metric_category;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Metric.prototype, "metric_subcategory", {
        get: function () {
            return this._metric_subcategory;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Metric.prototype, "metric_unit_group", {
        get: function () {
            return this._metric_unit_group;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Metric.prototype, "metric_unit", {
        get: function () {
            return this._metric_unit;
        },
        enumerable: true,
        configurable: true
    });
    Metric.resource = new api.Tastypie.Resource('onu/metric', { model: Metric });
    return Metric;
}(api.Tastypie.Model));
exports.Metric = Metric;
//# sourceMappingURL=onu.js.map