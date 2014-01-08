/**
 * UserControllerController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

 module.exports = {

 	login: function(req, res) {
 		var email = req.param('email');
 		var password = req.param('password');

 		User.find({
 			emailAddress: email
 		}).limit(1).done(function(err, users){
 			if (err) {
 				console.log(err);
 				return ;
 			}
 			console.log(users);
 			if (users.length!==0){
 				console.log('hidsadsf');
 				var user = users[0];
 				if (user.password == password){
					// 密码正确

					//将登录信息写入Cookie
					res.cookie('userId', user.id);
					res.cookie('nickname', user.nickname);
					res.cookie('email', user.emailAddress);

					return res.send({status:0, text:'登录成功'});
				} else {
					// 密码不正确
					return res.send({status:2, text:'密码不匹配'});
				} 				
			} else {
				res.send({status:1, text:'用户未注册'}); 				
			}
			
		});

 	},

 	signup: function(req, res) {

 		var email = req.param('email');
 		var password = req.param('password');
 		var nickname = req.param('nickname');

 		User.find({
 			emailAddress: email
 		}).limit(1).done(function(err, users){
 			if (err) {
 				console.log(err);
 				return ;
 			}
 			console.log(users);
 			if (users.length == 0){
 				User.create({
 					emailAddress: email,
 					password: password,
 					nickname:nickname
 				}).done(function(err, user) {
						// Error handling
						if (err) {
							return console.log(err);
						}

						//将登录信息写入Cookie
						res.cookie('userId', user.id);
						res.cookie('nickname', user.nickname);
						res.cookie('email', user.emailAddress);

						res.send({status:0, text:'注册成功！'});
					});

 			} else {
 				res.send({status:1, text:'相同电邮已注册'}); 				
 			}

 		})
 	},

 	logout: function(req, res){
 		res.clearCookie('userId');
		res.clearCookie('nickname');
		res.clearCookie('email');

		res.redirect('/');
 	},





  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserControllerController)
   */
   _config: {}


};
