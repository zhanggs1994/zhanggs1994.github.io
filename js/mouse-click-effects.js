(function(window, document, undefined) {
    var hearts = [];
    window.requestAnimationFrame = (function() {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback) {
                setTimeout(callback, 3000 / 60);
            }
    })();
    init();

    function init() {
        css(".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: absolute;}.heart:after{top: -5px;}.heart:before{left: -5px;}");
        attachEvent();
        gameloop();
    }

    function gameloop() {
        for(var i = 0; i < hearts.length; i++) {
            if(hearts[i].alpha <= 0) {
                document.body.removeChild(hearts[i].el);
                hearts.splice(i, 1);
                continue;
            }
            hearts[i].y--;
            hearts[i].scale += 0.004;
            hearts[i].alpha -= 0.013;
            hearts[i].el.style.cssText = "left:" + hearts[i].x + "px;top:" + hearts[i].y + "px;opacity:" + hearts[i].alpha + ";transform:scale(" + hearts[i].scale + "," + hearts[i].scale + ") rotate(45deg);background:" + hearts[i].color;
        }
        requestAnimationFrame(gameloop);
    }

    function attachEvent() {
        var old = typeof window.onclick === "function" && window.onclick;
        window.onclick = function(event) {
            old && old();
            createHeart(event);
        }
    }

    function createHeart(event) {
        var d = document.createElement("div");
        d.className = "heart";
        hearts.push({
            el: d,
            x: event.clientX - 5 - Math.random() * 100,
            y: event.clientY - 5,
            scale: 1,
            alpha: 1,
            color: randomColor()
        });
        document.body.appendChild(d);
    }

    function css(css) {
        var style = document.createElement("style");
        style.type = "text/css";
        try {
            style.appendChild(document.createTextNode(css));
        } catch(ex) {
            style.styleSheet.cssText = css;
        }
        document.getElementsByTagName('head')[0].appendChild(style);
    }

    function randomColor() {
        return "rgb(" + (~~(Math.random() * 255)) + "," + (~~(Math.random() * 255)) + "," + (~~(Math.random() * 255)) + ")";
    }
    /* 鼠标特效 */
    var a_idx = 0;
    jQuery(document).ready(function($) {
        $("body").click(function(e) {
            var a = new Array("!!!∑(ﾟДﾟノ)ノ", "❤记得好评哦❤", "(〃'▽'〃)", "❤记得常来哦❤", "ヾ(✿ﾟ▽ﾟ)ノ", "❤记得关注哦❤", "(～￣▽￣)～ ", "❤赞一个❤", "( • ̀ω•́ )✧", "罒ω罒");
            var $i =document.createElement("span");
            $i.id="clickTextEffects";
            $("#clickTextEffects").text(a[a_idx]);
            // var $i = $("<span></span>").text(a[a_idx]);
            a_idx = (a_idx + 1) % a.length;
            var x = e.pageX,
                y = e.pageY;
                $("#clickTextEffects").css({
                "z-index": 99,
                "top": y - 20 - Math.random() * 100,
                "left": x - Math.random() * 100,
                "position": "absolute",
                "font-weight": "bold",
                "color": "rgb(" + ~~(255 * Math.random()) + "," + ~~(
                        255 * Math.random()) + "," + ~~(255 * Math.random()) +
                    ")"
            });
            $("body").append($i);
            $("#clickTextEffects").animate({
                    "top": y - 180,
                    "opacity": 0
                },
                3000,
                function() {
                    $("#clickTextEffects").remove();
                });
        });
    });
})(window, document);