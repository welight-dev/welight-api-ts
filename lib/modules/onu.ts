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
