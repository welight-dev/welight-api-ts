import * as api from "ts-resource-tastypie";
export declare class WeNotifyDoador extends api.Tastypie.Model<WeNotifyDoador> {
    static resource: api.Tastypie.Resource<WeNotifyDoador>;
    trigger: string;
    title: string;
    message: string;
    read: boolean;
    dt_created: string;
    constructor(obj?: any);
}
