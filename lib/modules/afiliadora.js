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
var api = require("ts-resource-tastypie");
var CategoriaLoja = /** @class */ (function (_super) {
    __extends(CategoriaLoja, _super);
    function CategoriaLoja(obj) {
        return _super.call(this, CategoriaLoja.resource, obj) || this;
    }
    CategoriaLoja.resource = new api.Tastypie.Resource('afiliadora/categoria-loja', { model: CategoriaLoja });
    return CategoriaLoja;
}(api.Tastypie.Model));
exports.CategoriaLoja = CategoriaLoja;
var Loja = /** @class */ (function (_super) {
    __extends(Loja, _super);
    function Loja(obj) {
        var _this = _super.call(this, Loja.resource, obj) || this;
        var _self = _this;
        if (_self.id) {
            _self._cupons = new api.Tastypie.Resource('afiliadora/cupom', { model: Cupom, defaults: { loja_id: _self.id } });
        }
        return _this;
    }
    Object.defineProperty(Loja.prototype, "cupons", {
        get: function () {
            return this._cupons;
        },
        enumerable: true,
        configurable: true
    });
    Loja.resource = new api.Tastypie.Resource('afiliadora/loja', { model: Loja });
    return Loja;
}(api.Tastypie.Model));
exports.Loja = Loja;
var Cupom = /** @class */ (function (_super) {
    __extends(Cupom, _super);
    function Cupom(obj) {
        var _this = _super.call(this, Cupom.resource, obj) || this;
        if (obj) {
            if (obj.loja)
                _this.loja = new Loja(obj.loja);
        }
        return _this;
    }
    Cupom.resource = new api.Tastypie.Resource('afiliadora/cupom', { model: Cupom });
    return Cupom;
}(api.Tastypie.Model));
exports.Cupom = Cupom;
//# sourceMappingURL=afiliadora.js.map