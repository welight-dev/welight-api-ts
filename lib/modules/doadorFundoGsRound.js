"use strict";
// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ts_resource_tastypie_1 = require("ts-resource-tastypie");
var OrgFundGsRound = /** @class */ (function (_super) {
    __extends(OrgFundGsRound, _super);
    function OrgFundGsRound(obj) {
        return _super.call(this, OrgFundGsRound.resource, obj) || this;
    }
    OrgFundGsRound.resource = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo-gs-round/round', { model: OrgFundGsRound });
    OrgFundGsRound.resource_add_round = new ts_resource_tastypie_1.Tastypie.Resource('doador-fundo-gs-round/round/add-round');
    return OrgFundGsRound;
}(ts_resource_tastypie_1.Tastypie.Model));
exports.OrgFundGsRound = OrgFundGsRound;
//# sourceMappingURL=doadorFundoGsRound.js.map