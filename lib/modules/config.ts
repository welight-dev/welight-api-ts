// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>

import * as api from "ts-resource-tastypie";

export class Environment {

    public static types: any = {
        local: 'http://127.0.0.1:8001/api/v2/',
        dev: 'https://apidev2.welight.co/api/v2/',
        prod: 'https://api.welight.co/api/v2/'
    }

    public static set(env: string): void {
        if(Environment.types.hasOwnProperty(env)){
            api.Tastypie.Provider.add(
                new api.Tastypie.Provider({name:'welight', url:Environment.types[env]})
            );
            api.Tastypie.Provider.setDefault('welight');
        }
    }
}
