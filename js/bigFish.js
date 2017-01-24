! function(window) {
    //繪製大魚
    function bigFishObj() {}
    bigFishObj.prototype.init = function() {
        this.bodyOrange = [];
        this.countOrange = 0;
        this.bodyBlue = [];
        this.countBlue = 0;
        this.bodySwin = [];
        this.countSwin = 0;
        this.bodySwinB = [];
        this.body = null;
        this.isEat = true;
        this.isDoble = false;
        this.dobleTimer = 0;
        this.eye = [];
        this.tail = [];
        this.tailTimer = 0;
        this.angle = 0;
        this.x = canW / 2;
        this.y = canH / 2;
        // 记录吃果实数
        this.fruit = 0;
        for (var i = 0; i < 8; i++) {
            this.tail[i] = new Image();
            this.tail[i].src = 'images/bigTail' + i + '.png';
        }
        for (var i = 0; i < 2; i++) {
            this.eye[i] = new Image();
            this.eye[i].src = 'images/babyEye' + i + '.png';
        }
        for (var i = 0; i < 8; i++) {
            this.bodyOrange[i] = new Image();
            this.bodyOrange[i].src = 'images/bigEat' + i + '.png';
        }
        for (var i = 0; i < 8; i++) {
            this.bodyBlue[i] = new Image();
            this.bodyBlue[i].src = 'images/bigEatBlue' + i + '.png';
        }
        for (var i = 0; i < 8; i++) {
            this.bodySwin[i] = new Image();
            this.bodySwin[i].src = 'images/bigSwim' + i + '.png';
        }
        for (var i = 0; i < 8; i++) {
            this.bodySwinB[i] = new Image();
            this.bodySwinB[i].src = 'images/bigSwimBlue' + i + '.png';
        }

    }
    bigFishObj.prototype.draw = function() {
            //尾巴动画
            this.tailTimer++;
            var countTail = this.tailTimer % 8;
            //眼睛动画
            var random = parseInt(10 * Math.random());
            var countEye = this.tailTimer % (40 + random) < 2 ? 1 : 0;
            //身体变化
            if (this.isEat) {
                this.body = this.bodySwin[this.countSwin];
            }
            if (this.isDoble) {
                this.countBlue = this.countBlue - 0.1;
                this.body = this.bodyBlue[Math.ceil(this.countBlue)];
                if (this.isEat) {
                    this.body = this.bodySwinB[Math.ceil(this.countBlue)];
                }
                if (this.countBlue < -0.9) {
                    this.isDoble = false;
                    data.double = 1;
                }
            }
            // 大魚跟隨鼠標
            this.x += (mx - this.x) * 0.06;
            this.y += (my - this.y) * 0.06;
            //魚身旋轉
            var angleTar = Math.atan2(this.y - my, this.x - mx);
            this.angle = lerpAngle(angleTar, this.angle, 0.8);
            cnt1.save();
            cnt1.translate(this.x, this.y);
            cnt1.rotate(this.angle);
            cnt1.drawImage(this.tail[countTail], -this.tail[countTail].width / 2 + 30, -this.tail[countTail].height / 2);
            cnt1.drawImage(this.body, -this.body.width / 2, -this.body.height / 2);
            cnt1.drawImage(this.eye[countEye], -this.eye[countEye].width / 2, -this.eye[countEye].height / 2);
            cnt1.restore();
        }
        //大鱼结束
       window.bigFishObj
 = bigFishObj;
}(window)
