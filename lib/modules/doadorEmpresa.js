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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var api = require("ts-resource-tastypie");
var doador_1 = require("./doador");
var ong_1 = require("./ong");
var doadorEmpresaFatura_1 = require("./doadorEmpresaFatura");
var utils_1 = require("./utils");
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
                this._modulos = new api.Tastypie.Resource('doador-empresa/modulo-ativo', { model: EmpresaModuloAtivo, defaults: { empresa_id: obj.id } });
                this._modulos.objects.find();
            }
            if (obj.tela_resposta)
                this.tela_resposta = new EmpresaTelaResposta(obj.tela_resposta);
            if (obj.profile_detail) {
                obj.profile_detail = __assign({}, obj.profile_detail, { empresa_id: obj.id ? obj.id : null });
                this.profile_detail = new EmpresaDetail(obj.profile_detail);
            }
            else {
                this.profile_detail = new EmpresaDetail(obj.id ? { empresa_id: obj.id } : {});
            }
            if (obj.endereco) {
                obj.endereco = __assign({}, obj.endereco, { empresa_id: obj.id ? obj.id : null });
                this.endereco = new EmpresaEndereco(obj.endereco);
            }
            else {
                this.endereco = new EmpresaEndereco(obj.id ? { empresa_id: obj.id } : {});
            }
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
    Object.defineProperty(Empresa.prototype, "modulos", {
        get: function () {
            return this._modulos;
        },
        enumerable: true,
        configurable: true
    });
    Empresa.prototype.getEndereco = function () {
        var _self = this;
        if (_self.id) {
            return EmpresaEndereco.resource.objects.findOne({ empresa_id: _self.id }).then(function (data) {
                _self.endereco = data;
                return data;
            });
        }
        else {
            return api.Tastypie.Tools.generate_exception("[Empresa][getEndereco] Empresa não identificada.");
        }
    };
    Empresa.prototype.createAccount = function (nome, email, cpf_cnpj, kwargs) {
        var _self = this;
        return this._doador.createAccountDoadorEmpresa(nome, email, cpf_cnpj, kwargs).then(function (doador_response) {
            return Empresa.resource.objects.findOne({ doador_id: doador_response.id }).then(function (empresa_resp) {
                if (empresa_resp.id) {
                    _self.setData(empresa_resp);
                    _self.initProfile(empresa_resp);
                }
                return _self;
            }).catch(function () {
                return _self;
            });
        });
    };
    Empresa.prototype.login = function (username, password, kwargs) {
        var _self = this;
        return this._doador.login(username, password, kwargs).then(function (doador_response) {
            return Empresa.resource.objects.findOne({ doador_id: doador_response.id }).then(function (empresa_resp) {
                if (empresa_resp.id) {
                    _self.setData(empresa_resp);
                    _self.initProfile(empresa_resp);
                }
                return _self;
            }).catch(function () {
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
            }).catch(function () {
                return _self;
            });
        });
    };
    Empresa.resource = new api.Tastypie.Resource('doador-empresa/profile', { model: Empresa });
    return Empresa;
}(api.Tastypie.Model));
exports.Empresa = Empresa;
var EmpresaDetail = /** @class */ (function (_super) {
    __extends(EmpresaDetail, _super);
    function EmpresaDetail(obj) {
        var _this = _super.call(this, EmpresaDetail.resource, obj) || this;
        if (!obj) {
            _this.telefone = "";
            _this.qtde_venda_mes = 0;
            _this.ticket_medio = 0;
        }
        return _this;
    }
    EmpresaDetail.resource = new api.Tastypie.Resource('doador-empresa/detail', { model: EmpresaDetail });
    return EmpresaDetail;
}(api.Tastypie.Model));
exports.EmpresaDetail = EmpresaDetail;
var EmpresaEndereco = /** @class */ (function (_super) {
    __extends(EmpresaEndereco, _super);
    function EmpresaEndereco(obj) {
        return _super.call(this, EmpresaEndereco.resource, obj) || this;
    }
    EmpresaEndereco.resource = new api.Tastypie.Resource('doador-empresa/endereco', { model: EmpresaEndereco });
    return EmpresaEndereco;
}(api.Tastypie.Model));
exports.EmpresaEndereco = EmpresaEndereco;
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
            this._ongs = new api.Tastypie.Resource('doador-empresa/cliente-ong', { model: ClienteOng, defaults: { cliente_id: obj.id, cliente_key: obj.cliente_key } });
            this._compras = new api.Tastypie.Resource('doador-empresa/venda', { model: Venda, defaults: { cliente_id: obj.id, empresa_id: obj.empresa_id } });
            this._doacoes = new api.Tastypie.Resource('doador-empresa-fatura/fatura-distribuicao', { model: doadorEmpresaFatura_1.FaturaDistribuicao, defaults: { cliente_id: obj.id } });
        }
    };
    Cliente.prototype.save = function () {
        var _self = this;
        return _super.prototype.save.call(this).then(function (data) {
            _self.initProfile(data);
            return _self;
        });
    };
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
                _this._ongs = new api.Tastypie.Resource('doador-empresa/cliente-venda-ong', { model: ClienteVendaOng, defaults: { cliente_id: _this.cliente.id, cliente_key: _this.cliente.cliente_key, venda_id: _this.id } });
            }
            if (obj.modulo)
                _this.modulo = new EmpresaModulo(obj.modulo);
            if (obj.plataforma)
                _this.plataforma = new EmpresaModuloPlataforma(obj.plataforma);
        }
        return _this;
    }
    Object.defineProperty(Venda.prototype, "ongs", {
        get: function () {
            return this._ongs;
        },
        enumerable: true,
        configurable: true
    });
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
var VendaAnalytics = /** @class */ (function (_super) {
    __extends(VendaAnalytics, _super);
    function VendaAnalytics(obj) {
        return _super.call(this, VendaAnalytics.resource, obj) || this;
    }
    VendaAnalytics.resource = new api.Tastypie.Resource('doador-empresa/venda/analytics', { model: VendaAnalytics });
    return VendaAnalytics;
}(api.Tastypie.Model));
exports.VendaAnalytics = VendaAnalytics;
var WidgetIconChoices = /** @class */ (function (_super) {
    __extends(WidgetIconChoices, _super);
    function WidgetIconChoices(obj) {
        return _super.call(this, WidgetIconChoices.resource, obj) || this;
    }
    WidgetIconChoices.resource = new api.Tastypie.Resource('doador-empresa/widget-icon-choices', { model: WidgetIconChoices });
    return WidgetIconChoices;
}(api.Tastypie.Model));
exports.WidgetIconChoices = WidgetIconChoices;
var EmpresaWidget = /** @class */ (function (_super) {
    __extends(EmpresaWidget, _super);
    function EmpresaWidget(obj, resource) {
        return _super.call(this, resource, obj) || this;
    }
    return EmpresaWidget;
}(api.Tastypie.Model));
exports.EmpresaWidget = EmpresaWidget;
var EmpresaVtex = /** @class */ (function (_super) {
    __extends(EmpresaVtex, _super);
    function EmpresaVtex(obj) {
        return _super.call(this, obj, EmpresaVtex.resource) || this;
    }
    EmpresaVtex.resource = new api.Tastypie.Resource('doador-empresa/vtex', { model: EmpresaVtex });
    return EmpresaVtex;
}(EmpresaWidget));
exports.EmpresaVtex = EmpresaVtex;
var EmpresaVnda = /** @class */ (function (_super) {
    __extends(EmpresaVnda, _super);
    function EmpresaVnda(obj) {
        return _super.call(this, obj, EmpresaVnda.resource) || this;
    }
    EmpresaVnda.resource = new api.Tastypie.Resource('doador-empresa/vnda', { model: EmpresaVnda });
    return EmpresaVnda;
}(EmpresaWidget));
exports.EmpresaVnda = EmpresaVnda;
var EmpresaLojaintegrada = /** @class */ (function (_super) {
    __extends(EmpresaLojaintegrada, _super);
    function EmpresaLojaintegrada(obj) {
        return _super.call(this, obj, EmpresaLojaintegrada.resource) || this;
    }
    EmpresaLojaintegrada.resource = new api.Tastypie.Resource('doador-empresa/loja-integrada', { model: EmpresaLojaintegrada });
    return EmpresaLojaintegrada;
}(EmpresaWidget));
exports.EmpresaLojaintegrada = EmpresaLojaintegrada;
var EmpresaShopify = /** @class */ (function (_super) {
    __extends(EmpresaShopify, _super);
    function EmpresaShopify(obj) {
        return _super.call(this, obj, EmpresaShopify.resource) || this;
    }
    EmpresaShopify.resource = new api.Tastypie.Resource('doador-empresa/shopify', { model: EmpresaShopify });
    return EmpresaShopify;
}(EmpresaWidget));
exports.EmpresaShopify = EmpresaShopify;
var EmpresaBigcommerce = /** @class */ (function (_super) {
    __extends(EmpresaBigcommerce, _super);
    function EmpresaBigcommerce(obj) {
        return _super.call(this, obj, EmpresaBigcommerce.resource) || this;
    }
    EmpresaBigcommerce.resource = new api.Tastypie.Resource('doador-empresa/bigcommerce', { model: EmpresaBigcommerce });
    return EmpresaBigcommerce;
}(EmpresaWidget));
exports.EmpresaBigcommerce = EmpresaBigcommerce;
var EmpresaVolusion = /** @class */ (function (_super) {
    __extends(EmpresaVolusion, _super);
    function EmpresaVolusion(obj) {
        return _super.call(this, obj, EmpresaVolusion.resource) || this;
    }
    EmpresaVolusion.resource = new api.Tastypie.Resource('doador-empresa/volusion', { model: EmpresaVolusion });
    return EmpresaVolusion;
}(EmpresaWidget));
exports.EmpresaVolusion = EmpresaVolusion;
var Empresa3dCart = /** @class */ (function (_super) {
    __extends(Empresa3dCart, _super);
    function Empresa3dCart(obj) {
        return _super.call(this, obj, Empresa3dCart.resource) || this;
    }
    Empresa3dCart.resource = new api.Tastypie.Resource('doador-empresa/3dcart', { model: Empresa3dCart });
    return Empresa3dCart;
}(EmpresaWidget));
exports.Empresa3dCart = Empresa3dCart;
var EmpresaXtech = /** @class */ (function (_super) {
    __extends(EmpresaXtech, _super);
    function EmpresaXtech(obj) {
        return _super.call(this, obj, EmpresaXtech.resource) || this;
    }
    EmpresaXtech.resource = new api.Tastypie.Resource('doador-empresa/xtech', { model: EmpresaXtech });
    return EmpresaXtech;
}(EmpresaWidget));
exports.EmpresaXtech = EmpresaXtech;
var EmpresaNuvemShop = /** @class */ (function (_super) {
    __extends(EmpresaNuvemShop, _super);
    function EmpresaNuvemShop(obj) {
        return _super.call(this, obj, EmpresaNuvemShop.resource) || this;
    }
    EmpresaNuvemShop.resource = new api.Tastypie.Resource('doador-empresa/nuvemshop', { model: EmpresaNuvemShop });
    return EmpresaNuvemShop;
}(EmpresaWidget));
exports.EmpresaNuvemShop = EmpresaNuvemShop;
var EmpresaMercadoShops = /** @class */ (function (_super) {
    __extends(EmpresaMercadoShops, _super);
    function EmpresaMercadoShops(obj) {
        return _super.call(this, obj, EmpresaMercadoShops.resource) || this;
    }
    EmpresaMercadoShops.resource = new api.Tastypie.Resource('doador-empresa/mercadoshops', { model: EmpresaMercadoShops });
    return EmpresaMercadoShops;
}(EmpresaWidget));
exports.EmpresaMercadoShops = EmpresaMercadoShops;
var EmpresaIluria = /** @class */ (function (_super) {
    __extends(EmpresaIluria, _super);
    function EmpresaIluria(obj) {
        return _super.call(this, obj, EmpresaIluria.resource) || this;
    }
    EmpresaIluria.resource = new api.Tastypie.Resource('doador-empresa/iluria', { model: EmpresaIluria });
    return EmpresaIluria;
}(EmpresaWidget));
exports.EmpresaIluria = EmpresaIluria;
var EmpresaPrestaShop = /** @class */ (function (_super) {
    __extends(EmpresaPrestaShop, _super);
    function EmpresaPrestaShop(obj) {
        return _super.call(this, obj, EmpresaPrestaShop.resource) || this;
    }
    EmpresaPrestaShop.resource = new api.Tastypie.Resource('doador-empresa/prestashop', { model: EmpresaPrestaShop });
    return EmpresaPrestaShop;
}(EmpresaWidget));
exports.EmpresaPrestaShop = EmpresaPrestaShop;
var EmpresaMagento = /** @class */ (function (_super) {
    __extends(EmpresaMagento, _super);
    function EmpresaMagento(obj) {
        return _super.call(this, obj, EmpresaMagento.resource) || this;
    }
    EmpresaMagento.resource = new api.Tastypie.Resource('doador-empresa/magento', { model: EmpresaMagento });
    return EmpresaMagento;
}(EmpresaWidget));
exports.EmpresaMagento = EmpresaMagento;
var EmpresaVirtueMart = /** @class */ (function (_super) {
    __extends(EmpresaVirtueMart, _super);
    function EmpresaVirtueMart(obj) {
        return _super.call(this, obj, EmpresaVirtueMart.resource) || this;
    }
    EmpresaVirtueMart.resource = new api.Tastypie.Resource('doador-empresa/virtuemart', { model: EmpresaVirtueMart });
    return EmpresaVirtueMart;
}(EmpresaWidget));
exports.EmpresaVirtueMart = EmpresaVirtueMart;
var EmpresaOpenCart = /** @class */ (function (_super) {
    __extends(EmpresaOpenCart, _super);
    function EmpresaOpenCart(obj) {
        return _super.call(this, obj, EmpresaOpenCart.resource) || this;
    }
    EmpresaOpenCart.resource = new api.Tastypie.Resource('doador-empresa/opencart', { model: EmpresaOpenCart });
    return EmpresaOpenCart;
}(EmpresaWidget));
exports.EmpresaOpenCart = EmpresaOpenCart;
var EmpresaSignaShop = /** @class */ (function (_super) {
    __extends(EmpresaSignaShop, _super);
    function EmpresaSignaShop(obj) {
        return _super.call(this, obj, EmpresaSignaShop.resource) || this;
    }
    EmpresaSignaShop.resource = new api.Tastypie.Resource('doador-empresa/signashop', { model: EmpresaSignaShop });
    return EmpresaSignaShop;
}(EmpresaWidget));
exports.EmpresaSignaShop = EmpresaSignaShop;
var EmpresaModuloPlataforma = /** @class */ (function () {
    function EmpresaModuloPlataforma(obj) {
        if (obj) {
            this.nome = obj.nome;
            this.logo = obj.logo;
            this.token = obj.token;
            this.dt_created = obj.dt_created;
        }
    }
    return EmpresaModuloPlataforma;
}());
exports.EmpresaModuloPlataforma = EmpresaModuloPlataforma;
var EmpresaModulo = /** @class */ (function (_super) {
    __extends(EmpresaModulo, _super);
    function EmpresaModulo(obj) {
        var _this = _super.call(this, EmpresaModulo.resource, obj) || this;
        _this.plataformas = [];
        if (obj) {
            if (obj.plataformas) {
                for (var _i = 0, _a = obj.plataformas; _i < _a.length; _i++) {
                    var plat = _a[_i];
                    _this.plataformas.push(new EmpresaModuloPlataforma(plat));
                }
            }
        }
        return _this;
    }
    EmpresaModulo.resource = new api.Tastypie.Resource('doador-empresa/modulo', { model: EmpresaModulo });
    return EmpresaModulo;
}(api.Tastypie.Model));
exports.EmpresaModulo = EmpresaModulo;
var EmpresaModuloAtivo = /** @class */ (function (_super) {
    __extends(EmpresaModuloAtivo, _super);
    function EmpresaModuloAtivo(obj) {
        var _this = _super.call(this, EmpresaModuloAtivo.resource, obj) || this;
        _this.plataforma_config = [];
        if (obj) {
            if (obj.modulo) {
                _this.modulo = new EmpresaModulo(obj.modulo);
            }
            if (obj.plataforma_config) {
                for (var _i = 0, _a = obj.plataforma_config; _i < _a.length; _i++) {
                    var conf = _a[_i];
                    var conf_obj = void 0;
                    if (_this.modulo.token == 'ecommerce') {
                        if (conf.plataforma.token == 'vtex') {
                            conf_obj = new EmpresaVtex(conf.config);
                        }
                        else if (conf.plataforma.token == 'vnda') {
                            conf_obj = new EmpresaVnda(conf.config);
                        }
                        else if (conf.plataforma.token == 'lojaintegrada') {
                            conf_obj = new EmpresaLojaintegrada(conf.config);
                        }
                        else if (conf.plataforma.token == 'shopify') {
                            conf_obj = new EmpresaShopify(conf.config);
                        }
                        else if (conf.plataforma.token == 'bigcommerce') {
                            conf_obj = new EmpresaBigcommerce(conf.config);
                        }
                        else if (conf.plataforma.token == 'volusion') {
                            conf_obj = new EmpresaVolusion(conf.config);
                        }
                        else if (conf.plataforma.token == '3dCart') {
                            conf_obj = new Empresa3dCart(conf.config);
                        }
                        else if (conf.plataforma.token == 'xtech') {
                            conf_obj = new EmpresaXtech(conf.config);
                        }
                        else if (conf.plataforma.token == 'nuvemshop') {
                            conf_obj = new EmpresaNuvemShop(conf.config);
                        }
                        else if (conf.plataforma.token == 'mercadoshops') {
                            conf_obj = new EmpresaMercadoShops(conf.config);
                        }
                        else if (conf.plataforma.token == 'iluria') {
                            conf_obj = new EmpresaIluria(conf.config);
                        }
                        else if (conf.plataforma.token == 'prestashop') {
                            conf_obj = new EmpresaPrestaShop(conf.config);
                        }
                        else if (conf.plataforma.token == 'magento') {
                            conf_obj = new EmpresaMagento(conf.config);
                        }
                        else if (conf.plataforma.token == 'virtuemart') {
                            conf_obj = new EmpresaVirtueMart(conf.config);
                        }
                        else if (conf.plataforma.token == 'opencart') {
                            conf_obj = new EmpresaOpenCart(conf.config);
                        }
                        else if (conf.plataforma.token == 'signashop') {
                            conf_obj = new EmpresaSignaShop(conf.config);
                        }
                        else {
                            conf_obj = conf.config;
                        }
                    }
                    else if (_this.modulo.token == 'pdv') {
                        if (conf.plataforma.token == 'welight') {
                            conf_obj = new EmpresaPdv(conf.config);
                        }
                    }
                    _this.plataforma_config.push({
                        'plataforma': new EmpresaModuloPlataforma(conf.plataforma),
                        'config': conf_obj
                    });
                }
            }
        }
        return _this;
    }
    EmpresaModuloAtivo.resource = new api.Tastypie.Resource('doador-empresa/modulo-ativo', { model: EmpresaModuloAtivo });
    return EmpresaModuloAtivo;
}(api.Tastypie.Model));
exports.EmpresaModuloAtivo = EmpresaModuloAtivo;
var EmpresaPdv = /** @class */ (function (_super) {
    __extends(EmpresaPdv, _super);
    function EmpresaPdv(obj) {
        var _this = _super.call(this, EmpresaPdv.resource, obj) || this;
        if (obj) {
            if (obj.titulo_ui)
                _this.titulo_ui = new utils_1.StyleUi(obj.titulo_ui);
            if (obj.formulario_ui)
                _this.formulario_ui = new utils_1.StyleUi(obj.formulario_ui);
            if (obj.botao_ui)
                _this.botao_ui = new utils_1.StyleUi(obj.botao_ui);
            if (obj.subtitulo_ui)
                _this.subtitulo_ui = new utils_1.StyleUi(obj.subtitulo_ui);
            if (obj.pagina_img_logo_ui)
                _this.pagina_img_logo_ui = new utils_1.StyleUi(obj.pagina_img_logo_ui);
        }
        return _this;
    }
    EmpresaPdv.resource = new api.Tastypie.Resource('doador-empresa/pdv', { model: EmpresaPdv });
    return EmpresaPdv;
}(api.Tastypie.Model));
exports.EmpresaPdv = EmpresaPdv;
//# sourceMappingURL=doadorEmpresa.js.map