---
layout: page
title: 关于
permalink: /about/
icon: heart
type: page
---

* content
{:toc}

## 关于我

<iframe src="https://githubbadge.appspot.com/gaohaoyang?s=1" style="border: 0;height: 142px;width: 200px;overflow: hidden;" frameBorder="0"></iframe>
<html>
<style>
        canvas{display:block;left:0;position:absolute;top:0;z-index: 1;}
        </style>  
 <script type="text/javascript" src="../js/jquery-2.0.0.min.js"></script>
<canvas id="mycanvas"></canvas>
 <script type="text/javascript">
 $(function(){
    var Fireworks = function(){
    var self = this;
    var rand = function(rMi, rMa){return ~~((Math.random()*(rMa-rMi+1))+rMi);}
    var hitTest = function(x1, y1, w1, h1, x2, y2, w2, h2){return !(x1 + w1 < x2 || x2 + w2 < x1 || y1 + h1 < y2 || y2 + h2 < y1);};
    window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,1E3/60)}}();
    
    self.init = function(){ 
    self.canvas = document.getElementById('mycanvas');             
    self.canvas.width = self.cw = $(window).innerWidth();
    self.canvas.height = self.ch = $(window).innerHeight();         
    self.particles = [];    
    self.partCount = 150;
    self.fireworks = [];    
    self.mx = self.cw/2;
    self.my = self.ch/2;
    self.currentHue = 30;
    self.partSpeed = 5;
    self.partSpeedVariance = 10;
    self.partWind = 50;
    self.partFriction = 5;
    self.partGravity = 1;
    self.hueMin = 0;
    self.hueMax = 360;
    self.fworkSpeed = 4;
    self.fworkAccel = 10;
    self.hueVariance = 30;
    self.flickerDensity = 25;
    self.showShockwave = true;
    self.showTarget = false;
    self.clearAlpha = 25;
    
    $(document.body).append(self.canvas);
    self.ctx = self.canvas.getContext('2d');
    self.ctx.lineCap = 'round';
    self.ctx.lineJoin = 'round';
    self.lineWidth = 1;
    self.bindEvents();          
    self.canvasLoop();
    
    self.canvas.onselectstart = function() {
    return false;
    };
    };      
    
    self.createParticles = function(x,y, hue){
    var countdown = self.partCount;
    while(countdown--){
    var newParticle = {
        x: x,
        y: y,
        coordLast: [
            {x: x, y: y},
            {x: x, y: y},
            {x: x, y: y}
        ],
        angle: rand(0, 360),
        speed: rand(((self.partSpeed - self.partSpeedVariance) <= 0) ? 1 : self.partSpeed - self.partSpeedVariance, (self.partSpeed + self.partSpeedVariance)),
        friction: 1 - self.partFriction/100,
        gravity: self.partGravity/2,
        hue: rand(hue-self.hueVariance, hue+self.hueVariance),
        brightness: rand(50, 80),
        alpha: rand(40,100)/100,
        decay: rand(10, 50)/1000,
        wind: (rand(0, self.partWind) - (self.partWind/2))/25,
        lineWidth: self.lineWidth
    };              
    self.particles.push(newParticle);
    }
    };
    
    
    self.updateParticles = function(){
    var i = self.particles.length;
    while(i--){
    var p = self.particles[i];
    var radians = p.angle * Math.PI / 180;
    var vx = Math.cos(radians) * p.speed;
    var vy = Math.sin(radians) * p.speed;
    p.speed *= p.friction;
                    
    p.coordLast[2].x = p.coordLast[1].x;
    p.coordLast[2].y = p.coordLast[1].y;
    p.coordLast[1].x = p.coordLast[0].x;
    p.coordLast[1].y = p.coordLast[0].y;
    p.coordLast[0].x = p.x;
    p.coordLast[0].y = p.y;
    
    p.x += vx;
    p.y += vy;
    p.y += p.gravity;
    
    p.angle += p.wind;              
    p.alpha -= p.decay;
    
    if(!hitTest(0,0,self.cw,self.ch,p.x-p.radius, p.y-p.radius, p.radius*2, p.radius*2) || p.alpha < .05){                  
        self.particles.splice(i, 1);    
    }
    };
    };
    
    self.drawParticles = function(){
    var i = self.particles.length;
    while(i--){
    var p = self.particles[i];                          
    
    var coordRand = (rand(1,3)-1);
    self.ctx.beginPath();                               
    self.ctx.moveTo(Math.round(p.coordLast[coordRand].x), Math.round(p.coordLast[coordRand].y));
    self.ctx.lineTo(Math.round(p.x), Math.round(p.y));
    self.ctx.closePath();               
    self.ctx.strokeStyle = 'hsla('+p.hue+', 100%, '+p.brightness+'%, '+p.alpha+')';
    self.ctx.stroke();              
    
    if(self.flickerDensity > 0){
        var inverseDensity = 50 - self.flickerDensity;                  
        if(rand(0, inverseDensity) === inverseDensity){
            self.ctx.beginPath();
            self.ctx.arc(Math.round(p.x), Math.round(p.y), rand(p.lineWidth,p.lineWidth+3)/2, 0, Math.PI*2, false)
            self.ctx.closePath();
            var randAlpha = rand(50,100)/100;
            self.ctx.fillStyle = 'hsla('+p.hue+', 100%, '+p.brightness+'%, '+randAlpha+')';
            self.ctx.fill();
        }   
    }
    };
    };
    
    
    self.createFireworks = function(startX, startY, targetX, targetY){
    var newFirework = {
    x: startX,
    y: startY,
    startX: startX,
    startY: startY,
    hitX: false,
    hitY: false,
    coordLast: [
        {x: startX, y: startY},
        {x: startX, y: startY},
        {x: startX, y: startY}
    ],
    targetX: targetX,
    targetY: targetY,
    speed: self.fworkSpeed,
    angle: Math.atan2(targetY - startY, targetX - startX),
    shockwaveAngle: Math.atan2(targetY - startY, targetX - startX)+(90*(Math.PI/180)),
    acceleration: self.fworkAccel/100,
    hue: self.currentHue,
    brightness: rand(50, 80),
    alpha: rand(50,100)/100,
    lineWidth: self.lineWidth
    };          
    self.fireworks.push(newFirework);
    
    };
    
    
    self.updateFireworks = function(){
    var i = self.fireworks.length;
    
    while(i--){
    var f = self.fireworks[i];
    self.ctx.lineWidth = f.lineWidth;
    
    vx = Math.cos(f.angle) * f.speed,
    vy = Math.sin(f.angle) * f.speed;
    f.speed *= 1 + f.acceleration;              
    f.coordLast[2].x = f.coordLast[1].x;
    f.coordLast[2].y = f.coordLast[1].y;
    f.coordLast[1].x = f.coordLast[0].x;
    f.coordLast[1].y = f.coordLast[0].y;
    f.coordLast[0].x = f.x;
    f.coordLast[0].y = f.y;
    
    if(f.startX >= f.targetX){
        if(f.x + vx <= f.targetX){
            f.x = f.targetX;
            f.hitX = true;
        } else {
            f.x += vx;
        }
    } else {
        if(f.x + vx >= f.targetX){
            f.x = f.targetX;
            f.hitX = true;
        } else {
            f.x += vx;
        }
    }
    
    if(f.startY >= f.targetY){
        if(f.y + vy <= f.targetY){
            f.y = f.targetY;
            f.hitY = true;
        } else {
            f.y += vy;
        }
    } else {
        if(f.y + vy >= f.targetY){
            f.y = f.targetY;
            f.hitY = true;
        } else {
            f.y += vy;
        }
    }               
    
    if(f.hitX && f.hitY){
        self.createParticles(f.targetX, f.targetY, f.hue);
        self.fireworks.splice(i, 1);
        
    }
    };
    };
    
    self.drawFireworks = function(){
    var i = self.fireworks.length;
    self.ctx.globalCompositeOperation = 'lighter';
    while(i--){
    var f = self.fireworks[i];      
    self.ctx.lineWidth = f.lineWidth;
    
    var coordRand = (rand(1,3)-1);                  
    self.ctx.beginPath();                           
    self.ctx.moveTo(Math.round(f.coordLast[coordRand].x), Math.round(f.coordLast[coordRand].y));
    self.ctx.lineTo(Math.round(f.x), Math.round(f.y));
    self.ctx.closePath();
    self.ctx.strokeStyle = 'hsla('+f.hue+', 100%, '+f.brightness+'%, '+f.alpha+')';
    self.ctx.stroke();  
    
    if(self.showTarget){
        self.ctx.save();
        self.ctx.beginPath();
        self.ctx.arc(Math.round(f.targetX), Math.round(f.targetY), rand(1,8), 0, Math.PI*2, false)
        self.ctx.closePath();
        self.ctx.lineWidth = 1;
        self.ctx.stroke();
        self.ctx.restore();
    }
        
    if(self.showShockwave){
        self.ctx.save();
        self.ctx.translate(Math.round(f.x), Math.round(f.y));
        self.ctx.rotate(f.shockwaveAngle);
        self.ctx.beginPath();
        self.ctx.arc(0, 0, 1*(f.speed/5), 0, Math.PI, true);
        self.ctx.strokeStyle = 'hsla('+f.hue+', 100%, '+f.brightness+'%, '+rand(25, 60)/100+')';
        self.ctx.lineWidth = f.lineWidth;
        self.ctx.stroke();
        self.ctx.restore();
    }
    };
    };
    
    self.bindEvents = function(){
    $(window).on('resize', function(){          
    clearTimeout(self.timeout);
    self.timeout = setTimeout(function() {
        self.canvas.width = self.cw = $(window).innerWidth();
        self.canvas.height = self.ch = $(window).innerHeight();
        self.ctx.lineCap = 'round';
        self.ctx.lineJoin = 'round';
    }, 100);
    });
    
    $(self.canvas).on('mousedown', function(e){
    self.mx = e.pageX - self.canvas.offsetLeft;
    self.my = e.pageY - self.canvas.offsetTop;
    self.currentHue = rand(self.hueMin, self.hueMax);
    self.createFireworks(self.cw/2, self.ch, self.mx, self.my); 
    
    $(self.canvas).on('mousemove.fireworks', function(e){
        self.mx = e.pageX - self.canvas.offsetLeft;
        self.my = e.pageY - self.canvas.offsetTop;
        self.currentHue = rand(self.hueMin, self.hueMax);
        self.createFireworks(self.cw/2, self.ch, self.mx, self.my);                                 
    });             
    });
    
    $(self.canvas).on('mouseup', function(e){
    $(self.canvas).off('mousemove.fireworks');                                  
    });
            
    }
    
    self.clear = function(){
    self.particles = [];
    self.fireworks = [];
    self.ctx.clearRect(0, 0, self.cw, self.ch);
    };
    
    
    self.canvasLoop = function(){
    requestAnimFrame(self.canvasLoop, self.canvas);         
    self.ctx.globalCompositeOperation = 'destination-out';
    self.ctx.fillStyle = 'rgba(0,0,0,'+self.clearAlpha/100+')';
    self.ctx.fillRect(0,0,self.cw,self.ch);
    self.updateFireworks();
    self.updateParticles();
    self.drawFireworks();           
    self.drawParticles();
    
    };
    
    self.init();        
    
    }
    var fworks = new Fireworks();
    
    });
    
 </script></html>

