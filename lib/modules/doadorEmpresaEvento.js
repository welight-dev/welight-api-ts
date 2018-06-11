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
var doadorEmpresa_1 = require("./doadorEmpresa");
var ClienteVip = /** @class */ (function () {
    function ClienteVip(obj) {
        this.ingresso_id = obj.ingresso_id;
        this.nome = obj.nome;
        this.cpf = obj.cpf;
        this.qtde_ingresso = obj.qtde_ingresso;
        this.dt_updated = obj.dt_updated;
        this.dt_created = obj.dt_created;
    }
    return ClienteVip;
}());
exports.ClienteVip = ClienteVip;
var IngressoFatura = /** @class */ (function () {
    function IngressoFatura(obj) {
        this.ingresso_id = obj.ingresso_id;
        this.nome = obj.nome;
        this.cpf = obj.cpf;
        this.qtde = obj.qtde;
        this.moeda = obj.moeda;
        this.total = obj.total;
        this.pago = obj.pago;
        this.vencimento = obj.vencimento;
        this.dt_updated = obj.dt_updated;
        this.dt_created = obj.dt_created;
        var _self = this;
        if (obj.pagamento)
            _self.pagamento = new IngressoFaturaPagamento(obj.pagamento);
        if (obj.convidados) {
            _self.convidados = [];
            for (var _i = 0, _a = obj.convidados; _i < _a.length; _i++) {
                var convidado = _a[_i];
                _self.convidados.push(new IngressoFaturaCliente(convidado));
            }
        }
    }
    return IngressoFatura;
}());
exports.IngressoFatura = IngressoFatura;
var IngressoFaturaCliente = /** @class */ (function () {
    function IngressoFaturaCliente(obj) {
        this.ingresso_fatura_id = obj.ingresso_fatura_id;
        this.nome = obj.nome;
        this.cpf = obj.cpf;
        this.entrada_confirmada = obj.entrada_confirmada;
        this.dt_entrada = obj.dt_entrada;
    }
    return IngressoFaturaCliente;
}());
exports.IngressoFaturaCliente = IngressoFaturaCliente;
var IngressoFaturaPagamento = /** @class */ (function () {
    function IngressoFaturaPagamento(obj) {
        this.ingresso_fatura_id = obj.ingresso_fatura_id;
        this.invoice_id = obj.invoice_id;
        this.tipo = obj.tipo;
        this.status = obj.status;
        this.secure_url = obj.secure_url;
        this.dt_updated = obj.dt_updated;
        this.dt_created = obj.dt_created;
    }
    return IngressoFaturaPagamento;
}());
exports.IngressoFaturaPagamento = IngressoFaturaPagamento;
var FaturaVip = /** @class */ (function () {
    function FaturaVip(obj) {
        var _self = this;
        if (obj.vip)
            _self.vip = new ClienteVip(obj.vip);
        if (obj.faturas) {
            _self.faturas = [];
            for (var _i = 0, _a = obj.faturas; _i < _a.length; _i++) {
                var fatura = _a[_i];
                _self.faturas.push(new IngressoFatura(fatura));
            }
        }
    }
    return FaturaVip;
}());
exports.FaturaVip = FaturaVip;
var Evento = /** @class */ (function (_super) {
    __extends(Evento, _super);
    function Evento(obj, _resource) {
        var _this = _super.call(this, _resource || Evento.resource, obj) || this;
        var _self = _this;
        if (_self.empresa)
            _self.empresa = new doadorEmpresa_1.Empresa(_self.empresa);
        return _this;
    }
    Evento.resource = new api.Tastypie.Resource('doador-empresa-evento/evento', { model: Evento });
    return Evento;
}(api.Tastypie.Model));
exports.Evento = Evento;
var IngressoPublic = /** @class */ (function (_super) {
    __extends(IngressoPublic, _super);
    function IngressoPublic(obj, _resource) {
        var _this = _super.call(this, _resource || IngressoPublic.resource, obj) || this;
        _this._check_fatura_vip = new api.Tastypie.Resource('doador-empresa-evento/ingresso-public/check-fatura-vip');
        _this._gerar_fatura_vip = new api.Tastypie.Resource('doador-empresa-evento/ingresso-public/gerar-fatura-vip');
        _this._check_entrada = new api.Tastypie.Resource('doador-empresa-evento/ingresso-public/check-entrada');
        _this._confirmar_entrada = new api.Tastypie.Resource('doador-empresa-evento/ingresso-public/confirmar-entrada');
        var _self = _this;
        if (_self.evento)
            _self.evento = new Evento(_self.evento);
        return _this;
    }
    IngressoPublic.prototype.check_fatura_vip = function (ingresso_id, cpf) {
        var _self = this;
        return _self._check_fatura_vip.objects.findOne({ ingresso_id: ingresso_id, cpf: cpf }).then(function (data) {
            return new FaturaVip(data);
        });
    };
    IngressoPublic.prototype.gerar_fatura_vip = function (ingresso_id, cpf, qtde, convidados, ongs) {
        var _self = this;
        return _self._gerar_fatura_vip.objects.create({ ingresso_id: ingresso_id, cpf: cpf, qtde: qtde, convidados: convidados, ongs: ongs }).then(function (data) {
            return new IngressoFatura(data);
        });
    };
    IngressoPublic.prototype.check_entrada = function (ingresso_id, cpf) {
        var _self = this;
        return _self._check_entrada.objects.findOne({ ingresso_id: ingresso_id, cpf: cpf }).then(function (data) {
            return new IngressoFatura(data);
        });
    };
    IngressoPublic.prototype.confirmar_entrada = function (ingresso_id, cpf) {
        var _self = this;
        return _self._confirmar_entrada.objects.create({ ingresso_id: ingresso_id, cpf: cpf }).then(function (data) {
            return new IngressoFatura(data);
        });
    };
    IngressoPublic.resource = new api.Tastypie.Resource('doador-empresa-evento/ingresso-public', { model: IngressoPublic });
    return IngressoPublic;
}(api.Tastypie.Model));
exports.IngressoPublic = IngressoPublic;
//# sourceMappingURL=doadorEmpresaEvento.js.map