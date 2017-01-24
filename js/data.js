! function(window) {
    // 数据统计
    function dataObj() {}
    dataObj.prototype.init = function() {
        this.fruitNum = 0;
        this.double = 1;
        this.score = 0;
    }
    dataObj.prototype.draw = function() {
        cnt1.save();
        cnt1.fillStyle = 'white';
        cnt1.font = '20px Verdana';
        cnt1.textAlign = 'center';
        cnt1.fillText('num ' + this.fruitNum, canW / 2 - 10, canH - 20);
        cnt1.fillText('double ' + this.double, canW / 2 - 11, canH - 50);
        cnt1.font = '30px Verdana';
        cnt1.fillText('score ' + this.score, canW / 2, canH / 8);
        cnt1.restore();
    }
    window.dataObj = dataObj;
}(window)
