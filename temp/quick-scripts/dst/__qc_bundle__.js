
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/Script/Bullet');
require('./assets/Script/Player');
require('./assets/Script/enemy');
require('./assets/Script/enemyManager');
require('./assets/Script/score');
require('./assets/migration/use_reversed_rotateTo');

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/enemy.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e1c1fPVN7pBQYc0iyx79lLb', 'enemy');
// Script/enemy.ts

Object.defineProperty(exports, "__esModule", { value: true });
var score_1 = require("./score");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var enemy = /** @class */ (function (_super) {
    __extends(enemy, _super);
    function enemy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.score = null;
        _this.anim = null;
        _this.collider = null;
        _this.enemyManager = null;
        _this.enemySpeed = 0;
        return _this;
    }
    enemy.prototype.init = function (node) {
        this.score = cc.find("Canvas/score").getComponent(score_1.default);
        this.anim = this.getComponent(cc.Animation);
        this.collider = this.getComponent(cc.PhysicsBoxCollider);
        this.node.opacity = 255;
        this.setInitPos(node);
        this.anim.play('enemy');
    };
    // this function is called when the enemy manager calls "get" API.
    enemy.prototype.reuse = function (enemyManager) {
        this.enemyManager = enemyManager;
    };
    //this function sets the enemy's initial position when it is reused.
    enemy.prototype.setInitPos = function (node) {
        this.node.parent = node;
        // I use random to decide where the enemy appear after reuse.
        if (Math.random() > 0.5) {
            this.node.position = cc.v2(600, -110);
            this.node.scaleX = 1;
            this.enemySpeed = -200;
            this.collider.enabled = true;
            this.collider.offset = cc.v2(20, 0);
            this.collider.apply();
        }
        else {
            this.node.position = cc.v2(-600, -110);
            this.node.scaleX = -1;
            this.enemySpeed = 200;
            this.collider.enabled = true;
            this.collider.offset = cc.v2(-20, 0);
            this.collider.apply();
        }
    };
    // check if current position is out of view.
    enemy.prototype.boundingDetect = function () {
        if (this.node.x > 650 || this.node.x < -650)
            this.enemyManager.put(this.node);
    };
    //if this is called, the enemy will fade out in 1s and go back to the enemy pool.
    enemy.prototype.deadEffect = function () {
        var _this = this;
        this.enemySpeed = 0;
        this.collider.enabled = false;
        var fade = cc.fadeOut(1);
        var finished = cc.callFunc(function () {
            _this.enemyManager.put(_this.node);
        });
        this.node.runAction(cc.sequence(fade, finished));
    };
    enemy.prototype.update = function (dt) {
        this.node.x += this.enemySpeed * dt;
        this.boundingDetect();
    };
    //check if the collision is valid or not, and call "deadEffect" if the collision is valid.
    enemy.prototype.onBeginContact = function (contact, selfCollider, otherCollider) {
        if (otherCollider.node.name == "bullet" && !otherCollider.node.getComponent('Bullet').isTriggered) {
            otherCollider.node.getComponent('Bullet').isTriggered = true;
            this.score.addOnePoint();
            this.anim.stop();
            this.deadEffect();
        }
    };
    enemy = __decorate([
        ccclass
    ], enemy);
    return enemy;
}(cc.Component));
exports.default = enemy;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEVBQUUsQ0FBQztZQUV6QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBRWpCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNyQjtJQUNMLENBQUM7SUFoSGdCLEtBQUs7UUFEekIsT0FBTztPQUNhLEtBQUssQ0FpSHpCO0lBQUQsWUFBQztDQWpIRCxBQWlIQyxDQWpIa0MsRUFBRSxDQUFDLFNBQVMsR0FpSDlDO2tCQWpIb0IsS0FBSyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzY29yZSBmcm9tIFwiLi9zY29yZVwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBlbmVteSBleHRlbmRzIGNjLkNvbXBvbmVudCBcclxue1xyXG4gICAgcHJpdmF0ZSBzY29yZTogc2NvcmUgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgYW5pbSA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBjb2xsaWRlciA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBlbmVteU1hbmFnZXIgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgZW5lbXlTcGVlZCA9IDA7XHJcblxyXG4gICAgcHVibGljIGluaXQobm9kZTogY2MuTm9kZSlcclxuICAgIHsgICBcclxuICAgICAgICB0aGlzLnNjb3JlID0gY2MuZmluZChcIkNhbnZhcy9zY29yZVwiKS5nZXRDb21wb25lbnQoc2NvcmUpO1xyXG5cclxuICAgICAgICB0aGlzLmFuaW0gPSB0aGlzLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xyXG5cclxuICAgICAgICB0aGlzLmNvbGxpZGVyID0gdGhpcy5nZXRDb21wb25lbnQoY2MuUGh5c2ljc0JveENvbGxpZGVyKTtcclxuXHJcbiAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAyNTU7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0SW5pdFBvcyhub2RlKTtcclxuXHJcbiAgICAgICAgdGhpcy5hbmltLnBsYXkoJ2VuZW15Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgd2hlbiB0aGUgZW5lbXkgbWFuYWdlciBjYWxscyBcImdldFwiIEFQSS5cclxuICAgIHJldXNlKGVuZW15TWFuYWdlcilcclxuICAgIHtcclxuICAgICAgICB0aGlzLmVuZW15TWFuYWdlciA9IGVuZW15TWFuYWdlcjtcclxuICAgIH1cclxuXHJcbiAgICAvL3RoaXMgZnVuY3Rpb24gc2V0cyB0aGUgZW5lbXkncyBpbml0aWFsIHBvc2l0aW9uIHdoZW4gaXQgaXMgcmV1c2VkLlxyXG4gICAgcHJpdmF0ZSBzZXRJbml0UG9zKG5vZGU6IGNjLk5vZGUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5ub2RlLnBhcmVudCA9IG5vZGU7XHJcblxyXG4gICAgICAgIC8vIEkgdXNlIHJhbmRvbSB0byBkZWNpZGUgd2hlcmUgdGhlIGVuZW15IGFwcGVhciBhZnRlciByZXVzZS5cclxuICAgICAgICBpZihNYXRoLnJhbmRvbSgpID4gMC41KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnBvc2l0aW9uID0gY2MudjIoNjAwLCAtMTEwKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZVggPSAxO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5lbmVteVNwZWVkID0gLTIwMDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY29sbGlkZXIuZW5hYmxlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbGxpZGVyLm9mZnNldCA9IGNjLnYyKDIwLCAwKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY29sbGlkZXIuYXBwbHkoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnBvc2l0aW9uID0gY2MudjIoLTYwMCwgLTExMCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm5vZGUuc2NhbGVYID0gLTE7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmVuZW15U3BlZWQgPSAyMDA7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbGxpZGVyLmVuYWJsZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jb2xsaWRlci5vZmZzZXQgPSBjYy52MigtMjAsIDApO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jb2xsaWRlci5hcHBseSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBjaGVjayBpZiBjdXJyZW50IHBvc2l0aW9uIGlzIG91dCBvZiB2aWV3LlxyXG4gICAgcHJpdmF0ZSBib3VuZGluZ0RldGVjdCgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5ub2RlLnggPiA2NTAgfHwgdGhpcy5ub2RlLnggPCAtNjUwKVxyXG4gICAgICAgICAgICB0aGlzLmVuZW15TWFuYWdlci5wdXQodGhpcy5ub2RlKTtcclxuICAgIH1cclxuXHJcbiAgICAvL2lmIHRoaXMgaXMgY2FsbGVkLCB0aGUgZW5lbXkgd2lsbCBmYWRlIG91dCBpbiAxcyBhbmQgZ28gYmFjayB0byB0aGUgZW5lbXkgcG9vbC5cclxuICAgIHByaXZhdGUgZGVhZEVmZmVjdCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5lbmVteVNwZWVkID0gMDtcclxuXHJcbiAgICAgICAgdGhpcy5jb2xsaWRlci5lbmFibGVkID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGxldCBmYWRlID0gY2MuZmFkZU91dCgxKTtcclxuXHJcbiAgICAgICAgbGV0IGZpbmlzaGVkID0gY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmVuZW15TWFuYWdlci5wdXQodGhpcy5ub2RlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShmYWRlLCBmaW5pc2hlZCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShkdClcclxuICAgIHtcclxuICAgICAgICB0aGlzLm5vZGUueCArPSB0aGlzLmVuZW15U3BlZWQgKiBkdDtcclxuXHJcbiAgICAgICAgdGhpcy5ib3VuZGluZ0RldGVjdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vY2hlY2sgaWYgdGhlIGNvbGxpc2lvbiBpcyB2YWxpZCBvciBub3QsIGFuZCBjYWxsIFwiZGVhZEVmZmVjdFwiIGlmIHRoZSBjb2xsaXNpb24gaXMgdmFsaWQuXHJcbiAgICBvbkJlZ2luQ29udGFjdChjb250YWN0LCBzZWxmQ29sbGlkZXIsIG90aGVyQ29sbGlkZXIpXHJcbiAgICB7XHJcbiAgICAgICAgaWYob3RoZXJDb2xsaWRlci5ub2RlLm5hbWUgPT0gXCJidWxsZXRcIiAmJiAhb3RoZXJDb2xsaWRlci5ub2RlLmdldENvbXBvbmVudCgnQnVsbGV0JykuaXNUcmlnZ2VyZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBvdGhlckNvbGxpZGVyLm5vZGUuZ2V0Q29tcG9uZW50KCdCdWxsZXQnKS5pc1RyaWdnZXJlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNjb3JlLmFkZE9uZVBvaW50KCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFuaW0uc3RvcCgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5kZWFkRWZmZWN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/migration/use_reversed_rotateTo.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '78d6cG5oG5FeZNWVyqElyEQ', 'use_reversed_rotateTo');
// migration/use_reversed_rotateTo.js

