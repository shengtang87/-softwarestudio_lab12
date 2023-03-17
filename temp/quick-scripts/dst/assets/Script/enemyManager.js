
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/enemyManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0b908C7+d1JmJPcFSBmVdWn', 'enemyManager');
// Script/enemyManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var enemyManager = /** @class */ (function (_super) {
    __extends(enemyManager, _super);
    function enemyManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.enemyPrefab = null;
        _this.enemyPool = null;
        return _this;
    }
    enemyManager.prototype.onLoad = function () {
        this.enemyPool = new cc.NodePool('enemy');
        var maxEnemyNum = 3;
        for (var i = 0; i < maxEnemyNum; i++) {
            var enemy = cc.instantiate(this.enemyPrefab);
            this.enemyPool.put(enemy);
        }
        this.schedule(this.createEnemy, 0.5); //set one enemy to the scene every 0.5s .
    };
    //call this function to add new enemy to the scene.
    enemyManager.prototype.createEnemy = function () {
        var enemy = null;
        if (this.enemyPool.size() > 0)
            enemy = this.enemyPool.get(this.enemyPool);
        if (enemy != null)
            enemy.getComponent('enemy').init(this.node);
    };
    __decorate([
        property(cc.Prefab)
    ], enemyManager.prototype, "enemyPrefab", void 0);
    enemyManager = __decorate([
        ccclass
    ], enemyManager);
    return enemyManager;
}(cc.Component));
exports.default = enemyManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxlbmVteU1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFNLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTBDLGdDQUFZO0lBQXREO1FBQUEscUVBbUNDO1FBaENXLGlCQUFXLEdBQWMsSUFBSSxDQUFDO1FBRTlCLGVBQVMsR0FBRyxJQUFJLENBQUM7O0lBOEI3QixDQUFDO0lBNUJHLDZCQUFNLEdBQU47UUFFSSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUUxQyxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUM7UUFFcEIsS0FBSSxJQUFJLENBQUMsR0FBVyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsRUFBRSxDQUFDLEVBQUUsRUFDM0M7WUFDSSxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUU3QyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM3QjtRQUVELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLHlDQUF5QztJQUNuRixDQUFDO0lBRUQsbURBQW1EO0lBQzNDLGtDQUFXLEdBQW5CO1FBRUksSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBRWpCLElBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDO1lBQ3hCLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFL0MsSUFBRyxLQUFLLElBQUksSUFBSTtZQUNaLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBOUJEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7cURBQ2tCO0lBSHJCLFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0FtQ2hDO0lBQUQsbUJBQUM7Q0FuQ0QsQUFtQ0MsQ0FuQ3lDLEVBQUUsQ0FBQyxTQUFTLEdBbUNyRDtrQkFuQ29CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGVuZW15TWFuYWdlciBleHRlbmRzIGNjLkNvbXBvbmVudCBcclxue1xyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHByaXZhdGUgZW5lbXlQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBlbmVteVBvb2wgPSBudWxsO1xyXG5cclxuICAgIG9uTG9hZCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5lbmVteVBvb2wgPSBuZXcgY2MuTm9kZVBvb2woJ2VuZW15Jyk7XHJcblxyXG4gICAgICAgIGxldCBtYXhFbmVteU51bSA9IDM7XHJcblxyXG4gICAgICAgIGZvcihsZXQgaTogbnVtYmVyID0gMDsgaSA8IG1heEVuZW15TnVtOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgZW5lbXkgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmVuZW15UHJlZmFiKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZW5lbXlQb29sLnB1dChlbmVteSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMuY3JlYXRlRW5lbXksIDAuNSk7IC8vc2V0IG9uZSBlbmVteSB0byB0aGUgc2NlbmUgZXZlcnkgMC41cyAuXHJcbiAgICB9XHJcblxyXG4gICAgLy9jYWxsIHRoaXMgZnVuY3Rpb24gdG8gYWRkIG5ldyBlbmVteSB0byB0aGUgc2NlbmUuXHJcbiAgICBwcml2YXRlIGNyZWF0ZUVuZW15KClcclxuICAgIHtcclxuICAgICAgICBsZXQgZW5lbXkgPSBudWxsO1xyXG5cclxuICAgICAgICBpZih0aGlzLmVuZW15UG9vbC5zaXplKCkgPiAwKVxyXG4gICAgICAgICAgICBlbmVteSA9IHRoaXMuZW5lbXlQb29sLmdldCh0aGlzLmVuZW15UG9vbCk7XHJcblxyXG4gICAgICAgIGlmKGVuZW15ICE9IG51bGwpXHJcbiAgICAgICAgICAgIGVuZW15LmdldENvbXBvbmVudCgnZW5lbXknKS5pbml0KHRoaXMubm9kZSk7XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4iXX0=