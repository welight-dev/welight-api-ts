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
var weauth_models = require("./weAuth");
var ong_models = require("./ong");
var onu_models = require("./onu");
var we_notify_models = require("./weNotify");
var Doador = /** @class */ (function (_super) {
    __extends(Doador, _super);
    function Doador(obj) {
        var _this = _super.call(this, Doador.resource) || this;
        _this._set_all_notify_read = new api.Tastypie.Resource('we-notify/doador/set-all-read');
        _this._user = new weauth_models.User();
        _this._doador_logado = new api.Tastypie.Resource('doador/profile/me', { model: Doador });
        _this._check_slug_resource = new api.Tastypie.Resource('doador/profile/check-slug');
        _this.initProfile(obj);
        return _this;
    }
    Doador.prototype.save = function () {
        var _self = this;
        return Doador.resource.objects.update(_self.id, { nome: _self.nome, slug: _self.slug }).then(function (data) {
            _self.nome = data.nome;
            _self.slug = data.slug;
            return _self;
        });
    };
    Doador.prototype.initProfile = function (obj) {
        if (obj) {
            this.id = obj.id;
            this.nome = obj.nome;
            this.slug = obj.slug;
            this.is_avaliador = obj.is_avaliador;
            this.is_empresa = obj.is_empresa;
            this._email = obj.email;
            this._dt_updated = obj.dt_updated;
            this._dt_created = obj.dt_created;
            this._rede = new DoadorRede(obj.id);
            this._ong_timeline = new api.Tastypie.Resource('ong/timeline', { model: ong_models.OngTimeLine, defaults: { doador_id: obj.id } });
            this._doacao_mes = new api.Tastypie.Resource('doador/doacao-mes', { model: DoadorDoacaoMes, defaults: { doador_id: obj.id } });
            this._we_notify = new api.Tastypie.Resource('we-notify/doador', { model: we_notify_models.WeNotifyDoador, defaults: { doador_id: obj.id } });
        }
    };
    Doador.prototype.check_slug = function (slug) {
        return this._check_slug_resource.objects.findOne({ slug: slug });
    };
    Doador.prototype.instalarPluginNavegador = function (navegador) {
        return this._user.instalarPluginNavegador(navegador);
    };
    Object.defineProperty(Doador.prototype, "email", {
        get: function () {
            return this._email;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Doador.prototype, "dt_created", {
        get: function () {
            return this._dt_created;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Doador.prototype, "dt_updated", {
        get: function () {
            return this._dt_updated;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Doador.prototype, "rede", {
        get: function () {
            return this._rede;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Doador.prototype, "ong_timeline", {
        get: function () {
            return this._ong_timeline;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Doador.prototype, "doacao_mes", {
        get: function () {
            return this._doacao_mes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Doador.prototype, "we_notify", {
        get: function () {
            return this._we_notify;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Doador.prototype, "user", {
        get: function () {
            return this._user;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Doador.prototype, "plugin_navegador", {
        get: function () {
            return this._user.plugin_navegador;
        },
        enumerable: true,
        configurable: true
    });
    Doador.prototype.set_all_notify_read = function () {
        return this._set_all_notify_read.objects.create({ set_all_read: true });
    };
    Doador.prototype.notificarPlugin = function () {
        var _self = this;
        return new Promise(function (resolve, reject) {
            _self._user.notificarPlugin();
            resolve(true);
        });
    };
    Doador.prototype.getPontos = function () {
        if (this.id) {
            return DoadorPontos.resource.objects.get(this.id);
        }
        else {
            return api.Tastypie.Tools.generate_exception("[Doador][getPontos] Doador não identificado");
        }
    };
    Doador.prototype.getDoacao = function () {
        if (this.id) {
            return DoadorDoacao.resource.objects.get(this.id);
        }
        else {
            return api.Tastypie.Tools.generate_exception("[Doador][getDoacao] Doador não identificado");
        }
    };
    Doador.prototype.getCompraAfiliadora = function () {
        if (this.id) {
            return DoadorCompraAfiliadoraStatus.resource.objects.get(this.id);
        }
        else {
            return api.Tastypie.Tools.generate_exception("[Doador][getCompraAfiliadora] Doador não identificado");
        }
    };
    Doador.prototype.getAvaliador = function () {
        if (this.id) {
            return DoadorAvaliador.resource.objects.findOne({ doador_id: this.id });
        }
        else {
            return api.Tastypie.Tools.generate_exception("[Doador][getAvaliador] Avaliador não identificado");
        }
    };
    Doador.prototype.getPluginNavegadorLog = function () {
        if (this.id) {
            return DoadorPluginNavegador.resource.objects.findOne({ doador_id: this.id });
        }
        else {
            return api.Tastypie.Tools.generate_exception("[Doador][getPluginNavegadorStatus] Plugin não identificado");
        }
    };
    Doador.prototype.getPreferencia = function () {
        if (this.id) {
            return DoadorPreferencia.resource.objects.findOne({ doador_id: this.id });
        }
        else {
            return api.Tastypie.Tools.generate_exception("[Doador][getPreferencia] Preferencia não identificado");
        }
    };
    Doador.prototype.createAccount = function (name, email, password, kwargs) {
        var _self = this;
        return this._user.createAccount(name, email, password, kwargs).then(function (user) {
            return _self._doador_logado.objects.findOne().then(function (data) {
                _self.initProfile(data);
                return _self;
            });
        });
    };
    Doador.prototype.createAccountDoadorEmpresa = function (nome, email, cpf_cnpj, kwargs) {
        var _self = this;
        return this._user.createAccountDoadorEmpresa(nome, email, cpf_cnpj, kwargs).then(function (user) {
            return _self._doador_logado.objects.findOne().then(function (data) {
                _self.initProfile(data);
                return _self;
            });
        });
    };
    Doador.prototype.login = function (username, password, kwargs) {
        var _self = this;
        return this._user.login(username, password, kwargs).then(function (user) {
            return _self._doador_logado.objects.findOne().then(function (data) {
                _self.initProfile(data);
                return _self;
            });
        });
    };
    Doador.prototype.loginFacebook = function (username, facebook_uid, facebook_access_token, kwargs) {
        var _self = this;
        return this._user.loginFacebook(username, facebook_uid, facebook_access_token, kwargs).then(function (user) {
            return _self._doador_logado.objects.findOne().then(function (data) {
                _self.initProfile(data);
                return _self;
            });
        });
    };
    Doador.prototype.quickLogin = function (auth, kwargs) {
        var _self = this;
        return this._user.quickLogin(auth, kwargs).then(function (user) {
            var user_app = user.current_user_app;
            if (!user_app) {
                user_app = user.getUserAppAdmin('doador');
            }
            if (!user_app) {
                _self._user = new weauth_models.User();
                return api.Tastypie.Tools.generate_exception("[Doador][quickLogin] Usuario não identificado");
            }
            _self._user.current_user_app = user_app;
            return _self._doador_logado.objects.findOne().then(function (data) {
                _self.initProfile(data);
                return _self;
            });
        });
    };
    Doador.prototype.reset_password_request = function (email, kwargs) {
        return this._user.reset_password_request(email, kwargs);
    };
    Doador.prototype.reset_password_execute = function (token, password, kwargs) {
        var _self = this;
        return this._user.reset_password_execute(token, password, kwargs).then(function (user) {
            return _self._doador_logado.objects.findOne().then(function (data) {
                _self.initProfile(data);
                return _self;
            });
        });
    };
    Doador.prototype.change_password = function (username, pass_old, pass_new, kwargs) {
        var _self = this;
        return this._user.change_password(username, pass_old, pass_new, kwargs).then(function (user) {
            return _self._doador_logado.objects.findOne().then(function (data) {
                _self.initProfile(data);
                return _self;
            });
        });
    };
    Doador.resource = new api.Tastypie.Resource('doador/profile', { model: Doador });
    return Doador;
}(api.Tastypie.Model));
exports.Doador = Doador;
var DoadorAvaliador = /** @class */ (function (_super) {
    __extends(DoadorAvaliador, _super);
    function DoadorAvaliador(obj) {
        return _super.call(this, DoadorAvaliador.resource, obj) || this;
    }
    DoadorAvaliador.resource = new api.Tastypie.Resource('doador/avaliador', { model: DoadorAvaliador });
    return DoadorAvaliador;
}(api.Tastypie.Model));
exports.DoadorAvaliador = DoadorAvaliador;
var DoadorPluginNavegador = /** @class */ (function (_super) {
    __extends(DoadorPluginNavegador, _super);
    function DoadorPluginNavegador(obj) {
        return _super.call(this, DoadorPluginNavegador.resource, obj) || this;
    }
    DoadorPluginNavegador.resource = new api.Tastypie.Resource('doador/plugin-navegador', { model: DoadorPluginNavegador });
    return DoadorPluginNavegador;
}(api.Tastypie.Model));
exports.DoadorPluginNavegador = DoadorPluginNavegador;
var DoadorPreferencia = /** @class */ (function (_super) {
    __extends(DoadorPreferencia, _super);
    function DoadorPreferencia(obj) {
        return _super.call(this, DoadorPreferencia.resource, obj) || this;
    }
    DoadorPreferencia.resource = new api.Tastypie.Resource('doador/preferencia', { model: DoadorPreferencia });
    return DoadorPreferencia;
}(api.Tastypie.Model));
exports.DoadorPreferencia = DoadorPreferencia;
var DoadorPontos = /** @class */ (function (_super) {
    __extends(DoadorPontos, _super);
    function DoadorPontos(obj) {
        var _this = _super.call(this, DoadorPontos.resource) || this;
        if (obj) {
            _this._doador_id = obj.doador_id;
            _this._recebidos = obj.recebidos;
            _this._distribuidos = obj.distribuidos;
            _this._disponiveis = obj.disponiveis;
            _this._recebidos_cadastro = obj.recebidos_cadastro;
            _this._recebidos_convite = obj.recebidos_convite;
            _this._recebidos_compra = obj.recebidos_compra;
            _this._recebidos_plugin_installed = obj.recebidos_plugin_installed;
            _this._recebidos_app_installed = obj.recebidos_app_installed;
            _this._recebidos_perfil_completo = obj.recebidos_perfil_completo;
            _this._ong = new api.Tastypie.Resource('doador/doacao-ong', { model: DoadorDoacaoOng, defaults: { doador_id: obj.doador_id } });
            _this._distribuicao_resource = new api.Tastypie.Resource('doador/profile/' + obj.doador_id + '/distribuir-pontos');
        }
        else {
            _this._recebidos = 0;
            _this._distribuidos = 0;
            _this._disponiveis = 0;
            _this._recebidos_cadastro = 0;
            _this._recebidos_convite = 0;
            _this._recebidos_compra = 0;
            _this._recebidos_plugin_installed = 0;
            _this._recebidos_app_installed = 0;
            _this._recebidos_perfil_completo = 0;
        }
        return _this;
    }
    DoadorPontos.prototype.distribuir = function (ong_id, pontos) {
        var _self = this;
        return _self._distribuicao_resource.objects.create({ ong_id: ong_id, pontos: pontos }).then(function (data) {
            if (_self._ong.page.initialized) {
                return _self._ong.page.refresh().then(function () {
                    _self._recebidos = data.recebidos;
                    _self._distribuidos = data.distribuidos;
                    _self._disponiveis = data.disponiveis;
                    return _self;
                });
            }
            else {
                _self._recebidos = data.recebidos;
                _self._distribuidos = data.distribuidos;
                _self._disponiveis = data.disponiveis;
                return _self;
            }
        });
    };
    Object.defineProperty(DoadorPontos.prototype, "doador_id", {
        get: function () {
            return this._doador_id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoadorPontos.prototype, "recebidos", {
        get: function () {
            return this._recebidos;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoadorPontos.prototype, "distribuidos", {
        get: function () {
            return this._distribuidos;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoadorPontos.prototype, "disponiveis", {
        get: function () {
            return this._disponiveis;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoadorPontos.prototype, "recebidos_cadastro", {
        get: function () {
            return this._recebidos_cadastro;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoadorPontos.prototype, "recebidos_convite", {
        get: function () {
            return this._recebidos_convite;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoadorPontos.prototype, "recebidos_compra", {
        get: function () {
            return this._recebidos_compra;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoadorPontos.prototype, "recebidos_plugin_installed", {
        get: function () {
            return this._recebidos_plugin_installed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoadorPontos.prototype, "recebidos_app_installed", {
        get: function () {
            return this._recebidos_app_installed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoadorPontos.prototype, "recebidos_perfil_completo", {
        get: function () {
            return this._recebidos_perfil_completo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoadorPontos.prototype, "ong", {
        get: function () {
            return this._ong;
        },
        enumerable: true,
        configurable: true
    });
    DoadorPontos.resource = new api.Tastypie.Resource('doador/profile/<id>/pontos-status', { model: DoadorPontos });
    return DoadorPontos;
}(api.Tastypie.Model));
exports.DoadorPontos = DoadorPontos;
var DoadorDoacaoMes = /** @class */ (function (_super) {
    __extends(DoadorDoacaoMes, _super);
    function DoadorDoacaoMes(obj) {
        return _super.call(this, DoadorDoacaoMes.resource, obj) || this;
    }
    DoadorDoacaoMes.resource = new api.Tastypie.Resource('doador/doacao-mes', { model: DoadorDoacaoMes });
    return DoadorDoacaoMes;
}(api.Tastypie.Model));
exports.DoadorDoacaoMes = DoadorDoacaoMes;
var DoadorDoacao = /** @class */ (function (_super) {
    __extends(DoadorDoacao, _super);
    function DoadorDoacao(obj) {
        var _this = _super.call(this, DoadorDoacao.resource) || this;
        if (obj) {
            _this.id = obj.id,
                _this._doador_id = obj.doador_id;
            _this._moeda = obj.moeda;
            _this._doador_doacao_pendente = obj.doador_doacao_pendente;
            _this._doador_doacao_direta = obj.doador_doacao_direta;
            _this._doador_doacao_pool = obj.doador_doacao_pool;
            _this._doador_doacao_total = obj.doador_doacao_total;
            _this._doador_doacao_soluz = obj.doador_doacao_soluz;
            _this._doador_doacao_impacto = obj.doador_doacao_impacto;
            _this._rede_acima_doacao_pendente = obj.rede_acima_doacao_pendente;
            _this._rede_acima_doacao_direta = obj.rede_acima_doacao_direta;
            _this._rede_acima_doacao_pool = obj.rede_acima_doacao_pool;
            _this._rede_acima_doacao_total = obj.rede_acima_doacao_total;
            _this._rede_abaixo_doacao_pendente = obj.rede_abaixo_doacao_pendente;
            _this._rede_abaixo_doacao_direta = obj.rede_abaixo_doacao_direta;
            _this._rede_abaixo_doacao_pool = obj.rede_abaixo_doacao_pool;
            _this._rede_abaixo_doacao_total = obj.rede_abaixo_doacao_total;
            _this._rede_direta_doacao_pendente = obj.rede_direta_doacao_pendente;
            _this._rede_direta_doacao_direta = obj.rede_direta_doacao_direta;
            _this._rede_direta_doacao_pool = obj.rede_direta_doacao_pool;
            _this._rede_direta_doacao_total = obj.rede_direta_doacao_total;
            _this._rede_indireta_doacao_pendente = obj.rede_indireta_doacao_pendente;
            _this._rede_indireta_doacao_direta = obj.rede_indireta_doacao_direta;
            _this._rede_indireta_doacao_pool = obj.rede_indireta_doacao_pool;
            _this._rede_indireta_doacao_total = obj.rede_indireta_doacao_total;
            _this._dt_updated = obj.dt_updated;
            _this._doacao_ong = new api.Tastypie.Resource('doador/doacao-ong', { model: DoadorDoacaoOng, defaults: { doador_id: obj.doador_id } });
            _this._doacao_ods = new api.Tastypie.Resource('doador/doacao-ods', { model: DoadorDoacaoOds, defaults: { doador_id: obj.doador_id } });
        }
        else {
            _this._moeda = 'BRL';
            _this._doador_doacao_pendente = 0;
            _this._doador_doacao_direta = 0;
            _this._doador_doacao_pool = 0;
            _this._doador_doacao_total = 0;
            _this._doador_doacao_impacto = 0;
            _this._rede_acima_doacao_pendente = 0;
            _this._rede_acima_doacao_direta = 0;
            _this._rede_acima_doacao_pool = 0;
            _this._rede_acima_doacao_total = 0;
            _this._rede_abaixo_doacao_pendente = 0;
            _this._rede_abaixo_doacao_direta = 0;
            _this._rede_abaixo_doacao_pool = 0;
            _this._rede_abaixo_doacao_total = 0;
            _this._rede_direta_doacao_pendente = 0;
            _this._rede_direta_doacao_direta = 0;
            _this._rede_direta_doacao_pool = 0;
            _this._rede_direta_doacao_total = 0;
            _this._rede_indireta_doacao_pendente = 0;
            _this._rede_indireta_doacao_direta = 0;
            _this._rede_indireta_doacao_pool = 0;
            _this._rede_indireta_doacao_total = 0;
        }
        return _this;
    }
    Object.defineProperty(DoadorDoacao.prototype, "moeda", {
        get: function () {
            return this._moeda;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoadorDoacao.prototype, "doador_doacao_pendente", {
        get: function () {
            return this._doador_doacao_pendente;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoadorDoacao.prototype, "doador_doacao_direta", {
        get: function () {
            return this._doador_doacao_direta;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoadorDoacao.prototype, "doador_doacao_pool", {
        get: function () {
            return this._doador_doacao_pool;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoadorDoacao.prototype, "doador_doacao_total", {
        get: function () {
            return this._doador_doacao_total;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoadorDoacao.prototype, "doador_doacao_soluz", {
        get: function () {
            return this._doador_doacao_soluz;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoadorDoacao.prototype, "doador_doacao_impacto", {
        get: function () {
            return this._doador_doacao_impacto;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoadorDoacao.prototype, "rede_acima_doacao_pendente", {
        get: function () {
            return this._rede_acima_doacao_pendente;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoadorDoacao.prototype, "rede_acima_doacao_direta", {
        get: function () {
            return this._rede_acima_doacao_direta;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoadorDoacao.prototype, "rede_acima_doacao_pool", {
        get: function () {
            return this._rede_acima_doacao_pool;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoadorDoacao.prototype, "rede_acima_doacao_total", {
        get: function () {
            return this._rede_acima_doacao_total;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoadorDoacao.prototype, "rede_abaixo_doacao_pendente", {
        get: function () {
            return this._rede_abaixo_doacao_pendente;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoadorDoacao.prototype, "rede_abaixo_doacao_direta", {
        get: function () {
            return this._rede_abaixo_doacao_direta;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoadorDoacao.prototype, "rede_abaixo_doacao_pool", {
        get: function () {
            return this._rede_abaixo_doacao_pool;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoadorDoacao.prototype, "rede_abaixo_doacao_total", {
        get: function () {
            return this._rede_abaixo_doacao_total;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoadorDoacao.prototype, "rede_direta_doacao_pendente", {
        get: function () {
            return this._rede_direta_doacao_pendente;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoadorDoacao.prototype, "rede_direta_doacao_direta", {
        get: function () {
            return this._rede_direta_doacao_direta;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoadorDoacao.prototype, "rede_direta_doacao_pool", {
        get: function () {
            return this._rede_direta_doacao_pool;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoadorDoacao.prototype, "rede_direta_doacao_total", {
        get: function () {
            return this._rede_direta_doacao_total;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoadorDoacao.prototype, "rede_indireta_doacao_pendente", {
        get: function () {
            return this._rede_indireta_doacao_pendente;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoadorDoacao.prototype, "rede_indireta_doacao_direta", {
        get: function () {
            return this._rede_indireta_doacao_direta;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoadorDoacao.prototype, "rede_indireta_doacao_pool", {
        get: function () {
            return this._rede_indireta_doacao_pool;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoadorDoacao.prototype, "rede_indireta_doacao_total", {
        get: function () {
            return this._rede_indireta_doacao_total;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoadorDoacao.prototype, "doacao_ong", {
        get: function () {
            return this._doacao_ong;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoadorDoacao.prototype, "doacao_ods", {
        get: function () {
            return this._doacao_ods;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoadorDoacao.prototype, "dt_updated", {
        get: function () {
            return this._dt_updated;
        },
        enumerable: true,
        configurable: true
    });
    DoadorDoacao.resource = new api.Tastypie.Resource('doador/profile/<id>/doacao-status', { model: DoadorDoacao });
    return DoadorDoacao;
}(api.Tastypie.Model));
exports.DoadorDoacao = DoadorDoacao;
var DoadorRede = /** @class */ (function () {
    function DoadorRede(doador_id) {
        this._doador_id = doador_id;
        this._acima_resource = new api.Tastypie.Resource('doador/rede', { model: DoadorRedeAmigos, defaults: { rede: 'acima' } });
        this._abaixo_resource = new api.Tastypie.Resource('doador/rede', { model: DoadorRedeAmigos, defaults: { rede: 'abaixo' } });
        this._direta_resource = new api.Tastypie.Resource('doador/rede', { model: DoadorRedeAmigos, defaults: { rede: 'direta' } });
        this._indireta_resource = new api.Tastypie.Resource('doador/rede', { model: DoadorRedeAmigos, defaults: { rede: 'indireta' } });
    }
    Object.defineProperty(DoadorRede.prototype, "doador_id", {
        get: function () {
            return this._doador_id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoadorRede.prototype, "acima", {
        get: function () {
            return this._acima_resource;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoadorRede.prototype, "abaixo", {
        get: function () {
            return this._abaixo_resource;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoadorRede.prototype, "direta", {
        get: function () {
            return this._direta_resource;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoadorRede.prototype, "indireta", {
        get: function () {
            return this._indireta_resource;
        },
        enumerable: true,
        configurable: true
    });
    return DoadorRede;
}());
exports.DoadorRede = DoadorRede;
var DoadorRedeAmigos = /** @class */ (function (_super) {
    __extends(DoadorRedeAmigos, _super);
    function DoadorRedeAmigos(obj) {
        return _super.call(this, DoadorRedeAmigos.resource, obj) || this;
    }
    DoadorRedeAmigos.resource = new api.Tastypie.Resource('doador/rede', { model: DoadorRedeAmigos });
    return DoadorRedeAmigos;
}(api.Tastypie.Model));
exports.DoadorRedeAmigos = DoadorRedeAmigos;
var DoadorDoacaoOng = /** @class */ (function (_super) {
    __extends(DoadorDoacaoOng, _super);
    function DoadorDoacaoOng(obj) {
        var _this = _super.call(this, DoadorDoacaoOng.resource, obj) || this;
        var _self = _this;
        if (_self.ong) {
            _self.ong = new ong_models.Ong(_self.ong);
            _self._doacao_ods = new api.Tastypie.Resource('doador/doacao-ods', { model: DoadorDoacaoOds, defaults: { doador_id: _self.doador_id, ong_id: _self.ong.id } });
        }
        return _this;
    }
    Object.defineProperty(DoadorDoacaoOng.prototype, "doacao_ods", {
        get: function () {
            return this._doacao_ods;
        },
        enumerable: true,
        configurable: true
    });
    DoadorDoacaoOng.resource = new api.Tastypie.Resource('doador/doacao-ong', { model: DoadorDoacaoOng });
    return DoadorDoacaoOng;
}(api.Tastypie.Model));
exports.DoadorDoacaoOng = DoadorDoacaoOng;
var DoadorDoacaoOds = /** @class */ (function (_super) {
    __extends(DoadorDoacaoOds, _super);
    function DoadorDoacaoOds(obj) {
        var _this = _super.call(this, DoadorDoacaoOds.resource, obj) || this;
        var _self = _this;
        if (_self.ods) {
            _self.ods = new onu_models.Ods(_self.ods);
            _self._doacao_ong = new api.Tastypie.Resource('doador/doacao-ong', { model: DoadorDoacaoOng, defaults: { doador_id: _self.doador_id, ods_id: _self.ods.id } });
        }
        return _this;
    }
    Object.defineProperty(DoadorDoacaoOds.prototype, "doacao_ong", {
        get: function () {
            return this._doacao_ong;
        },
        enumerable: true,
        configurable: true
    });
    DoadorDoacaoOds.resource = new api.Tastypie.Resource('doador/doacao-ods', { model: DoadorDoacaoOds });
    return DoadorDoacaoOds;
}(api.Tastypie.Model));
exports.DoadorDoacaoOds = DoadorDoacaoOds;
var DoadorCompraAfiliadoraStatus = /** @class */ (function (_super) {
    __extends(DoadorCompraAfiliadoraStatus, _super);
    function DoadorCompraAfiliadoraStatus(obj) {
        var _this = _super.call(this, DoadorCompraAfiliadoraStatus.resource) || this;
        if (obj) {
            _this.id = obj.id,
                _this._doador_id = obj.doador_id;
            _this._ativo = obj.ativo;
            _this._compra_qtde = obj.compra_qtde;
            _this._doacao_total = obj.doacao_total;
            _this._doacao_porcentagem = obj.doacao_porcentagem;
            _this._dt_updated = obj.dt_updated;
            _this._compra = new api.Tastypie.Resource('doador/compra-afiliadora', { model: DoadorCompraAfiliadora, defaults: { doador_id: obj.doador_id } });
        }
        else {
            _this._ativo = false;
            _this._compra_qtde = 0;
            _this._doacao_total = 0.00;
            _this._doacao_porcentagem = 85.00;
        }
        return _this;
    }
    Object.defineProperty(DoadorCompraAfiliadoraStatus.prototype, "doador_id", {
        get: function () {
            return this._doador_id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoadorCompraAfiliadoraStatus.prototype, "ativo", {
        get: function () {
            return this._ativo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoadorCompraAfiliadoraStatus.prototype, "compra_qtde", {
        get: function () {
            return this._compra_qtde;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoadorCompraAfiliadoraStatus.prototype, "doacao_total", {
        get: function () {
            return this._doacao_total;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoadorCompraAfiliadoraStatus.prototype, "doacao_porcentagem", {
        get: function () {
            return this._doacao_porcentagem;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoadorCompraAfiliadoraStatus.prototype, "dt_updated", {
        get: function () {
            return this._dt_updated;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DoadorCompraAfiliadoraStatus.prototype, "compra", {
        get: function () {
            return this._compra;
        },
        enumerable: true,
        configurable: true
    });
    DoadorCompraAfiliadoraStatus.resource = new api.Tastypie.Resource('doador/profile/<id>/compra-afiliadora-status', { model: DoadorCompraAfiliadoraStatus });
    return DoadorCompraAfiliadoraStatus;
}(api.Tastypie.Model));
exports.DoadorCompraAfiliadoraStatus = DoadorCompraAfiliadoraStatus;
var DoadorCompraAfiliadora = /** @class */ (function (_super) {
    __extends(DoadorCompraAfiliadora, _super);
    function DoadorCompraAfiliadora(obj) {
        return _super.call(this, DoadorCompraAfiliadora.resource, obj) || this;
    }
    DoadorCompraAfiliadora.resource = new api.Tastypie.Resource('doador-compra-afiliadora', { model: DoadorCompraAfiliadora });
    return DoadorCompraAfiliadora;
}(api.Tastypie.Model));
exports.DoadorCompraAfiliadora = DoadorCompraAfiliadora;
//# sourceMappingURL=doador.js.map