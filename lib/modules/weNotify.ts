// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>

import * as api from "ts-resource-tastypie";

export class WeNotifyDoador extends api.Tastypie.Model<WeNotifyDoador> {
    public static resource = new api.Tastypie.Resource<WeNotifyDoador>('we-notify/doador', {model: WeNotifyDoador});

    public trigger: string;
    public title: string;
    public message: string;
    public read: boolean;
    public dt_created: string;

    constructor(obj?:any){
        super(WeNotifyDoador.resource, obj);
    }
}
