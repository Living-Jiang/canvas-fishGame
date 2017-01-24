! function(window) {
    //吃果实检测
    function eatFruit() {
        if (!isOverNum) {
            var flag = true;
            for (var i = 0; i < fruit.num; i++) {
                if (fruit.alive[i]) {
                    var pox = Math.abs(bigFish.x - fruit.x[i]) / fruit.l[i] / 1.5;
                    var poy = Math.abs(bigFish.y - fruit.y[i]) / fruit.l[i] / 1.5;
                    //吃掉果实
                    if (pox < 1 && poy < 1) {
                        //吃果实动画
                        wave.born(bigFish.x, bigFish.y);
                        data.fruitNum++;
                        flag = false;
                        fruit.dead(i);
                        bigFish.fruit += 10;
                        //大鱼身体变orange
                        if (fruit.pic[i] == fruit.orange) {
                            bigFish.countOrange++;
                            if (bigFish.countOrange > 7) bigFish.countOrange = 7;
                            bigFish.countSwin = bigFish.countOrange;
                            bigFish.body = bigFish.bodyOrange[bigFish.countOrange];
                        } else if (fruit.pic[i] == fruit.blue) {
                            data.double = 2;
                            bigFish.isDoble = true;
                            bigFish.countBlue = 7;
                            bigFish.body = bigFish.bodyBlue[bigFish.countBlue];
                        }
                    }
                }
            }
            bigFish.isEat = flag;
        }
    }
    // 吃果实结束
    window.eatFruit = eatFruit;
}(window)
