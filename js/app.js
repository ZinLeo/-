$(function(){
	/*
	1、克隆第一张img放在最后一张图片
	2、动态生成imgNum
	3、左移：当移动到-1张时，css控制left=-(imgSize-1)*600
	   右移：当移动到imgSize张时，css控制left=0
	*/ 
	var index = 0;
	var imgUl = $("#imgUl");
	var No1Img = imgUl.find("li").eq(0).clone();
	imgUl.append(No1Img);
	var imgSize = imgUl.find("li").size();
	var btnL = $("#btnL");
	var btnR = $("#btnR");
	var imgNum = $("#imgNum");
	var timer;

	//动态生成小圆点个数
	for(var i=0;i<imgSize-1;i++){
		imgNum.append("<li></li>");
	}
	imgNum.find("li").eq(index).addClass("on");

	//小圆点往左移
	btnL.on("click",function(){
		index--;
		move();
	});

	//小圆点往右移
	btnR.on("click",function(){
		index++;
		move();
	});

	//小圆点悬浮切换
	$("#imgNum li").hover(function(){
		var e = $(this).index();
		index = e;
		imgUl.stop().animate({
			left:-index*600
		},600);	
		$(this).addClass("on").siblings().removeClass("on");
	});

	// 定时器开启，自动切换
	timer = setInterval(function(){
		index++;
		move();
	}, 2500);

	//鼠标悬浮轮播，停止定时器
	$(".rollBox").hover(function(){
		clearInterval(timer);
	},function(){
		timer = setInterval(function(){
			index++;
			move();
		}, 2500);
	});

});

function move(){

	//判断左移
	if(index == -1){
		imgUl.css("left",-(imgSize - 1)*600);
		index = imgSize - 2;
	}

	//判断右移
	if(index == imgSize){
		imgUl.css("left","0");
		index = 1;
	}

	//执行图片移动
	imgUl.stop().animate({
		left:-index*600
	},600);	

	//小圆点状态
	if(index == imgSize - 1){
		imgNum.find("li").eq(0).addClass("on").siblings().removeClass("on");
	}else{
		imgNum.find("li").eq(index).addClass("on").siblings().removeClass("on");
	}
}