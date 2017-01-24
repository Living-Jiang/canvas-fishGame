! function(window) {
    //canvas2上海葵绘制ane
    //新建海葵构造函数
    var aneObj = function() {
        this.x = [];
        this.y = canH;
        this.len = [];
        this.headx = [];
        this.alpha = 0;
        this.amp = [];
        this.angle = [];
    }
    aneObj.prototype.num = 40;
    //确定每根海葵的位置
    aneObj.prototype.init = function() {
            for (var i = 0; i < this.num; i++) {
                this.headx[i] = this.x[i] = i * 20 + Math.random() * 5;
                this.len[i] = 160 + Math.random() * 50;
                this.amp[i] = Math.random() * 30 + 50;
            }
        }
        //开始绘制
    aneObj.prototype.draw = function() {
            this.alpha += 0.05;
            cnt2.save();
            cnt2.globalAlpha = 0.6;
            cnt2.lineCap = 'round';
            cnt2.lineWidth = 20;
            cnt2.strokeStyle = '#3b154e';
            for (var i = 0; i < this.num; i++) {
                this.angle[i] = Math.sin(this.alpha);
                cnt2.beginPath();
                cnt2.moveTo(this.x[i], this.y);
                cnt2.quadraticCurveTo(this.x[i], canH - 60, this.headx[i] + this.angle[i] * this.amp[i], canH - this.len[i]);
                cnt2.stroke();
                cnt2.closePath();
            }
            cnt2.restore();
        }
        //海葵绘制完成
      window.aneObj = aneObj;
}(window)
