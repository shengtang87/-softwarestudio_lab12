
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/score.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '906760NAB1JXK11rok+U9Ds', 'score');
// Script/score.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var score = /** @class */ (function (_super) {
    __extends(score, _super);
    function score() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.value = 0;
        return _this;
    }
    score.prototype.onLoad = function () {
        this.resetScore();
    };
    score.prototype.resetScore = function () {
        this.value = 0;
        this.node.getComponent(cc.Label).string = "Score: 0";
    };
    score.prototype.addOnePoint = function () {
        this.value++;
        this.node.getComponent(cc.Label).string = "Score: " + this.value.toString();
    };
    score = __decorate([
        ccclass
    ], score);
    return score;
}(cc.Component));
exports.default = score;

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxzY29yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQU0sSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBbUMseUJBQVk7SUFBL0M7UUFBQSxxRUFzQkM7UUFwQlcsV0FBSyxHQUFXLENBQUMsQ0FBQzs7SUFvQjlCLENBQUM7SUFsQkcsc0JBQU0sR0FBTjtRQUVJLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRU0sMEJBQVUsR0FBakI7UUFFSSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUVmLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDO0lBQ3pELENBQUM7SUFFTSwyQkFBVyxHQUFsQjtRQUVJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUViLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDaEYsQ0FBQztJQXJCZ0IsS0FBSztRQUR6QixPQUFPO09BQ2EsS0FBSyxDQXNCekI7SUFBRCxZQUFDO0NBdEJELEFBc0JDLENBdEJrQyxFQUFFLENBQUMsU0FBUyxHQXNCOUM7a0JBdEJvQixLQUFLIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBzY29yZSBleHRlbmRzIGNjLkNvbXBvbmVudCBcclxue1xyXG4gICAgcHJpdmF0ZSB2YWx1ZTogbnVtYmVyID0gMDtcclxuXHJcbiAgICBvbkxvYWQgKCkgXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5yZXNldFNjb3JlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0U2NvcmUoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSAwO1xyXG5cclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIlNjb3JlOiAwXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZE9uZVBvaW50KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnZhbHVlKys7XHJcblxyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiU2NvcmU6IFwiICsgdGhpcy52YWx1ZS50b1N0cmluZygpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==