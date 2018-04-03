// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>

import * as api from "ts-resource-tastypie";

export class Tools {
    public static get localStorageSuported(): boolean {
          let test = 'test';
          try {
              localStorage.setItem(test, test);
              localStorage.removeItem(test);
              return true;
          } catch(e) {
              return false;
          }
    }
}

export class Banco extends api.Tastypie.Model<Banco> {

    public static resource = new api.Tastypie.Resource<Banco>('utils/banco', {model: Banco});

    public codigo: string;
    public nome: string;
    public sigla: string;
    public competencia: string;
    public website: string;
    public dt_updated: string;
    public dt_created: boolean;

    constructor(obj?:any){
      super(Banco.resource, obj);
    }
}
