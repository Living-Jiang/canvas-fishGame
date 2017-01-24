! function(window) {
    //漂浮物
    function dustObj() {
        this.x = [];
        this.y = [];
        this.amp = [];
        this.alpha = 0;
        this.num = 30;
        this.pic = [];
        this.k = [];
    }

    dustObj.prototype.init = function() {
        for (var i = 0; i < 7; i++) {
            this.pic[i] = new Image();
            this.pic[i].src = 'images/dust' + i + '.png';
        }
        for (var i = 0; i < this.num; i++) {
            this.x[i] = Math.random() * canW;
            this.y[i] = Math.random() * canH;
            this.amp[i] = 25 + Math.random() * 25;
            this.k[i] = parseInt(Math.random() * 7);
        }
    }
    dustObj.prototype.draw = function() {
        this.alpha += 0.05;
        var l = Math.sin(this.alpha);
        cnt1.save();
        for (var i = 0; i < this.num; i++) {
            cnt1.beginPath();
            cnt1.drawImage(this.pic[this.k[i]], this.x[i] + l * this.amp[i], this.y[i]);
            cnt1.closePath();
        }
        cnt1.restore();

    }
    window.dustObj = dustObj;
}(window);
