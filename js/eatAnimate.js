! function(window) {
    // 吃果实动画开始
    function eatAnimate() {
        this.num = 10;
        this.alive = [];
        this.x = [];
        this.y = [];
        this.r = [];
    }
    eatAnimate.prototype.init = function() {
        for (var i = 0; i < this.num; i++) {
            this.alive[i] = false;
            this.r[i] = 5;
        }
    }
    eatAnimate.prototype.draw = function(line, r, c1, c2, c3) {
        cnt1.save();
        cnt1.lineWidth = line;
        cnt1.shadowBlur = 5;
        cnt1.shadowColor = 'rgba(' + c1 + ',' + c2 + ',' + c3 + ',)';
        for (var i = 0; i < this.num; i++) {
            if (this.alive[i]) {
                this.r[i]++;
                var alpha = 1 - this.r[i] / r;
                if (this.r[i] > r) {
                    this.r[i] = 5;
                    this.dead(i);
                }
                // draw
                cnt1.beginPath();
                cnt1.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI * 2);
                cnt1.strokeStyle = 'rgba(' + c1 + ',' + c2 + ',' + c3 + ',' + alpha + ')';
                cnt1.stroke();
                cnt1.closePath();
            }
        }
        cnt1.restore();
    }
    eatAnimate.prototype.born = function(x, y) {
        for (var i = 0; i < this.num; i++) {
            if (!this.alive[i]) {
                this.x[i] = x;
                this.y[i] = y;
                this.alive[i] = true;
                return;
            }
        }
    }
    eatAnimate.prototype.dead = function(i) {
            this.alive[i] = false;
        }
        // 吃果实动画结束
    window.eatAnimate = eatAnimate;
}(window);
