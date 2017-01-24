! function(window) {
    //果实绘制开始
    function fruitObj() {
        this.alive = [];
        this.x = [];
        this.y = [];
        this.l = [];
        this.sp = [];
        this.orange = new Image();
        this.blue = new Image();
        this.pic = [];
        this.aneId = [];
    }
    fruitObj.prototype.num = 30;
    fruitObj.prototype.init = function() {
            for (var i = 0; i < this.num; i++) {
                this.alive[i] = true;
                this.x[i] = 0;
                this.y[i] = 0;
                this.born(i);
            }
            this.orange.src = 'images/fruit.png';
            this.blue.src = 'images/blue.png';
        }
        //畫出果實
    fruitObj.prototype.draw = function() {
            //如果果實數量小於15讓果實出生
            if (!this.getAlive()) {
                do {
                    var k = parseInt(Math.random() * 30);
                } while (this.alive[k]);
                this.born(k);
            }
            for (var i = 0; i < this.num; i++) {
                if (this.alive[i]) {
                    this.grow(i);
                    cnt2.drawImage(this.pic[i], this.x[i] - this.l[i] / 2, this.y[i] - this.l[i] / 2, this.l[i], this.l[i]);
                }
            }
        }
        // 果實出生在某個海葵上
    fruitObj.prototype.born = function(i) {
            //出生時確定果實的顏色
            if (Math.random() * 10 > 3) {
                this.pic[i] = this.orange;
            } else {
                this.pic[i] = this.blue;
            }
            // 重置果實的位置，速度，大小和活著的狀態	
            this.alive[i] = true;
            this.aneId[i] = parseInt((Math.random() * ane.num));
            this.x[i] = ane.headx[this.aneId[i]];
            this.y[i] = canH - ane.len[this.aneId[i]];
            this.l[i] = 5;
            this.sp[i] = 1 + Math.random() * 4;
            if (this.pic[i] == this.blue) {
                this.sp[i] += 2;
            }

        }
        //果實變大和上浮
    fruitObj.prototype.grow = function(i) {
            if (this.l[i] < 13) {
                this.x[i] = ane.headx[this.aneId[i]] + ane.angle[this.aneId[i]] * ane.amp[this.aneId[i]];
                this.y[i] = canH - ane.len[this.aneId[i]];
                this.l[i] += 0.2;
            } else {
                this.y[i] -= this.sp[i];
            }
            //上浮到canvas外面時果實消失
            if (this.y[i] < -this.l[i] / 2) {
                this.dead(i);
            }
        }
        //判斷活著的果實數量
    fruitObj.prototype.getAlive = function() {
            var num = 0;
            for (var i = 0; i < this.alive.length; i++) {
                if (this.alive[i]) {
                    num++;
                }
            }
            if (num >= 15) {
                return true;
            }
        }
        //果實消失
    fruitObj.prototype.dead = function(i) {
        this.alive[i] = false;
    }
    window.fruitObj = fruitObj;
}(window)
