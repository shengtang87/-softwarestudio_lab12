
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