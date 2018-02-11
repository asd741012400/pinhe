//居中

function toCenter( obj , iCenter , oParent ){


	if( iCenter == "left" || iCenter == "right" ){

		obj.css( iCenter , (oParent.outerWidth() - obj.outerWidth()) / 2 );

	}else if( iCenter == "top" || iCenter == "bottom" ){
		obj.css( iCenter , (oParent.outerHeight() - obj.outerHeight()) / 2 );

	}
}

//弹窗居中 显示 隐藏
function toShow( obj )
{

	$(".hint").find(obj).animate({'opacity' : 1 }, 500);
	$(".hint").find(obj).show();
	$('.hint').show();
	toCenter( $('.hint>div') , "top" , $(window) );
	$('.hint>div span').bind('click',function(){
		$('.hint').hide();
		$(this).parent().css({'opacity' : 0 });
		$(this).parent().hide();
	})
	$('.hint>div>div a.close').bind('click',function(){
		$('.hint').hide();
		$('.hint>div').css({'opacity' : 0 });
		$('.hint>div').hide();
	})
	
}


//ajax调用
function yDataAjax( url , request , json , htmlFn )
{
	$.ajax({
		url: url,
		type: request,
		data: json,
		success : function(data){
			htmlFn( data )
		},
		error : function(){},
	})
	
}

function nDataAjax( url , request , htmlFn )
{
	$.ajax({
		url: url,
		type: request,
		success : function(data){
			htmlFn( data );
		},
		error : function(){
			console.log(22222)
		},
	})
	
}


// 截取URL参数
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



//html添加
function addHTML( obj , iData )
{
	obj.html( iData )
}



//隐藏弹窗
var locationHref = sessionStorage.getItem( "locationHref" );

function  toHide( on )
{
	var oTimer = null;
	if( on )
	{
		oTimer = setTimeout(function(){
			$('.hint').hide();
			$('.hint_restart').css({'opacity' : 0 });
			$('.hint_restart').hide();
			window.location.href = locationHref;
		
		},3000)

		$('.hint').bind('click',function(){
			clearTimeout(oTimer);
			window.location.href = locationHref;
			$('.hint').hide();
			$('.hint_restart').css({'opacity' : 0 });
			$('.hint_restart').hide();
		})
	}
	else
	{
		oTimer = setTimeout(function(){
			$('.hint').hide();
			$('.hint_restart').css({'opacity' : 0 });
			$('.hint_restart').hide();
		},3000)

		$('.hint').bind('click',function(){
			clearTimeout(oTimer);
			$('.hint').hide();
			$('.hint_restart').css({'opacity' : 0 });
			$('.hint_restart').hide();
		})
	}

}