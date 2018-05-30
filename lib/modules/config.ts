// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>

import * as api from "ts-resource-tastypie";

export class Environment {

    public static env: string = 'local';

    public static types: any = {
        local: 'http://127.0.0.1:8001/api/v2/',
        dev: 'https://apidev2.welight.co/api/v2/',
        prod: 'https://api.welight.co/api/v2/'
    }

    public static set(env: string): void {
        if(Environment.types.hasOwnProperty(env)){
            Environment.env = env;
            api.Tastypie.Provider.add(
                new api.Tastypie.Provider({name:'welight', url:Environment.types[env]})
            );
            api.Tastypie.Provider.setDefault('welight');
        }
    }

    public static getDomainSite(name:string, uri?:string): string {
        let url = ''

        if(Environment.env == 'local'){
            url = 'http://localhost:4200'+(uri||'');
        }else if(Environment.env == 'dev'){
            if(name == 'home'){
                url = 'https://homedev.welight.co'+(uri||'');
            }else if(name == 'doador'){
                url = 'https://donatordev.welight.co'+(uri||'');
            }else if(name == 'ong'){
                url = 'https://ongdev.welight.co'+(uri||'');
            }else if(name == 'empresa'){
                url = 'https://easyimpact-dev.welight.co'+(uri||'');
            }
        }else if(Environment.env == 'prod'){
            if(name == 'home'){
                url = 'https://welight.co'+(uri||'');
            }else if(name == 'doador'){
                url = 'https://donator.welight.co'+(uri||'');
            }else if(name == 'ong'){
                url = 'https://ong.welight.co'+(uri||'');
            }else if(name == 'empresa'){
                url = 'https://easyimpact.welight.co'+(uri||'');
            }
        }

        return url;
    }
}
