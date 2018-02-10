// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>

import * as api from "ts-resource-tastypie";

export class Empresa extends api.Tastypie.Model<Empresa> {
    public static resource = new api.Tastypie.Resource<Empresa>('easy-impact/profile', {model: Empresa});

    constructor(obj?:any){
        super(Empresa.resource, obj);
    }
}
