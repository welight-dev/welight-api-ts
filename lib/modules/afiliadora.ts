// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>

import * as api from "ts-resource-tastypie";

export class Loja extends api.Tastypie.Model<Loja> {
    public static resource = new api.Tastypie.Resource<Loja>('afiliadora/loja', {model: Loja});

    public nome: string;
    public logomarca: string;
    public site: string;
    public url_trackeada: string;
    public porcentagem_doacao: string;
    private _cupons: api.Tastypie.Resource<Cupom>;

    constructor(obj?:any){
        super(Loja.resource, obj);
        let _self = this;
        if(_self.id){
            _self._cupons = new api.Tastypie.Resource<Cupom>('afiliadora/cupom', {model: Cupom, defaults: {loja: _self.id}});
        }
    }

    public get cupons(): api.Tastypie.Resource<Cupom> {
        return this._cupons;
    }
}

export class Cupom extends api.Tastypie.Model<Cupom> {
    public static resource = new api.Tastypie.Resource<Cupom>('afiliadora/cupom', {model: Cupom});

    public nome: string;
    public codigo: string;
    public descricao: string;
    public url: string;
    public data_inicio: string;
    public data_termino: string;
    public restricoes: string;
    public regiao: string;
    public pais: Array<{codigo:number, nome: string}>;

    constructor(obj?:any){
        super(Cupom.resource, obj);
    }
}
