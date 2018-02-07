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
var Ong = /** @class */ (function (_super) {
    __extends(Ong, _super);
    function Ong(obj) {
        var _this = _super.call(this, Ong.resource, obj) || this;
        var _self = _this;
        if (_self.id) {
            _self._timeline = new api.Tastypie.Resource('ong/timeline', { model: OngTimeLine, defaults: { ong_id: _self.id } });
            _self._fotos = new api.Tastypie.Resource('ong/timeline', { model: OngTimeLine, defaults: { ong_id: _self.id, tipo: 'fotos' } });
            _self._videos = new api.Tastypie.Resource('ong/timeline', { model: OngTimeLine, defaults: { ong_id: _self.id, tipo: 'videos' } });
        }
        if (_self.profile_detail)
            _self.profile_detail = new OngDetail(_self.profile_detail);
        return _this;
    }
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
//# sourceMappingURL=ong.js.map