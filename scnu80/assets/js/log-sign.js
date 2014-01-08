define(function(require, exports, module) {
	console.log('log-sign.js');

	var login_email = $('#login_email');
	var login_password = $('#login_password');


	var signup_email = $('#signup_email');
	var signup_password= $('#signup_password');
	var signup_nickname= $('#signup_nickname');

	init(); //初始化

	function init(){
		if (isLogin()){
			$('#logoutBar').removeClass('hide');
			$('#loginBar').addClass('hide');
			$('#userNickname').html($.cookie('nickname'));
		}

	}

	//登录状态栏-登录链接
	$('#login-link').click(function(e){
		e.preventDefault();
		$('#signup-block').addClass('hide');
		$('#login-block').removeClass('hide');
	});

	//登录状态栏-注册链接
	$('#signup-link').click(function(e){
		e.preventDefault();
		$('#login-block').addClass('hide');
		$('#signup-block').removeClass('hide');
	});

	//登录状态栏-注册链接
	$('#logout-link').click(function(e){
		e.preventDefault();
		window.location = '/logout';
	});

	$('#btn-login').click(function(e){
		e.preventDefault();
		$.ajax({
			url: '/login',
			type: 'post',
			data: {
				email: login_email.val(),
				password: login_password.val()
			},
			success: function(data, textStatus, jqXHR){
				console.log(data);
				switch (data.status) {
					case 0:
						window.location = '/';
						break;
					default:
						alert(data.text);
				}
			},
			dataType: 'json'
		});
	});

	$('#btn-signup').click(function(e){
		e.preventDefault();
		$.ajax({
			url: '/signup',
			type: 'post',
			data: {
				email: signup_email.val(),
				password: signup_password.val(),
				nickname: signup_nickname.val()
			},
			success: function(data, textStatus, jqXHR){
				console.log(data);
				switch (data.status) {
					case 0:
						alert('注册成功');
						window.location = '/';
						break;
					default:
						alert(data.text);
				}
			},
			dataType: 'json'
		});
	});

	$('#btn-signup').click(function(e){
		e.preventDefault();
	});

	function isLogin(){
		if ($.cookie('userId') == undefined) {
			return false;
		} else {
			return true;
		}
	}

	exports.isLogin = isLogin;
	
});