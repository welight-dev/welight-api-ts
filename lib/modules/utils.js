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
var Tools = /** @class */ (function () {
    function Tools() {
    }
    Object.defineProperty(Tools, "localStorageSuported", {
        get: function () {
            var test = 'test';
            try {
                localStorage.setItem(test, test);
                localStorage.removeItem(test);
                return true;
            }
            catch (e) {
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    return Tools;
}());
exports.Tools = Tools;
var Banco = /** @class */ (function (_super) {
    __extends(Banco, _super);
    function Banco(obj) {
        return _super.call(this, Banco.resource, obj) || this;
    }
    Banco.resource = new api.Tastypie.Resource('utils/banco', { model: Banco });
    return Banco;
}(api.Tastypie.Model));
exports.Banco = Banco;
//# sourceMappingURL=utils.js.map