就职于阿里巴巴集团天猫事业部，前端开发工程师，花名川轼。

主要兴趣集中在前端开发，大前端的概念深入我心。将更多的业务逻辑放在前端中，这很有趣。同时，将自己构想的内容实现出来，这种感觉很愉快。

热爱美好的事物，热爱摇滚乐，组过乐队，卖过唱。

很喜欢崔健的歌词：现实像块石头，精神像个蛋，石头虽然坚硬，可蛋里才是生命。

还有，学习是一个非常愉快的过程。共同加油！

* 2016.6.30 入职阿里巴巴天猫事业部
* 2016.6 毕业于西安交通大学 软件工程硕士
* 2015.12 获得2014-2015学年二等奖学金
* 2015.7-2015.8 联想服务，前端开发工程师（实习生）
* 2013.6 毕业于西安交通大学 理学院
* 2001 获得西航四校总成绩年级排名第八名

## 联系我

* GitHub：[Gaohaoyang](https://github.com/Gaohaoyang)
* email：gaohaoyang126@126.com
* [Weibo](http://weibo.com/3115521wh)
* [知乎](https://www.zhihu.com/people/gaohaoyang)
* [Facebook](https://www.facebook.com/gaohaoyang.water)
* [Twitter](https://twitter.com/gaohaoyang126)
* [豆瓣](https://www.douban.com/people/42525035/)
* [豆瓣音乐人-浩阳的小站](https://site.douban.com/haoyangaiyinyue/)

## 关于本站

**若您想使用这个 jekyll 博客主题，请访问：[https://github.com/Gaohaoyang/gaohaoyang.github.io](https://github.com/Gaohaoyang/gaohaoyang.github.io)**

~欢迎使用~

欢迎大家提一些对本站主题的建议，可以直接在下面留言或者新建一个 [Issue](https://github.com/Gaohaoyang/gaohaoyang.github.io/issues)。

### Update Log

*2017.2.28*

- `[^]` 修复目录滚动 bug [#22](https://github.com/Gaohaoyang/gaohaoyang.github.io/issues/22), [#48](https://github.com/Gaohaoyang/gaohaoyang.github.io/issues/48)

*2016.6.20*

* `[+]` 在文章页中添加上一篇和下一篇文章链接。
* `[^]` 修改 font-family 顺序，避免微软雅黑将单引号解析为全角。
* `[^]` 修复标签云算法中被除数为零的 bug。[#26](https://github.com/Gaohaoyang/gaohaoyang.github.io/issues/26), [#28](https://github.com/Gaohaoyang/gaohaoyang.github.io/issues/28), [#30](https://github.com/Gaohaoyang/gaohaoyang.github.io/issues/30)

*2016.5.11 v2.0.1*

* `[^]` 优化代码，将页面中的大段评论相关代码抽离出来，放入`comments.html`
* `[+]` 添加百度统计和Google分析代码，在`_config.yml`中配置相关参数即可
* `[+]` 更新文档，添加博客主题使用方法，便于上手
* `[+]` 添加了`favicon.ico`
* `[^]` 修复 bug，目录太长时，滚动到最底部时隐藏到footer下面。修复后长目录在滚动到底部时使用`position:absolute`
* `[^]` 修改目录区的滚动条样式（仅针对`webkit`内核浏览器）
* `[^]` 修改 demo 页中 disqus 评论区 a 标签的颜色 bug，修改 blockqoute 中 p 标签的 margin
* `[+]` 添加不蒜子计数功能，在footer上显示访问量
* `[+]` 添加回到顶部功能

*2016.4.27 v2.0.0*

* `[^]` 基于 jekyll 3.1.2 重构了所有代码
* `[+]` 主页添加了摘要，在正文中使用4个换行符来分割，可在`_config.yml`中修改
* `[+]` 主页添加了近期文章、分类列表和标签云
* `[+]` 主页导航区做了视觉优化，阴影效果
* `[+]` 增加了归档、标签和分类页面
* `[+]` 增加了收藏页面
* `[+]` 评论插件可以选择 disqus 或 多说，直接在`_config.yml`中修改
* `[+]` 适配移动端
* `[+]` 页面滚动时，文章目录固定在右侧
* `[+]` 页面内容较少时，固定 footer 在页面底部
* `[^]` 使用 GitHub 风格的代码高亮写法，即\`\`\`的写法，去除`highlight.js`代码高亮插件的使用
* `[^]` 使用 Masonry 重写了 Demo 页中的瀑布流布局，响应式交互体验更好
* `[-]` 去除了 jQuery 和 BootStrap，使得加载速度更快

* 2016.3-2016.4 进行了一次大的改版和重构，详见 [README](https://github.com/Gaohaoyang/gaohaoyang.github.io/blob/master/README.md) 和博文 [对这个 jekyll 博客主题的改版和重构](http://gaohaoyang.github.io/2016/03/12/jekyll-theme-version-2.0/)
* 2015.3-2015.4 完成了这个博客主题的第一版。

## 友情链接

[羡辙杂俎](http://zhangwenli.com/blog) \| [Anotherhome](https://www.anotherhome.net) \| [Reverland](http://reverland.org/) \| [ZhiLi](http://lizhipower.github.io/) \| [Simmer](http://simmer-jun.github.io/) \| [awthink](http://awthink.net/) \| [Aralic](http://aralic.github.io/) \| [zchen9](http://www.chen9.info/) \| [wuhuaji](http://wuhuaji.me/) \| [lisheng](http://www.lishengcn.cn/) \| [薛彬XueBin](http://axuebin.com/blog/) \| [TBOOX](http://www.tboox.org/cn/) \|  [Ling](http://linglinyp.com/)

## Comments

{% include comments.html %}
