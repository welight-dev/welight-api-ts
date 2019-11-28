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
var onu_1 = require("./onu");
var utils_1 = require("./utils");
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
        _self._ods = [];
        if (obj) {
            _self.id = obj.id;
            _self.nome = obj.nome;
            _self.email = obj.email;
            _self.razao_social = obj.razao_social;
            _self.cnpj = obj.cnpj;
            _self.slug = obj.slug;
            _self._ativo = obj.ativo;
            _self._parceira = obj.parceira;
            _self._invite = obj.invite;
            _self._qtde_pontos = obj.qtde_pontos;
            _self._qtde_doadores = obj.qtde_doadores;
            _self._dt_updated = obj.dt_updated;
            _self._dt_created = obj.dt_created;
            if (obj.profile_detail)
                _self._profile_detail = new OngDetail(obj.profile_detail);
            if (obj.site_custom)
                _self._site_custom = new OngSiteCustom(obj.site_custom);
            if (obj.address)
                _self._address = new OngAddress(obj.address);
            if (obj.status)
                _self._status = new OngStatus(obj.status);
            if (obj.ods) {
                for (var _i = 0, _a = obj.ods; _i < _a.length; _i++) {
                    var o = _a[_i];
                    _self._ods.push(new onu_1.Ods(o));
                }
            }
            if (_self.id) {
                _self._timeline = new api.Tastypie.Resource('ong/timeline', { model: OngTimeLine, defaults: { ong_id: _self.id } });
                _self._fotos = new api.Tastypie.Resource('ong/timeline', { model: OngTimeLine, defaults: { ong_id: _self.id, tipo_conteudo: 'fotos' } });
                _self._videos = new api.Tastypie.Resource('ong/timeline', { model: OngTimeLine, defaults: { ong_id: _self.id, tipo_conteudo: 'videos' } });
                _self._projetos = new api.Tastypie.Resource('ong/projeto', { model: OngProjeto, defaults: { ong_id: _self.id } });
                _self._bancos = new api.Tastypie.Resource('ong/banco', { model: OngBanco, defaults: { ong_id: _self.id } });
                _self._status_carteira = new api.Tastypie.Resource('ong/status-carteira', { model: OngStatusCarteira, defaults: { ong_id: _self.id } });
                _self._recursos = new api.Tastypie.Resource('ong/recurso', { model: OngRecurso, defaults: { ong_id: _self.id } });
                _self._projeto_entrega = new api.Tastypie.Resource('ong/projeto-entrega', { model: OngProjetoEntrega, defaults: { ong_id: _self.id } });
                _self._carteira = new api.Tastypie.Resource('ong/carteira', { model: OngCarteira, defaults: { ong_id: _self.id } });
            }
        }
        else {
            _self._profile_detail = new OngDetail();
        }
    };
    Object.defineProperty(Ong.prototype, "status", {
        get: function () {
            return this._status;
        },
        enumerable: true,
        configurable: true
    });
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
    Object.defineProperty(Ong.prototype, "invite", {
        get: function () {
            return this._invite;
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
    Object.defineProperty(Ong.prototype, "site_custom", {
        get: function () {
            return this._site_custom;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ong.prototype, "address", {
        get: function () {
            return this._address;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ong.prototype, "ods", {
        get: function () {
            return this._ods;
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
    Object.defineProperty(Ong.prototype, "recursos", {
        get: function () {
            return this._recursos;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ong.prototype, "status_carteira", {
        get: function () {
            return this._status_carteira;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ong.prototype, "projeto_entrega", {
        get: function () {
            return this._projeto_entrega;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ong.prototype, "carteira", {
        get: function () {
            return this._carteira;
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
            return Ong.resource.objects.get(user.current_user_app.app_profile_id).then(function (data) {
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
var OngSiteCustom = /** @class */ (function () {
    function OngSiteCustom(obj) {
        if (obj) {
            this.descricao = obj.descricao;
            this.img_avatar = obj.img_avatar;
            this.img_fundo = obj.img_fundo;
            this.cor_filtro = obj.cor_filtro;
        }
    }
    return OngSiteCustom;
}());
exports.OngSiteCustom = OngSiteCustom;
var OngEndereco = /** @class */ (function (_super) {
    __extends(OngEndereco, _super);
    function OngEndereco(obj) {
        return _super.call(this, OngEndereco.resource, obj) || this;
    }
    OngEndereco.resource = new api.Tastypie.Resource('ong/endereco', { model: OngEndereco });
    return OngEndereco;
}(api.Tastypie.Model));
exports.OngEndereco = OngEndereco;
var OngAddress = /** @class */ (function (_super) {
    __extends(OngAddress, _super);
    function OngAddress(obj) {
        return _super.call(this, OngAddress.resource, obj) || this;
    }
    OngAddress.resource = new api.Tastypie.Resource('ong/address', { model: OngAddress });
    return OngAddress;
}(utils_1.Address));
exports.OngAddress = OngAddress;
var OngBanco = /** @class */ (function (_super) {
    __extends(OngBanco, _super);
    function OngBanco(obj) {
        return _super.call(this, OngBanco.resource, obj) || this;
    }
    OngBanco.resource = new api.Tastypie.Resource('ong/banco', { model: OngBanco });
    return OngBanco;
}(api.Tastypie.Model));
exports.OngBanco = OngBanco;
var OngPostScrap = /** @class */ (function (_super) {
    __extends(OngPostScrap, _super);
    function OngPostScrap(obj) {
        return _super.call(this, OngPostScrap.resource, obj) || this;
    }
    OngPostScrap.resource = new api.Tastypie.Resource('ong/timeline-post-scraper', { model: OngPostScrap });
    return OngPostScrap;
}(api.Tastypie.Model));
exports.OngPostScrap = OngPostScrap;
var OngPost = /** @class */ (function (_super) {
    __extends(OngPost, _super);
    function OngPost(obj, _resource) {
        var _this = _super.call(this, (_resource || OngPost.resource), obj) || this;
        var _self = _this;
        if (!_self.fotos) {
            _self.fotos = [];
        }
        _self._fotos_resource = new api.Tastypie.Resource('ong/timeline-post-foto');
        if (obj) {
            if (obj.site_scraped)
                _self.site_scraped = new OngPostScrap(obj.site_scraped);
        }
        return _this;
    }
    OngPost.prototype.setScraper = function (url) {
        var _self = this;
        return OngPostScrap.resource.objects.create({ url: url }).then(function (data) {
            _self.site_scraped = data;
            return _self.site_scraped;
        });
    };
    OngPost.prototype.addFiles = function (event) {
        var _self = this;
        var uploading = new Promise(function (resolve, reject) {
            var _loop_1 = function (ix) {
                var timeout = setTimeout(function () { reject('timeout'); }, 15000);
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    var paramFile = loadEvent.target.result;
                    _self._fotos_resource.objects.create({ foto: paramFile }).then(function (data) {
                        clearTimeout(timeout);
                        _self.fotos.push(data.foto);
                        if (ix == (event.target.files.length - 1)) {
                            resolve(_self.fotos);
                        }
                    }).catch(function (error) {
                        clearTimeout(timeout);
                        reject(error);
                    });
                };
                reader.readAsDataURL(event.target.files[ix]);
            };
            for (var ix = 0; ix < event.target.files.length; ix++) {
                _loop_1(ix);
            }
        });
        return uploading;
    };
    OngPost.resource = new api.Tastypie.Resource('ong/timeline-post', { model: OngPost });
    return OngPost;
}(api.Tastypie.Model));
exports.OngPost = OngPost;
var OngTimeLine = /** @class */ (function (_super) {
    __extends(OngTimeLine, _super);
    function OngTimeLine(obj) {
        var _this = _super.call(this, obj, OngTimeLine.resource) || this;
        if (obj) {
            if (obj.ong)
                _this.ong = new Ong(obj.ong);
            if (obj.projeto)
                _this.projeto = new OngProjeto(obj.projeto);
            if (obj.doacao_credito)
                _this.doacao_credito = new OngCarteira(obj.doacao_credito);
            if (obj.recurso)
                _this.recurso = new OngRecurso(obj.recurso);
            if (obj.entrega)
                _this.entrega = new OngProjetoEntrega(obj.entrega);
        }
        return _this;
    }
    OngTimeLine.resource = new api.Tastypie.Resource('ong/timeline', { model: OngTimeLine });
    return OngTimeLine;
}(OngPost));
exports.OngTimeLine = OngTimeLine;
var OngProjeto = /** @class */ (function (_super) {
    __extends(OngProjeto, _super);
    function OngProjeto(obj) {
        var _this = _super.call(this, OngProjeto.resource, obj) || this;
        if (_this.id) {
            _this._endereco = new api.Tastypie.Resource('ong/projeto-endereco', { model: OngProjetoEndereco, defaults: { ong_projeto_id: _this.id } });
            _this._metric = new api.Tastypie.Resource('ong/projeto-metric', { model: OngProjetoMetric, defaults: { ong_projeto_id: _this.id } });
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
    Object.defineProperty(OngProjeto.prototype, "metric", {
        get: function () {
            return this._metric;
        },
        enumerable: true,
        configurable: true
    });
    OngProjeto.prototype.get_metric_summary = function () {
        return OngProjetoMetricSummary.resource.objects.findOne({ ong_projeto_id: this.id });
    };
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
var OngProjetoMetricSummary = /** @class */ (function (_super) {
    __extends(OngProjetoMetricSummary, _super);
    function OngProjetoMetricSummary(obj) {
        var _this = _super.call(this, OngProjetoMetricSummary.resource, obj) || this;
        _this.categories = [];
        _this.ods = [];
        if (obj) {
            if (obj.categories) {
                for (var _i = 0, _a = obj.categories; _i < _a.length; _i++) {
                    var cat = _a[_i];
                    _this.categories.push(new onu_1.MetricCategory(cat));
                }
            }
            if (obj.ods) {
                for (var _b = 0, _c = obj.ods; _b < _c.length; _b++) {
                    var o = _c[_b];
                    _this.ods.push(new onu_1.Ods(o));
                }
            }
        }
        return _this;
    }
    OngProjetoMetricSummary.resource = new api.Tastypie.Resource('ong/projeto/metric-summary', { model: OngProjetoMetricSummary });
    return OngProjetoMetricSummary;
}(api.Tastypie.Model));
exports.OngProjetoMetricSummary = OngProjetoMetricSummary;
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
var OngProjetoMetricRegisterEvidence = /** @class */ (function (_super) {
    __extends(OngProjetoMetricRegisterEvidence, _super);
    function OngProjetoMetricRegisterEvidence(obj) {
        return _super.call(this, OngProjetoMetricRegisterEvidence.resource, obj) || this;
    }
    OngProjetoMetricRegisterEvidence.resource = new api.Tastypie.Resource('ong/projeto-metric-register-evidence', { model: OngProjetoMetricRegisterEvidence });
    return OngProjetoMetricRegisterEvidence;
}(api.Tastypie.Model));
exports.OngProjetoMetricRegisterEvidence = OngProjetoMetricRegisterEvidence;
var OngProjetoMetricRegister = /** @class */ (function (_super) {
    __extends(OngProjetoMetricRegister, _super);
    function OngProjetoMetricRegister(obj) {
        var _this = _super.call(this, OngProjetoMetricRegister.resource, obj) || this;
        if (obj) {
            if (obj.id) {
                _this._evidencies = new api.Tastypie.Resource(OngProjetoMetricRegisterEvidence.resource.endpoint, { model: OngProjetoMetricRegisterEvidence, defaults: { ong_projeto_metric_config_id: obj.id } });
            }
        }
        return _this;
    }
    Object.defineProperty(OngProjetoMetricRegister.prototype, "evidencies", {
        get: function () {
            return this._evidencies;
        },
        enumerable: true,
        configurable: true
    });
    OngProjetoMetricRegister.resource = new api.Tastypie.Resource('ong/projeto-metric-register', { model: OngProjetoMetricRegister });
    return OngProjetoMetricRegister;
}(api.Tastypie.Model));
exports.OngProjetoMetricRegister = OngProjetoMetricRegister;
var OngProjetoMetricConfig = /** @class */ (function (_super) {
    __extends(OngProjetoMetricConfig, _super);
    function OngProjetoMetricConfig(obj) {
        var _this = _super.call(this, OngProjetoMetricConfig.resource, obj) || this;
        if (obj) {
            if (obj.metric_unit)
                _this.metric_unit = new onu_1.MetricUnit(obj.metric_unit);
            if (obj.ong_projeto_endereco)
                _this.ong_projeto_endereco = new OngProjetoEndereco(obj.ong_projeto_endereco);
            if (obj.id) {
                _this._registers = new api.Tastypie.Resource(OngProjetoMetricRegister.resource.endpoint, { model: OngProjetoMetricRegister, defaults: { ong_projeto_metric_id: obj.id } });
            }
        }
        return _this;
    }
    Object.defineProperty(OngProjetoMetricConfig.prototype, "register", {
        get: function () {
            return this._registers;
        },
        enumerable: true,
        configurable: true
    });
    OngProjetoMetricConfig.resource = new api.Tastypie.Resource('ong/projeto-metric-config', { model: OngProjetoMetricConfig });
    return OngProjetoMetricConfig;
}(api.Tastypie.Model));
exports.OngProjetoMetricConfig = OngProjetoMetricConfig;
var OngProjetoMetric = /** @class */ (function (_super) {
    __extends(OngProjetoMetric, _super);
    function OngProjetoMetric(obj) {
        var _this = _super.call(this, OngProjetoMetric.resource, obj) || this;
        if (obj) {
            if (obj.ong_projeto)
                _this._ong_projeto = new OngProjeto(obj.ong_projeto);
            if (obj.metric)
                _this._metric = new onu_1.Metric(obj.metric);
            if (obj.id) {
                _this._metric_config = new api.Tastypie.Resource(OngProjetoMetricConfig.resource.endpoint, { model: OngProjetoMetricConfig, defaults: { ong_projeto_metric_id: obj.id } });
            }
        }
        return _this;
    }
    Object.defineProperty(OngProjetoMetric.prototype, "ong_projeto", {
        get: function () {
            return this._ong_projeto;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OngProjetoMetric.prototype, "metric", {
        get: function () {
            return this._metric;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OngProjetoMetric.prototype, "metric_config", {
        get: function () {
            return this._metric_config;
        },
        enumerable: true,
        configurable: true
    });
    OngProjetoMetric.resource = new api.Tastypie.Resource('ong/projeto-metric', { model: OngProjetoMetric });
    return OngProjetoMetric;
}(api.Tastypie.Model));
exports.OngProjetoMetric = OngProjetoMetric;
var OngStatus = /** @class */ (function () {
    function OngStatus(obj) {
        if (obj) {
            this.qtde_pontos = obj.qtde_pontos;
            this.qtde_doadores = obj.qtde_doadores;
            this.qtde_avaliacao_positiva = obj.qtde_avaliacao_positiva;
            this.qtde_projetos = obj.qtde_projetos;
            this.total_credito = obj.total_credito;
            this.total_saldo = obj.total_saldo;
            this.total_debito_comprovado = obj.total_debito_comprovado;
        }
    }
    return OngStatus;
}());
exports.OngStatus = OngStatus;
var OngOrigemCredito = /** @class */ (function (_super) {
    __extends(OngOrigemCredito, _super);
    function OngOrigemCredito(obj) {
        return _super.call(this, OngOrigemCredito.resource, obj) || this;
    }
    OngOrigemCredito.resource = new api.Tastypie.Resource('ong/origem-credito', { model: OngOrigemCredito });
    return OngOrigemCredito;
}(api.Tastypie.Model));
exports.OngOrigemCredito = OngOrigemCredito;
var OngRecurso = /** @class */ (function (_super) {
    __extends(OngRecurso, _super);
    function OngRecurso(obj) {
        var _this = _super.call(this, OngRecurso.resource, obj) || this;
        if (_this.id) {
            _this._doacao = new api.Tastypie.Resource('ong/recurso-doacao', { model: OngRecursoDoacao, defaults: { ong_recurso_id: _this.id } });
            _this._comprovante = new api.Tastypie.Resource('ong/recurso-comprovante', { model: OngRecursoComprovante, defaults: { ong_recurso_id: _this.id } });
        }
        return _this;
    }
    Object.defineProperty(OngRecurso.prototype, "doacao", {
        get: function () {
            return this._doacao;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OngRecurso.prototype, "comprovante", {
        get: function () {
            return this._comprovante;
        },
        enumerable: true,
        configurable: true
    });
    OngRecurso.resource = new api.Tastypie.Resource('ong/recurso', { model: OngRecurso });
    return OngRecurso;
}(api.Tastypie.Model));
exports.OngRecurso = OngRecurso;
var OngRecursoDoacao = /** @class */ (function (_super) {
    __extends(OngRecursoDoacao, _super);
    function OngRecursoDoacao(obj) {
        var _this = _super.call(this, OngRecursoDoacao.resource, obj) || this;
        if (obj) {
            if (obj.origem_credito)
                _this.origem_credito = new OngOrigemCredito(obj.origem_credito);
        }
        return _this;
    }
    OngRecursoDoacao.resource = new api.Tastypie.Resource('ong/recurso-doacao', { model: OngRecursoDoacao });
    return OngRecursoDoacao;
}(api.Tastypie.Model));
exports.OngRecursoDoacao = OngRecursoDoacao;
var OngRecursoComprovante = /** @class */ (function (_super) {
    __extends(OngRecursoComprovante, _super);
    function OngRecursoComprovante(obj) {
        return _super.call(this, OngRecursoComprovante.resource, obj) || this;
    }
    OngRecursoComprovante.resource = new api.Tastypie.Resource('ong/recurso-comprovante', { model: OngRecursoComprovante });
    return OngRecursoComprovante;
}(api.Tastypie.Model));
exports.OngRecursoComprovante = OngRecursoComprovante;
var OngStatusCarteira = /** @class */ (function (_super) {
    __extends(OngStatusCarteira, _super);
    function OngStatusCarteira(obj) {
        var _this = _super.call(this, OngStatusCarteira.resource, obj) || this;
        if (obj) {
            if (obj.origem_credito)
                _this.origem_credito = new OngOrigemCredito(obj.origem_credito);
        }
        return _this;
    }
    OngStatusCarteira.resource = new api.Tastypie.Resource('ong/status-carteira', { model: OngStatusCarteira });
    return OngStatusCarteira;
}(api.Tastypie.Model));
exports.OngStatusCarteira = OngStatusCarteira;
var OngCarteiraTransferencia = /** @class */ (function () {
    function OngCarteiraTransferencia(obj) {
        if (obj) {
            var _self = this;
            for (var property in obj) {
                if (obj.hasOwnProperty(property) && property.charAt(0) != '_') {
                    _self[property] = obj[property];
                }
            }
        }
    }
    return OngCarteiraTransferencia;
}());
exports.OngCarteiraTransferencia = OngCarteiraTransferencia;
var OngCarteiraCreditoCustomComprovante = /** @class */ (function (_super) {
    __extends(OngCarteiraCreditoCustomComprovante, _super);
    function OngCarteiraCreditoCustomComprovante(obj) {
        return _super.call(this, OngCarteiraCreditoCustomComprovante.resource, obj) || this;
    }
    OngCarteiraCreditoCustomComprovante.resource = new api.Tastypie.Resource('ong/carteira-credito-custom-comprovante', { model: OngCarteiraCreditoCustomComprovante });
    return OngCarteiraCreditoCustomComprovante;
}(api.Tastypie.Model));
exports.OngCarteiraCreditoCustomComprovante = OngCarteiraCreditoCustomComprovante;
var OngCarteiraCreditoCustom = /** @class */ (function () {
    function OngCarteiraCreditoCustom(obj) {
        if (obj) {
            var _self = this;
            for (var property in obj) {
                if (obj.hasOwnProperty(property) && property.charAt(0) != '_') {
                    _self[property] = obj[property];
                }
            }
            if (obj.id) {
                this._comprovante = new api.Tastypie.Resource('ong/carteira-credito-custom-comprovante', { model: OngCarteiraCreditoCustomComprovante, defaults: { credito_custom_id: obj.id } });
            }
        }
    }
    Object.defineProperty(OngCarteiraCreditoCustom.prototype, "comprovante", {
        get: function () {
            return this._comprovante;
        },
        enumerable: true,
        configurable: true
    });
    return OngCarteiraCreditoCustom;
}());
exports.OngCarteiraCreditoCustom = OngCarteiraCreditoCustom;
var OngCarteira = /** @class */ (function (_super) {
    __extends(OngCarteira, _super);
    function OngCarteira(obj) {
        var _this = _super.call(this, OngCarteira.resource, obj) || this;
        if (obj) {
            if (obj.origem_credito)
                _this.origem_credito = new OngOrigemCredito(obj.origem_credito);
            if (obj.transferencia)
                _this.transferencia = new OngCarteiraTransferencia(obj.transferencia);
            if (obj.credito_custom)
                _this.credito_custom = new OngCarteiraCreditoCustom(obj.credito_custom);
        }
        return _this;
    }
    OngCarteira.creditar = function (obj) {
        return OngCarteira._creditar.objects.create(obj);
    };
    OngCarteira.transferir = function (obj) {
        return OngCarteira._transferir.objects.create(obj);
    };
    OngCarteira.resource = new api.Tastypie.Resource('ong/carteira', { model: OngCarteira });
    OngCarteira._creditar = new api.Tastypie.Resource('ong/carteira/creditar', { model: OngCarteira });
    OngCarteira._transferir = new api.Tastypie.Resource('ong/carteira/transferir', { model: OngCarteira });
    return OngCarteira;
}(api.Tastypie.Model));
exports.OngCarteira = OngCarteira;
var OngTimelineDoacao = /** @class */ (function (_super) {
    __extends(OngTimelineDoacao, _super);
    function OngTimelineDoacao(obj) {
        var _this = _super.call(this, OngTimelineDoacao.resource, obj) || this;
        if (obj) {
            if (obj.doacao_credito)
                _this.doacao_credito = new OngCarteira(obj.doacao_credito);
            if (obj.recurso)
                _this.recurso = new OngRecurso(obj.recurso);
            if (obj.projeto)
                _this.projeto = new OngProjeto(obj.projeto);
        }
        return _this;
    }
    OngTimelineDoacao.resource = new api.Tastypie.Resource('ong/timeline-doacao', { model: OngTimelineDoacao });
    return OngTimelineDoacao;
}(api.Tastypie.Model));
exports.OngTimelineDoacao = OngTimelineDoacao;
var OngProjetoEntrega = /** @class */ (function (_super) {
    __extends(OngProjetoEntrega, _super);
    function OngProjetoEntrega(obj) {
        var _this = _super.call(this, OngProjetoEntrega.resource, obj) || this;
        if (obj) {
            if (obj.id) {
                _this._endereco = new api.Tastypie.Resource('ong/projeto-entrega-endereco', { model: OngProjetoEntregaEndereco, defaults: { projeto_entrega_id: obj.id } });
                _this._comprovante = new api.Tastypie.Resource('ong/projeto-entrega-comprovante', { model: OngProjetoEntregaComprovante, defaults: { projeto_entrega_id: obj.id } });
            }
            if (obj.projeto)
                _this.projeto = new OngProjeto(obj.projeto);
        }
        else {
            _this.mt_pessoas = 0;
            _this.mt_animais = 0;
            _this.mt_arvores = 0;
            _this.mt_areas = 0;
            _this.mt_criancas = 0;
        }
        return _this;
    }
    Object.defineProperty(OngProjetoEntrega.prototype, "endereco", {
        get: function () {
            return this._endereco;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OngProjetoEntrega.prototype, "comprovante", {
        get: function () {
            return this._comprovante;
        },
        enumerable: true,
        configurable: true
    });
    OngProjetoEntrega.resource = new api.Tastypie.Resource('ong/projeto-entrega', { model: OngProjetoEntrega });
    return OngProjetoEntrega;
}(api.Tastypie.Model));
exports.OngProjetoEntrega = OngProjetoEntrega;
var OngProjetoEntregaEndereco = /** @class */ (function (_super) {
    __extends(OngProjetoEntregaEndereco, _super);
    function OngProjetoEntregaEndereco(obj) {
        var _this = _super.call(this, OngProjetoEntregaEndereco.resource, obj) || this;
        if (obj) {
            if (obj.endereco)
                _this.endereco = new OngProjetoEndereco(obj.endereco);
        }
        return _this;
    }
    OngProjetoEntregaEndereco.resource = new api.Tastypie.Resource('ong/projeto-entrega-endereco', { model: OngProjetoEntregaEndereco });
    return OngProjetoEntregaEndereco;
}(api.Tastypie.Model));
exports.OngProjetoEntregaEndereco = OngProjetoEntregaEndereco;
var OngProjetoEntregaComprovante = /** @class */ (function (_super) {
    __extends(OngProjetoEntregaComprovante, _super);
    function OngProjetoEntregaComprovante(obj) {
        return _super.call(this, OngProjetoEntregaComprovante.resource, obj) || this;
    }
    OngProjetoEntregaComprovante.resource = new api.Tastypie.Resource('ong/projeto-entrega-comprovante', { model: OngProjetoEntregaComprovante });
    return OngProjetoEntregaComprovante;
}(api.Tastypie.Model));
exports.OngProjetoEntregaComprovante = OngProjetoEntregaComprovante;
//# sourceMappingURL=ong.js.map