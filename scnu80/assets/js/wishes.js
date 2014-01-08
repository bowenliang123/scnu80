define(function(require, exports, module) {
	console.log('wishes.js');

	require('mustache');
	require('jquery.mustache');

	var log_sign = require('log-sign');

	$('.nav-wishes').addClass('active');

	console.log(log_sign.isLogin());

	var myWishesContent = $('#myWishesContent');

	$().ready(function(){
		init();
		fetchAllWishes();
	});

	var isLogin = false;
	var user = {};
	

	function init(){
		if (log_sign.isLogin()){
			// 已登录		
			isLogin = true;
			user.userId = $.cookie('userId');
			user.nickname = $.cookie('nickname');
		} else {
			// 未登录
			$('#btn_wish span').html('请先登录');
		}

		$.Mustache.addFromDom('wish_template');
	}

	$('#btn_wish span').click(function(e){
		e.preventDefault();
		if (!isLogin) {
			alert('请先登录');
		} else {
			$.ajax({
				type:'post',
				url: '/wish/create',
				data: {
					userId: user.userId,
					nickname: user.nickname,
					text: myWishesContent.val()
				},
				success: function(data, textStatus, jqXHR){
					console.log(data);
					alert('成功发送祝福！');
					fetchAllWishes();
				},
				dataType: 'json'

			})
		}
	});


	function fetchAllWishes(){
		$.ajax({
			type: 'get',
			url: '/wish',
			success: function(data, textStatus, jqXHR){
				console.log(data);

				printWishes(data);
			},
			dataType: 'json'
		});

	}

	function printWishes(wishes){
		console.log(wishes);

		$('#wishes_pool')
			.empty()
			.mustache('wish_template', {wishes:wishes});
	}


});