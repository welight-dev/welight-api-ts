// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>

import * as api from "ts-resource-tastypie";

export class Ods extends api.Tastypie.Model<Ods> {
    public static resource = new api.Tastypie.Resource<Ods>('onu/ods', {model: Ods});

    public tipo: string;
    public nome: string;
    public descricao: string;
    public objetivo: string;
    public fatos: string;
    public metas: string;
    public icone: string;
    public cor: string;
    public dt_created: string;
    public dt_updated: string;

    constructor(obj?:any){
        super(Ods.resource, obj);
    }
}


export class MetricStandard extends api.Tastypie.Model<MetricStandard> {
    public static resource = new api.Tastypie.Resource<MetricStandard>('onu/metric-standard', {model: MetricStandard});

    public name: string;
    public token: string;
    public slug: string;
    public ong_id: number;
    public dt_created: string;
    public dt_updated: string;

    constructor(obj?:any){
        super(MetricStandard.resource, obj);
    }
}

export class MetricSubcategory {
    public id: number;
    public name: {'PT-BR': string, 'EN-US': string};
    public slug: string;
    public dt_created: string;
    public dt_updated: string;

    public metric_category_id: number;

    constructor(obj?:any){
        if(obj){
            this.id = obj.id;
            this.name = obj.name;
            this.slug = obj.slug;
            this.dt_created = obj.dt_created;
            this.dt_updated = obj.dt_updated;
            this.metric_category_id = obj.metric_category_id;
        }
    }
}

export class MetricCategory extends api.Tastypie.Model<MetricCategory> {
    public static resource = new api.Tastypie.Resource<MetricCategory>('onu/metric-category', {model: MetricCategory});

    public name: {'PT-BR': string, 'EN-US': string};
    public slug: string;
    public dt_created: string;
    public dt_updated: string;
    public subcategories: Array<MetricSubcategory>;

    constructor(obj?:any){
        super(MetricCategory.resource, obj);
        this.subcategories = [];
        if(obj){
            if(obj.subcategories){
                for(let subcat of obj.subcategories){
                    this.subcategories.push(new MetricSubcategory(subcat));
                }
            }
        }
    }
}


export class MetricUnit {
    public id: number;
    public name: {'PT-BR': string, 'EN-US': string};
    public unit: string;
    public slug: string;
    public dt_created: string;
    public dt_updated: string;

    public metric_unit_group_id: number;

    constructor(obj?:any){
        if(obj){
            this.id = obj.id;
            this.name = obj.name;
            this.unit = obj.unit;
            this.slug = obj.slug;
            this.dt_created = obj.dt_created;
            this.dt_updated = obj.dt_updated;
            this.metric_unit_group_id = obj.metric_unit_group_id;
        }
    }
}


export class MetricUnitGroup extends api.Tastypie.Model<MetricUnitGroup> {
    public static resource = new api.Tastypie.Resource<MetricUnitGroup>('onu/metric-unit-group', {model: MetricUnitGroup});

    public name: {'PT-BR': string, 'EN-US': string};
    public slug: string;
    public dt_created: string;
    public dt_updated: string;
    public units: Array<MetricUnit>;

    constructor(obj?:any){
        super(MetricUnitGroup.resource, obj);
        this.units = [];
        if(obj){
            if(obj.units){
                for(let unit of obj.units){
                    this.units.push(new MetricUnit(unit));
                }
            }
        }
    }
}


export class Metric extends api.Tastypie.Model<Metric> {
    public static resource = new api.Tastypie.Resource<Metric>('onu/metric', {model: Metric});

    public name: {'PT-BR': string, 'EN-US': string};
    public token: string;
    public description: string;
    public usage_guide: string;
    public tag: string;
    public order_group: number;
    public ong_id: number;
    public metric_type: {'PT-BR': string, 'EN-US': string};
    public unit_edit: boolean;
    public dt_created: string;
    public dt_updated: string;

    private _metric_standard: MetricStandard;
    private _metric_category: MetricCategory;
    private _metric_subcategory: MetricSubcategory;
    private _metric_unit_group: MetricUnitGroup;
    private _metric_unit: MetricUnit;

    constructor(obj?:any){
        super(Metric.resource, obj);
        if(obj){
            if(obj.metric_standard) this._metric_standard = new MetricStandard(obj.metric_standard);
            if(obj.metric_category) this._metric_category = new MetricCategory(obj.metric_category);
            if(obj.metric_subcategory) this._metric_subcategory = new MetricSubcategory(obj.metric_subcategory);
            if(obj.metric_unit_group) this._metric_unit_group = new MetricUnitGroup(obj.metric_unit_group);
            if(obj.metric_unit) this._metric_unit = new MetricUnit(obj.metric_unit);
        }
    }

    public get metric_standard(): MetricStandard {
        return this._metric_standard;
    }

    public get metric_category(): MetricCategory {
        return this._metric_category;
    }

    public get metric_subcategory(): MetricSubcategory {
        return this._metric_subcategory;
    }

    public get metric_unit_group(): MetricUnitGroup {
        return this._metric_unit_group;
    }

    public get metric_unit(): MetricUnit {
        return this._metric_unit;
    }
}
