
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