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
var Pagina = /** @class */ (function (_super) {
    __extends(Pagina, _super);
    function Pagina(obj) {
        return _super.call(this, Pagina.resource, obj) || this;
    }
    Pagina.resource = new api.Tastypie.Resource('suporte/documento', { model: Pagina });
    return Pagina;
}(api.Tastypie.Model));
exports.Pagina = Pagina;
var Faq = /** @class */ (function (_super) {
    __extends(Faq, _super);
    function Faq(obj) {
        return _super.call(this, Faq.resource, obj) || this;
    }
    Faq.resource = new api.Tastypie.Resource('suporte/faq', { model: Faq });
    return Faq;
}(api.Tastypie.Model));
exports.Faq = Faq;
var Depoimento = /** @class */ (function (_super) {
    __extends(Depoimento, _super);
    function Depoimento(obj) {
        return _super.call(this, Depoimento.resource, obj) || this;
    }
    Depoimento.resource = new api.Tastypie.Resource('suporte/depoimento', { model: Depoimento });
    return Depoimento;
}(api.Tastypie.Model));
exports.Depoimento = Depoimento;
var Contato = /** @class */ (function (_super) {
    __extends(Contato, _super);
    function Contato(obj) {
        return _super.call(this, Contato.resource, obj) || this;
    }
    Contato.resource = new api.Tastypie.Resource('suporte/contato', { model: Contato });
    return Contato;
}(api.Tastypie.Model));
exports.Contato = Contato;
//# sourceMappingURL=suporte.js.map