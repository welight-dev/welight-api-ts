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
exports.TesteAb = exports.Venda = void 0;
var ts_resource_tastypie_1 = require("ts-resource-tastypie");
var Venda = /** @class */ (function (_super) {
    __extends(Venda, _super);
    function Venda(obj) {
        return _super.call(this, Venda.resource, obj) || this;
    }
    Venda.resource = new ts_resource_tastypie_1.Tastypie.Resource('doador-empresa/ecommerce-venda', { model: Venda });
    return Venda;
}(ts_resource_tastypie_1.Tastypie.Model));
exports.Venda = Venda;
var TesteAb = /** @class */ (function (_super) {
    __extends(TesteAb, _super);
    function TesteAb(obj) {
        return _super.call(this, TesteAb.resource, obj) || this;
    }
    TesteAb.resource = new ts_resource_tastypie_1.Tastypie.Resource('doador-empresa/venda/current-teste-ab', { model: TesteAb });
    return TesteAb;
}(ts_resource_tastypie_1.Tastypie.Model));
exports.TesteAb = TesteAb;
//# sourceMappingURL=doadorEmpresaEcommerce.js.map