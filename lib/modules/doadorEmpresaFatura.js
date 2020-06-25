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
exports.FaturaPagamento = exports.FaturaOngDistribuicao = exports.FaturaDistribuicao = exports.FaturaVenda = exports.FaturaTaxa = exports.Fatura = void 0;
var api = require("ts-resource-tastypie");
var ong_1 = require("./ong");
var doadorEmpresa_1 = require("./doadorEmpresa");
var Fatura = /** @class */ (function (_super) {
    __extends(Fatura, _super);
    function Fatura(obj) {
        var _this = _super.call(this, Fatura.resource, obj) || this;
        _this.taxas = [];
        _this.pagamentos = [];
        if (obj) {
            if (obj.empresa)
                _this.empresa = new doadorEmpresa_1.Empresa(obj.empresa);
            if (obj.id) {
                _this._venda = new api.Tastypie.Resource('doador-empresa-fatura/venda', { model: FaturaVenda, defaults: { fatura_id: obj.id } });
                _this._distribuicao = new api.Tastypie.Resource('doador-empresa-fatura/distribuicao', { model: FaturaDistribuicao, defaults: { fatura_id: obj.id } });
                _this._ong_distribuicao = new api.Tastypie.Resource('doador-empresa-fatura/ong-distribuicao', { model: FaturaOngDistribuicao, defaults: { fatura_id: obj.id } });
            }
            if (obj.taxas) {
                for (var _i = 0, _a = obj.taxas; _i < _a.length; _i++) {
                    var taxa = _a[_i];
                    _this.taxas.push(new FaturaTaxa(taxa));
                }
            }
            if (obj.pagamentos) {
                for (var _b = 0, _c = obj.pagamentos; _b < _c.length; _b++) {
                    var pag = _c[_b];
                    _this.pagamentos.push(new FaturaPagamento(pag));
                }
            }
        }
        return _this;
    }
    Object.defineProperty(Fatura.prototype, "venda", {
        get: function () {
            return this._venda;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Fatura.prototype, "distribuicao", {
        get: function () {
            return this._distribuicao;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Fatura.prototype, "ong_distribuicao", {
        get: function () {
            return this._ong_distribuicao;
        },
        enumerable: false,
        configurable: true
    });
    Fatura.resource = new api.Tastypie.Resource('doador-empresa-fatura/fatura', { model: Fatura });
    return Fatura;
}(api.Tastypie.Model));
exports.Fatura = Fatura;
var FaturaTaxa = /** @class */ (function () {
    function FaturaTaxa(obj) {
        if (obj) {
            this.id = obj.id;
            this.nome = obj.nome;
            this.tipo = obj.tipo;
            this.taxa = obj.taxa;
            this.porcentagem = obj.porcentagem;
            this.total_taxa = obj.total_taxa;
        }
    }
    return FaturaTaxa;
}());
exports.FaturaTaxa = FaturaTaxa;
var FaturaVenda = /** @class */ (function (_super) {
    __extends(FaturaVenda, _super);
    function FaturaVenda(obj) {
        var _this = _super.call(this, FaturaVenda.resource, obj) || this;
        if (obj) {
            if (obj.cliente)
                _this.cliente = new doadorEmpresa_1.Cliente(obj.cliente);
            if (obj.modulo)
                _this.modulo = new doadorEmpresa_1.EmpresaModulo(obj.modulo);
            if (obj.plataforma)
                _this.plataforma = new doadorEmpresa_1.EmpresaModuloPlataforma(obj.plataforma);
        }
        return _this;
    }
    FaturaVenda.resource = new api.Tastypie.Resource('doador-empresa-fatura/venda', { model: FaturaVenda });
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
    FaturaDistribuicao.resource = new api.Tastypie.Resource('doador-empresa-fatura/distribuicao', { model: FaturaDistribuicao });
    return FaturaDistribuicao;
}(api.Tastypie.Model));
exports.FaturaDistribuicao = FaturaDistribuicao;
var FaturaOngDistribuicao = /** @class */ (function (_super) {
    __extends(FaturaOngDistribuicao, _super);
    function FaturaOngDistribuicao(obj) {
        var _this = _super.call(this, FaturaOngDistribuicao.resource, obj) || this;
        if (obj) {
            if (obj.ong)
                _this.ong = new ong_1.Ong(obj.ong);
        }
        return _this;
    }
    FaturaOngDistribuicao.resource = new api.Tastypie.Resource('doador-empresa-fatura/ong-distribuicao', { model: FaturaOngDistribuicao });
    return FaturaOngDistribuicao;
}(api.Tastypie.Model));
exports.FaturaOngDistribuicao = FaturaOngDistribuicao;
var FaturaPagamento = /** @class */ (function () {
    function FaturaPagamento(obj) {
        if (obj) {
            this.id = obj.id;
            this.fatura_id = obj.fatura_id;
            this.total = obj.total;
            this.vencimento = obj.vencimento;
            this.invoice_id = obj.invoice_id;
            this.tipo = obj.tipo;
            this.status = obj.status;
            this.target = obj.target;
            this.secure_url = obj.secure_url;
            this.dt_updated = obj.dt_updated;
            this.dt_created = obj.dt_created;
        }
    }
    return FaturaPagamento;
}());
exports.FaturaPagamento = FaturaPagamento;
//# sourceMappingURL=doadorEmpresaFatura.js.map