"use strict";

/*
 * This script is automatically generated by Cocos Creator and is only used for projects compatible with v2.1.0/v2.1.1/v2.2.1/v2.2.2 versions.
 * You do not need to manually add this script in any other project.
 * If you don't use cc.Action in your project, you can delete this script directly.
 * If your project is hosted in VCS such as git, submit this script together.
 *
 * 此脚本由 Cocos Creator 自动生成，仅用于兼容 v2.1.0/v2.1.1/v2.2.1/v2.2.2 版本的工程，
 * 你无需在任何其它项目中手动添加此脚本。
 * 如果你的项目中没用到 Action，可直接删除该脚本。
 * 如果你的项目有托管于 git 等版本库，请将此脚本一并上传。
 */
cc.RotateTo._reverse = true;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbWlncmF0aW9uXFx1c2VfcmV2ZXJzZWRfcm90YXRlVG8uanMiXSwibmFtZXMiOlsiY2MiLCJSb3RhdGVUbyIsIl9yZXZlcnNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQUEsRUFBRSxDQUFDQyxRQUFILENBQVlDLFFBQVosR0FBdUIsSUFBdkIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIFRoaXMgc2NyaXB0IGlzIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIGJ5IENvY29zIENyZWF0b3IgYW5kIGlzIG9ubHkgdXNlZCBmb3IgcHJvamVjdHMgY29tcGF0aWJsZSB3aXRoIHYyLjEuMC92Mi4xLjEvdjIuMi4xL3YyLjIuMiB2ZXJzaW9ucy5cclxuICogWW91IGRvIG5vdCBuZWVkIHRvIG1hbnVhbGx5IGFkZCB0aGlzIHNjcmlwdCBpbiBhbnkgb3RoZXIgcHJvamVjdC5cclxuICogSWYgeW91IGRvbid0IHVzZSBjYy5BY3Rpb24gaW4geW91ciBwcm9qZWN0LCB5b3UgY2FuIGRlbGV0ZSB0aGlzIHNjcmlwdCBkaXJlY3RseS5cclxuICogSWYgeW91ciBwcm9qZWN0IGlzIGhvc3RlZCBpbiBWQ1Mgc3VjaCBhcyBnaXQsIHN1Ym1pdCB0aGlzIHNjcmlwdCB0b2dldGhlci5cclxuICpcclxuICog5q2k6ISa5pys55SxIENvY29zIENyZWF0b3Ig6Ieq5Yqo55Sf5oiQ77yM5LuF55So5LqO5YW85a65IHYyLjEuMC92Mi4xLjEvdjIuMi4xL3YyLjIuMiDniYjmnKznmoTlt6XnqIvvvIxcclxuICog5L2g5peg6ZyA5Zyo5Lu75L2V5YW25a6D6aG555uu5Lit5omL5Yqo5re75Yqg5q2k6ISa5pys44CCXHJcbiAqIOWmguaenOS9oOeahOmhueebruS4reayoeeUqOWIsCBBY3Rpb27vvIzlj6/nm7TmjqXliKDpmaTor6XohJrmnKzjgIJcclxuICog5aaC5p6c5L2g55qE6aG555uu5pyJ5omY566h5LqOIGdpdCDnrYnniYjmnKzlupPvvIzor7flsIbmraTohJrmnKzkuIDlubbkuIrkvKDjgIJcclxuICovXHJcblxyXG5jYy5Sb3RhdGVUby5fcmV2ZXJzZSA9IHRydWU7XHJcbiJdfQ==
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Bullet.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'aeed19u5/dFi79jdO9lf9Vj', 'Bullet');
// Script/Bullet.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Bullet = /** @class */ (function (_super) {
    __extends(Bullet, _super);
    function Bullet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.anim = null;
        _this.bulletManager = null;
        _this.isTriggered = false; // I add this to make the bullet kill one enemy at a time.
        return _this;
    }
    // when created, the bullet need to be placed at correct position and play animation.
    Bullet.prototype.init = function (node) {
        this.anim = this.getComponent(cc.Animation);
        this.setInitPos(node);
        this.anim.play('bullet');
    };
    // this function is called when the bullet manager calls "get" API.
    Bullet.prototype.reuse = function (bulletManager) {
        this.bulletManager = bulletManager;
        this.isTriggered = false;
    };
    //this function sets the bullet's initial position when it is reused.
    Bullet.prototype.setInitPos = function (node) {
        this.node.parent = node.parent; // don't mount under the player, otherwise it will change direction when player move
        if (node.scaleX > 0) {
            this.node.position = cc.v2(62, 8);
            this.node.scaleX = 1;
        }
        else {
            this.node.position = cc.v2(-62, 8);
            this.node.scaleX = -1;
        }
        this.node.position = this.node.position.addSelf(node.position);
    };
    //make the bullet move from current position
    Bullet.prototype.bulletMove = function () {
        var _this = this;
        var moveDir = null;
        // move bullet to 500 far from current position in 0.8s
        if (this.node.scaleX > 0)
            moveDir = cc.moveBy(0.8, 300, 0);
        else
            moveDir = cc.moveBy(0.8, -300, 0);
        var finished = cc.callFunc(function () {
            _this.bulletManager.put(_this.node);
        });
        // after playing animation, the bullet move 0.8s and destroy itself(put back to the bullet manager)
        this.scheduleOnce(function () {
            _this.node.runAction(cc.sequence(moveDir, finished));
        });
    };
    //detect collision with enemies
    Bullet.prototype.onBeginContact = function (contact, selfCollider, otherCollider) {
        var _this = this;
        this.node.stopAllActions();
        this.unscheduleAllCallbacks();
        this.scheduleOnce(function () {
            _this.anim.stop();
            _this.bulletManager.put(_this.node);
        }, 0.1); // for better animation effect, I delay 0.1s when bullet hits the enemy
    };
    Bullet = __decorate([
        ccclass
    ], Bullet);
    return Bullet;
}(cc.Component));
exports.default = Bullet;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCdWxsZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFNLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQW9DLDBCQUFZO0lBQWhEO1FBQUEscUVBbUZDO1FBaEZXLFVBQUksR0FBRyxJQUFJLENBQUM7UUFFWixtQkFBYSxHQUFHLElBQUksQ0FBQztRQUV0QixpQkFBVyxHQUFHLEtBQUssQ0FBQyxDQUFDLDBEQUEwRDs7SUE0RTFGLENBQUM7SUExRUcscUZBQXFGO0lBQzlFLHFCQUFJLEdBQVgsVUFBWSxJQUFhO1FBRXJCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFNUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV0QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsbUVBQW1FO0lBQ25FLHNCQUFLLEdBQUwsVUFBTSxhQUFhO1FBRWYsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFFbkMsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7SUFDN0IsQ0FBQztJQUVELHFFQUFxRTtJQUM3RCwyQkFBVSxHQUFsQixVQUFtQixJQUFhO1FBRTVCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxvRkFBb0Y7UUFFcEgsSUFBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFDbEI7WUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUVsQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7U0FDeEI7YUFFRDtZQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFbkMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDekI7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFRCw0Q0FBNEM7SUFDcEMsMkJBQVUsR0FBbEI7UUFBQSxpQkFrQkM7UUFoQkcsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBRW5CLHVEQUF1RDtRQUN2RCxJQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUM7WUFDbkIsT0FBTyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQzs7WUFFakMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXRDLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUM7WUFDdkIsS0FBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDLENBQUMsQ0FBQyxDQUFDO1FBRUgsbUdBQW1HO1FBQ25HLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDZCxLQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3hELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELCtCQUErQjtJQUMvQiwrQkFBYyxHQUFkLFVBQWUsT0FBTyxFQUFFLFlBQVksRUFBRSxhQUFhO1FBQW5ELGlCQVlDO1FBVkcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUUzQixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUU5QixJQUFJLENBQUMsWUFBWSxDQUFDO1lBRWQsS0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUVqQixLQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsdUVBQXVFO0lBQ3BGLENBQUM7SUFsRmdCLE1BQU07UUFEMUIsT0FBTztPQUNhLE1BQU0sQ0FtRjFCO0lBQUQsYUFBQztDQW5GRCxBQW1GQyxDQW5GbUMsRUFBRSxDQUFDLFNBQVMsR0FtRi9DO2tCQW5Gb0IsTUFBTSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnVsbGV0IGV4dGVuZHMgY2MuQ29tcG9uZW50IFxyXG57XHJcblxyXG4gICAgcHJpdmF0ZSBhbmltID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIGJ1bGxldE1hbmFnZXIgPSBudWxsO1xyXG5cclxuICAgIHB1YmxpYyBpc1RyaWdnZXJlZCA9IGZhbHNlOyAvLyBJIGFkZCB0aGlzIHRvIG1ha2UgdGhlIGJ1bGxldCBraWxsIG9uZSBlbmVteSBhdCBhIHRpbWUuXHJcblxyXG4gICAgLy8gd2hlbiBjcmVhdGVkLCB0aGUgYnVsbGV0IG5lZWQgdG8gYmUgcGxhY2VkIGF0IGNvcnJlY3QgcG9zaXRpb24gYW5kIHBsYXkgYW5pbWF0aW9uLlxyXG4gICAgcHVibGljIGluaXQobm9kZTogY2MuTm9kZSkgXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5hbmltID0gdGhpcy5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRJbml0UG9zKG5vZGUpO1xyXG5cclxuICAgICAgICB0aGlzLmFuaW0ucGxheSgnYnVsbGV0Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgd2hlbiB0aGUgYnVsbGV0IG1hbmFnZXIgY2FsbHMgXCJnZXRcIiBBUEkuXHJcbiAgICByZXVzZShidWxsZXRNYW5hZ2VyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuYnVsbGV0TWFuYWdlciA9IGJ1bGxldE1hbmFnZXI7XHJcblxyXG4gICAgICAgIHRoaXMuaXNUcmlnZ2VyZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvL3RoaXMgZnVuY3Rpb24gc2V0cyB0aGUgYnVsbGV0J3MgaW5pdGlhbCBwb3NpdGlvbiB3aGVuIGl0IGlzIHJldXNlZC5cclxuICAgIHByaXZhdGUgc2V0SW5pdFBvcyhub2RlOiBjYy5Ob2RlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubm9kZS5wYXJlbnQgPSBub2RlLnBhcmVudDsgLy8gZG9uJ3QgbW91bnQgdW5kZXIgdGhlIHBsYXllciwgb3RoZXJ3aXNlIGl0IHdpbGwgY2hhbmdlIGRpcmVjdGlvbiB3aGVuIHBsYXllciBtb3ZlXHJcblxyXG4gICAgICAgIGlmKG5vZGUuc2NhbGVYID4gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5wb3NpdGlvbiA9IGNjLnYyKDYyLCA4KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZVggPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUucG9zaXRpb24gPSBjYy52MigtNjIsIDgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlWCA9IC0xO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5ub2RlLnBvc2l0aW9uID0gdGhpcy5ub2RlLnBvc2l0aW9uLmFkZFNlbGYobm9kZS5wb3NpdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLy9tYWtlIHRoZSBidWxsZXQgbW92ZSBmcm9tIGN1cnJlbnQgcG9zaXRpb25cclxuICAgIHByaXZhdGUgYnVsbGV0TW92ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IG1vdmVEaXIgPSBudWxsO1xyXG5cclxuICAgICAgICAvLyBtb3ZlIGJ1bGxldCB0byA1MDAgZmFyIGZyb20gY3VycmVudCBwb3NpdGlvbiBpbiAwLjhzXHJcbiAgICAgICAgaWYodGhpcy5ub2RlLnNjYWxlWCA+IDApXHJcbiAgICAgICAgICAgIG1vdmVEaXIgPSBjYy5tb3ZlQnkoMC44LCAzMDAsIDApO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgbW92ZURpciA9IGNjLm1vdmVCeSgwLjgsIC0zMDAsIDApO1xyXG5cclxuICAgICAgICBsZXQgZmluaXNoZWQgPSBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYnVsbGV0TWFuYWdlci5wdXQodGhpcy5ub2RlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gYWZ0ZXIgcGxheWluZyBhbmltYXRpb24sIHRoZSBidWxsZXQgbW92ZSAwLjhzIGFuZCBkZXN0cm95IGl0c2VsZihwdXQgYmFjayB0byB0aGUgYnVsbGV0IG1hbmFnZXIpXHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKG1vdmVEaXIsIGZpbmlzaGVkKSk7XHJcbiAgICAgICAgfSk7IFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL2RldGVjdCBjb2xsaXNpb24gd2l0aCBlbmVtaWVzXHJcbiAgICBvbkJlZ2luQ29udGFjdChjb250YWN0LCBzZWxmQ29sbGlkZXIsIG90aGVyQ29sbGlkZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcblxyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYW5pbS5zdG9wKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmJ1bGxldE1hbmFnZXIucHV0KHRoaXMubm9kZSk7XHJcbiAgICAgICAgfSwgMC4xKTsgLy8gZm9yIGJldHRlciBhbmltYXRpb24gZWZmZWN0LCBJIGRlbGF5IDAuMXMgd2hlbiBidWxsZXQgaGl0cyB0aGUgZW5lbXlcclxuICAgIH1cclxufVxyXG4iXX0=
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Player.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a7b801wuUdCc4tfD8dqSgRX', 'Player');
// Script/Player.ts

