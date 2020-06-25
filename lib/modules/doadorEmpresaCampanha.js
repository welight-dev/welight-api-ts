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
exports.DoacaoFaturaPagamento = exports.DoacaoFatura = exports.CampanhaDoacao = exports.CampanhaOng = exports.Campanha = void 0;
var ts_resource_tastypie_1 = require("ts-resource-tastypie");
var utils_1 = require("./utils");
var ong_1 = require("./ong");
var doador_1 = require("./doador");
var doadorEmpresa_1 = require("./doadorEmpresa");
var Campanha = /** @class */ (function (_super) {
    __extends(Campanha, _super);
    function Campanha(obj) {
        var _this = _super.call(this, Campanha.resource, obj) || this;
        _this._md_empresa = new doadorEmpresa_1.Empresa();
        if (obj) {
            if (obj.empresa)
                _this._md_empresa = new doadorEmpresa_1.Empresa(obj.empresa);
            if (obj.id) {
                _this._rs_ong = new ts_resource_tastypie_1.Tastypie.Resource(CampanhaOng.resource.endpoint, { model: CampanhaOng, defaults: { campanha_id: obj.id } });
            }
        }
        return _this;
    }
    Object.defineProperty(Campanha.prototype, "md_empresa", {
        get: function () {
            return this._md_empresa;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Campanha.prototype, "rs_ong", {
        get: function () {
            return this._rs_ong;
        },
        enumerable: false,
        configurable: true
    });
    Campanha.prototype.gerar_fatura = function (metodo_pgto, valor_doacao, recorrente, anonimo, ongs, cpf) {
        if (this.id) {
            return DoacaoFatura.gerar_fatura({
                campanha_id: this.id,
                metodo_pgto: metodo_pgto,
                valor_doacao: valor_doacao,
                recorrente: recorrente,
                anonimo: anonimo,
                ongs: ongs,
                cpf: cpf
            });
        }
    };
    Campanha.resource = new ts_resource_tastypie_1.Tastypie.Resource('doador-empresa-campanha/campanha', { model: Campanha });
    return Campanha;
}(ts_resource_tastypie_1.Tastypie.Model));
exports.Campanha = Campanha;
var CampanhaOng = /** @class */ (function (_super) {
    __extends(CampanhaOng, _super);
    function CampanhaOng(obj) {
        var _this = _super.call(this, CampanhaOng.resource, obj) || this;
        _this._md_campanha = new Campanha();
        _this._md_ong = new ong_1.Ong();
        if (obj) {
            if (obj.campanha)
                _this._md_campanha = new Campanha(obj.campanha);
            if (obj.ong)
                _this._md_ong = new ong_1.Ong(obj.ong);
        }
        return _this;
    }
    Object.defineProperty(CampanhaOng.prototype, "md_campanha", {
        get: function () {
            return this._md_campanha;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CampanhaOng.prototype, "md_ong", {
        get: function () {
            return this._md_ong;
        },
        enumerable: false,
        configurable: true
    });
    CampanhaOng.resource = new ts_resource_tastypie_1.Tastypie.Resource('doador-empresa-campanha/ong', { model: CampanhaOng });
    return CampanhaOng;
}(ts_resource_tastypie_1.Tastypie.Model));
exports.CampanhaOng = CampanhaOng;
var CampanhaDoacao = /** @class */ (function (_super) {
    __extends(CampanhaDoacao, _super);
    function CampanhaDoacao(obj) {
        var _this = _super.call(this, CampanhaDoacao.resource, obj) || this;
        _this._md_campanha = new Campanha();
        _this._md_doador = new doador_1.Doador();
        if (obj) {
            if (obj.campanha)
                _this._md_campanha = new Campanha(obj.campanha);
            if (obj.doador)
                _this._md_doador = new doador_1.Doador(obj.doador);
        }
        return _this;
    }
    Object.defineProperty(CampanhaDoacao.prototype, "md_campanha", {
        get: function () {
            return this._md_campanha;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CampanhaDoacao.prototype, "md_doador", {
        get: function () {
            return this._md_doador;
        },
        enumerable: false,
        configurable: true
    });
    CampanhaDoacao.resource = new ts_resource_tastypie_1.Tastypie.Resource('doador-empresa-campanha/doacao', { model: CampanhaDoacao });
    return CampanhaDoacao;
}(ts_resource_tastypie_1.Tastypie.Model));
exports.CampanhaDoacao = CampanhaDoacao;
var DoacaoFatura = /** @class */ (function () {
    function DoacaoFatura(obj) {
        this._md_campanha_doacao = new CampanhaDoacao();
        this._md_pagamento = new DoacaoFaturaPagamento();
        this._md_ongs = [];
        if (obj) {
            utils_1.Tools.setData(obj, this);
            if (obj.campanha_doacao)
                this._md_campanha_doacao = new CampanhaDoacao(obj.campanha_doacao);
            if (obj.pagamento)
                this._md_pagamento = new DoacaoFaturaPagamento(obj.pagamento);
            if (obj.ongs) {
                for (var _i = 0, _a = obj.ongs; _i < _a.length; _i++) {
                    var ong = _a[_i];
                    this._md_ongs.push(new ong_1.Ong(ong));
                }
            }
        }
    }
    Object.defineProperty(DoacaoFatura.prototype, "md_campanha_doacao", {
        get: function () {
            return this._md_campanha_doacao;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DoacaoFatura.prototype, "md_pagamento", {
        get: function () {
            return this._md_pagamento;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DoacaoFatura.prototype, "md_ongs", {
        get: function () {
            return this._md_ongs;
        },
        enumerable: false,
        configurable: true
    });
    DoacaoFatura.gerar_fatura = function (obj) {
        return DoacaoFatura.rs_fatura_add.objects.create(obj);
    };
    DoacaoFatura.check_fatura = function (token) {
        return DoacaoFatura.rs_fatura_check.objects.findOne({ token: token });
    };
    DoacaoFatura.rs_fatura_add = new ts_resource_tastypie_1.Tastypie.Resource('doador-empresa-campanha/campanha/gerar-fatura', { model: DoacaoFatura });
    DoacaoFatura.rs_fatura_check = new ts_resource_tastypie_1.Tastypie.Resource('doador-empresa-campanha/campanha/check-fatura', { model: DoacaoFatura });
    return DoacaoFatura;
}());
exports.DoacaoFatura = DoacaoFatura;
var DoacaoFaturaPagamento = /** @class */ (function () {
    function DoacaoFaturaPagamento(obj) {
        if (obj) {
            utils_1.Tools.setData(obj, this);
        }
    }
    return DoacaoFaturaPagamento;
}());
exports.DoacaoFaturaPagamento = DoacaoFaturaPagamento;
//# sourceMappingURL=doadorEmpresaCampanha.js.map