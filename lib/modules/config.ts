// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>

import { Tastypie } from "ts-resource-tastypie";

export class Environment {

    public static env: string = 'local';

    public static types: any = {
        local: 'http://127.0.0.1:8001/api/v2/',
        dev: 'https://apidev.welight.co/api/v2/',
        prod: 'https://api.welight.co/api/v2/'
    }

    public static set(env: string): void {
        if(Environment.types.hasOwnProperty(env)){
            Environment.env = env;
            Tastypie.Provider.add(
                new Tastypie.Provider({name:'welight', url:Environment.types[env]})
            );
            Tastypie.Provider.setDefault('welight');
        }
    }

    public static getDomainSite(name:string, uri?:string): string {
        let url = ''

        if(Environment.env == 'local'){
            url = 'http://localhost:4200'+(uri||'');
        }else if(Environment.env == 'dev'){
            if(name == 'home'){
                url = 'https://dev.welight.co'+(uri||'');
            }else if(name == 'doador'){
                url = 'https://donator-dev.welight.co'+(uri||'');
            }else if(name == 'ong'){
                url = 'https://ong-dev.welight.co'+(uri||'');
            }else if(name == 'doador_empresa'){
                url = 'https://easyimpact-dev.welight.co'+(uri||'');
            }else if(name == 'doador_fundo'){
                url = 'https://funds-dev.welight.co'+(uri||'');
            }
        }else if(Environment.env == 'prod'){
            if(name == 'home'){
                url = 'https://welight.co'+(uri||'');
            }else if(name == 'doador'){
                url = 'https://donator.welight.co'+(uri||'');
            }else if(name == 'ong'){
                url = 'https://ong.welight.co'+(uri||'');
            }else if(name == 'doador_empresa'){
                url = 'https://easyimpact.welight.co'+(uri||'');
            }else if(name == 'doador_fundo'){
                url = 'https://funds.welight.co'+(uri||'');
            }
        }

        return url;
    }

    public static getAppName(app_token:string): string {
        let app_name = ''

        if(app_token == 'home'){
            app_name = 'we-site-home';
        }else if(app_token == 'doador'){
            app_name = 'we-site-doador';
        }else if(app_token == 'ong'){
            app_name = 'we-site-ong';
        }else if(app_token == 'doador_empresa'){
            app_name = 'we-site-empresa';
        }else if(app_token == 'doador_fundo'){
            app_name = 'we-site-funds';
        }

        return app_name;
    }
}
