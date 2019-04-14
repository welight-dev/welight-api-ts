"use strict";
// Project: [~welight-api-ts~]
// Definitions by: [~MARCOS WILLIAM FERRETTI~] <[~https://github.com/mw-ferretti~]>
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
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
        if (obj) {
            this.ingresso_id = obj.ingresso_id;
            this.nome = obj.nome;
            this.cpf = obj.cpf;
            this.email = obj.email;
            this.qtde = obj.qtde;
            this.moeda = obj.moeda;
            this.total = obj.total;
            this.pago = obj.pago;
            this.vencimento = obj.vencimento;
            this.token = obj.token;
            this.dt_updated = obj.dt_updated;
            this.dt_created = obj.dt_created;
            if (obj.pagamento)
                this.pagamento = new IngressoFaturaPagamento(obj.pagamento);
            if (obj.convidados) {
                this.convidados = [];
                for (var _i = 0, _a = obj.convidados; _i < _a.length; _i++) {
                    var convidado = _a[_i];
                    this.convidados.push(new IngressoFaturaCliente(convidado));
                }
            }
            if (obj.ingresso)
                this.ingresso = new IngressoPublic(obj.ingresso);
        }
    }
    return IngressoFatura;
}());
exports.IngressoFatura = IngressoFatura;
var IngressoFaturaCliente = /** @class */ (function () {
    function IngressoFaturaCliente(obj) {
        if (obj) {
            this.ingresso_fatura_id = obj.ingresso_fatura_id;
            this.nome = obj.nome;
            this.cpf = obj.cpf;
            this.email = obj.email;
            this.sexo = obj.sexo;
            this.entrada_confirmada = obj.entrada_confirmada;
            this.dt_entrada = obj.dt_entrada;
        }
    }
    return IngressoFaturaCliente;
}());
exports.IngressoFaturaCliente = IngressoFaturaCliente;
var IngressoFaturaPagamento = /** @class */ (function () {
    function IngressoFaturaPagamento(obj) {
        if (obj) {
            this.ingresso_fatura_id = obj.ingresso_fatura_id;
            this.invoice_id = obj.invoice_id;
            this.tipo = obj.tipo;
            this.status = obj.status;
            this.secure_url = obj.secure_url;
            this.dt_updated = obj.dt_updated;
            this.dt_created = obj.dt_created;
        }
    }
    return IngressoFaturaPagamento;
}());
exports.IngressoFaturaPagamento = IngressoFaturaPagamento;
var FaturaVip = /** @class */ (function () {
    function FaturaVip(obj) {
        if (obj) {
            if (obj.vip)
                this.vip = new ClienteVip(obj.vip);
            if (obj.faturas) {
                this.faturas = [];
                for (var _i = 0, _a = obj.faturas; _i < _a.length; _i++) {
                    var fatura = _a[_i];
                    this.faturas.push(new IngressoFatura(fatura));
                }
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
        if (obj) {
            if (obj.empresa)
                _this.empresa = new doadorEmpresa_1.Empresa(obj.empresa);
        }
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
        _this._gerar_fatura = new api.Tastypie.Resource('doador-empresa-evento/ingresso-public/gerar-fatura');
        _this._check_fatura = new api.Tastypie.Resource('doador-empresa-evento/ingresso-public/check-fatura');
        _this._check_entrada = new api.Tastypie.Resource('doador-empresa-evento/ingresso-public/check-entrada');
        _this._confirmar_entrada = new api.Tastypie.Resource('doador-empresa-evento/ingresso-public/confirmar-entrada');
        if (obj) {
            if (obj.evento)
                _this.evento = new Evento(obj.evento);
        }
        return _this;
    }
    IngressoPublic.prototype.check_fatura_vip = function (ingresso_id, cpf) {
        return this._check_fatura_vip.objects.findOne({ ingresso_id: ingresso_id, cpf: cpf }).then(function (data) {
            return new FaturaVip(data);
        });
    };
    IngressoPublic.prototype.gerar_fatura_vip = function (ingresso_id, cpf, qtde, convidados, ongs) {
        return this._gerar_fatura_vip.objects.create({ ingresso_id: ingresso_id, cpf: cpf, qtde: qtde, convidados: convidados, ongs: ongs }).then(function (data) {
            return new IngressoFatura(data);
        });
    };
    IngressoPublic.prototype.gerar_fatura = function (cpf, email, qtde, tipo_pagamento, convidados, ongs) {
        return this._gerar_fatura.objects.create({ ingresso_id: this.id, cpf: cpf, email: email, qtde: qtde, tipo_pagamento: tipo_pagamento, convidados: convidados, ongs: ongs }).then(function (data) {
            return new IngressoFatura(data);
        });
    };
    IngressoPublic.prototype.check_fatura = function (token) {
        return this._check_fatura.objects.findOne({ token: token }).then(function (data) {
            return new IngressoFatura(data);
        });
    };
    IngressoPublic.prototype.check_entrada = function (ingresso_id, cpf) {
        return this._check_entrada.objects.findOne({ ingresso_id: ingresso_id, cpf: cpf }).then(function (data) {
            return new IngressoFatura(data);
        });
    };
    IngressoPublic.prototype.confirmar_entrada = function (ingresso_id, cpf) {
        return this._confirmar_entrada.objects.create({ ingresso_id: ingresso_id, cpf: cpf }).then(function (data) {
            return new IngressoFatura(data);
        });
    };
    IngressoPublic.resource = new api.Tastypie.Resource('doador-empresa-evento/ingresso-public', { model: IngressoPublic });
    return IngressoPublic;
}(api.Tastypie.Model));
exports.IngressoPublic = IngressoPublic;
//# sourceMappingURL=doadorEmpresaEvento.js.map