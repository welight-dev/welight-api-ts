// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>

import * as api from "ts-resource-tastypie";
declare const InstallTrigger: any;
declare const chrome: any;

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

export class PluginNavegador {

    public instalado: boolean;

    constructor(obj?:any){
        this.instalado = false;
    }

    public instalarExtensaoChrome(): Promise<any> {
        let _self = this;
        return new Promise<any>(function(resolve, reject) {
            if(chrome){
                window.open('https://chrome.google.com/webstore/detail/welight/ghkiiifahcdlbeieldikdjheaokhajdi', '_blank');
                setTimeout(function() {
                    _self.instalado = true;
                    resolve(true);
                }, 5000);
                // chrome.webstore.install(
                //     'https://chrome.google.com/webstore/detail/ghkiiifahcdlbeieldikdjheaokhajdi',
                //     function(){
                //         clearTimeout(limitTimeInstall);
                //         _self.instalado = true;
                //         resolve(true);
                //     },
                //     function(error: any){
                //         clearTimeout(limitTimeInstall);
                //         _self.instalado = true;
                //         resolve(true);
                //     }
                // );
            }else{
                reject('chrome.webstore not found.');
            }

        });
    }

    public instalarExtensaoFirefox(): Promise<any> {
        let _self = this;
        return new Promise<any>(function(resolve, reject) {
            let limitTimeInstall = setTimeout(function() {
                resolve(true);
            }, 10000);
            let xpi = {'XPInstall Dialog Display Name': 'https://addons.mozilla.org/firefox/downloads/latest/welight/'};
            InstallTrigger.install(xpi, function(url:string, status:any){
                clearTimeout(limitTimeInstall);
                _self.instalado = true;
                resolve(true);
            });
        });
    }

    public notificarPlugin(user:{username:string, api_key:string}, doador:{nome:string, email:string, impacto_total:number}): void {
        let $wl_msg_profile = {user:user, doador:doador};
        let $wl_msg_event = new CustomEvent('$wl_msg_sendUserProfile', { 'detail': $wl_msg_profile });
        document.dispatchEvent($wl_msg_event);
    }
}

export class StyleUi {
    public font_family: string;
    public font_family_custom: string;
    public font_color: string;
    public font_size: number;
    public font_weight: string;
    public background_color: string;
    public border_width: number;
    public border_color: string;
    public border_type: string;
    public height: string;
    public width: string;

    constructor(obj?:any){
        if(obj){
            let _self = this;
            let properties: Array<string> = api.Tastypie.Tools.getProperties(obj);
            for(let propertie of properties){
                try {
                    _self[propertie] = obj[propertie];
                }
                catch (e) {}
            }
        }
    }
}
