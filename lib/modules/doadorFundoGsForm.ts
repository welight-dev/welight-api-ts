// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>

import { Tastypie } from "ts-resource-tastypie";

export class GsForm extends Tastypie.Model<GsForm> {
    public static resource = new Tastypie.Resource<GsForm>('doador-fundo/gs-form', {model: GsForm});

    public gs_id: number;
    public type: string;
    public topic: string;
    public content: any;
    public document: string;
    public dt_updated: string;
    public dt_created: string;

    constructor(obj?:any){
        super(GsForm.resource, obj);
    }
}
