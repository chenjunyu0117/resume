var $ = require('./common/libs/zepto-modules/zepto');
require('./common/libs/zepto-modules/event');
require('./common/libs/zepto-modules/ajax');
require('./common/libs/zepto-modules/touch');

var Swiper = require('./common/libs/swiper/swiper.min.js');
var swiperAni = require('./common/libs/swiper/swiper.animate1.0.2.min.js');
var IScroll = require('./common/libs/iscroll/iscroll.js');

// edit index
$(".swiper-container").show();
$("#mainContainer").hide();

var swiper = new Swiper('.swiper-container',{
  onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
    swiperAni.swiperAnimateCache(swiper); //隐藏动画元素 
    swiperAni.swiperAnimate(swiper); //初始化完成开始动画
  }, 
  onSlideChangeEnd: function(swiper){ 
    swiperAni.swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
  } 
});
var myScroll;
$("#enter").click(function(){
	$(".swiper-container").hide();
	$("#mainContainer").show();
	

	$.post('http://localhost:8000/skill',function(data){
		var html="";
		for(var i=0;i<data.length;i++){
		html+='<li>'+'<img src="'+data[i].images+'" class="images">'+data[i].category+'</li>'
		}
		$("#scroller ul").html(html);
		/*console.log(data);*/
		myScroll = new IScroll('#wrapper', { mouseWheel: true });
		document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	})
});
$("#footer .button").tap(function(){
	var targetApi=$(this).attr('id');
	$.post('http://localhost:8000/'+targetApi,function(data){
		var html="";
		for(var i=0;i<data.length;i++){
			html+='<li>'+'<img src="'+data[i].images+'" class="images">'+data[i].category+'</li>'
			//html+="<li>"+data[i].category+data[i].images+"</li>"
			//html+="<li><p>"+data[i].category+"</p><p>"+data[i].name+"</p><p>"+data[i].time+"</p></li>"
		}
		$("#scroller ul").html(html);
		myScroll.scrollTo(0,0);
		myScroll.refresh();
	})
});