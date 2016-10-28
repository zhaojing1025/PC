/**
 * Created by ZhaoJing on 2016/9/2.
 */
/**
 * 轮播图
 */
(function(){
    var oBox = document.getElementById('box');
    var oBoxInner = oBox.getElementsByTagName('div')[0];
    var aDiv = oBoxInner.getElementsByTagName('div');
    var aImg = oBoxInner.getElementsByTagName('img');
    var oUl = oBox.getElementsByTagName('ul')[0];
    var aLi = oUl.getElementsByTagName('li');
    var oBtnLeft = oBox.getElementsByTagName('i')[0];
    var oBtnRight = oBox.getElementsByTagName('i')[1];
    var timer = null;
    var step = 0;
    //图片加载
    lazyImg();
    function lazyImg(){
        for(var i=0;i<aImg.length;i++){
            (function(index){
                var tempImg = new Image;
                tempImg.src = aImg[index].getAttribute('realImg');
                tempImg.onload = function(){
                    aImg[index].src = this.src;
                    var oDiv = aDiv[0];
                    utils.css(oDiv,'zIndex',1);
                    animate(oDiv,{opacity:1},1000);
                    tempImg = null;
                }
            })(i)
        }
    }
    //渐隐见现轮播
    timer = setInterval(autoMove,5000);
    function autoMove(){
        if(step >= aImg.length - 1){
            step = -1;
        }
        step ++;
        setBanner();
    }
    function setBanner(){
        for(var i=0;i<aDiv.length;i++){
            if(i == step){
                utils.css(aDiv[i],'zIndex',1);
                animate(aDiv[i],{opacity:1},1000,function(){
                    var siblings = utils.siblings(this);
                    for(var i=0;i<siblings.length;i++){
                        animate(siblings[i],{opacity:0});
                    }
                });
                continue;
            }
            else{
                utils.css(aDiv[i],'zIndex',0)
            }
        }
        bannerTip();
    }
    //焦点自动播放
    function bannerTip(){
        for(var i=0;i<aLi.length;i++){
            aLi[i].className = i === step ? 'on' : null;
        }
    }
    //移入停止，移出继续
    oBox.onmouseover = function(){
        clearInterval(timer);
    };
    oBox.onmouseout = function(){
        timer = setInterval(autoMove,5000);
    };
    //点击焦点切换
    handleChange();
    function handleChange(){
        for(var i=0;i<aLi.length;i++){
            aLi[i].index = i;
            aLi[i].onclick = function(){
                step = this.index;
                setBanner();
            }
        }
    }
    //点击按钮手动切换
    oBtnRight.onclick = function(){
        autoMove();
    };
    oBtnLeft.onclick = function(){
        if(step <= 0){
            step = aDiv.length;
        }
        step --;
        setBanner();
    }
})();

(function(){
    var starPro = document.getElementById('starPro');
    var boxInner = starPro.getElementsByTagName('div')[2];
    var aUl = boxInner.getElementsByTagName('ul');
    var oLeft = starPro.getElementsByTagName('i')[0];
    var oRight = starPro.getElementsByTagName('i')[1];
    var timer = null;
    var step = 0;

    utils.css(boxInner,'width',aUl.length * aUl[0].offsetWidth);
    clearInterval(timer);
    timer = setInterval(move,2000);
    function move(){

        step ++;
        animate(boxInner,{left:-step * 1226},1000);
        //console.log(step)
        //console.log(boxInner.style.left);
        if(step >= aUl.length - 1){
            step --;
            //animate(boxInner,{left:step * 1226},1000);
            utils.css(boxInner,'left',step * 1226);
            //console.log(step)
            //console.log(boxInner.style.left)
        }

    }
 })();
/**
 * 选项卡
 */
