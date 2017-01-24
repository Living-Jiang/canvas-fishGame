! function(window) {
    //小鱼绘制
    function smallFishObj() {
        this.body = [];
        this.eye = [];
        this.tail = [];
    }
    smallFishObj.prototype.init = function() {
        this.countBody = 0;
        this.tailTimer = 0;
        this.bodyTimer = 0;
        this.angle = 0;
        this.x = canW / 2 + 50;
        this.y = canH / 2;
        for (var i = 0; i < 8; i++) {
            this.tail[i] = new Image();
            this.tail[i].src = 'images/babyTail' + i + '.png';
        }
        for (var i = 0; i < 2; i++) {
            this.eye[i] = new Image();
            this.eye[i].src = 'images/babyEye' + i + '.png';
        }
        for (var i = 0; i < 20; i++) {
            this.body[i] = new Image();
            this.body[i].src = 'images/babyFade' + i + '.png';
        }
    }
    smallFishObj.prototype.draw = function() {
            //尾巴动画
            this.tailTimer++;
            var countTail = this.tailTimer % 8;
            //眼睛动画
            var random = parseInt(10 * Math.random());
            var countEye = this.tailTimer % (40 + random) < 2 ? 1 : 0;
            //身体变化
            this.bodyTimer++;
            // console.log(parseInt(this.bodyTimer/5)%20);
            if (this.bodyTimer < 160) {
                this.countBody = parseInt(this.bodyTimer / 8) % 20;
            } else {
                this.bodyTimer = 160; //0-199
            }
            //游戏还在进行
            if (this.bodyTimer != 160) {
                //跟随大鱼
                this.x += (bigFish.x - this.x) * 0.02;
                this.y += (bigFish.y - this.y) * 0.02;
                //角度旋转
                var angleTar = Math.atan2(this.y - bigFish.y, this.x - bigFish.x);
                this.angle = lerpAngle(angleTar, this.angle, 0.8);
            }
            //绘制小鱼
            cnt1.save();
            cnt1.translate(this.x, this.y);
            cnt1.rotate(this.angle);
            cnt1.drawImage(this.tail[countTail], -this.tail[countTail].width / 2 + 24, -this.tail[countTail].height / 2);
            cnt1.drawImage(this.body[this.countBody], -this.body[this.countBody].width / 2, -this.body[this.countBody].height / 2);
            cnt1.drawImage(this.eye[countEye], -this.eye[countEye].width / 2, -this.eye[countEye].height / 2);
            cnt1.restore();
        }
        // 小鱼结束
    window.smallFishObj = smallFishObj; 
        
}(window);