Object.defineProperty(exports, "__esModule", { value: true });
var score_1 = require("./score");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.anim = null; //this will use to get animation component
        _this.animateState = null; //this will use to record animationState
        _this.bulletPrefab = null;
        _this.score = null;
        _this.bulletPool = null; // this is a bullet manager, and it control the bullet resource
        _this.playerSpeed = 0;
        _this.zDown = false; // key for player to go left
        _this.xDown = false; // key for player to go right
        _this.jDown = false; // key for player to shoot
        _this.kDown = false; // key for player to jump
        _this.onGround = false;
        _this.isDead = true;
        return _this;
    }
    Player.prototype.onLoad = function () {
        // ===================== TODO =====================
        // 1. Use "this.anim" to record Animation 
        this.anim = this.getComponent(cc.Animation);
        // ================================================
        cc.director.getCollisionManager().enabled = true;
        cc.director.getPhysicsManager().enabled = true;
        this.bulletPool = new cc.NodePool('Bullet');
        var maxBulletNum = 5;
        for (var i = 0; i < maxBulletNum; i++) {
            var bullet = cc.instantiate(this.bulletPrefab);
            this.bulletPool.put(bullet);
        }
    };
    Player.prototype.start = function () {
        // add key down and key up event
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    };
    Player.prototype.update = function (dt) {
        this.playerMovement(dt);
        this.playerAnimation();
    };
    Player.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.z:
                this.zDown = true;
                this.xDown = false;
                break;
            case cc.macro.KEY.x:
                this.xDown = true;
                this.zDown = false;
                break;
            case cc.macro.KEY.j:
                this.jDown = true;
                break;
            case cc.macro.KEY.k:
                this.kDown = true;
                break;
        }
    };
    Player.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.z:
                this.zDown = false;
                break;
            case cc.macro.KEY.x:
                this.xDown = false;
                break;
            case cc.macro.KEY.j:
                this.jDown = false;
                break;
            case cc.macro.KEY.k:
                this.kDown = false;
                break;
        }
    };
    Player.prototype.playerMovement = function (dt) {
        if (this.isDead)
            this.playerSpeed = 0;
        else if (this.jDown || this.anim.getAnimationState('shoot').isPlaying)
            this.playerSpeed = 0;
        else if (this.zDown)
            this.playerSpeed = -300;
        else if (this.xDown)
            this.playerSpeed = 300;
        else
            this.playerSpeed = 0;
        this.node.x += this.playerSpeed * dt; //move player
    };
    Player.prototype.playerAnimation = function () {
        this.node.scaleX = (this.zDown) ? -1 : (this.xDown) ? 1 : this.node.scaleX;
        if (this.isDead) {
            //reset player position and play reborn animation
            if (this.animateState == null || this.animateState.name != 'reborn') {
                this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
                // ===================== TODO =====================
                // 1. reset the player's position to (-192, 255)                
                this.node.setPosition(-192, 255);
                // 2. play reborn animation and use "this.animateState" to record animation state
                this.animateState = this.anim.play("reborn");
                // 3. register a callback function when reborn animation finish, and set the value of this.isDead to false in the callback function
                // ================================================
                //reset score value
                this.score.resetScore();
            }
        }
        else if (!this.anim.getAnimationState('shoot').isPlaying && !this.anim.getAnimationState('jump').isPlaying && this.onGround) // move animation can play only when shoot or jump animation finished
         {
            if (this.jDown)
                this.animateState = this.anim.play('shoot');
            else if (this.kDown) {
                this.animateState = this.anim.play('jump');
                this.jump();
            }
            else if (this.zDown || this.xDown) {
                // console.log(this.animateState)
                if (this.animateState == null || this.animateState.name != 'move') // when first call or last animation is not move
                    this.animateState = this.anim.play('move');
            }
            else {
                //if no key is pressed and the player is on ground, stop all animations and go back to idle
                if (this.animateState == null || this.animateState.name != 'idle')
                    this.animateState = this.anim.play('idle');
            }
        }
    };
    //give velocity to the player
    Player.prototype.jump = function () {
        this.onGround = false;
        // ===================== TODO =====================
        // 1. set the linearVelocity of RigidBody to (0, 1500)
        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 1500);
        // ================================================
    };
    // call this when player shoots the bullet.
    Player.prototype.createBullet = function () {
        var bullet = null;
        if (this.bulletPool.size() > 0)
            bullet = this.bulletPool.get(this.bulletPool);
        if (bullet != null)
            bullet.getComponent('Bullet').init(this.node);
    };
    //check if the collision is valid or not
    Player.prototype.onBeginContact = function (contact, selfCollider, otherCollider) {
        if (otherCollider.tag == 2 && !this.isDead) //enemy tag
            this.isDead = true;
        // ===================== TODO ===================== 
        // 1. Use otherCollider.tag to check if the player collides with ground or block(the tag of both ground and block are 1), 
        // and do step2 and step3 when the condition is true
        // 2. set the value of this.onGround to true
        // 3. check if jump animation still playing, if yes, stop it and play idle animation 
        if (otherCollider.tag == 1) {
            if (!this.anim.getAnimationState("jump").isPlaying)
                this.onGround = true;
        }
        // ================================================
    };
    Player.prototype.reborn = function () {
        this.isDead = false;
    };
    __decorate([
        property(cc.Prefab)
    ], Player.prototype, "bulletPrefab", void 0);
    __decorate([
        property(score_1.default)
    ], Player.prototype, "score", void 0);
    Player = __decorate([
        ccclass
    ], Player);
    return Player;
}(cc.Component));
exports.default = Player;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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R0FBQyxJQUFJLENBQUM7U0FDeEU7UUFDRCxtREFBbUQ7SUFDdkQsQ0FBQztJQUVELHVCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBdE9EO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7Z0RBQ21CO0lBR3ZDO1FBREMsUUFBUSxDQUFDLGVBQUssQ0FBQzt5Q0FDWTtJQVhYLE1BQU07UUFEMUIsT0FBTztPQUNhLE1BQU0sQ0ErTzFCO0lBQUQsYUFBQztDQS9PRCxBQStPQyxDQS9PbUMsRUFBRSxDQUFDLFNBQVMsR0ErTy9DO2tCQS9Pb0IsTUFBTSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzY29yZSBmcm9tIFwiLi9zY29yZVwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQgXHJcbntcclxuXHJcbiAgICBwcml2YXRlIGFuaW0gPSBudWxsOyAvL3RoaXMgd2lsbCB1c2UgdG8gZ2V0IGFuaW1hdGlvbiBjb21wb25lbnRcclxuXHJcbiAgICBwcml2YXRlIGFuaW1hdGVTdGF0ZSA9IG51bGw7IC8vdGhpcyB3aWxsIHVzZSB0byByZWNvcmQgYW5pbWF0aW9uU3RhdGVcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgcHJpdmF0ZSBidWxsZXRQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHNjb3JlKVxyXG4gICAgcHJpdmF0ZSBzY29yZTogc2NvcmUgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgYnVsbGV0UG9vbCA9IG51bGw7IC8vIHRoaXMgaXMgYSBidWxsZXQgbWFuYWdlciwgYW5kIGl0IGNvbnRyb2wgdGhlIGJ1bGxldCByZXNvdXJjZVxyXG5cclxuICAgIHByaXZhdGUgcGxheWVyU3BlZWQ6IG51bWJlciA9IDA7XHJcblxyXG4gICAgcHJpdmF0ZSB6RG93bjogYm9vbGVhbiA9IGZhbHNlOyAvLyBrZXkgZm9yIHBsYXllciB0byBnbyBsZWZ0XHJcblxyXG4gICAgcHJpdmF0ZSB4RG93bjogYm9vbGVhbiA9IGZhbHNlOyAvLyBrZXkgZm9yIHBsYXllciB0byBnbyByaWdodFxyXG5cclxuICAgIHByaXZhdGUgakRvd246IGJvb2xlYW4gPSBmYWxzZTsgLy8ga2V5IGZvciBwbGF5ZXIgdG8gc2hvb3RcclxuXHJcbiAgICBwcml2YXRlIGtEb3duOiBib29sZWFuID0gZmFsc2U7IC8vIGtleSBmb3IgcGxheWVyIHRvIGp1bXBcclxuXHJcbiAgICBwcml2YXRlIG9uR3JvdW5kOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgcHJpdmF0ZSBpc0RlYWQ6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIG9uTG9hZCgpXHJcbiAgICB7XHJcbiAgICAgICAgLy8gPT09PT09PT09PT09PT09PT09PT09IFRPRE8gPT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAgICAgLy8gMS4gVXNlIFwidGhpcy5hbmltXCIgdG8gcmVjb3JkIEFuaW1hdGlvbiBcclxuICAgICAgICB0aGlzLmFuaW09dGhpcy5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcclxuICAgICAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICAgICAgY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpLmVuYWJsZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICBjYy5kaXJlY3Rvci5nZXRQaHlzaWNzTWFuYWdlcigpLmVuYWJsZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICB0aGlzLmJ1bGxldFBvb2wgPSBuZXcgY2MuTm9kZVBvb2woJ0J1bGxldCcpO1xyXG5cclxuICAgICAgICBsZXQgbWF4QnVsbGV0TnVtID0gNTtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgbWF4QnVsbGV0TnVtOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgYnVsbGV0ID0gY2MuaW5zdGFudGlhdGUodGhpcy5idWxsZXRQcmVmYWIpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5idWxsZXRQb29sLnB1dChidWxsZXQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGFydCgpIFxyXG4gICAge1xyXG4gICAgICAgIC8vIGFkZCBrZXkgZG93biBhbmQga2V5IHVwIGV2ZW50XHJcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQub24oY2MuU3lzdGVtRXZlbnQuRXZlbnRUeXBlLktFWV9ET1dOLCB0aGlzLm9uS2V5RG93biwgdGhpcyk7XHJcblxyXG4gICAgICAgIGNjLnN5c3RlbUV2ZW50Lm9uKGNjLlN5c3RlbUV2ZW50LkV2ZW50VHlwZS5LRVlfVVAsIHRoaXMub25LZXlVcCwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKGR0KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMucGxheWVyTW92ZW1lbnQoZHQpO1xyXG5cclxuICAgICAgICB0aGlzLnBsYXllckFuaW1hdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uS2V5RG93bihldmVudCkgXHJcbiAgICB7XHJcbiAgICAgICAgc3dpdGNoKGV2ZW50LmtleUNvZGUpIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2FzZSBjYy5tYWNyby5LRVkuejpcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnpEb3duID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnhEb3duID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlIGNjLm1hY3JvLktFWS54OlxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMueERvd24gPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuekRvd24gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLmo6XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5qRG93biA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlIGNjLm1hY3JvLktFWS5rOlxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMua0Rvd24gPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbktleVVwKGV2ZW50KVxyXG4gICAge1xyXG4gICAgICAgIHN3aXRjaChldmVudC5rZXlDb2RlKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLno6XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy56RG93biA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSBjYy5tYWNyby5LRVkueDpcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnhEb3duID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlIGNjLm1hY3JvLktFWS5qOlxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuakRvd24gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLms6XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5rRG93biA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHBsYXllck1vdmVtZW50KGR0KVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuaXNEZWFkKVxyXG4gICAgICAgICAgICB0aGlzLnBsYXllclNwZWVkID0gMDtcclxuICAgICAgICBlbHNlIGlmKHRoaXMuakRvd24gfHwgdGhpcy5hbmltLmdldEFuaW1hdGlvblN0YXRlKCdzaG9vdCcpLmlzUGxheWluZylcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJTcGVlZCA9IDA7XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLnpEb3duKVxyXG4gICAgICAgICAgICB0aGlzLnBsYXllclNwZWVkID0gLTMwMDtcclxuICAgICAgICBlbHNlIGlmKHRoaXMueERvd24pXHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyU3BlZWQgPSAzMDA7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLnBsYXllclNwZWVkID0gMDtcclxuXHJcbiAgICAgICAgdGhpcy5ub2RlLnggKz0gdGhpcy5wbGF5ZXJTcGVlZCAqIGR0OyAgLy9tb3ZlIHBsYXllclxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcGxheWVyQW5pbWF0aW9uKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLm5vZGUuc2NhbGVYID0gKHRoaXMuekRvd24pID8gLTEgOiAodGhpcy54RG93bikgPyAxIDogdGhpcy5ub2RlLnNjYWxlWDtcclxuXHJcbiAgICAgICAgaWYodGhpcy5pc0RlYWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL3Jlc2V0IHBsYXllciBwb3NpdGlvbiBhbmQgcGxheSByZWJvcm4gYW5pbWF0aW9uXHJcbiAgICAgICAgICAgIGlmKHRoaXMuYW5pbWF0ZVN0YXRlID09IG51bGwgfHwgdGhpcy5hbmltYXRlU3RhdGUubmFtZSAhPSAncmVib3JuJylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5SaWdpZEJvZHkpLmxpbmVhclZlbG9jaXR5ID0gY2MudjIoMCwgMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gPT09PT09PT09PT09PT09PT09PT09IFRPRE8gPT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAgICAgICAgICAgICAvLyAxLiByZXNldCB0aGUgcGxheWVyJ3MgcG9zaXRpb24gdG8gKC0xOTIsIDI1NSkgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24oLTE5MiwyNTUpO1xyXG4gICAgICAgICAgICAgICAgLy8gMi4gcGxheSByZWJvcm4gYW5pbWF0aW9uIGFuZCB1c2UgXCJ0aGlzLmFuaW1hdGVTdGF0ZVwiIHRvIHJlY29yZCBhbmltYXRpb24gc3RhdGVcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZVN0YXRlPXRoaXMuYW5pbS5wbGF5KFwicmVib3JuXCIpO1xyXG4gICAgICAgICAgICAgICAgLy8gMy4gcmVnaXN0ZXIgYSBjYWxsYmFjayBmdW5jdGlvbiB3aGVuIHJlYm9ybiBhbmltYXRpb24gZmluaXNoLCBhbmQgc2V0IHRoZSB2YWx1ZSBvZiB0aGlzLmlzRGVhZCB0byBmYWxzZSBpbiB0aGUgY2FsbGJhY2sgZnVuY3Rpb25cclxuICAgICAgICAgICAgICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgICAgICAgICAgICAgIC8vcmVzZXQgc2NvcmUgdmFsdWVcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NvcmUucmVzZXRTY29yZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoIXRoaXMuYW5pbS5nZXRBbmltYXRpb25TdGF0ZSgnc2hvb3QnKS5pc1BsYXlpbmcgJiYgIXRoaXMuYW5pbS5nZXRBbmltYXRpb25TdGF0ZSgnanVtcCcpLmlzUGxheWluZyAmJiB0aGlzLm9uR3JvdW5kKSAvLyBtb3ZlIGFuaW1hdGlvbiBjYW4gcGxheSBvbmx5IHdoZW4gc2hvb3Qgb3IganVtcCBhbmltYXRpb24gZmluaXNoZWRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuakRvd24pXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVTdGF0ZSA9IHRoaXMuYW5pbS5wbGF5KCdzaG9vdCcpO1xyXG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMua0Rvd24pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVTdGF0ZSA9IHRoaXMuYW5pbS5wbGF5KCdqdW1wJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuanVtcCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy56RG93biB8fCB0aGlzLnhEb3duKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmFuaW1hdGVTdGF0ZSlcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuYW5pbWF0ZVN0YXRlID09IG51bGwgfHwgdGhpcy5hbmltYXRlU3RhdGUubmFtZSAhPSAnbW92ZScpIC8vIHdoZW4gZmlyc3QgY2FsbCBvciBsYXN0IGFuaW1hdGlvbiBpcyBub3QgbW92ZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZVN0YXRlID0gdGhpcy5hbmltLnBsYXkoJ21vdmUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vaWYgbm8ga2V5IGlzIHByZXNzZWQgYW5kIHRoZSBwbGF5ZXIgaXMgb24gZ3JvdW5kLCBzdG9wIGFsbCBhbmltYXRpb25zIGFuZCBnbyBiYWNrIHRvIGlkbGVcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuYW5pbWF0ZVN0YXRlID09IG51bGwgfHwgdGhpcy5hbmltYXRlU3RhdGUubmFtZSAhPSAnaWRsZScpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlU3RhdGUgPSB0aGlzLmFuaW0ucGxheSgnaWRsZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vZ2l2ZSB2ZWxvY2l0eSB0byB0aGUgcGxheWVyXHJcbiAgICBwcml2YXRlIGp1bXAoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMub25Hcm91bmQgPSBmYWxzZTtcclxuXHJcblxyXG4gICAgICAgIC8vID09PT09PT09PT09PT09PT09PT09PSBUT0RPID09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgICAgIC8vIDEuIHNldCB0aGUgbGluZWFyVmVsb2NpdHkgb2YgUmlnaWRCb2R5IHRvICgwLCAxNTAwKVxyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlJpZ2lkQm9keSkubGluZWFyVmVsb2NpdHk9Y2MudjIoMCwxNTAwKTtcclxuICAgICAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIH1cclxuXHJcbiAgICAvLyBjYWxsIHRoaXMgd2hlbiBwbGF5ZXIgc2hvb3RzIHRoZSBidWxsZXQuXHJcbiAgICBwcml2YXRlIGNyZWF0ZUJ1bGxldCgpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGJ1bGxldCA9IG51bGw7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmJ1bGxldFBvb2wuc2l6ZSgpID4gMCkgXHJcbiAgICAgICAgICAgIGJ1bGxldCA9IHRoaXMuYnVsbGV0UG9vbC5nZXQodGhpcy5idWxsZXRQb29sKTtcclxuXHJcbiAgICAgICAgaWYoYnVsbGV0ICE9IG51bGwpXHJcbiAgICAgICAgICAgIGJ1bGxldC5nZXRDb21wb25lbnQoJ0J1bGxldCcpLmluaXQodGhpcy5ub2RlKTtcclxuICAgIH1cclxuXHJcbiAgICAvL2NoZWNrIGlmIHRoZSBjb2xsaXNpb24gaXMgdmFsaWQgb3Igbm90XHJcbiAgICBvbkJlZ2luQ29udGFjdChjb250YWN0LCBzZWxmQ29sbGlkZXIsIG90aGVyQ29sbGlkZXIpXHJcbiAgICB7XHJcbiAgICAgICAgaWYob3RoZXJDb2xsaWRlci50YWcgPT0gMiAmJiAhdGhpcy5pc0RlYWQpIC8vZW5lbXkgdGFnXHJcbiAgICAgICAgICAgIHRoaXMuaXNEZWFkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgLy8gPT09PT09PT09PT09PT09PT09PT09IFRPRE8gPT09PT09PT09PT09PT09PT09PT09IFxyXG4gICAgICAgIC8vIDEuIFVzZSBvdGhlckNvbGxpZGVyLnRhZyB0byBjaGVjayBpZiB0aGUgcGxheWVyIGNvbGxpZGVzIHdpdGggZ3JvdW5kIG9yIGJsb2NrKHRoZSB0YWcgb2YgYm90aCBncm91bmQgYW5kIGJsb2NrIGFyZSAxKSwgXHJcbiAgICAgICAgLy8gYW5kIGRvIHN0ZXAyIGFuZCBzdGVwMyB3aGVuIHRoZSBjb25kaXRpb24gaXMgdHJ1ZVxyXG4gICAgICAgIC8vIDIuIHNldCB0aGUgdmFsdWUgb2YgdGhpcy5vbkdyb3VuZCB0byB0cnVlXHJcbiAgICAgICAgLy8gMy4gY2hlY2sgaWYganVtcCBhbmltYXRpb24gc3RpbGwgcGxheWluZywgaWYgeWVzLCBzdG9wIGl0IGFuZCBwbGF5IGlkbGUgYW5pbWF0aW9uIFxyXG4gICAgICAgIGlmKG90aGVyQ29sbGlkZXIudGFnPT0xKXtcclxuICAgICAgICAgICAgaWYoIXRoaXMuYW5pbS5nZXRBbmltYXRpb25TdGF0ZShcImp1bXBcIikuaXNQbGF5aW5nKXRoaXMub25Hcm91bmQ9dHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICB9XHJcblxyXG4gICAgcmVib3JuKCl7XHJcbiAgICAgICAgdGhpcy5pc0RlYWQ9ZmFsc2U7XHJcbiAgICB9XHJcbn0iXX0=
//------QC-SOURCE-SPLIT------
