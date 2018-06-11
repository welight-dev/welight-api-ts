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
var doador_1 = require("./doador");
var ong_1 = require("./ong");
var doadorEmpresaFatura_1 = require("./doadorEmpresaFatura");
var Empresa = /** @class */ (function (_super) {
    __extends(Empresa, _super);
    function Empresa(obj) {
        var _this = _super.call(this, Empresa.resource, obj) || this;
        _this._doador = new doador_1.Doador();
        _this.initProfile(obj);
        return _this;
    }
    Empresa.prototype.save = function () {
        var _self = this;
        return _super.prototype.save.call(this).then(function (response) {
            _self.initProfile(response);
            return _self;
        });
    };
    Empresa.prototype.initProfile = function (obj) {
        if (obj) {
            if (obj.id) {
                this._vendas = new api.Tastypie.Resource('doador-empresa/venda', { model: Venda, defaults: { empresa_id: obj.id } });
                this._ongs = new api.Tastypie.Resource('doador-empresa/empresa-ong', { model: EmpresaOng, defaults: { empresa_id: obj.id } });
                this._cliente = new api.Tastypie.Resource('doador-empresa/cliente', { model: Cliente, defaults: { empresa_id: obj.id } });
                this._faturas = new api.Tastypie.Resource('doador-empresa-fatura/fatura', { model: doadorEmpresaFatura_1.Fatura, defaults: { empresa_id: obj.id } });
            }
            if (obj.tela_resposta)
                this.tela_resposta = new EmpresaTelaResposta(obj.tela_resposta);
        }
    };
    Object.defineProperty(Empresa.prototype, "doador", {
        get: function () {
            return this._doador;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Empresa.prototype, "vendas", {
        get: function () {
            return this._vendas;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Empresa.prototype, "ongs", {
        get: function () {
            return this._ongs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Empresa.prototype, "clientes", {
        get: function () {
            return this._cliente;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Empresa.prototype, "faturas", {
        get: function () {
            return this._faturas;
        },
        enumerable: true,
        configurable: true
    });
    Empresa.prototype.login = function (username, password, kwargs) {
        var _self = this;
        return this._doador.login(username, password, kwargs).then(function (doador_response) {
            return Empresa.resource.objects.findOne({ doador_id: doador_response.id }).then(function (empresa_resp) {
                if (empresa_resp.id) {
                    _self.setData(empresa_resp);
                    _self.initProfile(empresa_resp);
                }
                return _self;
            });
        });
    };
    Empresa.prototype.quickLogin = function (auth, kwargs) {
        var _self = this;
        return this._doador.quickLogin(auth, kwargs).then(function (doador_response) {
            return Empresa.resource.objects.findOne({ doador_id: doador_response.id }).then(function (empresa_resp) {
                if (empresa_resp.id) {
                    _self.setData(empresa_resp);
                    _self.initProfile(empresa_resp);
                }
                return _self;
            });
        });
    };
    Empresa.resource = new api.Tastypie.Resource('doador-empresa/profile', { model: Empresa });
    return Empresa;
}(api.Tastypie.Model));
exports.Empresa = Empresa;
var EmpresaOng = /** @class */ (function (_super) {
    __extends(EmpresaOng, _super);
    function EmpresaOng(obj, _resource) {
        var _this = _super.call(this, _resource || EmpresaOng.resource, obj) || this;
        if (obj) {
            if (obj.ong)
                _this.ong = new ong_1.Ong(obj.ong);
        }
        return _this;
    }
    EmpresaOng.resource = new api.Tastypie.Resource('doador-empresa/empresa-ong', { model: EmpresaOng });
    return EmpresaOng;
}(api.Tastypie.Model));
exports.EmpresaOng = EmpresaOng;
var EmpresaOngPublic = /** @class */ (function (_super) {
    __extends(EmpresaOngPublic, _super);
    function EmpresaOngPublic(obj, _resource) {
        var _this = _super.call(this, _resource || EmpresaOng.resource, obj) || this;
        if (obj) {
            if (obj.ong)
                _this.ong = new ong_1.Ong(obj.ong);
        }
        return _this;
    }
    EmpresaOngPublic.resource = new api.Tastypie.Resource('doador-empresa/empresa-ong-public', { model: EmpresaOng });
    return EmpresaOngPublic;
}(api.Tastypie.Model));
exports.EmpresaOngPublic = EmpresaOngPublic;
var ClienteOng = /** @class */ (function (_super) {
    __extends(ClienteOng, _super);
    function ClienteOng(obj) {
        var _this = _super.call(this, ClienteOng.resource, obj) || this;
        if (obj) {
            if (obj.ong)
                _this.ong = new ong_1.Ong(obj.ong);
        }
        return _this;
    }
    ClienteOng.resource = new api.Tastypie.Resource('doador-empresa/cliente-ong', { model: ClienteOng });
    return ClienteOng;
}(api.Tastypie.Model));
exports.ClienteOng = ClienteOng;
var Cliente = /** @class */ (function (_super) {
    __extends(Cliente, _super);
    function Cliente(obj, _resource) {
        var _this = _super.call(this, _resource || Cliente.resource, obj) || this;
        _this.initProfile(obj);
        return _this;
    }
    Cliente.prototype.initProfile = function (obj) {
        if (obj) {
            this._cliente_key = obj.cliente_key;
            this._status_compras = obj.status_compras;
            this._ongs = new api.Tastypie.Resource('doador-empresa/cliente-ong', { model: ClienteOng, defaults: { cliente_id: obj.id, cliente_key: obj.cliente_key } });
            this._compras = new api.Tastypie.Resource('doador-empresa/venda', { model: Venda, defaults: { cliente_id: obj.id, empresa_id: obj.empresa_id } });
            this._doacoes = new api.Tastypie.Resource('doador-empresa-fatura/fatura-distribuicao', { model: doadorEmpresaFatura_1.FaturaDistribuicao, defaults: { cliente_id: obj.id } });
        }
    };
    Cliente.prototype.save = function () {
        var _self = this;
        return _super.prototype.save.call(this).then(function (data) {
            _self.setData(data);
            _self.initProfile(data);
            return _self;
        });
    };
    Object.defineProperty(Cliente.prototype, "cliente_key", {
        get: function () {
            return this._cliente_key;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cliente.prototype, "status_compras", {
        get: function () {
            return this._status_compras;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cliente.prototype, "ongs", {
        get: function () {
            return this._ongs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cliente.prototype, "compras", {
        get: function () {
            return this._compras;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cliente.prototype, "doacoes", {
        get: function () {
            return this._doacoes;
        },
        enumerable: true,
        configurable: true
    });
    Cliente.resource = new api.Tastypie.Resource('doador-empresa/cliente', { model: Cliente });
    return Cliente;
}(api.Tastypie.Model));
exports.Cliente = Cliente;
var Venda = /** @class */ (function (_super) {
    __extends(Venda, _super);
    function Venda(obj, _resource) {
        var _this = _super.call(this, _resource || Venda.resource, obj) || this;
        if (obj) {
            if (obj.empresa)
                _this.empresa = new Empresa(obj.empresa);
            if (obj.cliente) {
                _this.cliente = new Cliente(obj.cliente);
                _this.ongs = new api.Tastypie.Resource('doador-empresa/cliente-venda-ong', { model: ClienteVendaOng, defaults: { cliente_id: _this.cliente.id, cliente_key: _this.cliente.cliente_key, venda_id: _this.id } });
            }
        }
        return _this;
    }
    Venda.resource = new api.Tastypie.Resource('doador-empresa/venda', { model: Venda });
    return Venda;
}(api.Tastypie.Model));
exports.Venda = Venda;
var ClienteVendaOng = /** @class */ (function (_super) {
    __extends(ClienteVendaOng, _super);
    function ClienteVendaOng(obj) {
        var _this = _super.call(this, ClienteVendaOng.resource, obj) || this;
        if (obj) {
            if (obj.ong)
                _this.ong = new ong_1.Ong(obj.ong);
        }
        return _this;
    }
    ClienteVendaOng.resource = new api.Tastypie.Resource('doador-empresa/cliente-venda-ong', { model: ClienteVendaOng });
    return ClienteVendaOng;
}(api.Tastypie.Model));
exports.ClienteVendaOng = ClienteVendaOng;
var EmpresaTelaResposta = /** @class */ (function (_super) {
    __extends(EmpresaTelaResposta, _super);
    function EmpresaTelaResposta(obj) {
        return _super.call(this, EmpresaTelaResposta.resource, obj) || this;
    }
    EmpresaTelaResposta.resource = new api.Tastypie.Resource('doador-empresa/empresa-tela-resposta', { model: EmpresaTelaResposta });
    return EmpresaTelaResposta;
}(api.Tastypie.Model));
exports.EmpresaTelaResposta = EmpresaTelaResposta;
var ClienteTelaResposta = /** @class */ (function (_super) {
    __extends(ClienteTelaResposta, _super);
    function ClienteTelaResposta(obj) {
        return _super.call(this, obj, ClienteTelaResposta.resource) || this;
    }
    ClienteTelaResposta.resource = new api.Tastypie.Resource('doador-empresa/cliente-tela-resposta', { model: ClienteTelaResposta });
    return ClienteTelaResposta;
}(Venda));
exports.ClienteTelaResposta = ClienteTelaResposta;
var EmpresaOngTelaResposta = /** @class */ (function (_super) {
    __extends(EmpresaOngTelaResposta, _super);
    function EmpresaOngTelaResposta(obj) {
        return _super.call(this, obj, EmpresaOngTelaResposta.resource) || this;
    }
    EmpresaOngTelaResposta.resource = new api.Tastypie.Resource('doador-empresa/empresa-ong-tela-resposta', { model: EmpresaOngTelaResposta });
    return EmpresaOngTelaResposta;
}(EmpresaOng));
exports.EmpresaOngTelaResposta = EmpresaOngTelaResposta;
//# sourceMappingURL=doadorEmpresa.js.map