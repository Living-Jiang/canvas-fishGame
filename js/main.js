  var span = document.querySelector('#box span');
    (function() {
        if (!window.localStorage.getItem('record')) {
            window.localStorage.setItem('record', 0);
        } else {
            span.innerHTML = 'record : ' + window.localStorage.getItem('record');
        }
    })();
    var box = document.getElementById('box');
    var cav1 = document.getElementById('cav1');
    var cav2 = document.getElementById('cav2');
    var cnt1 = cav1.getContext("2d");
    var cnt2 = cav2.getContext("2d");
    var canW = cav1.width;
    var canH = cav1.height;
    var bg = new Image();
    var mx = canW / 2;
    var my = canH / 2;
    var isOverNum = 0;
    var rePlayImg = new Image();
    var flag = true,
        flag1 = true;
    var timer = null;
    var isStar = true;
    rePlayImg.src = 'images/play.png';
    bg.src = "images/background.jpg";
    // 实例化海葵
    var ane = new aneObj();
    // 实例化果实
    var fruit = new fruitObj();
    // 實例化大魚
    var bigFish = new bigFishObj();
    // 实例化小鱼
    var smallFish = new smallFishObj();
    var data = new dataObj();
    //
    var wave = new eatAnimate();
    var give = new eatAnimate();
    init();

    function init() {
        ane.init();
        fruit.init();
        bigFish.init();
        smallFish.init();
        wave.init();
        give.init();
        data.init();
    }
    //漂浮物
    var dust = new dustObj();
    dust.init();
    window.onload = function() {
        bigFish.body = bigFish.bodySwin[0];
        playGame('play');
        timer = setInterval(gameLoop, 40);
    }

    //动画函数
    function gameLoop() {
        cnt2.clearRect(0, 0, canW, canH);
        //在canvas2上绘制背景
        cnt2.drawImage(bg, 0, 0, canW, canH);
        // 画海葵
        ane.draw();
        // 畫出果實 
        fruit.draw();
        cnt1.clearRect(0, 0, canW, canH);
        bigFish.draw();
        //吃果实
        eatFruit();
        //小鱼绘制
        smallFish.draw();
        //喂小鱼
        if (!isOverNum) {
            feed();
        }
        //数据统计
        data.draw();
        //
        wave.draw(1, 30, 255, 255, 255);
        give.draw(2, 60, 203, 91, 0);
        //漂浮物
        dust.draw();
        gameOver();
        rePlayBtn();
    }
    //游戏结束
    function gameOver() {
        if (smallFish.bodyTimer == 160) {
            isOverNum += 0.01;
            isOverNum = isOverNum >= 1 ? 1 : isOverNum;
            cnt1.save();
            cnt1.globalAlpha = isOverNum;
            cnt1.fillStyle = 'white';
            cnt1.font = '30px Verdana';
            cnt1.textAlign = 'center';
            cnt1.fillText('GameOver', canW / 2 - 3, canH / 2);
            cnt1.restore();
        }
    }
    //游戏最高纪录的记录
    function record() {
        if (parseInt(window.localStorage.getItem('record')) < data.score) {
            window.localStorage.setItem('record', data.score);
            span.innerHTML = 'record : ' + window.localStorage.getItem('record');
        }
    }
    //獲取鼠標的位置
    box.onmouseover = function() {
        document.onmousemove = function(e) {
            if (!isOverNum) {
                var e = e || window.event;
                mx = e.offsetX;
                my = e.offsetY;
                // console.log(mx+'----'+my);
            }
        }
    }
    box.onmouseout = function() {
            document.onmousemove = null;
        }
        // 角度变化函数
    function lerpAngle(angleTar, angleCur, n) {
        angle = angleCur - angleTar;
        if (angle > Math.PI) {
            angle = angle - 2 * Math.PI;
        }
        if (angle < -Math.PI) {
            angle = angle + 2 * Math.PI;
        }
        return angleTar + angle * n;
    }
    // 开始游戏
    function playGame(text) {
        flag1 = false;
        var canvas = document.createElement('canvas');
        canvas.classList.add('replay');
        canvas.width = 100;
        canvas.height = 30;
        var context = canvas.getContext('2d');
        context.save();
        context.fillStyle = 'white';
        context.font = '30px Verdana';
        context.textAlign = 'center';
        context.fillText(text, 50, 25);
        context.stroke();
        context.restore();
        box.appendChild(canvas);
        if (text == 'replay') {
            canvas.style.top = 52 + '%';
        }
        canvas.addEventListener('click', function() {
            if (isStar) {
                isStar = false;
                var cover = document.querySelector('#box img');
                var count = 1;
                var covertimer = setInterval(function() {
                    count = count - 0.05 <= 0 ? 0 : count - 0.05;
                    cover.style.opacity = count;
                    if (count == 0) {
                        clearInterval(covertimer);
                        box.removeChild(cover);
                    }
                }, 40);
            }
            init();
            var canvas = document.querySelector('.replay');
            box.removeChild(canvas);
            flag1 = true;
            isOverNum = 0;
        })
    }
    // 重新开始游戏
    function rePlayBtn() {
        if (isOverNum == 1 && flag1) {
            playGame('replay');
        }
    }
    // 按下空格键暂停游戏
    function pausedGame(ev) {
        if (ev) {
            if (flag && isOverNum == 0) {
                clearInterval(timer);
                flag = false;
                var canvas = document.createElement('canvas');
                canvas.classList.add('play');
                canvas.width = 100;
                canvas.height = 100;
                var context = canvas.getContext('2d');
                context.shadowBlur = 20;
                context.shadowColor = 'rbga(255,255,255,0.6)';
                context.drawImage(rePlayImg, 0, 10, 80, 80);
                box.appendChild(canvas);
                canvas.addEventListener('click', function() {
                    var canvas = document.querySelector('.play');
                    timer = setInterval(gameLoop, 40);
                    this.parentNode.removeChild(this);
                    flag = true;
                })
            } else if (!flag) {
                var canvas = document.querySelector('.play');
                timer = setInterval(gameLoop, 40);
                canvas.parentNode.removeChild(canvas);
                flag = true;
            }
        }
    }
    window.onkeydown = function(e) {
        var e = e || event.window;
        if (e.keyCode == 32) {
            var ev = true;
        } else {
            var ev = false;
        }
        pausedGame(ev);
    }

