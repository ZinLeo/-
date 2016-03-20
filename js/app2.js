$(function(){
	/*
	1、获取图片个数，动态生成小圆点个数
	2、所有轮播控制通过全局index控制
	*/ 
	var index = 0;
	var imgUl = $("#imgUl");
	var imgLi = imgUl.find("li");
	var imgNum = $("#imgNum");
	var btnL = $("#btnL");
	var btnR = $("#btnR");
	var imgSize = imgLi.size();
	var timer;

	//动态生成小圆点
	for(var i=0;i<imgLi.length;i++){
		imgNum.append("<li></li>");
	}

	//轮播默认展示图片
	var numLi = imgNum.find("li");
	numLi.eq(0).addClass("on");
	imgLi.eq(0).show();

	//小圆点悬浮控制轮播
	numLi.hover(function(){
		var e = numLi.index($(this));
		index = e;
		move();
	});

	//左按钮控制轮播
	btnL.on('click',function(){
		index--;
		move();
	});

	//右按钮控制轮播
	btnR.on('click',function(){
		index++;
		move();
	});

	//自动轮播
	timer = setInterval(function(){
		index++;
		move();
	},2500);

	//鼠标悬浮停止定时器，离开重新启动定时器
	$(".rollBox").hover(function(){
		clearInterval(timer);
	},function(){
		timer = setInterval(function(){
			index++;
			move();
		},2500);
	});

	function move(){
		switch(index){
			case -1:index = imgSize - 1;break;
			case imgSize:index = 0;break;
			default:break;
		}
		numLi.eq(index).addClass("on").siblings().removeClass("on");
		imgLi.eq(index).fadeIn(500).siblings().fadeOut(500);
	}
});


