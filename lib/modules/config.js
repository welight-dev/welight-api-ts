"use strict";
// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>
Object.defineProperty(exports, "__esModule", { value: true });
var ts_resource_tastypie_1 = require("ts-resource-tastypie");
var Environment = /** @class */ (function () {
    function Environment() {
    }
    Environment.set = function (env) {
        if (Environment.types.hasOwnProperty(env)) {
            Environment.env = env;
            ts_resource_tastypie_1.Tastypie.Provider.add(new ts_resource_tastypie_1.Tastypie.Provider({ name: 'welight', url: Environment.types[env] }));
            ts_resource_tastypie_1.Tastypie.Provider.setDefault('welight');
        }
    };
    Environment.getDomainSite = function (name, uri) {
        var url = '';
        if (Environment.env == 'local') {
            url = 'http://localhost:4200' + (uri || '');
        }
        else if (Environment.env == 'dev') {
            if (name == 'home') {
                url = 'https://dev.welight.co' + (uri || '');
            }
            else if (name == 'doador') {
                url = 'https://donator-dev.welight.co' + (uri || '');
            }
            else if (name == 'ong') {
                url = 'https://ong-dev.welight.co' + (uri || '');
            }
            else if (name == 'doador_empresa') {
                url = 'https://easyimpact-dev.welight.co' + (uri || '');
            }
            else if (name == 'doador_fundo') {
                url = 'https://funds-dev.welight.co' + (uri || '');
            }
        }
        else if (Environment.env == 'prod') {
            if (name == 'home') {
                url = 'https://welight.co' + (uri || '');
            }
            else if (name == 'doador') {
                url = 'https://donator.welight.co' + (uri || '');
            }
            else if (name == 'ong') {
                url = 'https://ong.welight.co' + (uri || '');
            }
            else if (name == 'doador_empresa') {
                url = 'https://easyimpact.welight.co' + (uri || '');
            }
            else if (name == 'doador_fundo') {
                url = 'https://funds.welight.co' + (uri || '');
            }
        }
        return url;
    };
    Environment.env = 'local';
    Environment.types = {
        local: 'http://127.0.0.1:8001/api/v2/',
        dev: 'https://apidev.welight.co/api/v2/',
        prod: 'https://api.welight.co/api/v2/'
    };
    return Environment;
}());
exports.Environment = Environment;
//# sourceMappingURL=config.js.map