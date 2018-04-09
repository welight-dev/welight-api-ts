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
var weauth_models = require("./weAuth");
var onu_1 = require("./onu");
var Ong = /** @class */ (function (_super) {
    __extends(Ong, _super);
    function Ong(obj) {
        var _this = _super.call(this, Ong.resource) || this;
        _this._user = new weauth_models.User();
        _this.initProfile(obj);
        return _this;
    }
    Ong.prototype.save = function () {
        var _self = this;
        return Ong.resource.objects.update(_self.id, {
            nome: _self.nome,
            email: _self.email,
            razao_social: _self.razao_social,
            cnpj: _self.cnpj,
            slug: _self.slug
        }).then(function (data) {
            _self.initProfile(data);
            return _self;
        });
    };
    Ong.prototype.initProfile = function (obj) {
        var _self = this;
        if (obj) {
            _self.id = obj.id;
            _self.nome = obj.nome;
            _self.email = obj.email;
            _self.razao_social = obj.razao_social;
            _self.cnpj = obj.cnpj;
            _self.slug = obj.slug;
            _self._ativo = obj.ativo;
            _self._parceira = obj.parceira;
            _self._qtde_pontos = obj.qtde_pontos;
            _self._qtde_doadores = obj.qtde_doadores;
            _self._dt_updated = obj.dt_updated;
            _self._dt_created = obj.dt_created;
            if (obj.profile_detail)
                _self._profile_detail = new OngDetail(obj.profile_detail);
            if (_self.id) {
                _self._timeline = new api.Tastypie.Resource('ong/timeline', { model: OngTimeLine, defaults: { ong_id: _self.id } });
                _self._fotos = new api.Tastypie.Resource('ong/timeline', { model: OngTimeLine, defaults: { ong_id: _self.id, tipo: 'fotos' } });
                _self._videos = new api.Tastypie.Resource('ong/timeline', { model: OngTimeLine, defaults: { ong_id: _self.id, tipo: 'videos' } });
                _self._projetos = new api.Tastypie.Resource('ong/projeto', { model: OngProjeto, defaults: { ong_id: _self.id } });
                _self._bancos = new api.Tastypie.Resource('ong/banco', { model: OngBanco, defaults: { ong_id: _self.id } });
            }
        }
        else {
            _self._profile_detail = new OngDetail();
        }
    };
    Object.defineProperty(Ong.prototype, "ativo", {
        get: function () {
            return this._ativo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ong.prototype, "parceira", {
        get: function () {
            return this._parceira;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ong.prototype, "qtde_pontos", {
        get: function () {
            return this._qtde_pontos;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ong.prototype, "qtde_doadores", {
        get: function () {
            return this._qtde_doadores;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ong.prototype, "profile_detail", {
        get: function () {
            return this._profile_detail;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ong.prototype, "dt_updated", {
        get: function () {
            return this._dt_updated;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ong.prototype, "dt_created", {
        get: function () {
            return this._dt_created;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ong.prototype, "timeline", {
        get: function () {
            return this._timeline;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ong.prototype, "fotos", {
        get: function () {
            return this._fotos;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ong.prototype, "videos", {
        get: function () {
            return this._videos;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ong.prototype, "user", {
        get: function () {
            return this._user;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ong.prototype, "projetos", {
        get: function () {
            return this._projetos;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ong.prototype, "bancos", {
        get: function () {
            return this._bancos;
        },
        enumerable: true,
        configurable: true
    });
    Ong.prototype.getEndereco = function () {
        if (this.id) {
            return OngEndereco.resource.objects.findOne({ ong_id: this.id });
        }
        else {
            return api.Tastypie.Tools.generate_exception("[Ong][getEndereco] Ong não identificada");
        }
    };
    Ong.prototype.createAccount = function (nome, email, razao_social, cnpj, kwargs) {
        var _self = this;
        return this._user.createAccountOng(nome, email, razao_social, cnpj, kwargs).then(function (user) {
            var user_app = user.getUserAppAdmin('ong');
            return Ong.resource.objects.get(user_app.app_profile_id).then(function (data) {
                _self.initProfile(data);
                return _self;
            });
        });
    };
    Ong.prototype.quickLogin = function (auth, kwargs) {
        var _self = this;
        return this._user.quickLogin(auth, kwargs).then(function (user) {
            var user_app = user.current_user_app;
            if (!user_app) {
                user_app = user.getUserAppAdmin('ong');
            }
            if (!user_app) {
                _self._user = new weauth_models.User();
                return api.Tastypie.Tools.generate_exception("[Ong][quickLogin] Usuario não identificado");
            }
            _self._user.current_user_app = user_app;
            return Ong.resource.objects.get(user_app.app_profile_id).then(function (data) {
                _self.initProfile(data);
                return _self;
            });
        });
    };
    Ong.resource = new api.Tastypie.Resource('ong/profile', { model: Ong });
    return Ong;
}(api.Tastypie.Model));
exports.Ong = Ong;
var OngDetail = /** @class */ (function (_super) {
    __extends(OngDetail, _super);
    function OngDetail(obj) {
        return _super.call(this, OngDetail.resource, obj) || this;
    }
    OngDetail.resource = new api.Tastypie.Resource('ong/profile/<id>/detail', { model: OngDetail });
    return OngDetail;
}(api.Tastypie.Model));
exports.OngDetail = OngDetail;
var OngEndereco = /** @class */ (function (_super) {
    __extends(OngEndereco, _super);
    function OngEndereco(obj) {
        return _super.call(this, OngEndereco.resource, obj) || this;
    }
    OngEndereco.resource = new api.Tastypie.Resource('ong/endereco', { model: OngEndereco });
    return OngEndereco;
}(api.Tastypie.Model));
exports.OngEndereco = OngEndereco;
var OngBanco = /** @class */ (function (_super) {
    __extends(OngBanco, _super);
    function OngBanco(obj) {
        return _super.call(this, OngBanco.resource, obj) || this;
    }
    OngBanco.resource = new api.Tastypie.Resource('ong/banco', { model: OngBanco });
    return OngBanco;
}(api.Tastypie.Model));
exports.OngBanco = OngBanco;
var OngTimeLine = /** @class */ (function (_super) {
    __extends(OngTimeLine, _super);
    function OngTimeLine(obj) {
        var _this = _super.call(this, OngTimeLine.resource, obj) || this;
        var _self = _this;
        if (_self.ong)
            _self.ong = new Ong(_self.ong);
        return _this;
    }
    OngTimeLine.resource = new api.Tastypie.Resource('ong/timeline', { model: OngTimeLine });
    return OngTimeLine;
}(api.Tastypie.Model));
exports.OngTimeLine = OngTimeLine;
var OngProjeto = /** @class */ (function (_super) {
    __extends(OngProjeto, _super);
    function OngProjeto(obj) {
        var _this = _super.call(this, OngProjeto.resource, obj) || this;
        if (_this.id) {
            _this._endereco = new api.Tastypie.Resource('ong/projeto-endereco', { model: OngProjetoEndereco, defaults: { ong_projeto_id: _this.id } });
            _this._ods = new api.Tastypie.Resource('ong/projeto-ods', { model: OngProjetoOds, defaults: { ong_projeto_id: _this.id } });
            _this._indicadores = new api.Tastypie.Resource('ong/projeto-indicador', { model: OngProjetoIndicador, defaults: { ong_projeto_id: _this.id } });
        }
        return _this;
    }
    OngProjeto.prototype.getSobre = function () {
        return OngProjetoSobre.resource.objects.findOne({ ong_projeto_id: this.id });
    };
    Object.defineProperty(OngProjeto.prototype, "endereco", {
        get: function () {
            return this._endereco;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OngProjeto.prototype, "ods", {
        get: function () {
            return this._ods;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OngProjeto.prototype, "indicadores", {
        get: function () {
            return this._indicadores;
        },
        enumerable: true,
        configurable: true
    });
    OngProjeto.resource = new api.Tastypie.Resource('ong/projeto', { model: OngProjeto });
    return OngProjeto;
}(api.Tastypie.Model));
exports.OngProjeto = OngProjeto;
var OngProjetoSobre = /** @class */ (function (_super) {
    __extends(OngProjetoSobre, _super);
    function OngProjetoSobre(obj) {
        return _super.call(this, OngProjetoSobre.resource, obj) || this;
    }
    OngProjetoSobre.resource = new api.Tastypie.Resource('ong/projeto-sobre', { model: OngProjetoSobre });
    return OngProjetoSobre;
}(api.Tastypie.Model));
exports.OngProjetoSobre = OngProjetoSobre;
var OngProjetoEndereco = /** @class */ (function (_super) {
    __extends(OngProjetoEndereco, _super);
    function OngProjetoEndereco(obj) {
        return _super.call(this, OngProjetoEndereco.resource, obj) || this;
    }
    OngProjetoEndereco.resource = new api.Tastypie.Resource('ong/projeto-endereco', { model: OngProjetoEndereco });
    return OngProjetoEndereco;
}(api.Tastypie.Model));
exports.OngProjetoEndereco = OngProjetoEndereco;
var OngProjetoOds = /** @class */ (function (_super) {
    __extends(OngProjetoOds, _super);
    function OngProjetoOds(obj) {
        var _this = _super.call(this, OngProjetoOds.resource, obj) || this;
        if (obj) {
            if (obj.ods)
                _this.ods = new onu_1.Ods(obj.ods);
        }
        return _this;
    }
    OngProjetoOds.resource = new api.Tastypie.Resource('ong/projeto-ods', { model: OngProjetoOds });
    return OngProjetoOds;
}(api.Tastypie.Model));
exports.OngProjetoOds = OngProjetoOds;
var Indicador = /** @class */ (function (_super) {
    __extends(Indicador, _super);
    function Indicador(obj) {
        return _super.call(this, Indicador.resource, obj) || this;
    }
    Indicador.resource = new api.Tastypie.Resource('ong/indicador', { model: Indicador });
    return Indicador;
}(api.Tastypie.Model));
exports.Indicador = Indicador;
var IndicadorUnidade = /** @class */ (function (_super) {
    __extends(IndicadorUnidade, _super);
    function IndicadorUnidade(obj) {
        return _super.call(this, IndicadorUnidade.resource, obj) || this;
    }
    IndicadorUnidade.resource = new api.Tastypie.Resource('ong/indicador-unidade', { model: IndicadorUnidade });
    return IndicadorUnidade;
}(api.Tastypie.Model));
exports.IndicadorUnidade = IndicadorUnidade;
var OngProjetoIndicador = /** @class */ (function (_super) {
    __extends(OngProjetoIndicador, _super);
    function OngProjetoIndicador(obj) {
        var _this = _super.call(this, OngProjetoIndicador.resource, obj) || this;
        if (obj) {
            if (obj.indicador_unidade)
                _this.indicador_unidade = new IndicadorUnidade(obj.indicador_unidade);
        }
        return _this;
    }
    OngProjetoIndicador.resource = new api.Tastypie.Resource('ong/projeto-indicador', { model: OngProjetoIndicador });
    return OngProjetoIndicador;
}(api.Tastypie.Model));
exports.OngProjetoIndicador = OngProjetoIndicador;
//# sourceMappingURL=ong.js.map