(function(){
    var oDiv = document.getElementById('under');
    tab(oDiv);
    function tab(oBox){
        var oDiv = document.getElementById('under');
        var middleDiv = oBox.getElementsByTagName('div')[1];
        var rightDiv = middleDiv.getElementsByTagName('div')[0];
        var aSpan = rightDiv.getElementsByTagName('span');
        var aOl = oBox.getElementsByTagName('ol');
        for(var i=0;i<aSpan.length;i++){
            (function(index){
                aSpan[index].onmouseover = function(){
                    for(var i=0;i<aSpan.length;i++){
                        aSpan[i].className = '';
                        aOl[i].className = 'dapei main clearfix';
                    }
                    this.className = 'show';
                    aOl[index].className = 'dapei main clearfix on';
                }
            })(i);
        }
    }
})();
/*(function(){
    var oUl = document.getElementById('maincontent');
    var aLi = oUl.getElementsByTagName('li');
    var BtnLeft = oUl.getElementsByTagName('a')[8];
    var BtnRight = oUl.getElementsByTagName('a')[9];
    //var oLi = oUl.getElementsByTagName('li')[0];
    var oDiv = oUl.getElementsByTagName('div')[0];
    var aDiv = oDiv.getElementsByTagName('div');
    var oA = oUl.getElementsByTagName('a')[10];
    var aP = oA.getElementsByTagName('p');
    var step = 0;

    //点击焦点切换图片
    handleChange();
    function handleChange(){
        for(var i=0;i<aP.length;i++){
            aP[i].index = i;
            aP[i].onclick = function(){
                step = this.index;
                animate(oDiv,{left:-step * 297},300);
                bannerTip();
            };
        }
    }
    function bannerTip(){
        for(var i=0;i<aP.length;i++){
            aP[i].className = i === step ? 'on' : null;
        }
    }
    //图片切换
    function move(){
        if(step >= aDiv.length - 1){
            step = aDiv.length - 2;
            animate(oDiv,{left:-step * 297},300);
        }
        step++;
        animate(oDiv,{left:-step * 297},300);
        bannerTip();
        console.log(step)
    }
    //function btnShow(){
    //    var _this = this;
    /!*oDiv.onmouseover = function(){
     BtnLeft.style.display = 'block';
     BtnRight.style.display = 'block';
     };
     oDiv.onmouseout = function(){
     BtnLeft.style.display = 'none';
     BtnRight.style.display = 'none';
     };*!/
    //}
    BtnRight.onclick = move;
    BtnLeft.onclick = function(){
        if(step <= 0){
            step = 1;
        }
        step --;
        animate(oDiv,{left:-step * 297},300);
        bannerTip();
    }
})();*/


function underBanner(id){
    this.oLi = document.getElementById(id);
    this.BtnLeft = this.oLi.getElementsByTagName('a')[8];
    this.BtnRight = this.oLi.getElementsByTagName('a')[9];
    this.oDiv = this.oLi.getElementsByTagName('div')[0];
    this.aDiv = this.oDiv.getElementsByTagName('div');
    this.oA = this.oLi.getElementsByTagName('a')[10];
    this.aP = this.oA.getElementsByTagName('p');
    this.step = 0;
    this.step = 0;
    this.init();
}
underBanner.prototype = {
    constructor:underBanner,
    init:function(){
        this.handleChange();
        this.btnClick();
        //this.btnShow();
    },
    handleChange:function handleChange(){
        var _this = this;
        for(var i=0;i<this.aP.length;i++){
            this.aP[i].index = i;
            this.aP[i].onclick = function(){
                _this.step = this.index;
                animate(_this.oDiv,{left:- _this.step * 297},300);
                _this.bannerTip();
            }
        }
    },
    bannerTip:function bannerTip(){
        for(var i=0;i<this.aP.length;i++){
            this.aP[i].className = i === this.step ? 'on' : null;
        }
    },
    move:function move(){
        if(this.step >= this.aDiv.length - 1){
            this.step = this.aDiv.length - 2;
            animate(this.oDiv,{left:-this.step * 297},300);
        }
        this.step++;
        animate(this.oDiv,{left:-this.step * 297},300);
        this.bannerTip();
    },
    btnShow:function btnShow(){
        var _this = this;
        _this.oDiv.onmouseover = function(){
            _this.BtnLeft.style.display = 'block';
            _this.BtnRight.style.display = 'block';
        };
        _this.oDiv.onmouseout = function(){
            _this.BtnLeft.style.display = 'none';
            _this.BtnRight.style.display = 'none';
        };
    },
    btnClick:function btnClick(){
        var _this = this;
        this.BtnRight.onclick = function(){
            _this.move();
        };
        this.BtnLeft.onclick = function(){
            if(_this.step <= 0){
                _this.step = 1;
            }
            _this.step --;
            animate(_this.oDiv,{left:-_this.step * 297},300);
            _this.bannerTip();
        }
    }
};
