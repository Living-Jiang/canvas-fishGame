! function(windosw) {
    // 大鱼喂小鱼开始
    function feed() {
        var pox = Math.abs(bigFish.x - smallFish.x) / smallFish.body[0].width * 1.2;
        var poy = Math.abs(bigFish.y - smallFish.y) / smallFish.body[0].height * 1.2;
        //喂小鱼
        if (pox < 1 && poy < 1) {
            smallFish.bodyTimer -= bigFish.fruit * 0.8 * data.double;
            bigFish.fruit = 0;
            bigFish.countBlue = 0;
            bigFish.countBody = 0;
            bigFish.countOrange = 0;
            bigFish.countSwin = 0;
            if (smallFish.bodyTimer < 0) smallFish.bodyTimer = 0;
            data.score += data.fruitNum * data.double * 10;
            //记录
            record();
            if (data.fruitNum) {
                give.born(smallFish.x, smallFish.y);
            }
            data.fruitNum = 0;
            data.double = 1;
        }
    }
    window.feed = feed;
    // 大鱼喂小鱼结束
}(window)
