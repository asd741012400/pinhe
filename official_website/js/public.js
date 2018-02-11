function defaultFontSize(){
	var d = window.document.createElement('div');
	d.style.width = '1rem';
	d.style.display = "none";
	var head = window.document.getElementsByTagName('head')[0];
	head.appendChild(d);
	var defaultFontSize = parseFloat(window.getComputedStyle(d, null).getPropertyValue('width'));
	d.remove();
	return defaultFontSize;
}

function adoptdevice(designWidth, rem2px,defaultFontSize){
	var head = window.document.getElementsByTagName('head')[0];
	document.documentElement.style.fontSize = window.innerWidth / designWidth * rem2px / defaultFontSize * 100 + '%';
	var x=window.innerWidth / designWidth * rem2px / defaultFontSize * 100 + '%';
	var st = document.createElement('style');
	// var portrait = "@media screen and (min-width: "+window.innerWidth+"px) {html{font-size:"+ x + "}}"
	var landscape = "@media screen and (min-width: "+window.innerHeight+"px) {html{font-size:"+ ((window.innerHeight/(designWidth/rem2px)/defaultFontSize)*100) +"%;}}"
	st.innerHTML = landscape;
	head.appendChild(st);
}
var defaultFontSize=defaultFontSize();
if(window.innerWidth>750){
	adoptdevice(1300, 50,defaultFontSize);
}else if(window.innerWidth<750){
	adoptdevice(750, 100,defaultFontSize);
}
window.addEventListener('resize',()=>{
	if(window.innerWidth>750){
		adoptdevice(1300, 50,defaultFontSize);
	}else if(window.innerWidth<750){
		adoptdevice(750, 100,defaultFontSize);
	}
}) 


function GetRequest() {
  
	var url = location.search; //获取url中"?"符后的字串
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
	var str = url.substr(1);
	strs = str.split("&");
		for(var i = 0; i < strs.length; i ++) {
			theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
		}
	}
	return theRequest;
}








$(function(){


var activeIndex = sessionStorage.getItem( "activeIndex" );



$.ajax({
	type : "get",
	url : "http://pinheadmin.qw1000.cn/web/Index/getCate",
	success : function( data ){
		console.log( data )
		$.each( data.data , function(index, val) {
			if( val.arr )
			{
				
				$('ul.nav').append(
					'<li c_id='+val["c_id"]+'>'+ 
          				'<a href="#">'+ 
							'<div class="dropdown" class="navActive">'+
					            '<p id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+
					            	val['c_title']+
					              '<span id="icon" class="glyphicon glyphicon-menu-down" style="font-size: 12px;"></span>'+
					            '</p>'+
					            '<ul class="dropdown-menu" aria-labelledby="dLabel">'+
							    '</ul>'+
					        '</div>'+
				         '</a>'+
				    '</li>')
					$.each( val.arr, function(index2, val2) {
						// '<li>'+ val2['c_title'] +'</li>'+
						$('.dropdown-menu').append('<li c_id='+val2["c_id"]+'>'+val2['c_title']+'</li>')
					})

			}
			else
			{
				$('ul.nav').append(`<li c_id="${val.c_id}"> <a href="${val.c_url}?cid=${val.c_id}"> ${val.c_title} </a> </li>`)
			}



			
		});


		if( activeIndex == 1)
		{
			$('ul.nav > li').eq(activeIndex).find('a').addClass('navActive');
			$('#icon').css('color' , "#692407");
		}
		else if( activeIndex != 1 && activeIndex != null)
		{
			$('ul.nav > li').eq(activeIndex).find('a').addClass('navActive');

		}

		$('#logo').click(function(event) {
			$('ul.nav > li a').removeClass('navActive');
			sessionStorage.activeIndex = null;
			$('#icon').css('color' , "#777");
			window.location.href = "index.html";
		});


		$('ul.nav li a').click(function(event) {
			sessionStorage.activeIndex = $(this).parent('li').index();
		});


		$('.dropdown-menu li').click(function(event) {
			window.location.href = "product_display.html?cid="+$(this).parents('li').attr('c_id')+"&&pid="+$(this).attr('c_id');
		});	




	}
})





})