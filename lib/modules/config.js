"use strict";
// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>
Object.defineProperty(exports, "__esModule", { value: true });
var api = require("ts-resource-tastypie");
var Environment = /** @class */ (function () {
    function Environment() {
    }
    Environment.set = function (env) {
        if (Environment.types.hasOwnProperty(env)) {
            api.Tastypie.Provider.add(new api.Tastypie.Provider({ name: 'welight', url: Environment.types[env] }));
            api.Tastypie.Provider.setDefault('welight');
        }
    };
    Environment.types = {
        local: 'http://127.0.0.1:8001/api/v2/',
        dev: 'https://apidev2.welight.co/api/v2/',
        prod: 'https://api.welight.co/api/v2/'
    };
    return Environment;
}());
exports.Environment = Environment;
//# sourceMappingURL=config.js.map