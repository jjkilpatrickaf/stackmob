//------------------------------------------------------------------------------
//
// Namespace definitions
//
//------------------------------------------------------------------------------

if ( grubhunter == undefined )
	var grubhunter = {};

//------------------------------------------------------------------------------
//
// Application classes
//
//------------------------------------------------------------------------------

grubhunter.Application = function() {

	this.spotted = new spotted.auth.Auth();

	this.init = function() {
		var self = this;
		this.spotted.loadFacebook('433521833374993', '//127.0.0.1:4567/index.html');

		$('#facebook-sign-up').click(function(){
			self.spotted.facebookCreateUser();
		});

		$('#sign-up-form').bind('submit', function(e){
			e.preventDefault();

			var results = $(this).serializeArray();
			var user = {};
			for (var i = 0; i < results.length; i++) {
				var item = results[i]
				user[item.name] = item.value;
			};

			self.spotted.createUser(user);

		});

		$('#facebook-login').click(function(){
			self.spotted.facebookLogin();
		});

		$('#login-form').bind('submit', function(e){
			e.preventDefault();

			var results = $(this).serializeArray();
			var user = {};
			for (var i = 0; i < results.length; i++) {
				var item = results[i]
				user[item.name] = item.value;
			};

			self.spotted.login(user);

		});

		$('#logout').click(function(){
			self.spotted.logout();
		});

		$('#facebook-link').click(function(){
			self.spotted.facebookLinkUser();
		});
	};

	this.init();

};

//------------------------------------------------------------------------------
//
// On ready
//
//------------------------------------------------------------------------------

$(function() {
	var app = new grubhunter.Application();
});