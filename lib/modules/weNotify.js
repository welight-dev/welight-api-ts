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
var WeNotifyDoador = /** @class */ (function (_super) {
    __extends(WeNotifyDoador, _super);
    function WeNotifyDoador(obj) {
        return _super.call(this, WeNotifyDoador.resource, obj) || this;
    }
    WeNotifyDoador.resource = new api.Tastypie.Resource('we-notify/doador', { model: WeNotifyDoador });
    return WeNotifyDoador;
}(api.Tastypie.Model));
exports.WeNotifyDoador = WeNotifyDoador;
//# sourceMappingURL=weNotify.js.map