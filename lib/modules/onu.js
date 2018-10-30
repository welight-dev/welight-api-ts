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
var Ods = /** @class */ (function (_super) {
    __extends(Ods, _super);
    function Ods(obj) {
        return _super.call(this, Ods.resource, obj) || this;
    }
    Ods.resource = new api.Tastypie.Resource('onu/ods', { model: Ods });
    return Ods;
}(api.Tastypie.Model));
exports.Ods = Ods;
//# sourceMappingURL=onu.js.map