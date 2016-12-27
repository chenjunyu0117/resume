var $ = require('./common/libs/zepto-modules/zepto');
require('./common/libs/zepto-modules/event');
require('./common/libs/zepto-modules/ajax');
require('./common/libs/zepto-modules/fx');
require('./common/libs/zepto-modules/touch');
var Swiper = require('./common/libs/swiper/swiper.min.js');
var swiperAni = require('./common/libs/swiper/swiper.animate1.0.2.min.js');
var IScroll = require('./common/libs/iscroll/iscroll.js');
var myScroll;
var num = 0;

// edit index
$(".hide").show();
$("#mainContainer").hide();

var swiper = new Swiper('.hide', {
	pagination: '.swiper-pagination',
	paginationClickable: true,
	onInit: function(swiper) { //Swiper2.x的初始化是onFirstInit
		swiperAni.swiperAnimateCache(swiper); //隐藏动画元素 
		swiperAni.swiperAnimate(swiper); //初始化完成开始动画
	},
	onSlideChangeEnd: function(swiper) {
		swiperAni.swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画

	}
});

$(".btn").tap(function() {
	$(".hide").hide();
	$("#mainContainer").show();
	myScroll = new IScroll('#wrapper', {
		scrollX: true,
		freeScroll: true
	});

	document.addEventListener('touchmove', function(e) {
		e.preventDefault();
	}, false);
	var swiperr = new Swiper('.qiehuan', {
		pagination: '.swiper-pagination',
		paginationClickable: true,
		onSlidePrevEnd: function(swiper) {
			myScroll.scrollTo(0, 0);
			myScroll.refresh();
			num--;
			if(num <= 0) {
				num = 0;
			}
			$('.footer-logo').eq(num).css('background', 'white').siblings().css('background', '#EDE7D3');
		},
		onSlideNextEnd: function(swiper) {
			myScroll.scrollTo(0, 0);
			myScroll.refresh();
			num++;
			if(num >= 3) {
				num = 3;
			}
			$('.footer-logo').eq(num).css('background', 'white').siblings().css('background', '#EDE7D3');
		},
	});
	$('.footer-logo').click(function() {
		num = $(this).index();
		swiperr.slideTo(num, 1000, false);
		$(this).css('background', 'white').siblings().css('background', '#EDE7D3')
	})
});

$.post('http://localhost:8000/skill', function(data) {
	var html = "";
	for(var i = 0; i < data.length; i++) {
		html = "<div class='jn-info'><p>" + data[i].category + "</p><p>" + data[i].name + "</p><p>" + data[i].time + "</p><p>" + data[i].level + "</p></div>";
		$('.tab').eq(0).append(html);
	}

});

$.post('http://localhost:8000/work', function(data) {
	var html = "";
	for(var i = 0; i < data.length; i++) {
		html = "<div class='jn-info'><p>" + data[i].category + "</p><p>" + data[i].name + "</p><p>" + data[i].url + "</p><p>" + data[i].time + "</p><p>" + data[i].posts + "</p><p>" + data[i].reportto + "</p><p>" + data[i].peoples + "</p><p>" + data[i].projects + "</p></div>";
		$('.tab').eq(1).append(html);
	}
});
$.post('http://localhost:8000/project', function(data) {
	var html = "";
	for(var i = 0; i < data.length; i++) {
		html = "<div class='jn-info'><p>" + data[i].category + "</p><p>" + data[i].name + "</p><p>" + data[i].url + "</p><p>" + data[i].description + "</p><p>" + data[i].detail + "</p><p>" + data[i].tech + "</p></div>";
		$('.tab').eq(2).append(html);
	}
});

window.onload = function() {
	var flag = true;
	var media = document.getElementsByClassName('music')[0];
	var music1 = document.getElementsByClassName('musicPart')[0];
	music1.onclick = function() {
		if(flag == true) {
			media.pause();
			flag = false;
			music1.style.webkitAnimationPlayState = "paused";
			music1.style.background = 'url("../images/stop.svg")';
		} else {
			media.play();
			flag = true;
			music1.style.webkitAnimationPlayState = "running";
			music1.style.background = 'url("../images/music.svg")';

		}
	}
}