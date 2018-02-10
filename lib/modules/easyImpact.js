"use strict";
// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var api = require("ts-resource-tastypie");
var Empresa = /** @class */ (function (_super) {
    __extends(Empresa, _super);
    function Empresa(obj) {
        return _super.call(this, Empresa.resource, obj) || this;
    }
    Empresa.resource = new api.Tastypie.Resource('easy-impact/profile', { model: Empresa });
    return Empresa;
}(api.Tastypie.Model));
exports.Empresa = Empresa;
//# sourceMappingURL=easyImpact.js.map