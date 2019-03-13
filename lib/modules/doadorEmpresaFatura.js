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
var ong_1 = require("./ong");
var doadorEmpresa_1 = require("./doadorEmpresa");
var Fatura = /** @class */ (function (_super) {
    __extends(Fatura, _super);
    function Fatura(obj) {
        var _this = _super.call(this, Fatura.resource, obj) || this;
        if (obj) {
            if (obj.empresa)
                _this.empresa = new doadorEmpresa_1.Empresa(obj.empresa);
            if (obj.id) {
                _this._venda = new api.Tastypie.Resource('doador-empresa-fatura/fatura-venda', { model: FaturaVenda, defaults: { fatura_id: obj.id } });
                _this._distribuicao = new api.Tastypie.Resource('doador-empresa-fatura/fatura-distribuicao', { model: FaturaDistribuicao, defaults: { fatura_id: obj.id } });
            }
        }
        return _this;
    }
    Object.defineProperty(Fatura.prototype, "venda_detalhes", {
        get: function () {
            return this._venda;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Fatura.prototype, "distribuicao_detalhes", {
        get: function () {
            return this._distribuicao;
        },
        enumerable: true,
        configurable: true
    });
    Fatura.resource = new api.Tastypie.Resource('doador-empresa-fatura/fatura', { model: Fatura });
    return Fatura;
}(api.Tastypie.Model));
exports.Fatura = Fatura;
var FaturaVenda = /** @class */ (function (_super) {
    __extends(FaturaVenda, _super);
    function FaturaVenda(obj) {
        var _this = _super.call(this, FaturaVenda.resource, obj) || this;
        if (obj) {
            if (obj.cliente)
                _this.cliente = new doadorEmpresa_1.Cliente(obj.cliente);
        }
        return _this;
    }
    FaturaVenda.resource = new api.Tastypie.Resource('doador-empresa-fatura/fatura-venda', { model: FaturaVenda });
    return FaturaVenda;
}(api.Tastypie.Model));
exports.FaturaVenda = FaturaVenda;
var FaturaDistribuicao = /** @class */ (function (_super) {
    __extends(FaturaDistribuicao, _super);
    function FaturaDistribuicao(obj) {
        var _this = _super.call(this, FaturaDistribuicao.resource, obj) || this;
        if (obj) {
            if (obj.ong)
                _this.ong = new ong_1.Ong(obj.ong);
            if (obj.cliente)
                _this.cliente = new doadorEmpresa_1.Cliente(obj.cliente);
        }
        return _this;
    }
    FaturaDistribuicao.resource = new api.Tastypie.Resource('doador-empresa-fatura/fatura-distribuicao', { model: FaturaDistribuicao });
    return FaturaDistribuicao;
}(api.Tastypie.Model));
exports.FaturaDistribuicao = FaturaDistribuicao;
//# sourceMappingURL=doadorEmpresaFatura.js.map