(function(){
    var htmlContent = '<div class="slider" id="slider">'
			+	'<div class="slide"><img src="img/b5.png" alt=""></div>'
			+	'<div class="slide"><img src="img/b1.png" alt=""></div>'
			+	'<div class="slide"><img src="img/b2.png" alt=""></div>'
			+	'<div class="slide"><img src="img/b3.png" alt=""></div>'
			+	'<div class="slide"><img src="img/b4.png" alt=""></div>'
			+	'<div class="slide"><img src="img/b5.png" alt=""></div>'
			+	'<div class="slide"><img src="img/b1.png" alt=""></div>'
		+	'</div>'
		+	'<span id="left"><</span>'
		+	'<span id="right">></span>'
		+	'<ul class="nav" id="navs">'
			+	'<li>1</li>'
			+	'<li>2</li>'
			+	'<li>3</li>'
			+	'<li>4</li>'
			+	'<li>5</li>'
		+	'</ul>';
    var $box = $('#box')
    $box.append(htmlContent);//添加到html页面
    // 获取图片
    var images = document.getElementsByClassName('slide'),
        imagesNum = images.length-2;
    // 获取按钮
    var navs = document.getElementById('navs').children;
    navsActive(0);//初始第一个圆点按钮css设置为active

    // 获取当前正在轮播的图片的索引值
    var index = 0;

    // 设置一个轮播的定时器
    var timerCarousel = setInterval(nextPage,3000);

    // 鼠标移入显示左右按钮并停止轮播事件：通过改变按钮的opacity值显示按钮，清楚定时器停止轮播
    $box.mouseover(function(){
        $('#left').css('opacity',0.6);
        $('#right').css('opacity',0.6);
        clearInterval(timerCarousel);
    })

    // 鼠标移出不显示左右按钮且轮播
    $box.mouseout(function(){
        $('#left').css('opacity',0);
        $('#right').css('opacity',0);
        timerCarousel = setInterval(nextPage,3000);
    })

    // 左右按钮点击切换图片
    $('#left').click(lastPage);
    $('#right').click(nextPage);

    // 上一页:function lastPage(){}:如果当前页面是第一张图片，那点击左按钮时应切换到第五张图片，所以图片box的left值向左移动1200*imagesNum
    // 如果不是第一张图片，则直接将box的left值减少1200
    function lastPage(){
        if(index == 0){
            $('#slider').animate({left:'+=' + 1200},1000,function(){
                $('#slider').css('left',-1200*imagesNum);
            })
            navsActive(imagesNum-1);//此时显示的是第五张图片，他的索引值是imagesNum-1=4
            index = imagesNum - 1;
        }
        else{
            $('#slider').animate({left:'+=' + 1200},1000);
            navsActive(index - 1);
            index--;
        }
    }

    // 下一页:function nextPage(){}:如果当前图片是第五章图片（索引值为4），则点击右按钮时应切换到第一张图片，即box的left减少1200即可
    function nextPage(){
        if(index == imagesNum-1){
            $('#slider').animate({left:'-=' + 1200},1000,function(){
                $('#slider').css('left',-1200);
            })
            navsActive(0);//此时显示的是第五张图片，他的索引值是imagesNum-1=4
            index = 0;
        }
        else{
            $('#slider').animate({left:'-=' + 1200},1000);
            navsActive(index + 1);
            index++;
        }
    }

    // 圆点按钮的切换事件
    function navsActive(idx){
        for(var i = 0; i < navs.length; i++){
            navs[i].removeAttribute("class","active");
        }
        navs[idx].setAttribute("class","active");
    }
    // 圆点按钮的点击事件
    for(var i=0;i<imagesNum;i++){
        (function (j) {
            navs[j].onclick = function(){
                if(j-index > 0){
                    $('#slider').animate({left:'-=' + 1200*(j-index)},1000);
                }
                else if(j-index  < 0){
                    $('#slider').animate({left:'+=' + 1200*(index-j)},1000);
                }
                else{
                    return true;
                }
                navsActive(j);
                index=j;
            }
        })(i)
    }
    
})();